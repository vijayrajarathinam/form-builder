import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import Breadcrumb from "../components/commons/Breadcrumb";
import { auth, db } from "../firebase";

export default function ProfilePage() {
  const [user, setUser] = React.useState({});
  const [users, setUsers] = React.useState({});
  const usersCollection = collection(db, "users");

  React.useEffect(() => {
    onAuthStateChanged(auth, setUser);
    const getUser = async () => {
      const data = await getDocs(usersCollection);
      const usr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(usr.find((r) => r.id === user.uid));
    };
    getUser();
  }, [user]);

  return (
    <AnimatePresence>
      <Breadcrumb
        crumbs={[
          { link: "/", text: "dashboard" },
          { link: "/profile", text: "profile" },
        ]}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Profile</h2>
      </div>
      <div className="bg-gray-50 w-full mt-5 p-5 h-auto min-h-[400px]">
        {Object.entries({ ...users })
          .sort((a, b) => a[0] > b[0])
          .map((user, i) => {
            return (
              <motion.div
                initial={{ y: -50 * i, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: i * 0.025 } }}
                className="grid grid-cols-2 gap-4 w-2/3"
              >
                <p className="font-bold">{user[0]} :</p>
                <p className="text-gray-600">{user[1]}</p>
              </motion.div>
            );
          })}
      </div>
    </AnimatePresence>
  );
}
