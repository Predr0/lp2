import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroPlano() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/planos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  function inicializar() {
    setId('');
    setNome('');
    setPreco('');
  }

  async function salvar() {
    // Para cadastro novo, não enviamos o campo "id"
    const dataObj = idParam ? { id, nome, "preço": preco } : { nome, "preço": preco };
    const data = JSON.stringify(dataObj);
    try {
      if (!idParam) {
        await axios.post(baseURL, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Plano ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Plano ${nome} alterado com sucesso!`);
      }
      navigate('/listagem-planos');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar plano.');
    }
  }

  const buscar = useCallback(async () => {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const plano = response.data;
        setId(plano.id);
        setNome(plano.nome);
        setPreco(plano.preço);
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
      <Card title="Cadastro de Plano">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Período: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  value={nome}
                  className="form-control"
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup label="Valor: *" htmlFor="inputPreco">
                <input
                  type="number"
                  id="inputPreco"
                  value={preco}
                  className="form-control"
                  onChange={(e) => setPreco(e.target.value)}
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

export default CadastroPlano;
