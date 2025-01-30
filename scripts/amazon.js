import { cart, cartQuantity } from '../data/cart.js';
import { products, loadProduct } from '../data/products.js';



loadProduct(rederAllProduct)

function rederAllProduct() {

  let productHTML = '';

  products.forEach((products) => {
    productHTML += `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${products.image}">
      </div >

      <div class="product-name limit-text-to-2-lines">
      ${products.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${products.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
        ${products.rating.count}
        </div>
      </div>

      <div class="product-price">
      $${(products.priceCents) /
      100
      } 

      </div >

      <div class="product-quantity-container">
        <select id="product-quantity-container">
          <option id="product-quantity-containers" selected value="1">1</option>
          <option id="product-quantity-containers" value="2">2</option>
          <option id="product-quantity-containers" value="3">3</option>
          <option id="product-quantity-containers" value="4">4</option>
          <option id="product-quantity-containers" value="5">5</option>
          <option id="product-quantity-containers" value="6">6</option>
          <option id="product-quantity-containers" value="7">7</option>
          <option id="product-quantity-containers" value="8">8</option>
          <option id="product-quantity-containers" value="9">9</option>
          <option id="product-quantity-containers" value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button  js-added-to-cart-button button-primary"
      data-products-id ="${products.id}"
        >
        Add to Cart
      </button >
    </div > `

  }
  )
  document.querySelector('.products-grid')
    .innerHTML = productHTML;

  function updateCart() {
    // let productQuantityNumber = 0;
    // const productQuantity = document.getElementById('product-quantity-containers')
    //   .addEventListener('change', () => {
    //     productQuantityNumber = Number(productQuantity.value)
    //     console.log(productQuantityNumber)
    //     document.querySelector('.cart-quantity').innerHTML = productQuantityNumber



    //   })
    let productQuantityNumber = 0;
    cart.forEach((iteam) => {

      productQuantityNumber += iteam.quantity
    })
    document.querySelector('.cart-quantity').innerHTML = productQuantityNumber


  }


  document.querySelectorAll('.js-added-to-cart-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productsId = button.dataset.productsId;
        console.log(cart)
        cartQuantity(productsId);
        updateCart();
      })
    })

}

