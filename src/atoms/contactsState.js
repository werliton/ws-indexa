import { atom } from "recoil";

const contactsState = atom({
  key: "contactsState",
  default: [],
});

const searchState = atom({
  key: "searchState",
  default: "",
});

export { searchState };

export default contactsState;
