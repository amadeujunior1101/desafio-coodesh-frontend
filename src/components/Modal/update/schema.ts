import * as yup from "yup";

const validationSchema = yup.object({
  first: yup.string().required("Nome obrigatório!"),
  last: yup.string().required("Sobrenome obrigatório!"),
  gender: yup.string().required("Gênero obrigatório!"),
  birth: yup.string().required("Data de nascimento obrigatório!"),
  email: yup
    .string()
    .email("Formato de e-mail incorreto!")
    .required("E-mail obrigatório!"),
  nat: yup.string().required("Nacionalidade obrigatória!"),
  street: yup.string().required("Avenida/rua obrigatória!"),
  number: yup.string().required("Número obrigatório!"),
});

export default validationSchema;
