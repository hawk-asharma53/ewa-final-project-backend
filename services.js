import { buildResponse } from "./helper.functions.js";
import serviceService from "./services/service.service.js";

const BASE_URL = '/api';
const GET_ALL_SERVICES = BASE_URL + '/service';
const GET_SERVICES_BY_IDS = BASE_URL + '/serviceById';
const GET_SERVICES_BY_CATEGORY = BASE_URL + '/serviceByCategory/:catgoryId';
const GET_SOLD_SERVICE_COUNT = BASE_URL + '/serviceCount';
const GET_SOLD_SERVICE_COUNT_BY_STORE = BASE_URL + '/serviceCount/:storeId';

export default function (app) {
    app.get(GET_ALL_SERVICES, async (request, response) => {
        var services = await serviceService.getAll();
        response.status(200).json(buildResponse(services)).end()
    });

    app.post(GET_SERVICES_BY_IDS, async (request, response) => {
        const ids = request.body;
        if ( !Array.isArray(ids) ) {
            response.status(400).json(buildResponse(null, 'Invalid input')).end()
            return
        }
        var services = await serviceService.getByIds(ids);
        response.status(200).json(buildResponse(services)).end()
    });

    app.get(GET_SERVICES_BY_CATEGORY, async (request, response) => {
        const catgoryId = request.params.catgoryId;
        if ( isNaN(catgoryId) ) {
            response.status(400).json(buildResponse(null, 'Invalid category Id')).end()
            return
        }
        var services = await serviceService.getByCategory(catgoryId);
        response.status(200).json(buildResponse(services)).end()
    });

    app.get(GET_SOLD_SERVICE_COUNT, async (request, response) => {
        var serviceCount = await serviceService.getServiceCount();
        response.status(200).json(buildResponse(serviceCount)).end()
    });

    app.get(GET_SOLD_SERVICE_COUNT_BY_STORE, async (request, response) => {
        const storeId = request.params.storeId;
        if ( isNaN(storeId) ) {
            response.status(400).json(buildResponse(null, 'Invalid store Id')).end()
            return
        }
        var serviceCount = await serviceService.getServiceCountByStore(storeId);
        response.status(200).json(buildResponse(serviceCount)).end()
    });
}