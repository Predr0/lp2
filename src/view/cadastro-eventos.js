import React, { useState } from 'react';

function CadastroEventos() {
  const [evento, setEvento] = useState({
    nome: '',
    data: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados para a API
    console.log(evento);
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro de Evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Evento:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={evento.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="data">Data do Evento:</label>
          <input
            type="date"
            className="form-control"
            id="data"
            name="data"
            value={evento.data}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Cadastrar Evento
        </button>
      </form>
    </div>
  );
}

export default CadastroEventos;
