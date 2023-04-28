import express from 'express'
import productManager from './src/db.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/products',async (req,res)=>{
    const {limit} = req.query
    const productos = await productManager.getProducts(limit)
    console.log(productos);
    res.json(productos)
}) 
app.get('/products/:pid',async (req,res)=>{
    const {pid} = req.params
    const producto = await productManager.getProductById(pid) 
    res.json(producto)
})
const PORT  = 8080
const server = app.listen(PORT,()=>{
    console.log('Escuchando en puerto ' +server.address().port)
}).on('error',err=>console.log('Fallo el servidor',err))