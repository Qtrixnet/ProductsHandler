/* eslint-disable */

class ProductsHandler {
  _parseProductsTemplate(string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(string, 'text/html');
    return doc.querySelector('.products');
  }

  handleProducts(template, code) {
    const products = this._parseProductsTemplate(template);
    Array.from(products.children).forEach((link) => {
      link.href = link.href.split('?')[0];
      this._addClickHandler(link, code);
    });
    return products;
  }

  _addClickHandler(link, code) {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      const target = evt.currentTarget;
      const {sku} = target.dataset;
      window.location.assign(`${target.href}?recommended_by=dynamic&recommended_code=${code}#sku=${sku}`);
    });
  }
}

const productsHandler = new ProductsHandler();

export default productsHandler;
