let guitarras = [];

fetch("productos.json")
    .then(response => response.json())
    .then(data => {
        guitarras = data;
        cargarGuitarras(guitarras);
    })

const contenedorGtr = document.querySelector("#contenedor-gtr");
const btnCategoria = document.querySelectorAll(".btn-categoria");
const tituloCategorias = document.querySelector("#titulo-Categorias");
let botonAgregar = document.querySelectorAll(".card-comprar");

function cargarGuitarras(gtrElegidas){

    contenedorGtr.innerHTML = "";

    gtrElegidas.forEach(guitarra => {

        const div = document.createElement("div");
        div.classList.add("card-producto");
        div.innerHTML = `
            <img class="card-foto" src="${guitarra.imagen}" alt="imagen">
            <div class="detalle">
                <h3 class="card-titulo">${guitarra.marca}</h3>
                <h4 class="card-modelo">${guitarra.modelo}</h4>
                <p class="card-precio" >$${guitarra.precio}</p>
                <button class="card-comprar" id="${guitarra.id}">Comprar</button>
            </div> `;
        contenedorGtr.append(div);
    });
    actualizarBotonesComprar();
    console.log(botonAgregar);
}



btnCategoria.forEach(boton => {
    boton.addEventListener("click", () => {

        if(boton.id != "todas"){
            const gtrCategorias = guitarras.find(guitarra => guitarra.tipo == boton.id);
            tituloCategorias.innerHTML = gtrCategorias.categoria;
            const botonCategoria = guitarras.filter(guitarra => guitarra.tipo === boton.id);
            cargarGuitarras(botonCategoria);
        }else{
            cargarGuitarras(guitarras);
            tituloCategorias.innerHTML = "Todas las guitarras"; 
        }
        

    })  
});

function actualizarBotonesComprar(){
    botonAgregar = document.querySelectorAll(".card-comprar");
    botonAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let gtrEnCarrito ;

const gtrEnCarritoLocalStorage = localStorage.getItem("guitarrasEnCarrito");

if(gtrEnCarritoLocalStorage){
    gtrEnCarrito = JSON.parse(gtrEnCarritoLocalStorage);
}else{
    gtrEnCarrito = [];
}

function agregarAlCarrito(evt){
    
    Toastify({
        text: "¡Guitarra agregada!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:"hsl(0, 0%, 25%)",
          padding: "2rem",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = evt.currentTarget.id;
    const gtrAgregada = guitarras.find(guitarra => guitarra.id === idBoton)
    
    if (gtrEnCarrito.some(guitarra => guitarra.id === idBoton)){
        const index = gtrEnCarrito.findIndex(guitarra => guitarra.id === idBoton);
        gtrEnCarrito[index].cantidad +=1
    }else {
        gtrAgregada.cantidad = 1;
        gtrEnCarrito.push(gtrAgregada);
    }
    
   localStorage.setItem("guitarrasEnCarrito", JSON.stringify(gtrEnCarrito));
   
}






               