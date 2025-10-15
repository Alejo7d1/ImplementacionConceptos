const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Puerto de Vite
    credentials: true
}));

app.use(cors());
app.use(express.json());

//---------------------------------------------- S E R V E R -------------------------------------
const PORT = 3000; //PUERTO
app.listen(PORT, () => {
  console.log(`Server runing in http://localhost:${PORT}`);
});

//Books json
const books = [
  {
    "id": 1,
    "isActive": true,
    "picture": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR-_qFlRxa5Ozof4LnQb6m3QZYNCh4JRxa2Xc0cCMwVn_3Sdyry",
    "datePublish": "1967-05-30",
    "nameBook": "Cien años de soledad",
    "gender": "Realismo Mágico"
  },
  {
    "id": 2,
    "isActive": false,
    "picture": "https://m.media-amazon.com/images/I/81Xv0BmZxTL._UF894,1000_QL80_.jpg",
    "datePublish": "1949-06-08",
    "nameBook": "1984",
    "gender": "Distopía"
  },
  {
    "id": 3,
    "isActive": true,
    "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYTBOO3kFvdLHBaLYxMV3Wt8EqcFOsPF2mSA&s",
    "datePublish": "2007-04-12",
    "nameBook": "El nombre del viento",
    "gender": "Fantasía Épica"
  },
  {
    "id": 4,
    "isActive": true,
    "picture": "https://internacionallibrosyregalos.com/cdn/shop/products/ORGULLOYPREJUICIO_d8838bbb-a901-4956-aaee-dac18ff2bc4f_341x.jpg?v=1641419436",
    "datePublish": "1813-01-28",
    "nameBook": "Orgullo y prejuicio",
    "gender": "Novela Romántica"
  },
  {
    "id": 5,
    "isActive": false,
    "picture": "https://internacionallibrosyregalos.com/cdn/shop/products/PRINCIPITO_391x.jpg?v=1631134820",
    "datePublish": "1943-04-06",
    "nameBook": "El principito",
    "gender": "Fábula Filosófica"
  },
  {
    "id": 6,
    "isActive": true,
    "picture": "https://m.media-amazon.com/images/I/61hSJClsHAS._UF1000,1000_QL80_.jpg",
    "datePublish": "1965-08-01",
    "nameBook": "Dune",
    "gender": "Ciencia Ficción"
  },
  {
    "id": 7,
    "isActive": false,
    "picture": "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
    "datePublish": "1960-07-11",
    "nameBook": "Matar un ruiseñor",
    "gender": "Ficción Literaria"
  },
  {
    "id": 8,
    "isActive": true,
    "picture": "https://m.media-amazon.com/images/I/81+j6JIEweL.jpg",
    "datePublish": "2011-10-14",
    "nameBook": "Donde los árboles cantan",
    "gender": "Fantasía Juvenil"
  },
  {
    "id": 9,
    "isActive": false,
    "picture": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1653311117i/6691227.jpg",
    "datePublish": "1979-10-12",
    "nameBook": "Guía del autoestopista galáctico",
    "gender": "Ciencia Ficción Cómica"
  },
  {
    "id": 10,
    "isActive": false,
    "picture": "https://internacionallibrosyregalos.com/cdn/shop/products/cronicadeunamuerteanunciada_238x.jpg?v=1586217660",
    "datePublish": "1981-03-24",
    "nameBook": "Crónica de una muerte anunciada",
    "gender": "Novela Corta"
  }
]
  ;

//---------------------------------- Endpoints---------------------------------------

//Get all
app.get('/allData', (req, res) => {
  res.json({
    status: true,
    data: books,
    dateTime: new Date().toISOString()
  });
});

//Get by id
app.get('/dataInfo/:idItem',(req, res) => {
    const id = parseInt(req.params.idItem); //int convert
    const bookid = books.find(b => b.id === id); //filter

    if(!bookid){
       res.status(404).send('<h1>404: Producto no encontrado</h1>')
    }else{
        res.json({
        status: true,
        data: bookid,
        dateTime: new Date().toISOString()
    })
    }
})

//Get by status
app.get('/dataInfo/s/:status', (req, res) => { //Se agrega s para no tener 2 endpoints usando la misma nomenclatura
    const statusParam = req.params.status.toLowerCase() === 'true'; //bool convert
    const filteredBooks = books.filter(b => b.isActive === statusParam); //filter

    if (filteredBooks.length === 0) {
        res.status(404).send('<h1>404: No se encontraron productos con ese estado</h1>');
    } else {
        res.json({
            status: true,
            data: filteredBooks,
            dateTime: new Date().toISOString()
        });
    }
});

//dataQuery
app.get('/dataQuery', (req, res) => {
  const statusParam = req.query.status;
  
  
  if (statusParam === undefined) {
    return res.status(400).json({
      status: false,
      message: 'Parámetro "status" es requerido.',
      dateTime: new Date().toISOString()
    });
  }

  if (statusParam.toLowerCase() !== 'true' && statusParam.toLowerCase() !== 'false') {
    return res.status(400).json({
      status: false,
      message: 'Valor inválido para "status".',
      dateTime: new Date().toISOString()
    });
  }

  const statusBoolean = statusParam.toLowerCase() === 'true';//bool convert
  const filteredBooks = books.filter(b => b.isActive === statusBoolean);//filtrar libros
  //filtro de libros
  if (filteredBooks.length === 0) {
    return res.status(404).json({
      status: false,
      message: 'No se encontraron libros con ese estado',
      dateTime: new Date().toISOString()
    });
  }
  res.json({
    status: true,
    data: filteredBooks,
    dateTime: new Date().toISOString()
  });
}

);

//data info query
app.get('/dataInfoQuery', (req, res) => {
  const statusParam = req.query.status;
  const genderParam = req.query.gender
  
  if (statusParam === undefined) {
    return res.status(400).json({
      status: false,
      message: 'Parametro "status" es requerido.',
      dateTime: new Date().toISOString()
    });
  }

  if (genderParam === undefined) {
    return res.status(400).json({
      status: false,
      message: 'Parametro "gender" es requerido.',
      dateTime: new Date().toISOString()
    });
  }
  
  if (statusParam.toLowerCase() !== 'true' && statusParam.toLowerCase() !== 'false') {
    return res.status(400).json({
      status: false,
      message: 'Valor inválido para "status".',
      dateTime: new Date().toISOString()
    });
  }

  const statusBoolean = statusParam.toLowerCase() === 'true';
  const specificBooks = books.filter(b => b.isActive === statusBoolean && b.gender.toLowerCase() === genderParam.toLowerCase());

  if (specificBooks.length === 0) {
    return res.status(404).json({
      status: false,
      message: `No se encontraron libros con status=${statusParam} y genero="${genderParam}"`,
      dateTime: new Date().toISOString()
    });
  }

  
  res.json({
    status: true,
    data: specificBooks,
    dateTime: new Date().toISOString()
  });
  
});