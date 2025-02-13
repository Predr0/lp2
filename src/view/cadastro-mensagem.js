import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

function CadastroMensagens() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/mensagens`;

  const [id, setId] = useState('');
  const [aluno, setAluno] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [mensagem, setMensagem] = useState('');

  function inicializar() {
    setId('');
    setAluno('');
    setModalidade('');
    setMensagem('');
  }

  async function salvar() {
    const data = JSON.stringify({ id, aluno, modalidade, mensagem });
    try {
      if (!idParam) {
        await axios.post(baseURL, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Mensagem cadastrada com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Mensagem alterada com sucesso!`);
      }
      navigate('/listagem-mensagens');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar mensagem.');
    }
  }

  const buscar = useCallback(async () => {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const mensagemData = response.data;
        setId(mensagemData.id);
        setAluno(mensagemData.aluno);
        setModalidade(mensagemData.modalidade);
        setMensagem(mensagemData.mensagem);
      } catch (error) {
        console.log(error);
      }
    }
  }, [idParam, baseURL]);

  useEffect(() => {
    buscar();
  }, [buscar]);

  return (
    <div className="container">
      <Card title="Cadastro de Mensagens">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome do Aluno: *" htmlFor="inputAluno">
                <input
                  type="text"
                  id="inputAluno"
                  value={aluno}
                  className="form-control"
                  onChange={(e) => setAluno(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup label="Modalidade: *" htmlFor="selectModalidade">
                <select
                  id="selectModalidade"
                  value={modalidade}
                  className="form-control"
                  onChange={(e) => setModalidade(e.target.value)}
                  required
                >
                  <option value="">Selecione uma modalidade</option>
                  <option value="Muay Thai">Muay Thai</option>
                  <option value="Pilates">Pilates</option>
                  <option value="Musculação">Musculação</option>
                  <option value="Krav Maga">Krav Maga</option>
                  <option value="Jiu Jitsu">Jiu Jitsu</option>
                </select>
              </FormGroup>
              <FormGroup label="Mensagem: *" htmlFor="inputMensagem">
                <textarea
                  id="inputMensagem"
                  value={mensagem}
                  className="form-control"
                  onChange={(e) => setMensagem(e.target.value)}
                  required
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction="row">
                <button onClick={salvar} type="button" className="btn btn-success">
                  Salvar
                </button>
                <button onClick={inicializar} type="button" className="btn btn-danger">
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroMensagens;
