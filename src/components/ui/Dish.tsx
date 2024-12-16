import { FC, useContext } from "react";
import { Form, Formik } from "formik";
import { Card, SelectFormik } from "./";
import { FirebaseContext } from "../../firebase";

interface DishProps {
  dish: {
    id: string;
    dishName: string;
    category: string;
    price: number;
    image: string;
    description: string;
    available: boolean;
  };
}

const categoryTranslations: Record<string, string> = {
  breakfast: "Desayuno",
  lunch: "Comida",
  dinner: "Cena",
  drink: "Bebida",
  dessert: "Postres",
  salads: "Ensaladas",
};

export const Dish: FC<DishProps> = ({ dish }) => {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error("FirebaseContext is not available");
  }

  const { firebaseApp } = context;

  const { id, category, description, dishName, image, price, available } = dish;

  const getCategoryTranslation = (category: string): string => {
    return categoryTranslations[category] || category.toUpperCase();
  };

  const handleAvailabilityChange = (value: string, setFieldValue: any) => {
    const isAvailable = value === "available";

    try {
      firebaseApp.db.collection("products").doc(id).update({
        available: isAvailable,
      });

      setFieldValue("available", value);
    } catch (error) {
      console.error("Error updating availability: ", error);
    }
  };

  return (
    <div className="container mt-10">
      <Card className="mb-10">
        <div className="flex lg:flex-row flex-col items-center justify-center">
          <div className="w-100">
            <div>
              <img src={image} alt={dishName} />
            </div>
            <div className="lg:flex sm:block sm:-mx-2">
              <Formik
                initialValues={{
                  available: available ? "available" : "not_available",
                }}
                onSubmit={() => {}}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <SelectFormik
                      label="Disponibilidad"
                      name="available"
                      options={[
                        { label: "Disponible ✔", value: "available" },
                        { label: "No Disponible ❌", value: "not_available" },
                      ]}
                      value={values.available}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const { value } = e.target;
                        handleAvailabilityChange(value, setFieldValue);
                      }}
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12">
            <p className="text-2xl text-yellow-600 font-bold mb-4">
              {dishName}
            </p>
            <p className="text-gray-600 mb-4">
              Categoría:{" "}
              <span className="text-gray-700 font-bold">
                {getCategoryTranslation(category)}
              </span>
            </p>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-gray-600 mb-4">
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
