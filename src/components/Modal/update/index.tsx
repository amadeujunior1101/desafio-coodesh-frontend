import {
  Avatar,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  DialogTitle,
  Button,
  Dialog,
  DialogActions,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import Api from "../../../services/api";

import { DialogModal } from "./types";
import ValidationSchema from "./schema";

export default function Modal({
  handleClickOpen,
  handleClose,
  data,
  tableUpdate,
}: DialogModal) {
  const birthFormat = () => {
    const user = data?.dob?.date !== undefined && data?.dob.date;
    let birth = user.toString().substr(0, 10);
    let year = birth.toString().substr(0, 4);

    let month = birth !== undefined && birth.substr(5, 2);

    let day = birth !== undefined && birth.substr(8, 2);

    return `${year + "-" + month + "-" + day}`;
  };

  const notify = () => toast.success("Atualizado com sucesso!");

  const formik = useFormik({
    initialValues: {
      id: data.id,
      first: data.name?.first,
      last: data.name?.last,
      email: data.email,
      gender: data.gender,
      birth: birthFormat(),
      phone: data.phone,
      nat: data.nat,
      street: data.location?.street?.name,
      number: data.location?.street?.number,
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      await Api.put(`/users/${data?.id}`, {
        ...data,
        name: {
          ...data.name,
          first: values.first,
          last: values.last,
        },
        gender: values.gender,
        dob: {
          ...data.dob,
          date: values.birth,
        },
        email: values.email,
        phone: values.phone,
        nat: values.nat,
        location: {
          ...data.location,
          street: {
            name: values.street,
            number: values.number,
          },
        },
      });

      tableUpdate(values);

      handleClose();

      notify();
    },
  });

  return (
    <div>
      <ToastContainer />
      <Dialog
        open={handleClickOpen}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
            {"Atualizar perfil do usuário"}
          </DialogTitle>
          <Box m={2}>
            <Box
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              display="flex"
              m={2}
            >
              <Avatar
                style={{ width: 200, height: 200 }}
                src={data.picture?.large}
              />
            </Box>
            <Box marginTop={4} marginBottom={4}>
              <TextField
                id="id"
                label="Id"
                disabled={true}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.id}
              />
              <TextField
                id="first"
                name="first"
                label="Nome"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.first}
                error={formik.touched.first && Boolean(formik.errors.first)}
                helperText={formik.touched.first && formik.errors.first}
              />
              <TextField
                id="last"
                label="Sobrenome"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.last}
                error={formik.touched.last && Boolean(formik.errors.last)}
                helperText={formik.touched.last && formik.errors.last}
              />

              <TextField
                id="email"
                label="E-mail"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <FormControl
                variant="outlined"
                style={{ marginTop: 10, width: "100%" }}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Gênero
                </InputLabel>
                <Select
                  native
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  label="gender"
                  fullWidth
                  variant="outlined"
                  margin="none"
                  inputProps={{
                    name: "gender",
                    id: "outlined-age-native-simple",
                  }}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </Select>
              </FormControl>
              <TextField
                id="birth"
                label="Data de nascimento"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.birth}
                error={formik.touched.birth && Boolean(formik.errors.birth)}
                helperText={formik.touched.birth && formik.errors.birth}
              />
              <TextField
                id="phone"
                label="Telefone"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
              <TextField
                id="nat"
                label="Nacionalidade"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.nat}
                error={formik.touched.nat && Boolean(formik.errors.nat)}
                helperText={formik.touched.nat && formik.errors.nat}
              />
              <TextField
                id="street"
                label="Rua"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.street}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
              />
              <TextField
                id="number"
                label="Número"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.number}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
              />
            </Box>
          </Box>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Atualizar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
