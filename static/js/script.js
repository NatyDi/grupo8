function validateForm() {
    var form = document.getElementById("contactForm");
    var name = form.elements["name"].value.trim();
    var email = form.elements["email"].value.trim();
    var message = form.elements["message"].value.trim();
    var category = form.elements["category"].value.trim();
    var age = form.elements["age"].value.trim();
    var terms = form.elements["terms"].checked;

    // Validación de campos obligatorios
    if (!name || !email || !message || !category || !age || !terms) {
        alert("Por favor, complete todos los campos obligatorios.");
        return false;
    }

    // Validación de dirección de correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingrese una dirección de correo electrónico válida.");
        return false;
    }

    // Validación de edad
    if (isNaN(age) || age < 18) {
        alert("Por favor, ingrese una edad válida (debe ser mayor de 18 años).");
        return false;
    }

    return true;
}
