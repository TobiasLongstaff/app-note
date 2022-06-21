
const formNotas = document.querySelector('#form-notas')

formNotas.addEventListener('submit', async function (event) {
    event.preventDefault()

    const notaObj = {
        titulo: document.querySelector('#titulo').value,
        fecha: document.querySelector('#fecha').value,
        nota: document.querySelector('#nota').value
    }

    try {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notaObj)
        }
        let res = await fetch('http://localhost:3001/api/note', config)
        if(res.ok) {
            formNotas.reset()
            alert('Nota guardada')
        }
    }
    catch(error){
        console.log(error)
    }
})