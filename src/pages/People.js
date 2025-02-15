// src/pages/People.js
import React, { useEffect, useState } from "react";
import { db, storage, auth, checkIfAdmin } from "../firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import MotionWrapper from "../components/MotionWrapper";
import PeopleCard from "../components/PeopleCard";

const People = () => {
  const [people, setPeople] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: "", position: "", image: null });

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

    const fetchPeople = async () => {
      const peopleCollection = collection(db, "people");
      const peopleSnapshot = await getDocs(peopleCollection);
      const peopleList = await Promise.all(
        peopleSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, data.imagePath));
          return { id: doc.id, ...data, imageUrl };
        })
      );
      peopleList.sort((a, b) => a.order - b.order);
      setPeople(peopleList);
    };

    fetchPeople();
    return () => unsubscribe();
  }, []);

  const handleUpload = async () => {
    if (!newPerson.name || !newPerson.position || !newPerson.image) {
      alert("Please fill in all fields!");
      return;
    }

    const imageRef = ref(storage, `people/${newPerson.image.name}`);
    await uploadBytes(imageRef, newPerson.image);
    const imageUrl = await getDownloadURL(imageRef);

    const newDocRef = await addDoc(collection(db, "people"), {
      name: newPerson.name,
      position: newPerson.position,
      imagePath: `people/${newPerson.image.name}`,
      order: people.length + 1,
    });

    setPeople([...people, { id: newDocRef.id, name: newPerson.name, position: newPerson.position, imageUrl, order: people.length + 1 }]);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    const confirmText = prompt("Type 'confirm' to delete this person:");
    if (confirmText !== "confirm") return;

    try {
      const personToDelete = people.find((person) => person.id === id);
      if (!personToDelete) {
        alert("Person not found.");
        return;
      }

      const imageRef = ref(storage, personToDelete.imagePath);
      await deleteObject(imageRef);
      await deleteDoc(doc(db, "people", id));

      const updatedPeople = people.filter((person) => person.id !== id).map((p, index) => ({ ...p, order: index + 1 }));
      setPeople(updatedPeople);
    } catch (error) {
      console.error("Error deleting person:", error);
      alert("Failed to delete person.");
    }
  };

  const handleMove = async (id, direction) => {
    const index = people.findIndex(person => person.id === id);
    if (index === -1 || (direction === "up" && index === 0) || (direction === "down" && index === people.length - 1)) return;

    const newOrder = [...people];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];

    await Promise.all([
      updateDoc(doc(db, "people", newOrder[index].id), { order: index + 1 }),
      updateDoc(doc(db, "people", newOrder[swapIndex].id), { order: swapIndex + 1 })
    ]);

    setPeople([...newOrder]);
  };

  return (
    <MotionWrapper>
      <main className="container mx-auto my-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-500">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
          {people.map((person) => (
            <PeopleCard
              key={person.id}
              name={person.name}
              position={person.position}
              imageUrl={person.imageUrl}
              isAdmin={isAdmin}
              onDelete={() => handleDelete(person.id)}
              onMoveUp={() => handleMove(person.id, "up")}
              onMoveDown={() => handleMove(person.id, "down")}
            />
          ))}
        </div>

        {isAdmin && (
          <div className="text-center mt-8">
            <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              {showForm ? "Cancel" : "Add Person"}
            </button>

            {showForm && (
              <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-700 text-white"
                  onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Position"
                  className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-700 text-white"
                  onChange={(e) => setNewPerson({ ...newPerson, position: e.target.value })}
                />
                <input
                  type="file"
                  className="w-full mb-3 text-white"
                  onChange={(e) => setNewPerson({ ...newPerson, image: e.target.files[0] })}
                />
                <button onClick={handleUpload} className="bg-green-500 text-white px-6 py-2 rounded-lg">
                  Upload
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </MotionWrapper>
  );
};

export default People;