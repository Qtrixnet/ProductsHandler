import './styles/base.scss';
import './styles/product.scss';
import productsHandler from './scripts/ProductsHandler';

/* eslint-disable */

if (typeof r46 === 'function') {
  r46('recommend', 'd8dba85eb79c4173d9e81cc474b87ad8', {
    items: [212497, 233858, 245237, 170386],
  }, (response) => {
   document.querySelector('#r46reco').append(productsHandler.handleProducts(response.html));
  }, () => {
  });
}
