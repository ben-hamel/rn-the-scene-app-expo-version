import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map((doc) => {
          const { categories, ...data } = doc.data();
          return { ...data, data: categories };
        });
        setCategories(categoriesData);
        setLoading(false);
        console.log("categories retrieved");
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return { categories, loading };
};

export default useFetchCategories;
