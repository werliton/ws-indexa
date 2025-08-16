import { selector } from "recoil";
import contactsState, { searchState } from "../atoms/contactsState";

const getContactSelector = selector({
  key: "getContact",
  get: ({ get }) => {
    const contacts = get(contactsState);
    const searchTerm = get(searchState);

    if (searchTerm) {
      return contacts.filter((contact) => contact.nome.includes(searchTerm));
    }
    return contacts;
  },
});

export default getContactSelector;
