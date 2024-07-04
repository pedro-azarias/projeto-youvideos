const express = require('express');
const axios = require('axios');
const cors = require('cors');
const opn = require('opn');
const path = require('path');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = 3000;

// Permitir CORS para todas as origens
app.use(cors());

// Caminho para a pasta frontend
const frontendPath = path.join(__dirname, '..', 'frontend');

// Servir arquivos estáticos da pasta frontend
app.use(express.static(frontendPath));

// Usar a chave da API do YouTube a partir das variáveis de ambiente
const apiKey = process.env.API_KEY;

// Rota para buscar vídeos
app.get('/api/videos', async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                type: 'video',
                q: query,
                maxResults: 12,
                key: apiKey
            }
        });
        res.json(response.data.items);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar vídeos' });
    }
});

// Rota padrão para servir o frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    opn(`http://localhost:${PORT}`, { app: 'chrome', wait: true });
});
