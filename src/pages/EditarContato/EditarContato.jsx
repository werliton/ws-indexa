import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "../../components/Container/Container";
import Wrapper from "../../components/Wrapper/Wrapper";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import Formulario from "../../components/Formulario/Formulario";
import Titulo from "../../components/Titulo/Titulo";
import Header from "../../components/Header/Header";
import { useContacts } from "../../hooks/useContacts";

function EditarContato() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { contacts, updateContact } = useContacts();

  const [dadosDoFormulario, setDadosDoFormulario] = useState({
    nome: "",
    telefone: "",
    imagem: "",
  });

  // Carregar dados do contato atual
  useEffect(() => {
    const contatoAtual = contacts.find((contato) => contato.id === id);

    if (contatoAtual) {
      setDadosDoFormulario(contatoAtual);
    }
  }, []);

  // Atualizar estado do formulário
  const gerenciarMudancaDeInput = (e) => {
    const { id, value } = e.target;
    setDadosDoFormulario((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateContact(dadosDoFormulario)
      .then(() => {
        console.log("Formulário enviado!");
        navigate("/");
      })
      .catch((error) => console.error("Erro ao atualizar contato:", error));
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <BotaoVoltar />

        <Titulo>Editar contato</Titulo>

        <Formulario
          dadosDoFormulario={dadosDoFormulario}
          onChange={gerenciarMudancaDeInput}
          onSubmit={handleSubmit}
        />
      </Container>
    </Wrapper>
  );
}

export default EditarContato;
