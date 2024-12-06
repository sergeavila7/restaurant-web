import { useContext, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { FirebaseContext } from "../../firebase";
import {
  InputFormik,
  SelectFormik,
  TextAreaFormik,
  UploadFile,
} from "../ui/index";
import { Button } from "../ui/Button";
import { newDishSchema } from "../../schemas/index";

export const NewDish = () => {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error("FirebaseContext is not available");
  }

  const { firebaseApp } = context;

  const [file, setFile] = useState<File>();

  return (
    <div className="container mt-10">
      <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>
      <div className="w-full max-w-3xl">
        <Formik
          initialValues={{
            dishName: "",
            price: 0,
            category: "",
            description: "",
          }}
          validationSchema={newDishSchema}
          onSubmit={async (values) => {
            try {
              await firebaseApp.db.collection("products").add({
                ...values,
              });
              alert("Platillo agregado con éxito");
            } catch (error) {
              alert(
                "Hubo un error al agregar el platillo. Intenta nuevamente."
              );
            }
          }}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <InputFormik name="dishName" label="Nombre" type="text" />
              </div>
              <div className="mb-4">
                <InputFormik
                  name="price"
                  label="Precio"
                  type="number"
                  prefix="$"
                />
              </div>
              <div className="absolute right-2"></div>
              <div className="mb-4">
                <SelectFormik
                  label="Categoria"
                  name="category"
                  options={[
                    { label: "", value: "" },
                    { label: "Desayuno", value: "breakfast" },
                    { label: "Comida", value: "lunch" },
                    { label: "Cena", value: "dinner" },
                    { label: "Bebida", value: "drink" },
                    { label: "Postres", value: "dessert" },
                    { label: "Ensaladas", value: "salads" },
                  ]}
                />
              </div>
              <UploadFile
                label="Imagen"
                onFileSelected={(actual) => setFile(actual as File)}
                onError={(e) => console.log(e.message)}
                isInline
              />
              <div className="mb-4">
                <TextAreaFormik
                  label="Descripcion"
                  name="description"
                ></TextAreaFormik>
              </div>
              <div className="flex justify-end">
                <Button
                  className="mt-5"
                  type="submit"
                  variant="fill"
                  color="magenta"
                >
                  Agregar Platillo
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
