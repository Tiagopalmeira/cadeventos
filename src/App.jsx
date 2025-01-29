import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';  // Importando o PrismaClient

const app = express();
const port = 3000;

const prisma = new PrismaClient();  // Instanciando o PrismaClient

// Configurando CORS para permitir todas as origens
app.use(cors({
  origin: '*', // Permite todas as origens. Para permitir apenas uma origem específica, substitua '*' pela URL da origem.
}));

app.use(express.json());  // Para poder lidar com JSON

// Endpoint para obter os eventos
app.get('/eventos', async (req, res) => {
  try {
    const eventos = await prisma.cadastro.findMany(); // Buscando todos os eventos
    res.json(eventos); // Retorna todos os eventos
  } catch (err) {
    console.error('Erro ao buscar eventos', err);
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
});

// Endpoint para adicionar um novo evento
app.post('/eventos', async (req, res) => {
  const { title, startDate, startTime, endDate, endTime, descricao, uniforme, instrutor } = req.body;

  try {
    const novoEvento = await prisma.cadastro.create({
      data: {
        title,
        startDate: new Date(startDate), // Convertendo para Date
        startTime,
        endDate: new Date(endDate),     // Convertendo para Date
        endTime,
        descricao,
        uniforme,
        instrutor,
      },
    });
    res.status(201).json(novoEvento); // Retorna o evento inserido
  } catch (err) {
    console.error('Erro ao adicionar evento', err);
    res.status(500).json({ error: 'Erro ao adicionar evento' });
  }
});

// Endpoint para excluir um evento
app.delete('/eventos/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const eventoExcluido = await prisma.cadastro.delete({
      where: { id: parseInt(id) },
    });
    
    res.status(200).json({ message: 'Evento excluído com sucesso' }); // Retorna sucesso
  } catch (err) {
    console.error('Erro ao excluir evento', err);
    res.status(500).json({ error: 'Erro ao excluir evento' });
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
