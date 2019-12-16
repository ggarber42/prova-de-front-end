let data = [];
fetch('products.JSON') // JSON -> http://www.base.corecommerce.com.br/pesquisa.json?t=
.then(res => res.json()).then(jsonData => {
  data = jsonData;
});
setTimeout(() => {
  data.map(e => {
    e.MediaSmall = "http://d1fgtaqzlcbo2m.cloudfront.net".concat(e.MediaSmall);
  });
  const main = document.querySelector('main');
  const x = document.createElement('div');
  const y = document.createElement('img');
  y.src = data[0].MediaSmall;
  x.id = 'x';
  y.id = 'y';
  x.append(y);
  main.append(x);
}, 100);