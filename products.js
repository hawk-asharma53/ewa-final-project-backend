import { buildResponse } from "./helper.functions.js";
import productService from "./services/product.service.js";

const BASE_URL = '/api';
const PRODUCTS = BASE_URL + '/product';
const UPDATE_PRODUCT = BASE_URL + '/updateProduct';
const GET_PRODUCTS_BY_IDS = BASE_URL + '/productById';
const GET_PRODUCTS_BY_CATEGORY = BASE_URL + '/productByCategory/:catgoryId';
const GET_SOLD_PRODUCT_COUNT = BASE_URL + '/productCount';
const GET_SOLD_PRODUCT_COUNT_BY_STORE = BASE_URL + '/productCount/:storeId';

export default function (app) {
    app.get(PRODUCTS, async (request, response) => {
        try {
            var products = await productService.getAll();
            response.status(200).json(buildResponse(products)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.post(GET_PRODUCTS_BY_IDS, async (request, response) => {
        try {
            const ids = request.body;
            if ( !Array.isArray(ids) ) {
                response.status(400).json(buildResponse(null, 'Invalid input')).end()
                return
            }
            var products = await productService.getByIds(ids);
            response.status(200).json(buildResponse(products)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_PRODUCTS_BY_CATEGORY, async (request, response) => {
        try {
            const catgoryId = request.params.catgoryId;
            if ( isNaN(catgoryId) ) {
                response.status(400).json(buildResponse(null, 'Invalid category Id')).end()
                return
            }
            var products = await productService.getByCategory(catgoryId);
            response.status(200).json(buildResponse(products)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.post(PRODUCTS, async (request, response) => {
        try {
            const product = request.body;
            if ( product == null ) {
                response.status(400).json(buildResponse(null, 'Invalid input')).end()
                return
            }
            var id = await productService.createProduct(product);
            response.status(200).json(buildResponse(id)).end();
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.post(UPDATE_PRODUCT, async (request, response) => {
        try {
            const product = request.body;
            if ( product == null ) {
                response.status(400).json(buildResponse(null, 'Invalid input')).end()
                return
            }
            await productService.updateProduct(product);
            response.status(200).json(buildResponse(true)).end();
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_SOLD_PRODUCT_COUNT, async (request, response) => {
        try {
            var productCount = await productService.getProductCount();
            response.status(200).json(buildResponse(productCount)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_SOLD_PRODUCT_COUNT_BY_STORE, async (request, response) => {
        try {
            const storeId = request.params.storeId;
            if ( isNaN(storeId) ) {
                response.status(400).json(buildResponse(null, 'Invalid store Id')).end()
                return
            }
            var productCount = await productService.getProductCountByStore(storeId);
            response.status(200).json(buildResponse(productCount)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });
}