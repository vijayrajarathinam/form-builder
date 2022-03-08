import { collection, getDocs, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const usersCollection = collection(db, "forms");

export const getForms = async () => {
  const data = await getDocs(usersCollection);
  return await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const addForm = async (data) => {
  return await addDoc(usersCollection, { ...data });
};

export const updateForm = async (data, id = null) => {
  const formRef = doc(db, "forms", id);
  console.log(formRef);
  return await updateDoc(formRef, { ...data });
};
