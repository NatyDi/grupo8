function validateForm() {
    const form = document.getElementById('formulario');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const category = document.getElementById('category').value;
    const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    const terms = document.getElementById('terms').checked;
    const attachment = document.getElementById('attachment').value;

    // Validación de campos obligatorios
    if (!name || !email || !message || !category || !date || !terms) {
        alert("Por favor, complete todos los campos obligatorios.");
        return false;
    }

     

    // Validación de dirección de correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingrese una dirección de correo electrónico válida.");
        return false;
    }
        // Validación de fecha de nacimiento (edad mínima 18 años)
        const today = new Date();
        const birthDate = new Date(fechaNacimiento);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    

    return true;
}
