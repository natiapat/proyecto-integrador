const container = document.getElementById('container')

const categorias = {
  a: 748382,
  b: 1112459,
  c: 1557443,
  d: 1934273,
  e: 2277684,
  f: 2847105,
  g: 3416526,
  h: 4229985,
  i: 4734330,
  j: 5425770,
  k: 6019594
}

let indiceDeCategoriaActual = 0

function verificarCategoria(monto) {
  for (let categoria in categorias) {
    if (monto < categorias[categoria]) {
      break
    } else if (monto > categorias.k) {
      indiceDeCategoriaActual = -1
      break
    }
    indiceDeCategoriaActual++
  }
}

function calcularCategoria() {
  const parrafoViejo = document.getElementById('resultado')
  if (parrafoViejo) parrafoViejo.remove()

  const montoIngresado = document.getElementById('monto').value
  const resultado = document.createElement('p')
  resultado.setAttribute('id', 'resultado')
  if (Math.sign(montoIngresado) !== 1) {
    resultado.innerHTML = 'Parece que ingresaste un monto no valido, por favor vuelve a intentar'
    return
  }

  verificarCategoria(parseInt(montoIngresado))
  if (indiceDeCategoriaActual < 0) resultado.innerHTML = 'Tu monto excede el monotributo, pasate a responsable inscripto.'
  else {
    let categoriaActual = Object.keys(categorias)[indiceDeCategoriaActual]
    resultado.innerHTML = `Perteneces a la categoria ${categoriaActual}`
    const botonViejoDeCalcular = document.getElementById('guardarValor')
    if (botonViejoDeCalcular) botonViejoDeCalcular.remove()

    const guardarValor = document.createElement('button')
    guardarValor.setAttribute('id', 'guardarValor')
    guardarValor.innerHTML = 'Guardar categoria!'
    guardarValor.onclick = function () {
      localStorage.setItem('categoria', `${categoriaActual}`)
      console.log(localStorage.getItem('categoria'))
    }
    container.append(guardarValor)
  }
  indiceDeCategoriaActual = 0
  container.append(resultado)
}

function calcularMonotributo() {
  let categoriaGuardadaEnStorage = localStorage.getItem('categoria')
  if (categoriaGuardadaEnStorage) {
    const parrafo = document.createElement('p')
    parrafo.innerHTML = `Bienvenido otra vez! La ultima vez que calculamos tu categoria estabas en la categoria  ${categoriaGuardadaEnStorage}`
    container.append(parrafo)
  }

  const div = document.getElementById('calcular')
  div.remove()

  const label = document.createElement('label')
  label.append('¿Cuanto facturaste los ultimos 12 meses?')
  const input = document.createElement('input')
  input.className = "form-control"
  input.type = "text"
  input.setAttribute('id', 'monto')
  const button = document.createElement('button')
  button.className = "btn btn-primary"
  button.append('Calcular')
  button.onclick = calcularCategoria

  container.append(label)
  container.append(input)
  container.append(button)
}



let img = document.getElementById('pokeImg');
let txt = document.getElementById('pokeText');
let numero = document.getElementById('pokeNum');
  numero.value = 1; 

function renderPokemon(imagen, name){
    img.setAttribute('src', imagen);
    txt.innerHTML = name;
}

 function verPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${numero.value}/`)
        .then(response => response.json())
        .then(pokemon => {
            let imagen = pokemon.sprites.front_default;
            let nombre = pokemon.name;
            renderPokemon(imagen, nombre);
     });
}