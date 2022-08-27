
const obtenerNotas = async () => {
    try{
        let response = await fetch('http://localhost:3001/api/note')
        let notas = await response.json()
        console.log(notas)

        let plantilla = '';
        notas.map(nota =>
        {
            const fecha = new Date(nota.fecha)
            plantilla += 
            `
            <div class="card-nota">
                <header class="container-header">
                    <div class="container-titulo">
                        <h3>${nota.titulo}</h3>
                        <div class="container-controles">
                            <button class="btn-control">
                                <i class="uil uil-pen"></i>
                            </button>
                            <button class="btn-control">
                                <i class="uil uil-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p>Fecha: ${fecha.toLocaleDateString()}</p>
                </header>
                <main>
                    <p>${nota.nota}</p>
                </main>
            </div>
            `
        })
        document.querySelector('#container-notas').innerHTML = plantilla

        var elem = document.querySelector('#container-notas');
        new Masonry( elem, {
            itemSelector: '.card-nota',
            columnWidth: 240,
            gutter: 12,
            transitionDuration: '0.2s',
        })
    }
    catch(error){
        console.log(error)
    }

}

const formNotas = document.querySelector('#form-notas')

formNotas.addEventListener('submit', async (event) => {
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
            obtenerNotas()
        }
    }
    catch(error){
        console.log(error)
    }
})

document.querySelector('#btn-popup').addEventListener('click', () => {
    document.querySelector('.overlay-popup').style.visibility = 'visible'
    formNotas.style.opacity = '1'
})

document.querySelector('#cerrar-popup').addEventListener('click', () => {
    document.querySelector('.overlay-popup').style.visibility = 'hidden'
    formNotas.style.opacity = '0'
})


obtenerNotas()