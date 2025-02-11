import React from 'react';
import axios from 'axios';
import { BASE_URL2 } from '../config/axios';
import { useNavigate } from 'react-router-dom';

const baseURL = `${BASE_URL2}/mensagens`;

function ListagemMensagens() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-mensagem`);
  };

  const [dados, setDados] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar mensagens:", error);
      });
  }, []);

  if (!dados) return null;

  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => cadastrar()}
      >
        Nova Mensagem
      </button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Aluno</th>
            <th scope="col">Modalidade</th>
            <th scope="col">Mensagem</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((dado) => (
            <tr key={dado.id}>
              <td>{dado.id}</td>
              <td>{dado.aluno}</td>
              <td>{dado.modalidade}</td>
              <td>{dado.mensagem}</td>
              <td>
                {/* Coloque botões de editar ou excluir aqui */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListagemMensagens;
