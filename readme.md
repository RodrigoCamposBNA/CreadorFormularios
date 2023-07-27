# Creador de Formularios 2da version
	
- Se piensa la solución como un conversor de JSON a HTML. Esto quiere decir que cualquier tag o propiedad que exista en la sintaxis HTML, podra ser definido en el archivo JSON
	
## Estructura Básica del archivo json

El archivo contendra 2 secciones principales:

- **HTML** : Esta sección se debe definir de forma **obligatoria**. Contendra un detalle de todos los elementos HTML que conforman la página.

- **JS** : Esta sección es **opcional**. En ella se definen los archivos JS que utilizara la página en caso de querer darle al formulario o interna alguna funcionalidad Javascript extra (por ej. ocultar/mostrar secciones en base a una condición, validaciones personalizadas, etc)

En el ejemplo adjunto, se define un elemento **h3** con el texto "Hello World" seteandole algunos estilos y clases. Por otro lado, se llama al archivo js  "js/helloWorld.js" que muestra un mensaje por consola

[Link al Ejemplo](https://rodrigocamposbna.github.io/CreadorFormularios/?page=helloWorld).

```
{
    "html" : [
        {
            "element" : "h3",
            "props" : {
                "class" : "subtitle is-3 mt-3",
                "textContent" : "Hello World",
                "style" : {
                    "color" : "red"
                }
            } 
        }
    ],
    "js" : [
        "js/helloWorld.js"
    ]
}

```  


## Estructura para definir un elemento en la sección HTML

La estructura para definir un elemento es siempre la misma : 

- **element**: Se define el tipo de elemento que se creara. Es el unico tag obligatorio.
- **props** : Se definen las propiedades HTML asociadas al elemento. Cualquier propiedad que exista en la sintaxis HTML, podra ser definido aqui.
- **childrens** : Se definen los nodos hijos en caso de existir. La lectura es recursiva, por lo que se podran crean tantos niveles como se deseen.

[Link al Ejemplo](https://rodrigocamposbna.github.io/CreadorFormularios/?page=basico).


```
{
    "element" : "div",
    "props" : {
        "id" : "ejemplo"
    },
    "childrens" : [
        {
            "element" : "h3",
            "props" : {
                "class" : "subtitle is-3 mt-3",
                "textContent" : "Saludo 1",
                "style" : {
                    "color" : "red"
                }
            } 
        },
        {
            "element" : "h3",
            "props" : {
                "class" : "subtitle is-3 mt-3",
                "textContent" : "Saludo 2",
                "style" : {
                    "color" : "blue"
                }
            } 
        }
    ]
}

``` 
La salida HTML generada seria la siguiente

``` 
<div id="ejemplo">
    <h3 class=" subtitle is-3 mt-3" style="color: red;">Saludo 1</h3>
    <h3 class=" subtitle is-3 mt-3" style="color: blue;">Saludo 2</h3>
</div>
``` 


## Creación de formularios

Con el fin de facilitar la creación de formularios,existen acciones pre-programadas para agilizar el desarrollo.

Si el creador de formularios identifica un elemento del tipo "form", automaticamente agrega un captcha y realizara todas las validaciones que se configuren via json



## Estructura tipo personalizado INPUT

Al agregar la propiedad "data-type" = "input" a un elemento tipo input, agrego al elemento propiedades personalizadas que facilitan el desarrollo :

- data-size : longitud del campo en una escala de 1 a 12 (Simil Bootstrap)

- data-regex : Regex para validar el formato del campo

- data-message : Mensaje que se mostrara en caso de que no se pase la validacion por regex. Sino se especifica, el mensaje sera "El formato ingresado no es válido"


``` 
{
    "element" : "input",
        "props" : {
            "name" : "cuil",
            "type" : "number",
            "data-type" : "input",
            "data-size" : "3",
            "data-regex" : "(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})",
            "data-message" :"El cuil ingresado no tiene el formato esperado"
        }
    }
``` 


Por el momento, solo se definio un tipo personalizado INPUT pero la idea es agregar tantos nuevos tipos como sea necesario (select, sucursal, cuil, etc)
