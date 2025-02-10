import { cart, removeItem, updateDeliveryOption } from "../data/cart.js";
import { products } from '../data/products.js';
import { moneycalc } from './utils/money.js';
import { deliveryOption } from '../data/deliveryOption.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

let itemHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productsId;
  let itemMatching = '';
  products.forEach((products) => {

    if (products.id === productId) {
      itemMatching = products;
    }

  })

  const deliveryOptionId = cartItem.deliveryOptionId

  let deliveryOptions

  deliveryOption.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOptions = option;
    }

  })


  const today = dayjs()
  const deliveryDate = today.add(deliveryOptions.deliveryDay,
    'days')
  let dateString = deliveryDate.format('dddd, MMMM D')




  itemHTML +=

    `<div class="cart-item-container js-cart-item-container-${itemMatching.id}">
    <div class="delivery-date">
      Delivery date: ${dateString} 
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${itemMatching.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${itemMatching.name}
        </div>
        <div class="product-price">
          $${moneycalc(itemMatching.priceCents)}
          
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span >
          </span >
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-quantity-link"
          data-product-id= ${itemMatching.id}>
            Delete
          </span>
        </div >
      </div >

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      
      ${deliveryOptionHTML(itemMatching, cartItem)}
      
      
    </div>
    </div >
  </div > `




})





function deliveryOptionHTML(itemMatching, cartItem) {
  let html = '';
  deliveryOption.forEach((deliveryOptions) => {
    const today = dayjs()
    const deliveryDate = today.add(deliveryOptions.deliveryDay,
      'days'
    )
    const dateString = deliveryDate.format('dddd, MMMM D')

    const priceString = deliveryOptions.priceCents === 0 ? 'Free' : `$${moneycalc(deliveryOptions.priceCents)}`;

    const isChecked = deliveryOptions.id === cartItem.deleveryOptionId
    html +=
      `<div class="delivery-option js-delivery-option"
      data-products-id = "${itemMatching.id}"
      data-delivery-option-id = "${deliveryOptions.id}">
      <input type="radio"
      ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${itemMatching.id}">
        <div>
          <div class="delivery-option-date">
          ${dateString}          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
        </div>`


  })
  return html;
}


document.querySelector('.js-order-summary').innerHTML = itemHTML

document.querySelectorAll('.js-delete-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeItem(productId)

      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.remove()


    })
  })


document.querySelectorAll('.js-delivery-option').
  forEach((element) => {
    element.addEventListener('click', () => {
      const { productsId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productsId, deliveryOptionId)

    })
  })

