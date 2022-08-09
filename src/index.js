import './styles/index.scss';
import {productSku} from './scripts/utils/constants';
import api from './scripts/Api';

// eslint-disable-next-line
if (typeof r46 === 'function') {
  // eslint-disable-next-line
  r46('recommend', 'd8dba85eb79c4173d9e81cc474b87ad8', {
    items: productSku,
  }, (response) => {
    let totalPrice = 0;

    document.querySelector('#r46reco').innerHTML = response.html;

    const prices = Array.from(document.querySelector('#r46reco').querySelectorAll('.product__current-price'));

    prices.forEach((price) => {
      const priceNum = +price.textContent.replace(/\s+/g, '').replace(/₸/gi, '');

      totalPrice += priceNum;
    });

    document.querySelector('.main__total-sum').textContent = `${totalPrice.toLocaleString()} ₸`;
  }, () => {
  },);
}

const button = document.querySelector('.main__cart-button');

button.addEventListener('click', () => {
  api.sendProductsToCart()
});
