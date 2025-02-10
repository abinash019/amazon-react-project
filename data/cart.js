export let cart = JSON.parse(localStorage.getItem('cart'))

if (!cart) {
  cart =
    [{
      productsId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productsId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];

}



function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));

}


export function cartQuantity(productsId) {
  let iteamMatching;
  cart.forEach((iteam) => {

    if (productsId === iteam.productsId) {
      iteamMatching = iteam;
    }
  })
  if (iteamMatching) {
    iteamMatching.quantity += 1

  }
  else {
    cart.push({
      productsId: productsId,
      quantity: 1,
      deliveryOptionId: '1'
    })

  }
  saveToStorage()
}

export function removeItem(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productsId !== productId) {


      newCart.push(cartItem)
    }
  })
  cart = newCart;
  console.log(newCart)




  saveToStorage()

}

export function updateDeliveryOption(productsId, deliveryOptionId) {
  let iteamMatching;
  cart.forEach((item) => {

    if (productsId === item.productsId) {

      iteamMatching = item;
    }
  })
  iteamMatching.deliveryOptionId = deliveryOptionId
  saveToStorage()
  console.log(cart)
}
