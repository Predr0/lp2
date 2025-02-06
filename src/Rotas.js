import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import CadastroUsuario from './view/cadastro-usuario';
import CadastroAluno from './view/cadastro-aluno';
import ListagemAlunos from './view/listagem-alunos';
import ListagemPlanos from './view/listagem-planos';
import ListagemModalidades from './view/listagem-modalidades';
import ListagemUsuarios from './view/listagem-usuarios';
import Login from './view/login';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-usuario/:idParam?' element={<CadastroUsuario />} />
        <Route path='/cadastro-aluno/:idParam?' element={<CadastroAluno />} />
        <Route path='/listagem-usuarios' element={<ListagemUsuarios />} />
        <Route path='/listagem-alunos' element={<ListagemAlunos />} />
        <Route path='/listagem-planos' element={<ListagemPlanos />} />
        <Route path='/listagem-modalidades' element={<ListagemModalidades />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
