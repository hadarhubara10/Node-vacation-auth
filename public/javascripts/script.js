let productLength = '';
let cartLength = '';

fetch('https://shopping-cart-api-hubara.herokuapp.com/product')
  .then((data) => data.json())
  .then((res) => (productLength = res.products.length))
  .then(() => console.log(productLength))
  .then(() => {
    idProduct.innerHTML += productLength + ' products';
  });

fetch('https://shopping-cart-api-hubara.herokuapp.com/product/cart')
  .then((data) => data.json())
  .then((res) => (cartLength = res.products.length))
  .then(() => console.log(cartLength))
  .then(() => {
    idCart.innerHTML += cartLength + ' cart';
  });
