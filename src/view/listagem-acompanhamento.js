import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import { BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL2}/acompanhamento`;

function ListagemAcompanhamento() {
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    axios.get(baseURL)
      .then(response => setDados(response.data))
      .catch(() => mensagemErro("Erro ao carregar acompanhamentos."));
  }, []);

  const cadastrar = () => {
    navigate('/cadastro-acompanhamento');
  };

  const editar = (id) => {
    navigate(`/cadastro-acompanhamento/${id}`);
  };

  const excluir = async (id) => {
    if (window.confirm("Deseja realmente excluir este acompanhamento?")) {
      try {
        await axios.delete(`${baseURL}/${id}`);
        mensagemSucesso("Acompanhamento excluído com sucesso!");
        setDados(dados.filter(item => item.id !== id));
      } catch (error) {
        mensagemErro("Erro ao excluir acompanhamento.");
      }
    }
  };

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Acompanhamento'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button type='button' className='btn btn-warning' onClick={cadastrar}>
                Novo Acompanhamento
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Aluno</th>
                    <th>Modalidade</th>
                    <th>Observações</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map(dado => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.aluno}</td>
                      <td>{dado.modalidade}</td>
                      <td>{dado.visualizar}</td>
                      <td>
                        <Stack spacing={1} direction='row'>
                          <IconButton aria-label='edit' onClick={() => editar(dado.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label='delete' onClick={() => excluir(dado.id)}>
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

export default ListagemAcompanhamento;
