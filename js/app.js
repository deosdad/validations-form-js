document.addEventListener('DOMContentLoaded', () => {
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    };

    // Elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');

    // Eventos de la interfaz
    inputEmail.addEventListener('blur', (event) => validation(event));
    inputAsunto.addEventListener('blur', (event) => validation(event));
    inputMensaje.addEventListener('blur', (event) => validation(event));

    formulario.addEventListener('submit', (event) => sendEmail(event));

    btnReset.addEventListener('click', (event) => {
        event.preventDefault();
        resetForm();
    });

    // Función para enviar el email
    const sendEmail = (event) => {

        event.preventDefault();

        spinner.children[0].style.display = 'block';

        // Simulación de envío de email
        setTimeout(() => {
            spinner.children[0].style.display = 'none';
            resetForm();

        }, 2000);
    };

    // Función para validar campos
    const validation = (event) => {
        const referencia = event.target;
        if (event.target.value.trim() === '') {
            showAlert(`El campo ${event.target.id} es obligatorio.`, referencia.parentElement);
            email[event.target.name] = '';
            comproveObjectEmail();
            return;
        }

        if (referencia.id === 'email' && !validInputEmail(referencia.value)) {
            showAlert('El email no es válido.', referencia.parentElement);
            email[event.target.name] = '';
            comproveObjectEmail();
            return;
        }

        referencia.parentElement.style.borderColor = '#66997a';
        clearAlert(referencia.parentElement);

        // Asignamos valores
        email[event.target.name] = event.target.value.trim().toLowerCase();

        // Comprobar el objeto email
        comproveObjectEmail();
    };

    // Función para mostrar una alerta
    const showAlert = (mensaje, referencia) => {
        clearAlert(referencia);

        // Crear la alerta en HTML
        const err = document.createElement('P');
        err.textContent = mensaje;
        err.classList.add('alert');

        // Añadimos la alerta al HTML
        referencia.appendChild(err);
    };

    // Función para limpiar una alerta
    const clearAlert = (referencia) => {
        const alert = referencia.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    };

    // Función para validar el formato del email
    const validInputEmail = (email) => {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    };

    // Función para comprobar el objeto email
    const comproveObjectEmail = () => {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.remove('enabled');
            btnSubmit.classList.add('disabled');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('disabled');
        btnSubmit.classList.add('enabled');
        btnSubmit.disabled = false;
    };

    // Función para reiniciar el formulario
    const resetForm = () => {
        const alerts = document.querySelectorAll('.alert');
        const borders = document.querySelectorAll('.borders');
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        borders.forEach((border) => border.classList.add('borderss'));

        if (alerts) {
            alerts.forEach((alert) => alert.remove());
        }

        formulario.reset();

        comproveObjectEmail();
    };
});