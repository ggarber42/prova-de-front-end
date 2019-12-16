let modulosArray = require('./modulos').default;

let data = [];
fetch('products.JSON') // JSON -> http://www.base.corecommerce.com.br/pesquisa.json?t=
.then(res => res.json()).then(jsonData => {
  data = jsonData;
});

setTimeout(() => {

  data.addMedia(data)
        .montaGrid(data);
}, 100);