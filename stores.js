import {buildResponse, calcDistance} from "./helper.functions.js";
import storeService from "./services/store.service.js";

const BASE_URL = '/api';
const GET_ALL_STORES = BASE_URL + '/store';
const GET_STORES_BY_IDS = BASE_URL + '/storesById';
const GET_STORES_BY_DISTANCE = BASE_URL + '/storeByDistance';

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
        var stores = await storeService.getByIds(ids);
        response.status(200).json(buildResponse(stores)).end()
    });

    app.post(GET_STORES_BY_DISTANCE, async (request, response) => {
        const lat = request.body.lat;
        const lng = request.body.lng;
        if ( lat == null || lng == null ) {
            response.status(400).json(buildResponse(null, 'Invalid input')).end()
            return
        }
        var stores = await storeService.getAll();
        for (let index = 0; index < stores.length; index++) {
            const element = stores[index];
            element.distance = await calcDistance( { lat, lng }, { lat : element.lat, lng : element.lng } )
        }
        stores.sort( (a,b) => a.distance.value - b.distance.value)
        response.status(200).json(buildResponse(stores)).end()
    });
}