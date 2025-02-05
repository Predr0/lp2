import React, { useState, useEffect } from 'react';
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

  // Estados para os dados do aluno
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [modalidades, setModalidades] = useState('');
  const [plano, setPlano] = useState('');
  const [idCurso, setIdCurso] = useState('');
  const [dados, setDados] = useState([]);
  const [dadosCursos, setDadosCursos] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setEmail('');
      setModalidades('');
      setPlano('');
      setIdCurso('');
    } else if (dados) {
      setId(dados.id);
      setNome(dados.nome);
      setEmail(dados.email);
      setModalidades(dados.modalidades);
      setPlano(dados.plano);
      setIdCurso(dados.idCurso || '');
    }
  }

  async function salvar() {
    let data = { id, nome, email, modalidades, plano, idCurso };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, { headers: { 'Content-Type': 'application/json' } })
        .then(() => {
          mensagemSucesso(`Aluno ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-alunos`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          mensagemSucesso(`Aluno ${nome} alterado com sucesso!`);
          navigate(`/listagem-alunos`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios
        .get(`${baseURL}/${idParam}`)
        .then((response) => {
          const aluno = response.data;
          setDados(aluno);
          setId(aluno.id);
          setNome(aluno.nome);
          setEmail(aluno.email);
          setModalidades(aluno.modalidades);
          setPlano(aluno.plano);
          setIdCurso(aluno.idCurso || '');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/cursos`).then((response) => {
      setDadosCursos(response.data);
    });
  }, []);

  // Busca os dados do aluno quando o parâmetro de URL mudar
  useEffect(() => {
    if (idParam) {
      buscar();
    }
  }, [idParam]);


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
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Modalidade: *' htmlFor='selectModalidade'>
                <select
                  className='form-select'
                  id='selectModalidade'
                  name='modalidade'
                  value={modalidades}
                  onChange={(e) => setModalidades(e.target.value)}
                >
                  <option key='0' value='0'>Selecione</option>
                  {dadosCursos.map((dado) => (
                    <option key={dado.id} value={dado.nome}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Plano: *' htmlFor='selectPlano'>
                <select
                  className='form-select'
                  id='selectPlano'
                  name='plano'
                  value={plano}
                  onChange={(e) => setPlano(e.target.value)}
                >
                  <option key='0' value='0'>Selecione</option>
                  {dadosCursos.map((dado) => (
                    <option key={dado.id} value={dado.nome}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Curso: *' htmlFor='selectCurso'>
                <select
                  className='form-select'
                  id='selectCurso'
                  name='idCurso'
                  value={idCurso}
                  onChange={(e) => setIdCurso(e.target.value)}
                >
                  <option key='0' value='0'>Selecione</option>
                  {dadosCursos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
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
