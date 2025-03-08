import React, { useEffect, useState } from "react";
import { db, storage, auth, checkIfAdmin } from "../firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import MotionWrapper from "../components/MotionWrapper";
import EventsCard from "../components/EventsCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    images: [],
    thumbnail: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const adminStatus = await checkIfAdmin(currentUser);
        setUser(currentUser);
        setIsAdmin(adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = await Promise.all(
        eventsSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imageUrls = await Promise.all(
            data.images.map(async (path) => getDownloadURL(ref(storage, path)))
          );
          const thumbnailUrl = await getDownloadURL(ref(storage, data.thumbnail));
          return { id: doc.id, ...data, images: imageUrls, thumbnail: thumbnailUrl };
        })
      );
      eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEvents(eventsList);
    };

    fetchEvents();
    return () => unsubscribe();
  }, []);

  const handleUpload = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.description || newEvent.images.length === 0 || !newEvent.thumbnail) {
      alert("Please fill in all fields and select a thumbnail!");
      return;
    }

    const formattedDate = new Date(newEvent.date).toISOString();
    const eventId = `event_${Date.now()}`;
    const imagePaths = [];

    for (let image of newEvent.images) {
      const imagePath = `events/${eventId}/${image.name}`;
      const imageRef = ref(storage, imagePath);
      await uploadBytes(imageRef, image);
      imagePaths.push(imagePath);
    }

    const newDocRef = await addDoc(collection(db, "events"), {
      title: newEvent.title,
      date: formattedDate,
      description: newEvent.description,
      images: imagePaths,
      thumbnail: `events/${eventId}/${newEvent.thumbnail}`,
    });

    setShowForm(false);
    window.location.reload(); // Reload to fetch new event with URLs
  };

  const handleDelete = async (id, images) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    for (let imagePath of images) {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
    }

    await deleteDoc(doc(db, "events", id));
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <MotionWrapper>
      <main className="container mx-auto my-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-500">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventsCard key={event.id} event={event} isAdmin={isAdmin} onDelete={() => handleDelete(event.id, event.images)} />
          ))}
        </div>

        {isAdmin && (
          <div className="text-center mt-8">
            <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              {showForm ? "Cancel" : "Add Event"}
            </button>

            {showForm && (
              <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <input type="text" placeholder="Title" className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-700 text-white" onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <input type="date" className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-700 text-white" onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
                <textarea placeholder="Description" className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-700 text-white" onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}></textarea>
                <input type="file" multiple className="w-full mb-3 text-white" onChange={(e) => setNewEvent({ ...newEvent, images: [...e.target.files] })} />

                {newEvent.images.length > 0 && (
                  <div className="mb-3">
                    <p className="text-white mb-2">Select Thumbnail:</p>
                    <select
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                      onChange={(e) => setNewEvent({ ...newEvent, thumbnail: e.target.value })}
                    >
                      <option value="">-- Select Thumbnail --</option>
                      {newEvent.images.map((file, index) => (
                        <option key={index} value={file.name}>
                          {file.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button onClick={handleUpload} className="bg-green-500 text-white px-6 py-2 rounded-lg">Upload</button>
              </div>
            )}
          </div>
        )}
      </main>
    </MotionWrapper>
  );
};

export default Events;
