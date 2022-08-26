const { response } = require('express')
const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs')
const mysqlConnection = require('../conexion')
const { insert_note, update_note } = require('../operaciones')

router.get('/api/note', async (require, response) => {
    mysqlConnection.query('SELECT * FROM notas', async (error, result) => {
        response.json(result)
    })
})

router.post('/api/note', async (require, response) => {
    const { titulo, fecha, nota } = require.body

    if(!titulo && !fecha && !nota) {
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

router.put('/api/note', async (require, response) => {
    const { titulo, fecha, nota, id } = require.body

    if(id && (titulo || fecha || nota)) {
        update_note(mysqlConnection, require.body, (result) => {
            require.json(result)
        })
    }
    else {
        return response.status(400).json({
            message: 'No se enviaron datos'
        })
    }
})

module.exports = router