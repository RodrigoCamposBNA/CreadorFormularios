const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const razonSocial = document.getElementById('razon_social');

const habilitarControl = element => {

    const contenedor = element.parentElement.parentElement.parentElement.parentElement;

    element.disabled = false;

    contenedor.style.display = "block";

}

const deshabilitarControl = element => {

    const container = element.parentElement.parentElement.parentElement.parentElement;

    element.value = '';

    element.disabled = true;

    container.style.display = "none";

}


document.getElementsByName('tipo_persona').forEach(tipo => {

    tipo.addEventListener('change', () => {

        clean(); // Blanqueo los campos cuando cambia el tipo de persona

        tipo.classList.remove('is-control');

        if (tipo.checked) {

            tipo.classList.add("is-control");

            const isPersona = tipo.value === 'P';

            isPersona ? habilitarControl(nombre) : deshabilitarControl(nombre);

            isPersona ? habilitarControl(apellido) : deshabilitarControl(apellido);

            isPersona ? deshabilitarControl(razonSocial) : habilitarControl(razonSocial);
            
        }

    });

});

const clean = () => {

    document.querySelectorAll('.help').forEach(x => x.textContent = '');

    document.querySelectorAll('.input, .captcha-input, select, textarea').forEach(control => control.classList.remove('is-danger'));


}

// Al inicializar el formulario

deshabilitarControl(razonSocial);


