import React, { useEffect, useState } from "react";
import { db, storage, auth, checkIfAdmin } from "../firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import MotionWrapper from "../components/MotionWrapper";

const Gallery = () => {
  const [sections, setSections] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [lightbox, setLightbox] = useState({ isOpen: false, sectionId: null, index: 0 });


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

    const fetchSections = async () => {
      const sectionsCollection = collection(db, "gallery");
      const sectionsSnapshot = await getDocs(sectionsCollection);
      const sectionsList = await Promise.all(
        sectionsSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imageUrls = await Promise.all(
            data.images.map(async (path) => getDownloadURL(ref(storage, path)))
          );
          return { id: doc.id, title: data.title, images: imageUrls, imagePaths: data.images };
        })
      );
      setSections(sectionsList);
    };

    fetchSections();
    return () => unsubscribe();
  }, []);

  const createSection = async () => {
    if (!newSectionTitle.trim()) return alert("Enter a valid section title!");

    const docRef = await addDoc(collection(db, "gallery"), {
      title: newSectionTitle,
      images: [],
    });

    setSections([...sections, { id: docRef.id, title: newSectionTitle, images: [], imagePaths: [] }]);
    setNewSectionTitle("");
  };

  const addImagesToSection = async () => {
    if (!selectedFiles.length || !selectedSection) {
      alert("Select files and choose a section first!");
      return;
    }

    const sectionIndex = sections.findIndex((s) => s.id === selectedSection);
    if (sectionIndex === -1) return;

    const section = sections[sectionIndex];
    const imagePaths = [...section.imagePaths];

    for (let file of selectedFiles) {
      const imagePath = `gallery/${selectedSection}/${file.name}`;
      const imageRef = ref(storage, imagePath);
      await uploadBytes(imageRef, file);
      imagePaths.push(imagePath);
    }

    await updateDoc(doc(db, "gallery", selectedSection), { images: imagePaths });

    const updatedImages = await Promise.all(imagePaths.map(async (path) => getDownloadURL(ref(storage, path))));
    sections[sectionIndex] = { ...section, images: updatedImages, imagePaths };
    setSections([...sections]);
    setSelectedFiles([]);
  };

  const deleteImage = async (sectionId, imagePath) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    const sectionIndex = sections.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;

    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);

    const updatedPaths = sections[sectionIndex].imagePaths.filter((path) => path !== imagePath);
    await updateDoc(doc(db, "gallery", sectionId), { images: updatedPaths });

    const updatedImages = await Promise.all(updatedPaths.map(async (path) => getDownloadURL(ref(storage, path))));
    sections[sectionIndex] = { ...sections[sectionIndex], images: updatedImages, imagePaths: updatedPaths };
    setSections([...sections]);
  };

  const deleteSection = async (sectionId, imagePaths) => {
    if (!window.confirm("Are you sure you want to delete this section?")) return;

    for (let imagePath of imagePaths) {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
    }

    await deleteDoc(doc(db, "gallery", sectionId));
    setSections(sections.filter((s) => s.id !== sectionId));
  };

  const openLightbox = (sectionId, index) => {
    setLightbox({ isOpen: true, sectionId, index });
  };
  
  const closeLightbox = () => {
    setLightbox({ isOpen: false, sectionId: null, index: 0 });
  };
  
  const navigateLightbox = (direction) => {
    const section = sections.find((s) => s.id === lightbox.sectionId);
    if (!section) return;
  
    let newIndex = lightbox.index + direction;
    if (newIndex < 0) newIndex = section.images.length - 1; // Loop to last image
    if (newIndex >= section.images.length) newIndex = 0; // Loop to first image
  
    setLightbox({ ...lightbox, index: newIndex });
  };
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
  
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "Escape") closeLightbox();
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);
  

  return (
    <MotionWrapper>
      <main className="container mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-700">Gallery</h2>
        {lightbox.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <button onClick={() => navigateLightbox(-1)} className="absolute left-5 text-white text-3xl">◀</button>

            <div className="relative">
              <img src={sections.find((s) => s.id === lightbox.sectionId)?.images[lightbox.index]} className="max-w-[90vw] max-h-[90vh] rounded-lg" />
              <button onClick={closeLightbox} className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-2">✕</button>
            </div>

            <button onClick={() => navigateLightbox(1)} className="absolute right-5 text-white text-3xl">▶</button>
          </div>
        )}


        {isAdmin && (
          <div className="mb-8 flex flex-col items-center">
            <input
              type="text"
              value={newSectionTitle || ""} // Ensure it's never undefined
              onChange={(e) => setNewSectionTitle(e.target.value)} // Update state properly
              className="p-2 border rounded text-black"
              placeholder="New Section Title"
            />
            <button onClick={createSection} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              Add Section
            </button>
          </div>
        )}
  
        {sections.map((section) => (
          <div key={section.id} className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-200 mb-2">{section.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {section.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  className="rounded-lg w-full h-64 object-cover cursor-pointer"
                  onClick={() => openLightbox(section.id, index)}
                />
                {isAdmin && (
                  <button
                    onClick={() => deleteImage(section.id, section.imagePaths[index])}
                    className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 shadow-md"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            </div>
  
            {isAdmin && (
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <input
                  type="file"
                  multiple
                  onChange={(e) => setSelectedFiles([...e.target.files])}
                  className="text-white"
                />
                <button
                  onClick={() => setSelectedSection(section.id)}
                  className={`px-4 py-2 rounded ${selectedSection === section.id ? "bg-gray-500" : "bg-blue-600 text-white"}`}
                >
                  {selectedSection === section.id ? "Selected" : "Select Section"}
                </button>
                <button
                  onClick={addImagesToSection}
                  className={`px-4 py-2 rounded ${
                    selectedFiles.length > 0 && selectedSection === section.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                  disabled={selectedFiles.length === 0 || selectedSection !== section.id}
                >
                  Add Images
                </button>
                <button
                  onClick={() => deleteSection(section.id, section.imagePaths)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete Section
                </button>
              </div>
            )}
          </div>
        ))}
      </main>
    </MotionWrapper>
  );
  

};

export default Gallery;
