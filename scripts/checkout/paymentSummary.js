import { getProduct, products } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { moneycalc } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {

    const productId = cartItem.productsId;

    const product = getProduct(productId)
    productPriceCents += product.priceCents * cartItem.quantity
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents

  })
  console.log(productPriceCents)
  console.log(shippingPriceCents)
  let beforeTaxTotalPrice = productPriceCents + shippingPriceCents
  console.log(beforeTaxTotalPrice)
  let taxPrice = beforeTaxTotalPrice * 0.1
  console.log(taxPrice)
  let totalPriceWithTax = beforeTaxTotalPrice + taxPrice
  console.log(totalPriceWithTax)

  let paymentInnerHTML = `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${moneycalc(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${moneycalc(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${moneycalc(beforeTaxTotalPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${moneycalc(taxPrice)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${moneycalc(totalPriceWithTax)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `
  document.querySelector('.js-payment-summary').innerHTML = paymentInnerHTML
}

