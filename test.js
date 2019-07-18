const jsonData = fetch('products.JSON')
    .then(res => res.json())
    .then(data => console.log(data));
