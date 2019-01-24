const axios = require('axios');

const URL = 'http://swapi.co/api/people';

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = {
    obterPessoas
}