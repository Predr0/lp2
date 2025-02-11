import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL2}/acompanhamento`;

function CadastroAcompanhamento() {
  const navigate = useNavigate();
  const [aluno, setAluno] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [visualizar, setVisualizar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(baseURL, { aluno, modalidade, visualizar })
      .then((response) => {
        alert('Acompanhamento cadastrado com sucesso!');
        navigate('/listagem-acompanhamento');
      })
      .catch((error) => {
        alert('Erro ao cadastrar acompanhamento');
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
          <label>Link para Acompanhamento</label>
          <input
            type="url"
            className="form-control"
            value={visualizar}
            onChange={(e) => setVisualizar(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroAcompanhamento;
