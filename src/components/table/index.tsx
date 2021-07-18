import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  TextField,
  makeStyles,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Update, DeleteForever } from "@material-ui/icons";

import Modal from "../Modal/update";
import ModalDelete from "../Modal/delete";
import Api from "../../services/api";

import { User, columns, Load, Values } from "./types";
import { UserModalDelete } from "../Modal/delete/types";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function UserTable({ handleOpenLoad }: Load) {
  const classes = useStyles();
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User[]>([]);
  const [userDelete, setUserDelete] = useState<UserModalDelete>();
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleClickOpenModalDelete = (item: UserModalDelete) => {
    setOpenModalDelete(true);
    setUserDelete({ id: item.id, name: item.name });
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const [userModal, setUserModal] = useState<User>({
    id: 0,
    name: {},
    gender: "",
    birth: "",
    email: "",
    phone: "",
    nat: "",
    dob: { date: "" },
    location: {},
    picture: {},
    actions: true,
  });

  const [search, setSearch] = useState("");
  const [dataOriginal, setDataOriginal] = useState<User[]>([]);

  const handleClickOpen = (item: User) => {
    setOpen(true);
    setUserModal(item);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const users = async (count: number) => {
    const response = await Api.get(`/users?page=${count}&&limit=50`);
    const newUsers = response.data.users;
    setTotalPage(response.data["total pages"]);
    setPage(response.data["actual page"]);

    setUser([...user, ...newUsers]);
    setDataOriginal([...user, ...newUsers]);
    setPageCount(pageCount + response.data["items per page"]);
    const existUsers = response.data.users;
    existUsers.length > 0 && handleOpenLoad(false);
  };

  useEffect(() => {
    users(1);
    handleOpenLoad(true);
  }, []);

  function actions(item: any) {
    return (
      <>
        {/* {page}
        {totalPage} */}
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => handleClickOpen(item)}
            style={{ margin: "auto 10px auto 10px", cursor: "pointer" }}
          >
            <Update style={{ color: "blue" }} />
          </div>
          <div
            onClick={() => handleClickOpenModalDelete(item)}
            style={{ margin: "auto 10px auto 10px", cursor: "pointer" }}
          >
            <DeleteForever style={{ color: "#dc3545" }} />
          </div>
        </div>
      </>
    );
  }

  const birthFormat = (item: User) => {
    const user = item.dob?.date !== undefined && item.dob.date;

    let birth = user.toString().substr(0, 10);
    let year = birth.toString().substr(0, 4);

    let month = birth !== undefined && birth.substr(5, 2);

    let day = birth !== undefined && birth.substr(8, 2);

    return `${day + "-" + month + "-" + year}`;
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    let search: User[] = [];
    search = dataOriginal.filter(
      (item) =>
        item.name?.first !== undefined &&
        item.name?.first
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .match(
            event.target.value
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
    );

    if (event.target.value.length === 0) {
      setUser(dataOriginal);
    } else {
      setUser(search);
    }
  };

  const tableUpdate = (values: Values) => {
    let userCopy = user;
    let remainingUsers = userCopy.map((item, index) => {
      if (item.id === values.id) {
        return {
          ...item,
          name: {
            ...item.name,
            first: values.first,
            last: values.last,
          },
          gender: values.gender,
          dob: {
            ...item.dob,
            date: values.birth,
          },
          email: values.email,
          phone: values.phone,
          nat: values.nat,
          location: {
            ...item.location,
            street: {
              name: values.street,
              number: values.number,
            },
          },
        };
      } else {
        return item;
      }
    });

    setUser(remainingUsers);
    setDataOriginal(remainingUsers);
  };

  const removeUserList = (id: number) => {
    let userCopy = user;
    let remainingUsers = userCopy.filter((item) => {
      return item.id !== id;
    });

    setUser(remainingUsers);

    let dataOriginalCopy = dataOriginal;
    let remainingOriginalData = dataOriginalCopy.filter((item) => {
      return item.id !== id;
    });
    setDataOriginal(remainingOriginalData);
    setPageCount(pageCount - 1);
  };

  return (
    <>
      {open && (
        <Modal
          handleClickOpen={open}
          handleClose={handleClose}
          data={userModal}
          tableUpdate={tableUpdate}
        />
      )}
      {openModalDelete && (
        <ModalDelete
          handleClickOpenModalDelete={openModalDelete}
          handleCloseModalDelete={handleCloseModalDelete}
          data={userDelete}
          removeUserList={removeUserList}
        />
      )}
      <Box marginTop={4} marginBottom={4}>
        <TextField
          id="outlined-full-width"
          label="Buscar"
          name="search"
          placeholder="filtrar por nome"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
      </Box>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((item, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell key={columns[0].id} align={columns[0].align}>
                      {item.name?.first} {item.name?.last}
                    </TableCell>
                    <TableCell key={columns[1].id} align={columns[1].align}>
                      {item.gender}
                    </TableCell>
                    <TableCell key={columns[2].id} align={columns[2].align}>
                      {birthFormat(item)}
                    </TableCell>
                    <TableCell key={columns[3].id} align={columns[3].align}>
                      {actions(item)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box
        component="div"
        alignItems="center"
        justifyContent="center"
        display="flex"
        margin="auto auto 30px auto"
        bgcolor="#C6C4C5"
        height="50px"
      >
        <Box component="span">
          Registros na tabela{" "}
          <Box component="span" color="blue" fontWeight="bold">
            {pageCount}
          </Box>
        </Box>
      </Box>

      <Box
        component="div"
        justifyContent="center"
        display="flex"
        margin="30px auto 30px auto"
      >
        {page === totalPage ? (
          <></>
        ) : (
          <Box
            component="div"
            margin="auto 10px auto 10px"
            alignItems="center"
            display="flex"
            onClick={() => {
              handleOpenLoad(true);
              users(page + 1);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <Update
              style={{ color: "blue", width: 50, height: 50 }}
              fontSize="large"
            />
            <Box component="span">Loading more</Box>
          </Box>
        )}
      </Box>
    </>
  );
}
