import React from "react";

import Card from "../components/card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

import "../assets/bootstrap.css";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const BASE_URL = "http://localhost:3000";
const baseURL = `${BASE_URL}/usuarios`;

function ListagemUsuarios() {
  const navigate = useNavigate();
  const [dados, setDados] = React.useState(null);

  React.useEffect(() => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => setDados(data))
      .catch((error) => {
        console.error("Erro ao carregar os dados:", error);
        mensagemErro("Erro ao carregar os dados");
      });
  }, []);

  const cadastrar = () => {
    navigate(`/cadastro-usuarios`);
  };

  const editar = (id) => {
    navigate(`/cadastro-usuarios/${id}`);
  };

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (response.ok) {
        mensagemSucesso("Usuário excluído com sucesso");
        setDados(dados.filter((dado) => dado.id !== id));
      } else {
        mensagemErro("Erro ao excluir o usuário");
      }
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
      mensagemErro("Erro ao excluir o usuário");
    }
  }

  if (!dados) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <Card title="Listagem de Usuários">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()}
              >
                Novo Usuário
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Login</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Administrador</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.login}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.admin ? "Sim" : "Não"}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton
                            aria-label="edit"
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => excluir(dado.id)}
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

export default ListagemUsuarios;
