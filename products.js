import productService from "./services/product.service.js";

const BASE_URL = '/api';
const GET_ALL_PRODUCTS = BASE_URL + '/product';

export default function (app) {
    app.get(GET_ALL_PRODUCTS, async (request, response) => {
        var products = await productService.getAll();
        response.status(200).json(products).end()
    });
}