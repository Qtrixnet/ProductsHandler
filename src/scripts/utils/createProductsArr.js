export default function createProductsArr(products) {
  return products.map(product => ({
    is_available: true,
    quantity: 1,
    sku: `${product}`,
    type: 'regular',
  }))
}
