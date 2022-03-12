import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const usersCollection = collection(db, "users");

export const getUsers = async () => {
  const data = await getDocs(usersCollection);
  return await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const register = async (data, uid) => {
  // return await addDoc(usersCollection, { ...data });

  const userDocRef = await doc(db, "users", uid);
  return await setDoc(userDocRef, data);
};

// export const updateForm = async (data, id = null) => {
//   const formRef = doc(db, "forms", id);
//   console.log(formRef);
//   return await updateDoc(formRef, { ...data });
// };
