const API_BASE = 'http://localhost:3000';

async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        displayError('Error de conexión');
    }
}

function getAllData() {
    fetchAPI('/allData');
}

function getByQuery(status) {
    fetchAPI(`/dataQuery?status=${status}`);
}

function getById() {
    const id = document.getElementById('bookId').value;
    if (!id) return displayError('Ingresa un ID');
    fetchAPI(`/dataInfo/${id}`);
}

function getByGender(status) {
    const gender = document.getElementById('gender').value;
    if (!gender) return displayError('Ingresa un género');
    fetchAPI(`/dataInfoQuery?status=${status}&gender=${gender}`);
}

function displayResults(result) {
    const container = document.getElementById('resultsContainer');
    
    if (!result.status) {
        container.innerHTML = `<p class="error">${result.message}</p>`;
        return;
    }

    const books = Array.isArray(result.data) ? result.data : [result.data];
    
    if (books.length === 0) {
        container.innerHTML = '<p class="error">No se encontraron libros</p>';
        return;
    }

    container.innerHTML = `
        <p class="success">Encontrados: ${books.length} libros</p>
        ${books.map(book => `
            <div class="book">
                <img src="${book.picture}" width="100">
                <h3>${book.nameBook}</h3>
                <p><strong>Género:</strong> ${book.gender}</p>
                <p><strong>Estado:</strong> ${book.isActive ? 'Activo' : 'Inactivo'}</p>
                <p><strong>Publicación:</strong> ${book.datePublish}</p>
            </div>
        `).join('')}
    `;
}

function displayError(message) {
    const container = document.getElementById('resultsContainer');
    if (container) {
        container.innerHTML = `<p class="error">${message}</p>`;
    }
}

getAllData();