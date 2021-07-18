export interface User {
  id: number;
  name: Users;
  gender: string;
  birth: string;
  email?: string;
  phone?: string;
  nat?: string;
  dob?: Birth;
  location?: Street;
  picture?: Picture;
  actions: boolean;
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

type Position = "center" | "right";

export interface Column {
  id: "name" | "gender" | "birth" | "actions";
  label: string;
  minWidth?: number;
  align?: Position;
  format?: (value: number) => string;
}

export interface Load {
  handleOpenLoad: Function;
}

export interface Values {
  id: number;
  first: string | undefined;
  last: string | undefined;
  email: string | undefined;
  gender: string;
  birth: string;
  phone: string | undefined;
  nat: string | undefined;
  street: string | undefined;
  number: string | undefined;
}

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "gender", label: "Gender", minWidth: 100 },
  {
    id: "birth",
    label: "Birth",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
];

export {
  columns
}
