import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { DialogModal } from "./types";
import Api from "../../../services/api";

export default function ModalDelete({
  handleClickOpenModalDelete,
  handleCloseModalDelete,
  data,
  removeUserList,
}: DialogModal) {
  const notify = () => toast.success("Removido com sucesso!");

  const users = async () => {
    await Api.delete(`/users/${data?.id}`);

    handleCloseModalDelete();
    notify();
    removeUserList(data?.id);
  };

  return (
    <Box component="div">
      <ToastContainer />
      <Dialog
        open={handleClickOpenModalDelete}
        onClose={() => handleCloseModalDelete()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Atenção"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Deseja realmente excluir ` +
              `${data?.name.first} ` +
              ` ${data?.name.last}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => users()} color="primary">
            Sim
          </Button>
          <Button
            onClick={() => handleCloseModalDelete()}
            color="primary"
            autoFocus
          >
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
