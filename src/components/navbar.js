import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          SIGA
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-usuarios'
              label='Funcionarios'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-alunos' label='Alunos' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-planos'
              label='Planos'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-modalidades'
              label='Modalidades'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-pagamentos' label='Pagamento' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-mensagens'
              label='Mensagens'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-acompanhamento'
              label='Acompanhamento'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-eventos'
              label='Eventos'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/login' label='Entrar' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/' label='Sair' />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
