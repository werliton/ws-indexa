import {useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "../../components/Container/Container";
import Wrapper from "../../components/Wrapper/Wrapper";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import Formulario from "../../components/Formulario/Formulario";
import Titulo from "../../components/Titulo/Titulo";
import Header from "../../components/Header/Header";


function EditarContato() {
  const navigate = useNavigate();
  const { id } = useParams();
 
  const [dadosDoFormulario, setDadosDoFormulario] = useState({
    nome: "",
    telefone: "",
    imagem: "",
  });

  const contatos = [
    {
      "nome": "moni",
      "telefone": "21321312",
      "imagem": "https://pbs.twimg.com/profile_images/1872657693854330880/_QrIcSM__400x400.jpg",
      "_id": 1
    }
  ]


  // Carregar dados do contato atual
  useEffect(() => {
    const contatoAtual = contatos.find(
      (contato) => contato._id === parseInt(id)
    );
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
    console.log("Formulário enviado!");
  };

  return (

    <Wrapper>
      <Header />
      <Container>
      <BotaoVoltar/>

        <Titulo>
          Editar contato
        </Titulo>

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
