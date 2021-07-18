export interface DialogModal {
  handleClickOpenModalDelete: boolean;
  handleCloseModalDelete: Function;
  data?: UserModalDelete;
  removeUserList: Function;
}

export interface UserModalDelete {
  id: number | undefined;
  name: Users;
}

interface Users {
  title: string;
  first: string;
  last: string;
}
