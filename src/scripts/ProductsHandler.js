/* eslint-disable */

class ProductsHandler {
  constructor() {
    this._code = null;
  }

  _parseProductsTemplate(string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(string, 'text/html');

    return doc.querySelector('.products');
  }

  handleProducts(template) {
    const products = this._parseProductsTemplate(template);

    Array.from(products.children).forEach((link) => {
      link.href = link.href.split('?')[0];
      this._addClickHandler(link);
    });

    return products;
  }

  _addClickHandler(link) {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      const target = evt.currentTarget;
      const {sku} = target.dataset;

      window.location.assign(`${target.href}?recommended_by=dynamic&recommended_code=${this._code}#sku=${sku}`);
    });
  }
}

const productsHandler = new ProductsHandler();

export default productsHandler;
