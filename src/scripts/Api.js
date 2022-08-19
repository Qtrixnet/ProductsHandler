import {
  AUTH_URL, cityId, MERGE_CART_URL, password, phone, productSku, promoCode
} from './utils/constants';
import createProductsArr from "./utils/createProductsArr";
import createChosenProductsArr from "./utils/createChosenProductsArr";

class Api {
  constructor() {
    this._button = document.querySelector('.main__cart-button');
  }

  _auth() {
    return fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        phone,
        password
      }),
    })
  }

  _mergeCart(token) {
    return fetch(`${MERGE_CART_URL}?city_id=${cityId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        city_id: `${cityId}`,
        marketing_units: {
          promo_code: promoCode,
        },
        new_products_count: 0,
        product_count: productSku.length,
        products: createProductsArr(productSku),
        promotions: [
          {
            added_at: `${new Date().toISOString()}`,
            chosen_products: createChosenProductsArr(productSku),
            id: 'string',
            promo_id: promoCode,
            quantity: 0,
            rule_id: promoCode,
          },
        ],
      }),
    })
  }

  sendProductsToCart() {
    this._button.textContent = 'Добавляем...';

    this._auth()
      .then(res => res.json())
      .then(res => {
        if(res.access_token) {
          this._mergeCart(res.access_token)
            .then(res => res.json())
            .then(res => console.log(res))
            .finally(() => this._button.textContent = 'Добавить в корзину')
        }
      })
  }
}

const api = new Api();

export default api;
