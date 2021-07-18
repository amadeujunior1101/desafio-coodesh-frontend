export interface DialogModal {
  handleClickOpen: boolean;
  handleClose: Function;
  data: User;
  tableUpdate: Function;
}

export interface User {
  id: number;
  name?: Users;
  gender: string;
  birth: string;
  email?: string;
  phone?: string;
  nat?: string;
  dob?: Birth;
  location?: Street;
  picture?: Picture;
}

interface Users {
  title?: string;
  first?: string;
  last?: string;
}

interface Birth {
  date: string;
}

interface Street {
  street?: Address;
}

interface Address {
  name?: string;
  number?: string;
}

interface Picture {
  large?: string;
  medium?: string;
  thumbnail?: string;
}

export interface UserObj {
  id: number | undefined;
  first: string | undefined;
  last: string | undefined;
  title: string | undefined;
  gender: string;
  birth: string;
  email?: string;
  phone?: string;
  nat?: string;
  street?: string;
  number?: string;
  picture?: string;
}
