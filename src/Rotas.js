import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import CadastroUsuario from './view/cadastro-usuario';
import CadastroAluno from './view/cadastro-aluno';
import ListagemAlunos from './view/listagem-alunos';
import ListagemPlanos from './view/listagem-planos';
import ListagemModalidades from './view/listagem-modalidades';
import ListagemUsuarios from './view/listagem-usuarios';
import ListagemPagamentos from './view/listagem-pagamentos';
import Login from './view/login';
import ListagemMensagens from './view/listagem-mensagens';
import CadastroAcompanhamento from './view/cadastro-acompanhamento';
import ListagemAcompanhamento from './view/listagem-acompanhamento';
import ListagemEventos from './view/listagem-eventos';
import CadastroEventos from './view/cadastro-eventos';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-usuario/:idParam?' element={<CadastroUsuario />} />
        <Route path='/cadastro-aluno/:idParam?' element={<CadastroAluno />} />
        <Route path='/listagem-usuarios' element={<ListagemUsuarios />} />
        <Route path='/listagem-pagamentos' element={<ListagemPagamentos />} />
        <Route path='/listagem-alunos' element={<ListagemAlunos />} />
        <Route path='/listagem-planos' element={<ListagemPlanos />} />
        <Route path='/listagem-modalidades' element={<ListagemModalidades />} />
        <Route path='/login' element={<Login />} />
        <Route path='/listagem-mensagens' element={<ListagemMensagens />} />
        <Route path='/listagem-acompanhamento' element={<ListagemAcompanhamento />} />
        <Route path='/cadastro-acompanhamento/:idParam?' element={<CadastroAcompanhamento />} />
        <Route path='/listagem-eventos' element={<ListagemEventos />} />
        <Route path='/cadastro-eventos/:idParam?' element={<CadastroEventos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
