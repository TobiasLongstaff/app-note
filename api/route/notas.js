const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs')
const mysqlConnection = require('../conexion')
const { insert_note } = require('../operaciones')

router.get('/api/note', async (require, response) => {
    mysqlConnection.query('SELECT * FROM notas', async (error, result) => {
        response.json(result)
    })
})

router.post('/api/note', async (require, response) => {
    const { titulo, fecha, nota } = require.body

    if(!titulo || !fecha || !nota) {
        return response.status(400).json({
            message: 'Todos los campos son requeridos'
        })
    }
    else {
        insert_note(mysqlConnection, require.body, (result) => {
            response.json(result)
        })
    }
})

module.exports = router