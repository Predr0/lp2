import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

function CadastroPagamentos() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/pagamento`;

  const [id, setId] = useState('');
  const [nomeAluno, setNomeAluno] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [valor, setValor] = useState('');

  function inicializar() {
    setId('');
    setNomeAluno('');
    setModalidade('');
    setValor('');
  }

  async function salvar() {
    // Para novo cadastro, não envia o campo "id"
    const dataObj = idParam
      ? { id, nome_aluno: nomeAluno, modalidade, valor: parseFloat(valor) }
      : { nome_aluno: nomeAluno, modalidade, valor: parseFloat(valor) };
    const data = JSON.stringify(dataObj);

    try {
      if (!idParam) {
        await axios.post(baseURL, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Pagamento cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Pagamento alterado com sucesso!`);
      }
      navigate('/listagem-pagamentos');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar pagamento.');
    }
  }

  const buscar = useCallback(async () => {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const pagamento = response.data;
        setId(pagamento.id);
        setNomeAluno(pagamento.nome_aluno);
        setModalidade(pagamento.modalidade);
        setValor(pagamento.valor);
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
      <Card title="Cadastro de Pagamento">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome do Aluno: *" htmlFor="inputNomeAluno">
                <input
                  type="text"
                  id="inputNomeAluno"
                  value={nomeAluno}
                  className="form-control"
                  onChange={(e) => setNomeAluno(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup label="Modalidade: *" htmlFor="inputModalidade">
                <input
                  type="text"
                  id="inputModalidade"
                  value={modalidade}
                  className="form-control"
                  onChange={(e) => setModalidade(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup label="Valor: *" htmlFor="inputValor">
                <input
                  type="number"
                  id="inputValor"
                  value={valor}
                  className="form-control"
                  onChange={(e) => setValor(e.target.value)}
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

export default CadastroPagamentos;
