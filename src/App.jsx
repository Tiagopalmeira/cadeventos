import React, { useState, useEffect } from "react";
import "./App.css";

const CriarEvento = () => {
  const [novoEvento, setNovoEvento] = useState({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    descricao: "",
    uniforme: "",
    instrutor: "",
  });
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false); // Controla a visibilidade do modal
  const [eventoParaExcluir, setEventoParaExcluir] = useState(null); // Armazena o evento selecionado para excluir
  const [senha, setSenha] = useState(""); // Armazena a senha inserida

  const senhaCorreta = "EDN123"; // A senha para confirmar a exclusão

  // Função para carregar eventos do servidor
  const loadEventos = async () => {
    const response = await fetch("https://apidata-nerdflbqz-tiagopalmeiras-projects.vercel.app/eventos");
    const data = await response.json();
    setEventos(data);
  };

  useEffect(() => {
    loadEventos();
  }, []);

  // Função para excluir um evento
  const handleDeleteEvent = async () => {
    if (senha === senhaCorreta) {
      try {
        const response = await fetch(
          `https://apidata-nerdflbqz-tiagopalmeiras-projects.vercel.app/eventos/${eventoParaExcluir.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Evento excluído com sucesso!");
          setEventos(
            eventos.filter((evento) => evento.id !== eventoParaExcluir.id)
          );
          setShowModal(false); // Fecha o modal após excluir
        } else {
          console.error("Erro ao excluir evento");
        }
      } catch (error) {
        console.error("Erro ao excluir evento:", error);
      }
    } else {
      alert("Senha incorreta!"); // Alerta se a senha estiver incorreta
    }
  };

  // Função para abrir o modal de exclusão
  const openDeleteModal = (evento) => {
    setEventoParaExcluir(evento);
    setShowModal(true);
  };

  // Função para lidar com a mudança da senha
  const handlePasswordChange = (e) => {
    setSenha(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoEvento({
      ...novoEvento,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const newEvent = {
      title: novoEvento.title,
      start: `${novoEvento.startDate}T${novoEvento.startTime}`,
      end: `${novoEvento.endDate}T${novoEvento.endTime}`,
      descricao: novoEvento.descricao,
      uniforme: novoEvento.uniforme,
      instrutor: novoEvento.instrutor,
    };

    try {
      const response = await fetch("https://apidata-nerdflbqz-tiagopalmeiras-projects.vercel.app/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        console.log("Evento adicionado com sucesso!");
        setNovoEvento({
          title: "",
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: "",
          descricao: "",
          uniforme: "",
          instrutor: "",
        });
        loadEventos(); // Recarrega os eventos
      } else {
        console.error("Erro ao adicionar evento");
      }
    } catch (error) {
      console.error("Erro ao enviar evento:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Criar Evento</h1>

      {/* Formulário de Criação de Evento */}
      <div className="form-container">
        <div className="input-group">
          <label className="label">Título:</label>
          <input
            type="text"
            name="title"
            value={novoEvento.title}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="input-group-double">
          <div className="input-group">
            <label className="label">Data de Início:</label>
            <input
              type="date"
              name="startDate"
              value={novoEvento.startDate}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="input-group">
            <label className="label">Hora de Início:</label>
            <input
              type="time"
              name="startTime"
              value={novoEvento.startTime}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        <div className="input-group-double">
          <div className="input-group">
            <label className="label">Data de Término:</label>
            <input
              type="date"
              name="endDate"
              value={novoEvento.endDate}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="input-group">
            <label className="label">Hora de Término:</label>
            <input
              type="time"
              name="endTime"
              value={novoEvento.endTime}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="label">Descrição:</label>
          <textarea
            name="descricao"
            value={novoEvento.descricao}
            onChange={handleChange}
            className="input"
          ></textarea>
        </div>

        <div className="input-group">
          <label className="label">Uniforme:</label>
          <input
            type="text"
            name="uniforme"
            value={novoEvento.uniforme}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="input-group">
          <label className="label">Instrutor:</label>
          <input
            type="text"
            name="instrutor"
            value={novoEvento.instrutor}
            onChange={handleChange}
            className="input"
          />
        </div>

        <button onClick={handleSubmit} className="button primary">
          Adicionar Evento
        </button>
      </div>

      {/* Lista de Eventos */}
      <div className="events-container">
        <h2 className="subtitle">Eventos Adicionados</h2>
        <ul>
          {eventos.map((evento) => (
            <li key={evento.id}>
              <div>{evento.title}</div>
              <div>{evento.descricao}</div>
              <button onClick={() => openDeleteModal(evento)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>Digite a senha para excluir este evento:</p>
            <input
              type="password"
              value={senha}
              onChange={handlePasswordChange}
              placeholder="Digite a senha"
            />
            <div className="modal-actions">
              <button onClick={handleDeleteEvent} className="button primary">
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="button secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriarEvento;
