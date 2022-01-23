// INICIALIZACION DE CARRITO 
let total = 0; // Inicilizo una variable para calcular el total del carrito
let cart = []; // Inicializo un array de carrito
const productContainer = document.getElementById('product-container'); // OBTENGO EL ELEMENTO DEL CATALOGO
const trolleyContainer = document.getElementById('trolley-container'); //
//const productContainerMain = document.getElementById('product-container-main');
const stockProducts = []; // guardo los productos en una varibale
function recoverStock(){
    let stock = JSON.parse(localStorage.getItem("stock"));
    if(stock){
        stock.forEach(objeto => stockProducts.push(objeto)); // Por cada objeto que tenga el stockguardarmelo en el array 
    }
}

$.getJSON(`products.json`, function (data) { // Obtengo los datos del archiv JSONS
    localStorage.setItem("stock", JSON.stringify(data));
    recoverStock();
    showProducts(data);
    //showProductsMain(data);
});
//showProducts(stockProducts); // Muestro los productos en el html 

// FUNCION PARA MOSTRAR PRODUCTOS
function showProducts(array) {
    for (const product of array) {
        let div = document.createElement('div');
        div.classList.add("product");
        div.innerHTML += `<div class="card">
                            <img src=${product.image} class="card-img-top" alt=""/>
                            <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price}</p>
                            <div class="button-properties">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#showModal" id="button${product.id}" class="btn btn-primary mb-2 px-5 text-uppercase w-100">Comprar ahora</button>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#showModal" id="addProductmore"${product.id}" class="btn btn-outline-primary px-5 text-uppercase">Agregar al carrito</button>
                            </div>
                            </div>
                    </div>`
        productContainer.appendChild(div);
        let button = document.getElementById(`button${product.id}`);
        button.addEventListener(`click`, () => {
            addToCart(product.id);
        })
    }
}
// FUNCION PARA MOSTRAR PRODUCTOS EN EL MAIN
// function showProductsMain(array) {
//     let productSave = array[0];
//     // for (const product of array) {
//     let div = document.createElement('div');
//     div.classList.add("product");
//     div.innerHTML += `<div class="card" style="width: 18rem;">
//                             <img src=${array.image} class="card-img-top" alt=""/>
//                             <div class="card-body">
//                             <h5 class="card-title">${array.name}</h5>
//                             <p class="card-text">${array.price}</p>
//                             <div class="button-properties">
//                             <button type="button" id="button${array.id}" class="btn btn-primary mb-2 px-5 text-uppercase w-100">Comprar ahora</button>
//                             <button type="button" id="addProductmore"${array.id}" class="btn btn-outline-primary px-5 text-uppercase fs-">Agregar al carrito</button>
//                             </div>
//                             </div>
//                     </div>`
//     productContainerMain.appendChild(div);

//     let button = document.getElementById(`button${array.id}`);
//     button.addEventListener(`click`, () => {
//         addToCart(array.id);
//     })
// }
// funcion de agregar al carrito 
function addToCart(id) {
    let addToProduct = stockProducts.find(prod => prod.id == id);
    cart.push(addToProduct);
    let div = document.createElement(`div`);
    div.classList.add('productInCart');
    div.innerHTML = `<p>${addToProduct.nombre}</p>
                        <p>${addToProduct.price}</p>   
                        <button class="button-remove"> <i class="fas fa-backspace"></i></button>`
    trolleyContainer.appendChild(div);
}



/*
// FUNCION PARA REMOVER PRODUCTO DEL CARRITO

function removeProduct(array, product){

    array.splice(product,1)
}
removeProduct(cart,stockProducts[3])

// FUNCION PARA CALCULAR EL TOTAL DEL CARRITO

function calculateTotal(){

    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price 
    }
    console.log(total.toFixed(2))
}
calculateTotal();
*/