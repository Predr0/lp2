import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL2 } from '../config/axios';
import Card from '../components/card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ListagemEventos() {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL2}/eventos`)
      .then((response) => {
        setEventos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar eventos:', error);
      });
  }, []);

  const cadastrar = () => {
    navigate(`/cadastro-eventos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-eventos/${id}`);
  };

  return (
    <div className='container'>
      <Card title='Listagem de Eventos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={cadastrar}
              >
                Novo Evento
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Nome do Evento</th>
                    <th scope='col'>Data</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {eventos.map((evento) => (
                    <tr key={evento.id}>
                      <td>{evento.id}</td>
                      <td>{evento.nome}</td>
                      <td>{evento.data}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(evento.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
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

export default ListagemEventos;
