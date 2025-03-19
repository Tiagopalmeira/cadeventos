/* Estilo geral */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Estilo do acordeão de eventos */
.event-accordion {
  background: #00274D; /* Azul escuro */
  color: #fff;
  border-radius: 0.75rem;
  margin: 1rem 0;
  box-shadow: 0.125rem 0.25rem 0.625rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.event-summary {
  padding: 1rem;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: bold;
  border-bottom: 0.125rem solid #FFD700; /* Amarelo */
  transition: background 0.3s;
}

.event-summary:hover {
  background: #004080;
}

.event-details {
  padding: 1rem;
  background: #003366;
  border-top: 0.125rem solid #FFD700;
}

.event-details p {
  margin: 0.3rem 0;
  font-size: 1rem;
}

/* Estilo do cartão de mês */
.month-card {
  background: #D72638; /* Vermelho */
  color: white;
  padding: 1.25rem;
  text-align: center;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.month-card:hover {
  transform: scale(1.05);
  box-shadow: 0.25rem 0.375rem 0.9375rem rgba(0, 0, 0, 0.2);
}

/* Responsividade */
@media (max-width: 1024px) {
  .event-summary, .event-details {
    font-size: 1rem;
    padding: 0.8rem;
  }

  .month-card {
    padding: 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .event-summary, .event-details {
    font-size: 0.9rem;
    padding: 0.625rem;
  }

  .month-card {
    padding: 0.8rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .event-summary, .event-details {
    font-size: 0.8rem;
    padding: 0.5rem;
  }

  .month-card {
    padding: 0.6rem;
    font-size: 0.75rem;
  }
