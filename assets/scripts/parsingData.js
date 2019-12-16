let data = [];
fetch('products.JSON') // JSON -> http://www.base.corecommerce.com.br/pesquisa.json?t=
.then(res => res.json()).then(jsonData => {
  console.log(jsonData);
  data = jsonData;
});
data.map(e => {
  e.MediaSmall = "http://d1fgtaqzlcbo2m.cloudfront.net/".concat(e.MediaSmall);
});