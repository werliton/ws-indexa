import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

import Wrapper from "../../components/Wrapper/Wrapper";
import Container from "../../components/Container/Container";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import Formulario from "../../components/Formulario/Formulario";
import Titulo from "../../components/Titulo/Titulo";
import { useContacts } from "../../hooks/useContacts";

function Cadastro() {
  const navigate = useNavigate();

  const { createContact } = useContacts();

  const [dadosDoFormulario, setDadosDoFormulario] = useState({
    nome: "",
    telefone: "",
    imagem: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDadosDoFormulario((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact(dadosDoFormulario)
      .then(() => {
        console.log("Formulário enviado!");
        navigate("/");
      })
      .catch((error) => console.error("Erro ao criar contato:", error));
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <BotaoVoltar />

        <Titulo>Adicionar contato</Titulo>

        <Formulario
          dadosDoFormulario={dadosDoFormulario}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </Container>
    </Wrapper>
  );
}

export default Cadastro;
