const express = require('express');
const cors = require('cors');
const app = express();

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
      "picture": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      "datePublish": "2023-05-15",
      "nameBook": "El Jardín de los Secretos",
      "gender": "Misterio"
    },
    {
      "id": 2,
      "isActive": false,
      "picture": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "datePublish": "2022-11-08",
      "nameBook": "Cumbres Borrascosas",
      "gender": "Romance"
    },
    {
      "id": 3,
      "isActive": true,
      "picture": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      "datePublish": "2024-01-20",
      "nameBook": "El Código Da Vinci",
      "gender": "Thriller"
    },
    {
      "id": 4,
      "isActive": false,
      "picture": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
      "datePublish": "2021-09-12",
      "nameBook": "Cien Años de Soledad",
      "gender": "Realismo Mágico"
    },
    {
      "id": 5,
      "isActive": true,
      "picture": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
      "datePublish": "2023-08-03",
      "nameBook": "Dune",
      "gender": "Ciencia Ficción"
    },
    {
      "id": 6,
      "isActive": false,
      "picture": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400",
      "datePublish": "2022-03-25",
      "nameBook": "Orgullo y Prejuicio",
      "gender": "Romance"
    },
    {
      "id": 7,
      "isActive": true,
      "picture": "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400",
      "datePublish": "2024-02-14",
      "nameBook": "El Hobbit",
      "gender": "Fantasía"
    },
    {
      "id": 8,
      "isActive": false,
      "picture": "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
      "datePublish": "2021-12-30",
      "nameBook": "1984",
      "gender": "Distopía"
    },
    {
      "id": 9,
      "isActive": true,
      "picture": "https://images.unsplash.com/photo-1554757380-2fb69b9d5e63?w=400",
      "datePublish": "2023-11-05",
      "nameBook": "Harry Potter y la Piedra Filosofal",
      "gender": "Fantasía"
    },
    {
      "id": 10,
      "isActive": false,
      "picture": "https://images.unsplash.com/photo-1568667256597-3fa4e132d903?w=400",
      "datePublish": "2022-07-18",
      "nameBook": "Crónica de una Muerte Anunciada",
      "gender": "Drama"
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



