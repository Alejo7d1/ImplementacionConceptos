import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3000';

function BookApp() {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    getAllData();
  }, []);

  const fetchAPI = async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`);
      const result = await response.json();
      displayResults(result);
    } catch (error) {
      displayError('Error de conexión');
    }
  };

  const getAllData = () => {
    fetchAPI('/allData');
  };

  const getByQuery = (status) => {
    fetchAPI(`/dataQuery?status=${status}`);
  };

  const getById = () => {
    if (!bookId) return displayError('Ingresa un ID');
    fetchAPI(`/dataInfo/${bookId}`);
  };

  const getByGender = (status) => {
    if (!gender) return displayError('Ingresa un género');
    fetchAPI(`/dataInfoQuery?status=${status}&gender=${gender}`);
  };

  const displayResults = (result) => {
    const container = document.getElementById('resultsContainer');
    
    if (!result.status) {
      container.innerHTML = `<p class="error">${result.message}</p>`;
      return;
    }

    const booksData = Array.isArray(result.data) ? result.data : [result.data];
    
    if (booksData.length === 0) {
      container.innerHTML = '<p class="error">No se encontraron libros</p>';
      return;
    }
    
    setBooks(booksData);

    container.innerHTML = `
        ${booksData.map(book => `
            <div class="book">
                <img src="${book.picture}" width="100">
                <h3>${book.nameBook}</h3>
                <p><strong>Género:</strong> ${book.gender}</p>
                <p><strong>Estado:</strong> ${book.isActive ? 'Activo' : 'Inactivo'}</p>
                <p><strong>Publicación:</strong> ${book.datePublish}</p>
            </div>
        `).join('')}
    `;
  };

  const displayError = (message) => {
    const container = document.getElementById('resultsContainer');
    if (container) {
      container.innerHTML = `<p class="error">${message}</p>`;
    }
  };

  return (
    <div>
      <div>
        <br />
        <input 
          type="number" 
          id="bookId" 
          placeholder="ID del libro"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
        <button onClick={getById}>Buscar por ID</button>
        <br />
        <input 
          type="text" 
          id="gender" 
          placeholder="Género (ej: Fantasía)"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <button onClick={() => getByGender(true)}>Activos + Género</button>
        <button onClick={() => getByGender(false)}>Inactivos + Género</button>
      </div>
      <button onClick={getAllData}>Todos los Libros</button>
      <button onClick={() => getByQuery(true)}>Libros Activos</button>
      <button onClick={() => getByQuery(false)}>Libros Inactivos</button>
      <div id="results">
        <h2>Resultados:</h2>
        <p className="success">Encontrados: {books.length} libros</p>
        <div id="resultsContainer"></div>
      </div>
    </div>
  );
}

export default BookApp;