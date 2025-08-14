import { useState, useEffect } from "react";
import ItemDaLista from "./ItemDaLista/ItemDaLista";
import styled from "styled-components";
import { useContacts } from "../../../hooks/useContacts";

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
  const { contacts } = useContacts();

  useEffect(() => {
    const agrupados = contacts.reduce((acumulador, contato) => {
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
  }, [contacts]);

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
