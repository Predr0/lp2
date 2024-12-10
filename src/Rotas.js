import React from 'react';

import ListagemUsuarios from './view/listagem-usuarios';

import CadastroUsuario from './view/cadastro-usuario';


import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/cadastro-usuario/:idParam?'
          element={<CadastroUsuario />}
        />
        <Route path='/listagem-usuarios' element={<ListagemUsuarios />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;