export default function createChosenProductsArr(products) {
  return products.map(product => ({
    is_available: true,
    sku: `${product}`,
    type: 'regular',
  }))
}
