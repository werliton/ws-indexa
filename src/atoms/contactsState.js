import { atom } from "recoil";

const contactsState = atom({
  key: "contactsState",
  default: [],
});

export default contactsState;
