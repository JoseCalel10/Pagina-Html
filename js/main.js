// PRODUCTOS
const productos = [
    // Gorras
    {
        id: "gorra-01",
        titulo: "Gorra 01",
        imagen: "./img/Gorras/01.jpg",
        categoria: {
            nombre: "Gorras",
            id: "Gorras"
        },
        precio: 1000
    },
    {
        id: "gorra-02",
        titulo: "Gorra 02",
        imagen: "./img/Gorras/02.jpg",
        categoria: {
            nombre: "Gorras",
            id: "Gorras"
        },
        precio: 1000
    },
    //Sudaderos
    {
        id: "sudaderos-01",
        titulo: "Sudaderos 01",
        imagen: "./img/Sudaderos/01.jpg",
        categoria: {
            nombre: "Sudaderos",
            id: "Sudaderos"
        },
        precio: 1000
    },
    {
        id: "sudaderos-02",
        titulo: "Sudaderos 02",
        imagen: "./img/Sudaderos/02.jpg",
        categoria: {
            nombre: "Sudaderos",
            id: "Sudaderos"
        },
        precio: 1000
    },
    //Tenis
    {
        id: "tenis-01",
        titulo: "Tenis 01",
        imagen: "./img/Tenis/01.jpg",
        categoria: {
            nombre: "Tenis",
            id: "Tenis"
        },
        precio: 1000
    },
    {
        id: "tenis-02",
        titulo: "Tenis 02",
        imagen: "./img/Tenis/02.jpg",
        categoria: {
            nombre: "Tenis",
            id: "Tenis"
        },
        precio: 1000
    }
    
];

const contenedorProductos = document.querySelector("#contenedor-productos");

const botonesCategorias = document.querySelectorAll
(".boton-categoria")

const tituloPrincipal = document.querySelector
("#titulo-principal")

let botonesAgregar = document.querySelectorAll
(".producto-agregar")

const numerito = document.querySelector
("#numerito")



function cargarproductos(productosElegidos){

    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("producto")
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" />
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="carrito-producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}">"Agregar</button>
                    </div>
        `

        contenedorProductos.appendChild(div);


})
actualizarBotonesAgregar();
}

cargarproductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) =>{

        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")


        if(e.currentTarget.id !="Todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);

            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)

        cargarproductos(productosBoton);
        }else{
            tituloPrincipal.innerText ="Todos Los Productos";
            cargarproductos(productos);
        }
        
    })
});

function actualizarBotonesAgregar(){
     botonesAgregar = document.querySelectorAll
(".producto-agregar");

botonesAgregar.forEach(boton =>{
    boton.addEventListener("click", agregaralCarrito)
});
}
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito()
}else{
    productosEnCarrito = [];
}

function agregaralCarrito(e){
    const idBoton = e.currentTarget.id;

    const productoAgregado = productos.find(producto => producto.id === idBoton)

if(productosEnCarrito.some(producto => producto.id === idBoton)){
       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
}else{
    productoAgregado.cantidad = 1; 
    productosEnCarrito.push(productoAgregado);
}
actualizarNumerito();
localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



