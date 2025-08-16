import { useState, useEffect } from "react";
import ItemDaLista from "./ItemDaLista/ItemDaLista";
import styled from "styled-components";
import { useContacts } from "../../../hooks/useContacts";
import { useRecoilValue } from "recoil";
import getContactSelector from "../../../selectors/contactSelector";
import { searchState } from "../../../atoms/contactsState";

const ContatoTitulo = styled.h2`
  border-bottom: 1px solid #0d6efd;
  margin-bottom: 16px;
`;

const ContatosWrapper = styled.div`
  color: #0d6efd;
  max-width: 416px;
  width: 100%;
`;

const ContatoGrupo = styled.div`
  margin-bottom: 24px;
`;

const ContatoLista = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

function ListaDeContatos() {
  const [contatosAgrupados, setContatosAgrupados] = useState({});
  const { deleteContact } = useContacts();

  const filteredContacts = useRecoilValue(getContactSelector);
  const searchTerm = useRecoilValue(searchState);

  const initialContacts = filteredContacts;

  useEffect(() => {
    const agrupados = initialContacts.reduce((acumulador, contato) => {
      const primeiraLetra = contato.nome[0].toUpperCase();
      if (!acumulador[primeiraLetra]) acumulador[primeiraLetra] = [];
      acumulador[primeiraLetra].push(contato);
      return acumulador;
    }, {});

    const agrupadosOrdenados = Object.keys(agrupados)
      .sort()
      .reduce((acumulador, chave) => {
        acumulador[chave] = agrupados[chave].sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        return acumulador;
      }, {});

    setContatosAgrupados(agrupadosOrdenados);
  }, [initialContacts, searchTerm]);

  const handleDeleteContact = (id) => {
    const isDeleted = window.confirm("Deseja realmente deletar?");

    if (!isDeleted) return;

    deleteContact(id)
      .then(() => {
        console.info("deletado com sucesso", id);
      })
      .catch((error) => console.error("Erro ao deletar contato", error));
  };

  return (
    <ContatosWrapper>
      {Object.keys(contatosAgrupados).length > 0 ? (
        Object.keys(contatosAgrupados).map((letra) => (
          <ContatoGrupo key={letra}>
            <ContatoTitulo>{letra}</ContatoTitulo>
            <ContatoLista>
              {contatosAgrupados[letra].map((contato) => (
                <ItemDaLista
                  key={contato.id}
                  id={contato.id}
                  nome={contato.nome}
                  telefone={contato.telefone}
                  imagem={contato.imagem}
                  onDelete={() => handleDeleteContact(contato.id)}
                />
              ))}
            </ContatoLista>
          </ContatoGrupo>
        ))
      ) : (
        <p>Nenhum contato disponível.</p>
      )}
    </ContatosWrapper>
  );
}

export default ListaDeContatos;
