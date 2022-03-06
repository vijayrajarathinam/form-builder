import { collection, getDocs, addDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const usersCollection = collection(db, "forms");

// await addDoc(collection(db, "cities"), {
//     name: "Tokyo",
//     country: "Japan"
//   });

export const getForms = async () => {
  const data = await getDocs(usersCollection);
  return await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const addForm = async (data, id = null) => {
  //   const userDocRef = doc(db, "forms");
  //   const usersCollection = await collection(db, "forms");

  return await addDoc(usersCollection, { ...data });
};
