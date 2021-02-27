const url_api= "https://api.airtable.com/v0/appLQkpWuUrYmsvG7/Table%201?view=Grid%20view";

const url_api_create = "https://api.airtable.com/v0/appLQkpWuUrYmsvG7/Table%201";

const url_api_update = "https://api.airtable.com/v0/appLQkpWuUrYmsvG7/Table%201";

const url_api_borrar = "https://api.airtable.com/v0/appLQkpWuUrYmsvG7/Table%201?records[]=";

const Authorization = "Bearer keypFgW9ql6PGevJQ";

new Vue({
    el: '#app',
    data: {
        articulos: [],
        articuloEditar: false,
        articuloTitulo: false,
        tituloActualizar: '',
        articuloSubtitulo: false,
        subtituloActualizar: '',
        articuloContenido: false,
        contenidoActualizar: '',
        articuloTag: false,
        tagActualizar: '',
        busqueda: '',
        articuloImagen: false,
        imagenActualizar: '',
        resultados: [],
    },
    mounted: function (){
        this.obtenerDatos();
    },
    watch: {
        busqueda: function () {
            this.obtenerResultados();
        },
    },
    methods: {
        obtenerDatos : function () {
            fetch(url_api, {
                headers: {
                    'Authorization' : Authorization,
                },
            })
                .then((response) => response.json())
                .then((json) => this.articulos = json.records)

        },
        crearNuevoArticulo: function (){
            fetch(url_api_create, {
                headers: {
                    'Authorization': Authorization,
                    'Content-type': 'application/json'
                },
                //pacth un solo producto a la vez
                method: 'POST',
                body: JSON.stringify({
                    "records": [
                        {
                            "fields": {
                                "Titulo": "Nuevo Articulo",
                                "Subtitulo": "No hay ningun subtitulo.\n",
                                "Imagen": [
                                    {
                                        "url": "https://cdn.pixabay.com/photo/2014/10/27/22/03/sad-505857_960_720.jpg"
                                    }
                                ],
                                "Contenido": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum cursus scelerisque gravida. Aenean et magna a mauris convallis mollis fermentum sc...",
                                "color": "#c421ba",
                                "Tags": [
                                    "Diseño de zoom"
                                ]
                            }
                        },
                    ]
                })
            })

                .then((json) => this.obtenerDatos())
        },
        actualizarArticuloTitulo: function (id,nuevoTitulo){
            this.articuloTitulo =false
            fetch(url_api_update, {
                headers: {
                    'Authorization': Authorization,
                    'Content-type': 'application/json'
                },
                //pacth un solo producto a la vez
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Titulo": nuevoTitulo,
                            }
                        },
                    ]
                })
            })
                .then((json) => this.obtenerDatos())
        },
        actualizarArticuloSubtitulo: function (id,nuevoTitulo){
            this.articuloSubtitulo =false
            fetch(url_api_update, {
                headers: {
                    'Authorization': Authorization,
                    'Content-type': 'application/json'
                },
                //pacth un solo producto a la vez
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Subtitulo": nuevoTitulo,
                            }
                        },
                    ]
                })
            })
                .then((json) => this.obtenerDatos())
        },
        actualizarArticuloTag: function (id,tag){
                this.articuloTag=false
                fetch(url_api_update, {
                    headers: {
                        'Authorization': Authorization,
                        'Content-type': 'application/json'
                    },
                    //pacth un solo producto a la vez
                    method: 'PATCH',
                    body: JSON.stringify({
                        "records": [
                            {
                                "id": id,
                                "fields": {
                                    "Tags": [tag],
                                }
                            },
                        ]
                    })
                })
                    .then((json) => this.obtenerDatos())
        },
        actualizarArticuloContenido:  function (id,contenido){
            this.articuloContenido =false
            fetch(url_api_update, {
                headers: {
                    'Authorization': Authorization,
                    'Content-type': 'application/json'
                },
                //pacth un solo producto a la vez
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Contenido": contenido,
                            }
                        },
                    ]
                })
            })
                .then((json) => this.obtenerDatos())

        },
        actualizarArticuloImagen: function (id,url){
            this.articuloImagen = false;
            fetch(url_api_update, {
                headers: {
                    'Authorization': Authorization,
                    'Content-type': 'application/json'
                },
                //pacth un solo producto a la vez
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Imagen": [ {
                                    "url": url
                                }
                                ]
                                ,
                            }
                        },
                    ]
                })
            })
                .then((json) => this.obtenerDatos())
        },
        cerrarModal: function (){
            this.articuloEditar = false;
        },
        obtenerResultados : function () {
            fetch(`https://pixabay.com/api/?key=14581694-1e47b08e85369f5be7d24ef40&q=${this.busqueda}&per_page=50&lang=es`)
                .then(function(response) {
                    // Transforma la respuesta. En este caso lo convierte a JSON
                    return response.json();
                })
                .then((json) => {
                    // Usamos la información recibida como necesitemos
                    this.resultados = json.hits;
                });
        },
        borrarProducto: function (id){
            fetch(url_api_borrar.concat(id), {
                headers: {
                    'Authorization' : Authorization,
                },
                method: 'DELETE'
            });
            this.articulos = this.articulos.filter(articulo =>{
                return articulo.id !== id
            })
        },
    },
});