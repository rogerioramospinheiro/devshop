const path = require('path')
const express = require('express')
const knex = require('knex')
const categoryModel = require('./models/category')
const productModel = require('./models/product')

const app = express()
const port = process.env.PORT || 3004

const db = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'Admin',
        password: 'development',
        database: 'devshop'
    }
})

db.on('query', query => {
    console.log('depurando', query.sql)
})

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    const categories = await categoryModel.getCategories(db)()
    res.render('home', {
        categories
    })
})

app.get('/categoria/:id/:slug', async (req, res) => {
    const categories = await categoryModel.getCategories(db)()
    const products = await productModel.getProductsByCategoryId(db)(req.params.id)
    const category = await categoryModel.getCategoryById(db)(req.params.id)
    res.render('category', {
        products,
        categories,
        category: (category.length > 0) && category[0]
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Servidor iniciado com sucesso')
    }
})