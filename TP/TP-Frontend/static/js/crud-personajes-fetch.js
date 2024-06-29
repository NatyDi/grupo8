const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formatosave JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de
 * @returns 
 */
async function savePersonaje(){
  const idPersonaje = document.querySelector('#id-personaje').value;
  const personaje = document.querySelector('#personaje').value;
  const descripcion = document.querySelector('#descripcion').value;
  const fecha_nacimiento = document.querySelector('#fecha_nacimiento').value;
  const url_foto = document.querySelector('#url_foto').value;

  //VALIDACION DE FORMULARIO
  if (!personaje || !descripcion || !fecha_nacimiento || !url_foto) {
    Swal.fire({
        personaje: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  // Crea un objeto con los datos de la película
  const personajeData = {
      personaje: personaje,
      descripcion: descripcion,
      fecha_nacimiento: fecha_nacimiento,
      url_foto: url_foto,
      id_personaje: idPersonaje
  };

    
  let result = null;
  // Si hay un idPersonaje, realiza una petición PUT para actualizar la película existente
  if(idPersonaje!==""){
    result = await fetchData(`${BASEURL}/api/personajes/${idPersonaje}`, 'PUT', personajeData);
  }else{
    // Si no hay idPersonaje, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/personajes/`, 'POST', personajeData);
  }
  
  const formPersonaje = document.querySelector('#form-personaje');
  formPersonaje.reset();
  Swal.fire({
    personaje: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showPersonajes();
}


/**
 * Funcion que permite crear un elemento <tr> para la tabla de personajes
 * por medio del uso de template string de JS.
 */
async function showPersonajes(){
  let personajes =  await fetchData(BASEURL+'/api/personajes/', 'GET');
  const tablePersonajes = document.querySelector('#list-table-personajes tbody');
  tablePersonajes.innerHTML='';
  personajes.forEach((personaje,index) => {
    let tr = `<tr>
                  <td>${personaje.personaje}</td>
                  <td>${personaje.descripcion}</td>
                  <td>${personaje.fecha_nacimiento}</td>
                  <td>
                      <img src="${personaje.url_foto}" width="30%">
                  </td>
                  <td>                      
                      <button class="btn-personaje" onclick='updatePersonaje(${personaje.id_personaje})' type="button" id="btn-update-personaje">Update</button>
                      <button class="btn-personaje" onclick='deletePersonaje(${personaje.id_personaje})' type="button" id="btn-delete-personaje">Delete</button>
                  </td>
                </tr>`;
    tablePersonajes.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deletePersonaje(id){
  Swal.fire({
      personaje: "Esta seguro de eliminar el personaje?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/personajes/${id}`, 'DELETE');
        showPersonajes();
        Swal.fire(response.message, "", "success");
      }
  });
  
}


/**
 * Function que permite cargar el formulario con los datos de el personaje 
 * para su edición
 * @param {number} id Id de el personaje que se quiere editar
 */
async function updatePersonaje(id){
  //Buscamos en el servidor el personaje de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/personajes/${id}`, 'GET');
  const idPersonaje = document.querySelector('#id-personaje');
  const personaje = document.querySelector('#personaje');
  const descripcion = document.querySelector('#descripcion');
  const fecha_nacimiento = document.querySelector('#fecha_nacimiento');
  const url_foto = document.querySelector('#url_foto');
  
  idPersonaje.value = response.id_personaje;
  personaje.value = response.personaje;
  descripcion.value = response.descripcion;
  fecha_nacimiento.value = response.fecha_nacimiento;
  url_foto.value = response.url_foto;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSavePersonaje = document.querySelector('#btn-save-personaje');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSavePersonaje.addEventListener('click',savePersonaje);
  showPersonajes();
});