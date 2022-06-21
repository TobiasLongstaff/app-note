const mysql = require('mysql2')

function insert_note(connection, data, callback) {
    let insertQuery = 'INSERT INTO notas (titulo, fecha, nota) VALUES (?, ?, ?)'
    let query = mysql.format(insertQuery, [data.titulo, data.fecha, data.nota])

    connection.query(query, function(error, result) {
        if(error) throw error
        callback(result)
    })
}

module.exports = { insert_note }