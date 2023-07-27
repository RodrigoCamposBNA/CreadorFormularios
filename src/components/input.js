import { el } from 'https://redom.js.org/redom.es.min.js';

export default class Input{
    
    constructor(config){

        // En caso de no existir, seteo valores por defecto

        config.props.id = config.props.id ?? config.props.name;
        config.props.type = config.props.type ?? 'text';
        config.props.class = 'input is-fullwidth is-control'
        config.props.placeholder = config.props.placeholder ?? config.props.name.replaceAll('_', ' ').toUpperCase();
        config.props.required = config.props.required ?? true;
        config.props['data-size'] =  config.props['data-size'] ?? "6";

        
        this.input = el('input', config.props);
        this.error = el('p.help.is-danger');

        this.input.onchange = () => this.validate();

        this.el = el('.columns.mb-0',
                    el(`.column.is-${config.props['data-size']}`,
                        el('.field',
                            el('.control', this.input),
                            this.error
                        )
                    )
                );

    }

    validate(){

        // Default value

        this.input.classList.remove('is-danger');

        this.error.textContent = !this.input.checkValidity() ? this.input.validationMessage : '';

        // Validación por regex

        if (this.error.textContent === '' && this.input.dataset.regex) { 

            const regex = new RegExp(this.input.dataset.regex);

            const customMessage = this.input.dataset.message ?? 'El formato ingresado no es válido';

            this.error.textContent = !regex.test(this.input.value) ? customMessage : '';

        }

        if (this.error.textContent !== '') this.input.classList.add("is-danger"); // Si hay algun error, marco el input en rojo


    }
}