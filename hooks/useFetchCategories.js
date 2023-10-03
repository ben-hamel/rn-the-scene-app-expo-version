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
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  // Function to extract subcategories from the fetched categories
  const extractSubcategories = () => {
    const subcategories = [];

    categories.forEach((category) => {
      category.data.forEach((subcategory) => {
        subcategories.push(subcategory);
      });
    });

    return subcategories;
  };

  // Get a list of every subcategory
  const allSubcategories = extractSubcategories();

  return { categories, loading, allSubcategories };
};

export default useFetchCategories;
