import {
  password, phone, productSku, promoCode
} from './utils/constants';
import createProductsArr from "./utils/createProductsArr";
import createChosenProductsArr from "./utils/createChosenProductsArr";

class Api {
  constructor() {
    this._button = document.querySelector('.main__cart-button');
    this._magentoId = null;
    this._cityId = null;
    this._token = null;
  }

  //* Проверка статуса запроса
  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: Ошибка ${res.status}${res.statusText && `- ${res.statusText}`}`)
    }
  }

  _getOldIdFromStorage() {
    const magentoData = localStorage.getItem('cityMagentoId');
    if (magentoData) {
      this._magentoId = JSON.parse(magentoData).data;
    } else {
      this._magentoId = '10';
    }
  }

  _getNewCityId(cities) {
    const foundCity = cities.find(city => city?.city_magento_id === this._magentoId);
    this._cityId = foundCity?.city_id
  }

  _auth() {
    return fetch('https://tapi.technodom.kz/sso/api/v1/auth/signin/phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        phone,
        password
      }),
    })
      .then((res) => this._requestResult(res));
  }

  _getCityId() {
    this._button.textContent = 'Добавляем...';
    return fetch('https://api.technodom.kz/config-discovery/api/v1/cities')
      .then((res) => this._requestResult(res));
  }

  _mergeCart() {
    return fetch(`https://tapi.technodom.kz/cart/api/v2/carts?city_id=${this._cityId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this._token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        city_id: `${this._cityId}`,
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
      .then((res) => this._requestResult(res));
  }

  sendProductsToCart() {
    this._getOldIdFromStorage();

    this._getCityId()
      .then(res => this._getNewCityId(res.cities))
      .then(() => this._auth())
      .then(res => this._token = res?.access_token)
      .then(() => this._mergeCart())
      .then(res => console.log(res))
      .catch(error => console.log(error))
      .finally(() => this._button.textContent = 'Добавить в корзину');
  }
}

const api = new Api();

export default api;
