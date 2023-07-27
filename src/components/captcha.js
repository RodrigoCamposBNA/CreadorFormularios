import { el } from "https://redom.js.org/redom.es.min.js";

const captchaStyle = {
    width : "300",
    height :"90",
    style : {
        'background-image': 'url("images/captcha.jpeg")',
        'background-color': '#EAECEE'
    }               
}

const response = {
	success: 0,
	error: 8
}

export default class Captcha {

    constructor() {

        this.captcha = el('canvas', captchaStyle);

        this.error = el('p.help.is-danger');

        this.inputCaptcha = el('input', { class: 'input captcha-input', type: 'text', placeholder: 'Ingrese captcha', maxlength: 4 });

        this.btnReload = el('a.button.captcha-input', el('i.fa-solid.fa-rotate-right'));

        this.captchaValue = this.generateCaptcha();

        this.inputCaptcha.onchange = () => this.validate();

        this.inputCaptcha.onclick = () => this.clean();
        
        this.btnReload.onclick = () => {

            this.captchaValue = this.generateCaptcha();

            this.clean();
            
        };

        this.el = el('section#captcha-section.mx-3.my-4' ,
                    el('.columns',
                        el('column.is-3.pb-0',[
                            this.captcha,
                            el('.field.has-addons.my-2', [
                                el('.control', this.inputCaptcha),
                                el('.control', this.btnReload)
                            ]),
                            this.error
                        ])
                    )
                )

    }

    generateCaptcha(){

        const value = Math.random().toString(36).substring(2, 6).split("").map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char)).join("   ");

        const ctx = this.captcha.getContext("2d");

        ctx.clearRect(0, 0, this.captcha.width, this.captcha.height); // Limpia el valor previo del captcha

        ctx.font = "32px Arial";

        ctx.strokeStyle = "grey";

        ctx.strokeText(value, 60, 55);

        return value;

    }

    validate() {

        const result = this.captchaValue.replaceAll(' ', '').toUpperCase() === this.inputCaptcha.value.toUpperCase() ? response.success : response.error;

        this.error.textContent = result === response.error ? 'El captcha ingresado no es correcto' : '';

        this.inputCaptcha.classList = result === response.error ? 'input captcha-input is-danger' : 'input captcha-input is-success'; // Seteo estilo en base al resultado

        this.btnReload.classList = result === response.error ? 'button captcha-input is-danger' : 'button captcha-input is-success';

        this.inputCaptcha.disabled = result === response.success; // Deshabilito el ingreso de texto si el captcha ingresado es correcto

        this.btnReload.disabled = result === response.success; // Deshabilito el boton de refresh de captcha si el captcha ingresado es correcto

        return result;

    }

    clean(){
        
        this.inputCaptcha.value = '';

        this.inputCaptcha.classList.remove('is-danger');

        this.btnReload.classList.remove('is-danger');

        this.error.textContent = '';

    }

}