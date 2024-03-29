let gtrEnCarrito = localStorage.getItem("guitarrasEnCarrito");
gtrEnCarrito = JSON.parse(gtrEnCarrito);


let contCarritoVacio = document.querySelector("#carrito-vacio");
let contCarritoProductos = document.querySelector("#carrito-productos");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
let contComprar = document.querySelector("#contenedor-comprar");
let contTotal = document.querySelector("#total");
let btnComprarAhora = document.querySelector("#boton-comprar-ahora");
let contCompraRealizada = document.querySelector("#compra-relizada");



function cargarProductosAlCarrito(){
    if (gtrEnCarrito && gtrEnCarrito.length > 0){

        contCarritoVacio.classList.add("oculto");
        contComprar.classList.remove("oculto");
        
        
        contCarritoProductos.innerHTML = "";
         
        gtrEnCarrito.forEach(gtr=> {
        
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                    <img src="${gtr.imagen}" width="100px" alt="${gtr.marca}">
                    <div class="carrito-producto-titulo">
                        <small>Guitarra</small>
                        <h3>${gtr.marca + gtr.modelo}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${gtr.cantidad}</p>
                    </div>
                        <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>$${gtr.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$${gtr.precio * gtr.cantidad}</p>
                    </div>
                    <button class="carrito-producto-eliminar" id="${gtr.id}"><img src="./img/trash-bin-icon-vector-illustration.jpg"height="35px" alt="img"></button>
                `;
                contCarritoProductos.append(div);
                  
            });
    } else{
            
            contCarritoVacio.classList.remove("oculto");
            contComprar.classList.add("oculto");
            contCarritoProductos.classList.add("oculto");
             
    }
    actualizarBotonesEliminar(); 
       
}
cargarProductosAlCarrito();

actualizarTotal()


function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton =>{
    boton.addEventListener("click", eliminarDelCarrito);
    });
}


function eliminarDelCarrito(evt){
    const idBoton = evt.currentTarget.id;
    const index = gtrEnCarrito.findIndex(guitarra => guitarra.id === idBoton);
    gtrEnCarrito.splice(index, 1);
    cargarProductosAlCarrito();
    actualizarTotal()
    
    localStorage.setItem("guitarrasEnCarrito", JSON.stringify(gtrEnCarrito));
}

function actualizarTotal(){
    const totalAPagar = gtrEnCarrito.reduce((acc, guitarra) => acc + (guitarra.precio * guitarra.cantidad), 0);
    console.log(totalAPagar);
    total.innerText = `$ ${totalAPagar}`;
}

btnComprarAhora.addEventListener("click", comprarAhora);

function comprarAhora(){        
        
    gtrEnCarrito.length = 0;
    localStorage.setItem("guitarrasEnCarrito", JSON.stringify(gtrEnCarrito));
    
    contCarritoVacio.classList.add("oculto");
    contCarritoProductos.classList.add("oculto"); 
    contComprar.classList.add("oculto");
    contCompraRealizada.classList.remove("oculto");

}

