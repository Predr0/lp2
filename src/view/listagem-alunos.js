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

const baseURL = `${BASE_URL}/alunos`;

function ListagemAlunos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-aluno`);
  };

  const editar = (id) => {
    navigate(`/cadastro-alunos/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Alunos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Aluno
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Atividade</th>
                    <th scope='col'>Plano</th>

                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.nome}</td>
                      <td>{dado.email}</td>
                      <td>{dado.modalidades}</td>
                      <td>{dado.plano}</td>
                     
                      {/*<td>{dado.quantMin}</td>
                      <td>{dado.vencimento}</td>
                      <td>{dado.dataEntrada}</td>
                      <td>{dado.precoCompra}</td>*/}
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            // onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemAlunos;
