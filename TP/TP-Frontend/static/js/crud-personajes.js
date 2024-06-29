class Personaje{

    constructor(id,personaje,director,rating,releaseDate,banner){
        this.id=id;
        this.personaje=personaje;
        this.director=director;
        this.releaseDate=releaseDate;
        this.banner=banner
    }

}

// const personaje1 = new Personaje(1,'Damsel','Un director',4.5,'2024-03-01','https://image.tmdb.org/t/p/w500//sMp34cNKjIb18UBOCoAv4DpCxwY.jpg');

// const personaje2 = new Personaje(2,'Dune 2','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg');

// const personaje3 = new Personaje(3,'Kunfu panda 4','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg');

// let personajes = [personaje1,personaje2,personaje3];

// localStorage.setItem('personajes',JSON.stringify(personajes));

// console.log(personajes);

function showPersonajes(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let personajes = JSON.parse(localStorage.getItem('personajes')) || [];

    //buscar elemento HTML donde quiero insertar las peliculas
    const tbodyPersonajes = document.querySelector('#list-table-personajes tbody');
    // const tbodyPersonajes = document.getElementById('#tbody-table-personajes');
    //limpio el contenido de la tabla
    tbodyPersonajes.innerHTML = '';
    personajes.forEach(personaje => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${personaje.personaje}</td>
                        <td>${personaje.director}</td>
                        <td>${personaje.rating}</td>
                        <td>${personaje.releaseDate}</td>
                        <td>
                            <img src="${personaje.banner}" alt="${personaje.personaje}" width="30%">
                        </td>
                        <td>
                            <button class="btn-cac" onclick='updatePersonaje(${personaje.id})'><i class="fa fa-pencil" ></button></i>
                            <button class="btn-cac" onclick='deletePersonaje(${personaje.id})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodyPersonajes.insertAdjacentHTML('beforeend',tr);
    });

}

/**
 * funcion que permite agregar o modificar una pelicula al listado de peliculas
 * almacenado en el localstorage
 */
function savePersonaje(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-personaje');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id-personaje');
    const inputpersonaje = document.querySelector('#personaje');
    const inputDirector = document.querySelector('#director');
    const inputRating = document.querySelector('#rating');
    const inputReleaseDate = document.querySelector('#release-date');
    const inputBanner = document.querySelector('#banner-form');

    //Realizo una validación simple de acuerdo al contenido del value del input del titulo
    if(inputpersonaje.value.trim() !== ''){
        //Busca en localstorage el item personajes, si no existe asigna el array vacio.
        let personajes = JSON.parse(localStorage.getItem('personajes')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del arraya de personajes el objeto a editar
            const personajeFind = personajes.find(personaje => personaje.id == inputId.value);
            //Si existe actualizo el objeto
            if (personajeFind) {
              personajeFind.personaje = inputpersonaje.value;
              personajeFind.director = inputDirector.value;
              personajeFind.rating = inputRating.value;
              personajeFind.releaseDate = inputReleaseDate.value;
              personajeFind.banner = inputBanner.value;
            }
        }else{
            let newPersonaje = new Personaje(
                personajes.length+1,
                inputpersonaje.value,
                inputDirector.value,
                inputRating.value,
                inputReleaseDate.value,
                inputBanner.value,
            );
            personajes.push(newPersonaje);
        }

        //Se actualiza el array de peliculas en el localstorage
        localStorage.setItem('personajes',JSON.stringify(personajes));
        showPersonajes();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            personaje: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }else{
        Swal.fire({
            personaje: 'Error!',
            text: 'Por favor completa el campo Personaje.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }

}

/**
 * Function que permite cargar el formulario para editar una pelicula
 * de acuedo al id de la pelicula
 * @param {number} personajeId id personaje que se va a actualizar
 */
function updatePersonaje(personajeId){
    let personajes = JSON.parse(localStorage.getItem('personajes'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let personajeToUpdate = personajes.find(personaje => personaje.id===personajeId);
    if(personajeToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id-personaje');
        const inputpersonaje = document.querySelector('#personaje');
        const inputDirector = document.querySelector('#director');
        const inputRating = document.querySelector('#rating');
        const inputReleaseDate = document.querySelector('#release-date');
        const inputBanner = document.querySelector('#banner-form');
        //Se cargan los inputs con los valores de la pelicula encontrada
        inputId.value = personajeToUpdate.id;
        inputpersonaje.value = personajeToUpdate.personaje;
        inputDirector.value = personajeToUpdate.director;
        inputRating.value = personajeToUpdate.rating;
        inputReleaseDate.value = personajeToUpdate.releaseDate;
        inputBanner.value = personajeToUpdate.banner;
    }
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} personajeId id personaje que se va a eliminar
 */
function deletePersonaje(personajeId){
    let personajes = JSON.parse(localStorage.getItem('personajes'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let personajeToDelete = personajes.find(personaje => personaje.id===personajeId);
    if(personajeToDelete){
        //se utiliza el metodo filter para actualizar el array de personajes, sin tener el elemento encontrado en cuestion.
        personajes = personajes.filter(personaje => personaje.id !== personajeToDelete.id);
        //se actualiza el localstorage
        localStorage.setItem('personajes',JSON.stringify(personajes));
        showPersonajes();
        Swal.fire({
            personaje: 'Exito!',
            text: 'El personaje fue eliminada.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSavePersonaje = document.querySelector('#btn-save-personaje');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSavePersonaje.addEventListener('click',savePersonaje);
    showPersonajes();
});
