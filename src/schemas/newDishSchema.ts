import * as Yup from "yup";

export const newDishSchema = Yup.object({
  dishName: Yup.string()
    .min(3, "Los platillos deben tener al menos 3 caracteres")
    .required("El nombre del platillo es obligatorio"),
  price: Yup.number()
    .min(1, "Debes agregar un numero")
    .required("El precio es obligatorio")
    .positive("Debe ser un numero positivo"),
  category: Yup.string().required("La categoria es obligatoria"),
  description: Yup.string()
    .min(10, "La descripcion debe ser mas larga")
    .required("La descripcion es obligatoria"),
});
