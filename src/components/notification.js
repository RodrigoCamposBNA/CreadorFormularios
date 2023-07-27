import { el, setStyle } from "https://redom.js.org/redom.es.min.js";

export default class Notification {

    constructor() {

        this.message = el('p.is-size-7.has-text-weight-semibold');

        this.notification = el('.notification',
            el('.columns', [
                el('.column.is-2', 
                    el('span.icon.is-large',
                        el('i.fa-regular.fa-envelope.fa-3x')
                    )
                ),
                el('.column.is-10', this.message)
            ])
        );

        setStyle(this.notification, { opacity: 0, display: 'none', transition: 'opacity 0.5s, display 0.5s'}); // hidden

        this.el = el('.columns.hidden', el('.column.is-8-mobile.is-7-tablet.is-6-desktop.is-5-widescreen.is-4-fullhd', this.notification));

    }

    show(message,type = 'info')
    {

        this.notification.className = `notification is-${type}`;
        
        this.message.textContent = message; 

        setStyle(this.notification, {  opacity: 1, display: 'block', transition: 'opacity 0.5s, display 0.5s'}); // visible

    }

}