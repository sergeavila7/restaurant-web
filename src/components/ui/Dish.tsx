import { FC, Key } from "react";
import { Card } from "./";

interface DishProps {
  dish: {
    id: Key;
    dishName: string;
    category: string;
    price: number;
    image: string;
    description: string;
  };
}

const categoryTranslations: { [key: string]: string } = {
  breakfast: "Desayuno",
  lunch: "Comida",
  dinner: "Cena",
  drink: "Bebida",
  dessert: "Postres",
  salads: "Ensaladas",
};

export const Dish: FC<DishProps> = ({ dish }) => {
  const { category, description, dishName, image, price } = dish;

  const getCategoryTranslation = (category: string) => {
    return categoryTranslations[category] || category.toUpperCase();
  };

  return (
    <div className="container mt-10">
      <Card className="mb-10">
        <div className="flex-center">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={image} alt={dishName} />
          </div>
          <div className="lg:w-7/12 xl:w-9/12">
            <p className="text-2xl text-yellow-600 font-bold mb-4">
              {dishName}
            </p>
            <p className="text-gray-600 mb-4">
              Categoria:
              <span className="text-gray-700 font-bold">
                {" "}
                {getCategoryTranslation(category)}
              </span>
            </p>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-gray-600 mb-4">
              {" "}
              Precio:{" "}
              <span className="text-gray-700 font-bold">
                ${price.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
