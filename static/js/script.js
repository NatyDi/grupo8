const form = document.getElementById('contactForm');
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputMessage = document.getElementById('message');
const inputCategory = document.getElementById('category');
const inputBirthday = document.getElementById('fecha_nacimiento');
const inputAttachment = document.getElementById('attachment');

// Capturar evento
form.addEventListener("submit", e => {
    e.preventDefault();
    let warning = "";

    //Valido en Nombre
    if (inputName.value.trim() === "") {
        warning += "Debe ingresar el Nombre.\n";
    }

    if (inputName.value.length < 3) {
        warning += "Debe ingresar un Nombre con más de tres caracteres.\n";
    }

    //Valido en Email
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexEmail.test(inputEmail.value)) {
        warning += "Debe ingresar un Correo Electrónico válido.\n";
    }

    //Valido la Edad
    if (inputBirthday.value === "") {
        warning += "Debe ingresar la fecha de nacimiento.\n";
    } else {
        const today = new Date();
        const birthDate = new Date(inputBirthday.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        if (age < 18) {
            warning += "Debe ser mayor a 18 años.\n";
        }
    }

    //Emito warinig
    if (warning !== "") {
        alert("Por favor, verificar lo siguiente: \n\n" + warning);
    } else {
        alert("Formulario enviado CORRECTAMENTE.\nEsperamos responder a la breverdad.\nLa web del Celiaco.");
        form.reset();
    }
});
