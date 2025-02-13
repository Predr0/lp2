import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroModalidades() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/modalidades`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');

  function inicializar() {
    setId('');
    setNome('');
  }

  async function salvar() {
    const data = JSON.stringify({ id, nome });
    try {
      if (!idParam) {
        await axios.post(baseURL, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Modalidade ${nome} cadastrada com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Modalidade ${nome} alterada com sucesso!`);
      }
      navigate('/listagem-modalidades');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar modalidade.');
    }
  }

  const buscar = useCallback(async () => {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const modalidade = response.data;
        setId(modalidade.id);
        setNome(modalidade.nome);
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
      <Card title="Cadastro de Modalidades">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  value={nome}
                  className="form-control"
                  onChange={(e) => setNome(e.target.value)}
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

export default CadastroModalidades;
