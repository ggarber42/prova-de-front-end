module.exports = Array.prototype.addMedia = (data) => {
    return data.map(item => item.MediaSmall = "http://d1fgtaqzlcbo2m.cloudfront.net".concat(item.MediaSmall))
};

module.exports = Array.prototype.montaGrid = (data) => {
    const main = document.querySelector('#middle');
    const listagem = document.createElement("ul");
    listagem.id = "listagem";
    main.append(listagem);
    data.forEach((element, index) => {
        if(index < 9){
            const item = document.createElement("li")
            item.classList.add("product");
            item.id = `product-${index}`;
            item.dataset.stock = randomStock();
            item.innerHTML = `
            <div class="media">
                <img src="${element.MediaSmall}" alt="${element.Name}">
            </div>
            <div class="name">
                <h3>${element.Name}</h3>
            </div>
            <div class="price">${element.PriceDescription}</div>            
            <button onclick="verDetalhes.call(this)">Ver Detalhes</button>
            `
            listagem.append(item);
        
        }
    });
};

function randomStock(){
    return Math.floor(Math.random() * 15);
}