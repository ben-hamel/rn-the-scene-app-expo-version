import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const useFetchUsersBySkill = (skill) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "users"),
        where("skill", "array-contains-any", [skill])
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(data);
    };
    getData();
  }, [skill]);

  return users;
};

export default useFetchUsersBySkill;
