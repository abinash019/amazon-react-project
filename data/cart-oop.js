function Cart(localStorageKey) {

  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey))

      if (!this.cartItems) {
        this.cartItems =
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
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));

    },

    cartQuantity(productsId) {
      let iteamMatching;
      this.cartItems.forEach((iteam) => {

        if (productsId === iteam.productsId) {
          iteamMatching = iteam;
        }
      })
      if (iteamMatching) {
        iteamMatching.quantity += 1

      }
      else {
        this.cartItems.push({
          productsId: productsId,
          quantity: 1,
          deliveryOptionId: '1'
        })

      }
      this.saveToStorage()
    },

    removeItem(productId) {
      let newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productsId !== productId) {


          newCart.push(cartItem)
        }
      })
      this.cartItems = newCart;
      this.saveToStorage()

    },

    updateDeliveryOption(productsId, deliveryOptionId) {
      let iteamMatching;
      this.cartItems.forEach((item) => {

        if (productsId === item.productsId) {

          iteamMatching = item;
        }
      })
      iteamMatching.deliveryOptionId = deliveryOptionId
      this.saveToStorage()
    }
  }
  return cart

}


const cart = Cart('cart-oo')
cart.loadFromStorage()
console.log(cart)








