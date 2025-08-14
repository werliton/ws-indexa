import { useRecoilState } from "recoil";
import contactsState from "../atoms/contactsState";
import { apiContatos } from "../api/api";
import { useEffect } from "react";

export function useContacts() {
  const [contacts, setContacts] = useRecoilState(contactsState);

  const fetchContacts = async () => {
    const contacts = await apiContatos.resgatarContatos();

    setContacts(contacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    fetchContacts,
    contacts,
  };
}
