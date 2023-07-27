import { el, mount } from "https://redom.js.org/redom.es.min.js";

import Page from "./components/page.js";
import Captcha from "./components/captcha.js";
import Notification from "./components/notification.js";

window.addEventListener('DOMContentLoaded', async () => {

    const fetchConfigPage = () => {

        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);

        const name =  urlParams.get('page') ?? 'index';

        return fetch(`./pages/${name}.json`).then(response => response.json());

    }

    const config = await fetchConfigPage();

    // Generacion dinámica de contenido HTML (obligatorio) 

    const html = new Page(config.html);

    mount(document.getElementById('app'), html);

    // Generacion dinámica de contenido JS (opcional)

    if (config.js !== undefined && Array.isArray(config.js) ) {
        
        config.js.forEach(src => {

            const script = el('script', { type : 'module', src : src});
    
            mount(document.body, script);
    
        });
    }

    // Validacion de formulario (si existe)

    const form = document.querySelector('form');

    if (form) {

        form.noValidate = true; // Elimino validacion por defecto

        const submit = document.querySelector('button[type="submit"]');

        const captcha = new Captcha();

        mount(form, captcha, submit); // Inserto el captcha antes del boton de submit

        const notification = new Notification();

        mount(document.querySelector('form'), notification); // Inserto la notificacion al final del formulario (posterior al boton de submit)

        form.addEventListener('submit', (e) => { // Proceso el formulario

            e.preventDefault();

            captcha.validate();

            // Fuerzo el onchange para volver a validar los controles (ver que deberia forzar y que no)

            document.querySelectorAll('input[data-size], select, textarea').forEach(x => x.dispatchEvent(new Event('change'))); 
    
            const isOK = [...document.querySelectorAll('p.help')].every(x => x.textContent === ''); // Si no hay errores
    
            if (isOK){

                const data = Object.fromEntries([...document.querySelectorAll('.is-control')].map(o => [o.name, o.value])); // Genero un diccionario con los controles a procesar (los que tienen la clase 'is-control')

                console.table(data);

                notification.show('Formulario procesado correctamente. Verifique la salida genera en la consola del navegador');

                document.querySelectorAll('input, select, textarea').forEach(x => x.disabled = true);

            }
                
        });

    }

});
  