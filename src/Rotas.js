import React from 'react';
import CadastroUsuario from './view/cadastro-usuario';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ListagemAlunos from './view/listagem-alunos';
import ListagemPlanos from './view/listagem-planos';
import ListagemModalidades from './view/listagem-modalidades';
import ListagemUsuarios from './view/listagem-usuarios';
import Login from './view/login';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/cadastro-usuario/:idParam?'
          element={<CadastroUsuario />}
        />
        <Route path='/listagem-usuarios' element={<ListagemUsuarios />} />
        <Route path='/listagem-alunos' element={<ListagemAlunos />} />
        <Route path='/listagem-planos' element={<ListagemPlanos />} />
        <Route path='/listagem-modalidades' element={<ListagemModalidades />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
