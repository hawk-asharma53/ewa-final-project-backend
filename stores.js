import {buildResponse} from "./helper.functions.js";
import storeService from "./services/store.service.js";

const BASE_URL = '/api';
const GET_ALL_STORES = BASE_URL + '/store';
const GET_STORES_BY_IDS = BASE_URL + '/storesById';

export default function (app) {
    app.get(GET_ALL_STORES, async (request, response) => {
        var services = await storeService.getAll();
        response.status(200).json(buildResponse(services)).end()
    });

    app.post(GET_STORES_BY_IDS, async (request, response) => {
        const ids = request.body;
        if ( !Array.isArray(ids) ) {
            response.status(400).json(buildResponse(null, 'Invalid input')).end()
            return
        }
        var services = await storeService.getByIds(ids);
        response.status(200).json(buildResponse(services)).end()
    });
}