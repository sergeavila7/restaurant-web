import { Form, Formik, FormikProps } from "formik";
import {
  InputFormik,
  SelectFormik,
  TextAreaFormik,
  UploadFile,
} from "../ui/index";
import { Button } from "../ui/Button";
import { useState } from "react";

export const NewDish = () => {
  const [file, setFile] = useState<File>();

  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl ">
          <Formik
            initialValues={{
              dishName: "",
              description: "",
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form>
                <div className="mb-4">
                  <InputFormik name="name" label="Nombre" type="text" />
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
                      { label: "Desayuno", value: "transfer" },
                      { label: "Comida", value: "check" },
                      { label: "Cena", value: "cash" },
                      { label: "Bebida", value: "cash" },
                      { label: "Postres", value: "cash" },
                      { label: "Ensaladas", value: "cash" },
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
    </div>
  );
};
