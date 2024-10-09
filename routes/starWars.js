const express = require('express');
const router = express.Router();
const axios = require('axios');

// Ruta para obtener todos los personajes
router.get('/all', async (req, res) => {
    try {
        const response = await axios.get('https://starwars-n5ec-developuptcs-projects.vercel.app/');
        const characters = response.data || [];
        res.render('index', { characters, error: null });
    } catch (error) {
        console.error('Error al obtener todos los personajes:', error);
        res.render('index', { characters: [], error: 'No se pudieron obtener los personajes.' });
    }
});

// Ruta para buscar personajes por ID
router.get('/search/id', async (req, res) => {
    const id = req.query.id;
    console.log('Buscando personaje con ID:', id);
    try {
        const response = await axios.get(`https://starwars-n5ec-developuptcs-projects.vercel.app/${id}`);
        const character = response.data ? [response.data] : [];
        res.render('index', { characters: character, error: null });
    } catch (error) {
        console.error('Error al buscar personaje por ID:', error);
        res.render('index', { characters: [], error: 'No se pudo encontrar el personaje con ese ID.' });
    }
});

// Ruta para buscar personajes por nombre
router.get('/search/name', async (req, res) => {
    const name = req.query.name.trim();
    console.log('Buscando personaje con nombre:', name);
    try {
        const response = await axios.get(`https://starwars-n5ec-developuptcs-projects.vercel.app/name/${encodeURIComponent(name)}`);
        const characters = Array.isArray(response.data) ? response.data : [];
        console.log('Personajes encontrados:', characters);
        res.render('index', { characters, error: null });
    } catch (error) {
        console.error('Error al buscar personajes por nombre:', error);
        res.render('index', { characters: [], error: 'No se pudieron encontrar personajes con ese nombre.' });
    }
});

module.exports = router;
