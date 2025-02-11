import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL2}/mensagens`;

function CadastroMensagem() {
  const navigate = useNavigate();
  const [aluno, setAluno] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(baseURL, { aluno, modalidade, mensagem })
      .then((response) => {
        alert('Mensagem cadastrada com sucesso!');
        navigate('/listagem-mensagens');
      })
      .catch((error) => {
        alert('Erro ao cadastrar a mensagem');
        console.error(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Aluno</label>
          <input
            type="text"
            className="form-control"
            value={aluno}
            onChange={(e) => setAluno(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Modalidade</label>
          <input
            type="text"
            className="form-control"
            value={modalidade}
            onChange={(e) => setModalidade(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mensagem</label>
          <textarea
            className="form-control"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroMensagem;
