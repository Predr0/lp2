import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroEventos() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/eventos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');

  function inicializar() {
    setId('');
    setNome('');
    setData('');
  }

  async function salvar() {
    const dataObj = idParam ? { id, nome, data } : { nome, data };
    const jsonData = JSON.stringify(dataObj);
    try {
      if (!idParam) {
        await axios.post(baseURL, jsonData, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Evento ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, jsonData, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Evento ${nome} alterado com sucesso!`);
      }
      navigate('/listagem-eventos');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar evento.');
    }
  }

  const buscar = useCallback(async () => {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const evento = response.data;
        setId(evento.id);
        setNome(evento.nome);
        setData(evento.data);
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
      <Card title="Cadastro de Evento">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome do Evento: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  value={nome}
                  className="form-control"
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup label="Data do Evento: *" htmlFor="inputData">
                <input
                  type="date"
                  id="inputData"
                  value={data}
                  className="form-control"
                  onChange={(e) => setData(e.target.value)}
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

export default CadastroEventos;
