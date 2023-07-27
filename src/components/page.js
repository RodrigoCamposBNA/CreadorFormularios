import { el } from 'https://redom.js.org/redom.es.min.js';

import Input from './input.js';

export default class Page{
    
    constructor(config){

        const JSONtoHTML = (json) => {   

            return json.map(item => {

                // Custom Types
                
                if (item.props && item.props['data-type'] === 'input') return new Input(item);

                // Default

                return el(
                    item.element, 
                    item.props ?? null,
                    item.childrens !== undefined && Array.isArray(item.childrens) ? JSONtoHTML(item.childrens) : null
                )

            })
              
          }
        
        const html = JSONtoHTML(config)

        this.el = el('#content', html);

    }
}