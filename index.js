const e = require('express')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg')
var pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:682269@localhost/cmpt276_a2"
})

var app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))

app.get('/database', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM rectangles`)
        const data = { results : result.rows }
        res.render('pages/database', data)
    } catch (error) {
        res.end(error)
    }
})

app.post('/rectangle/:id', async (req, res) => {
    let id = req.params.id
    try {
        const result = await pool.query(`SELECT * FROM rectangles WHERE id = ${id}`)
        let data = { results : result.rows }
        res.render('pages/rectangle', data)
    } catch (error) {
        res.end(error)
    }
})

app.post('/rectangle', async (req, res) => {
    try {
        let data = { results: [] }
        res.render('pages/rectangle', data)
    } catch (error) {
        res.end(error)
    }
})

app.post('/updateRectangle/:id', async (req, res) => {
    let name = req.body.name
    let width = req.body.width
    let height = req.body.height
    let color = req.body.color
    let iq = req.body.iq
    let id = req.params.id;
    if (req.body.button == "delete") {
        try {
            await pool.query(`DELETE FROM rectangles WHERE id = ${id}`)
            res.redirect('/database')
        } catch (error) {
            res.end(error)
        }
    } else if (req.body.button == "update") {
        try {
            await pool.query(`UPDATE rectangles SET name = '${name}', width = ${width}, height = ${height}, color = '${color}', iq = ${iq} WHERE id = ${id}`)
            res.redirect('/database')
        } catch (error) {
            res.end(error)
        }
    }
})

app.post('/addRectangle', async (req, res) => {
    let name = req.body.name
    let width = req.body.width
    let height = req.body.height
    let color = req.body.color
    let iq = req.body.iq
    try {
        await pool.query(`INSERT INTO rectangles (name, width, height, color, iq) VALUES ('${name}', ${width}, ${height}, '${color}', ${iq})`)
        res.redirect('/database')
    } catch (error) {
        res.end(error)
    }
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
