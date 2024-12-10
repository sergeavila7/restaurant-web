import { Link } from "react-router";
import { FirebaseContext } from "../../firebase";
import { Key, useContext, useEffect, useState } from "react";
import { Dish } from "../ui/Dish";

// Define el tipo de los platos
interface Dish {
  id: Key;
  category: string;
  description: string;
  dishName: string;
  image: string;
  price: number;
}

export const Menu = () => {
  const [dishes, setDishes] = useState<Dish[]>([]); // Tipamos el estado como Dish[]
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error("FirebaseContext is not available");
  }

  const { firebaseApp } = context;

  useEffect(() => {
    const getDishes = () => {
      firebaseApp.db.collection("products").onSnapshot(handleSnapShot);
    };

    getDishes();
  }, []);

  const handleSnapShot = (snapshot: any) => {
    const dishes: Dish[] = snapshot.docs.map((doc: any) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setDishes(dishes);
  };

  return (
    <div className="container mt-10">
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/new-dish"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Agregar platillo
      </Link>
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </div>
  );
};
