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
    const originalContacts = [...contacts];
    // Aplicando Atualizacao otimista
    const foundContact = contacts.map((item) =>
      item.id == contact.id ? contact : item
    );

    setContacts(foundContact);

    return apiContatos.atualizar(contact.id, contact).catch((error) => {
      console.error("Erro ao atualizar contato:", error);
      setContacts(originalContacts);
    });
  };

  const deleteContact = async (id) => {
    const originalContacts = [...contacts];
    // Aplicando Atualizacao otimista
    const foundContact = contacts.filter((item) => item.id != id);

    setContacts(foundContact);

    try {
      const deleted = await apiContatos.deletar(id);

      if (deleted) {
        setContacts((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error(error);
      setContacts(originalContacts);
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
