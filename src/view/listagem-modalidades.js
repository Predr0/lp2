import React from 'react';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/modalidades`;
const alunosURL = `${BASE_URL}/alunos`;

function ListagemModalidades() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-modalidades`);
  };

  const editar = (id) => {
    navigate(`/cadastro-modalidades/${id}`);
  };

  // Estado para as modalidades
  const [dados, setDados] = React.useState(null);
  // Estado para os alunos
  const [alunos, setAlunos] = React.useState([]);

  // Busca as modalidades
  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar modalidades:', error);
      });
  }, []);

  // Busca os alunos
  React.useEffect(() => {
    axios
      .get(alunosURL)
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar alunos:', error);
      });
  }, []);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Modalidades">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()}
              >
                Nova Modalidade
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Alunos Matriculados</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((modalidade) => {
                    // Filtra os alunos que possuem a modalidade atual (comparando o nome)
                    const alunosMatriculados = alunos.filter(
                      (aluno) => aluno.modalidades === modalidade.nome
                    );
                    return (
                      <tr key={modalidade.id}>
                        <td>{modalidade.id}</td>
                        <td>{modalidade.nome}</td>
                        <td>
                          {alunosMatriculados.length > 0 ? (
                            <ul>
                              {alunosMatriculados.map((aluno) => (
                                <li key={aluno.id}>{aluno.nome}</li>
                              ))}
                            </ul>
                          ) : (
                            <span>Nenhum aluno matriculado</span>
                          )}
                        </td>
                        <td>
                          <Stack spacing={1} padding={0} direction="row">
                            <IconButton
                              aria-label="edit"
                              onClick={() => editar(modalidade.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              // onClick={() => excluir(modalidade.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemModalidades;
