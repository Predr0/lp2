// src/view/listagem-eventos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL2 } from '../config/axios';  // Certifique-se de que o caminho está correto
import { Card } from 'react-bootstrap';  // Se estiver usando react-bootstrap
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ListagemEventos() {
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

  const editar = (id) => {
    // Função para editar evento, adicione a lógica que desejar aqui
    console.log(`Editar evento com ID: ${id}`);
  };

  const excluir = (id) => {
    // Função para excluir evento, adicione a lógica que desejar aqui
    console.log(`Excluir evento com ID: ${id}`);
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
                onClick={() => console.log('Cadastrar novo evento')}
              >
                Novo Evento
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Nome do Evento</th>
                    <th scope='col'>Data</th>
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
                            onClick={() => excluir(evento.id)}
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
