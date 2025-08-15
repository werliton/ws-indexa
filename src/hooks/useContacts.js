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

  const createContact = async (contact) => {
    await apiContatos.criar(contact);
  };

  const updateContact = async (contact) => {
    await apiContatos.atualizar(contact.id, contact);
  };

  const deleteContact = async (id) => {
    try {
      const deleted = await apiContatos.deletar(id);

      if (deleted) {
        setContacts((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
  };
}
