import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroAluno() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/alunos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [modalidades, setModalidades] = useState('');
  const [plano, setPlano] = useState('');
  const [idCurso, setIdCurso] = useState('');
  const [dadosCursos, setDadosCursos] = useState([]); // Mantido para o select de plano

  function inicializar() {
    setId('');
    setNome('');
    setEmail('');
    setModalidades('');
    setPlano('');
    setIdCurso('');
  }

  async function salvar() {
    const data = JSON.stringify({ id, nome, email, modalidades, plano, idCurso });

    try {
      if (!idParam) {
        await axios.post(baseURL, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Aluno ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Aluno ${nome} alterado com sucesso!`);
      }
      navigate('/listagem-alunos');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar aluno.');
    }
  }

  const buscar = useCallback(async () => {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const aluno = response.data;
        setId(aluno.id);
        setNome(aluno.nome);
        setEmail(aluno.email);
        setModalidades(aluno.modalidades);
        setPlano(aluno.plano);
        setIdCurso(aluno.idCurso || '');
      } catch (error) {
        console.log(error);
      }
    }
  }, [idParam, baseURL]);

  // Essa requisição permanece se você precisar popular o select de plano
  useEffect(() => {
    axios.get(`${BASE_URL}/alunos`).then((response) => setDadosCursos(response.data));
  }, []);

  useEffect(() => {
    buscar();
  }, [buscar]);

  return (
    <div className='container'>
      <Card title='Cadastro de Aluno'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Modalidade: *' htmlFor='selectModalidade'>
                <select
                  className='form-select'
                  id='selectModalidade'
                  value={modalidades}
                  onChange={(e) => setModalidades(e.target.value)}
                >
                  <option value=''>Selecione</option>
                  <option value='Muay Thai'>Muay Thai</option>
                  <option value='Pilates'>Pilates</option>
                  <option value='Musculação'>Musculação</option>
                  <option value='Krav Maga'>Krav Maga</option>
                  <option value='Jiu Jitsu'>Jiu Jitsu</option>
                </select>
              </FormGroup>
              <FormGroup label='Plano: *' htmlFor='selectPlano'>
                <select
                  className='form-select'
                  id='selectPlano'
                  value={plano}
                  onChange={(e) => setPlano(e.target.value)}
                >
                  <option value='0'>Selecione</option>
                  <option value='Mensal'>Mensal</option>
                  <option value='Bimestral'>Bimestral</option>
                  <option value='Trimestral'>Trimestral</option>
                  <option value='Semestral'>Semestral</option>
                  <option value='Anual'>Anual</option>
                </select>
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  Salvar
                </button>
                <button onClick={inicializar} type='button' className='btn btn-danger'>
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

export default CadastroAluno;
