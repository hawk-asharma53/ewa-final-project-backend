import buildResponse from "./helper.functions.js";
import addressService from "./services/address.service.js";

const BASE_URL = '/api';
const ADDRESS = BASE_URL + '/address';
const GET_ADDRESS_BY_IDS = BASE_URL + '/addressById';
const GET_ADDRESS_BY_USER = BASE_URL + '/addressByUser/:userId';

export default function (app) {

    app.post(ADDRESS, async (request, response) => {
        const address = request.body;
        var id = await addressService.addAddress(address)
        response.status(200).json(buildResponse(id)).end()
    });

    app.post(GET_ADDRESS_BY_IDS, async (request, response) => {
        const ids = request.body;
        if ( !Array.isArray(ids) ) {
            response.status(400).json(buildResponse(null, 'Invalid input')).end()
            return
        }
        var address = await addressService.getByIds(ids);
        response.status(200).json(buildResponse(address)).end()
    });

    app.get(GET_ADDRESS_BY_USER, async (request, response) => {
        const userId = request.params.userId;
        if ( isNaN(userId) ) {
            response.status(400).json(buildResponse(null, 'Invalid user id')).end()
            return
        }
        var address = await addressService.getByUser(userId);
        response.status(200).json(buildResponse(address)).end()
    });
}