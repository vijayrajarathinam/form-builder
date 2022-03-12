import { collection, getDocs, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const formsCollection = collection(db, "forms");

export const getForms = async () => {
  const data = await getDocs(formsCollection);
  return await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const addForm = async (data) => {
  return await addDoc(formsCollection, { ...data });
};

export const updateForm = async (data, id = null) => {
  const formRef = doc(db, "forms", id);
  return await updateDoc(formRef, { ...data });
};
