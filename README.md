# Класс для удаления параметров из ссылок в товарах

## Описание проблемы

При использовании блока рекомендаций, `функция r46` возвращает разметку товаров в виде строки и в ссылке у каждого товара
имеются параметры, которые необходимо удалять во время отрисовки на странице, но возвращать при переходе на товар. 
> Данный класс помогает реализовать эту логику.

## Описание класса

Для использования необходимо создать экземпляр класса `const productsHandler = new ProductsHandler();`.
Метод`handleProducts` принимает строку, которую возвращает функция `r46` и код блока рекомендаций, а затем возвращает готовый элемент, который остается добавить в нужный контейнер.

## Использование

```
(response) => {
    const productsHandler = new ProductsHandler();
    document.querySelector('#r46reco').append(productsHandler.handleProducts(response.html, 'код-блока-рекомендаций'));
}
```
