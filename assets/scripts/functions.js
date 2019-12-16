class Carrinho {

    constructor() {
        this.products = [];
        this.total = 0;
        this.quantity = 0;
        this.elementQuantity = document.querySelector(".carrinho strong");
        this.elementResumo = document.querySelector(".resumo-pedido ul");
        this.totalResumo = document.querySelector(".resumo-pedido .total");
    }

    adicionaProduto(productID, productName, productPrice, productQuantity) {
        
        let isRepeated = this.products.some((product) => {
            if(product.productID === productID ){
                product.productQuantity += productQuantity;
                return true;
            } else {
                return false;
            }
        });
        if(!isRepeated){
            this.products.push({
                productID,
                productName,
                productPrice,
                productQuantity
            });
        } 
        this.atualizaQuantidade(productQuantity);
        this.printaQuantidade();
        this.atualizaTotal();
        this.atualizaResumo();
    }

    atualizaTotal(){
        this.total = this.products.reduce((total, product) => {
            return total + product.productPrice * product.productQuantity;
        },0);
    }

    atualizaQuantidade(productQuantity){
        this.quantity += productQuantity;        
    }

    printaQuantidade(){
        this.elementQuantity.textContent = this.quantity + " unidade(s)";
    }

    atualizaResumo(){
        this.elementResumo.innerHTML = "";
        this.products.forEach(product => {
            const elementProduct = document.createElement("li");
            elementProduct.id = product.productID;
            const unity = product.productQuantity > 1 ? "unidades" : "unidade";
            elementProduct.innerHTML = `
            <span><b>
                ${product.productName}
             </span></b>
            <span>
                (${product.productQuantity} ${unity})
            </span>
            <span>
                R$ ${formataPrecoString(product.productPrice)}
            </span>
            <button onclick="removeProdutoCarrinho(this)">
            X
            </button>
            `;
            this.elementResumo.append(elementProduct);
        });
        this.totalResumo.innerHTML =`Total <b>R$ ${formataPrecoString(this.total)}</b>`;
    }

    removeProdutoCarrinho(event){

        const productLi = event.target.parentElement;
        const productID = productLi.id;
        const product = this.products.find(product => product.productID === productID);
        const productQuantity = product.productQuantity;
        const productPrice = product.productPrice;

        this.quantity-= productQuantity;
        this.total -= productPrice;
        this.products = this.products.filter(product => product.productID !== productID);
        this.atualizaResumo();
        this.printaQuantidade();
    }
}


function verDetalhes() {

    const product = this.parentElement;
    const productHTML = product.innerHTML;
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalDetalhe = document.querySelector(".modal.detalhe");
    const raw = document.querySelector(".modal.detalhe .raw");

    raw.innerHTML = productHTML;
    modalOverlay.classList.remove("closed");
    modalOverlay.classList.add("opened");
    modalDetalhe.classList.remove("closed");
    modalDetalhe.classList.remove("opened");

    const productImage = raw.querySelector("img");
    const productName = raw.querySelector(".name h3");
    const productPrice = raw.querySelector(".price");

    modalDetalhe.dataset.id = product.id;
    modalDetalhe.querySelector(".media").appendChild(productImage);
    modalDetalhe.querySelector(".name").appendChild(productName);
    modalDetalhe.querySelector(".price").appendChild(productPrice);
}

function fechaOverlay() {

    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay.classList.remove("opened");
    modalOverlay.classList.add("closed");
    fechaDetalhe();
}

function fechaDetalhe() {

    const modalDetalhe = document.querySelector(".modal.detalhe");
    modalDetalhe.classList.remove("opened");
    modalDetalhe.classList.add("closed");
    modalDetalhe.querySelector(".media").innerHTML = "";
    modalDetalhe.querySelector(".name").innerHTML = "";;
    modalDetalhe.querySelector(".price").innerHTML = "";
    modalDetalhe.querySelector("input").value = "";
    modalDetalhe.querySelectorAll(".btn-buy button ~ *").forEach(node => node.remove());
}

function fechaConfirmacao() {

    const modalConfirmacao = document.querySelector(".modal.confirmacao");
    modalConfirmacao.classList.remove("opened");
    modalConfirmacao.classList.add("closed");
    fechaOverlay();
}

function botaoAdicionaCarrinho() {

    const botaoComprar = this;
    const botaoComprarParent = botaoComprar.parentElement;
    const modalDetalhe = document.querySelector(".modal.detalhe");
    const quantity = modalDetalhe.querySelector(".quantity input").value !== "" ? parseInt(modalDetalhe.querySelector(".quantity input").value) : "";
    const productID = modalDetalhe.dataset.id;
    const selector = `#${productID}`;
    const product = document.querySelector(selector);
    const stock = parseInt(product.dataset.stock);
    const avisoVazio = document.createElement("span");
    const avisoEstoque = document.createElement("span");

    avisoVazio.innerHTML = "<h3 style=\"color:#f2aa24\">Adicione um produto ao carrinho</h3>";
    avisoEstoque.innerHTML = "<h3 style=\"color:red\">Estoque insuficiente</h3>";

    //limpa avisos
    botaoComprarParent.querySelectorAll("button ~ *").forEach(node => node.remove());

    if (typeof (quantity) === "string") {
        botaoComprarParent.appendChild(avisoVazio);
    } else if (quantity <= stock) {
        product.dataset.stock = stock - quantity;
        atualizaCarrinho(productID, product, quantity);
    } else {
        botaoComprarParent.appendChild(avisoEstoque);
    }
}


function atualizaCarrinho(productID, product, quantity) {

    fechaDetalhe();
    const modalConfirmacao = document.querySelector(".modal.confirmacao");
    const isListPrice = product.querySelectorAll(".price .list-price").length;
    let precoText;

    if (isListPrice) {//cuida dos HTML's diferentes dos produtos
        precoText = product.querySelector(".price .list-price span").innerText;
    } else {
        precoText = product.querySelector(".sale-price span").textContent;
    }

    const preco = formataPrecoFloat(precoText);
    const productName = product.querySelector(".name").textContent.trim();

    carrinho.adicionaProduto(product.id, productName, preco, quantity);
    modalConfirmacao.classList.remove("closed");
    modalConfirmacao.classList.add("opened");
}

function formataPrecoFloat(precoText) {
    const precoNum = precoText.split(" ")[1];
    let numArr = precoNum.match(/\d/g);
    const pointPosition = numArr.length - 2;
    numArr.splice(pointPosition, 0, ".");
    const precoTextPoint = numArr.join("");
    const preco = parseFloat(precoTextPoint);
    return preco;

}

function formataPrecoString(precoFloat){
    let precoString = `${precoFloat}`;
    if(precoString.split(".").length > 1){
        precoString = precoString.replace(".",",");
    } else {
        precoString = `${precoString},00`;
    }
    return precoString;
}

function removeProdutoCarrinho(){
    carrinho.removeProdutoCarrinho(event);    
}


function productSearch(event){
    const searchInput = event.target.value;    
    document.querySelectorAll("li.product").forEach(element =>  {        
        const re = new RegExp(searchInput);
        const productName = element.querySelector(".name").textContent.trim().toLowerCase();
         if(! re.test(productName)){
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    });

}

//eventos
document.querySelector(".modal.detalhe .close button").addEventListener("click", fechaOverlay);
document.querySelector(".modal.detalhe .btn-buy button").addEventListener("click", botaoAdicionaCarrinho);
document.querySelector(".modal.confirmacao .btn button").addEventListener("click", fechaConfirmacao);
document.querySelector(".search-filter input").addEventListener("keyup",productSearch);

//Cria carrinho
const carrinho = new Carrinho();