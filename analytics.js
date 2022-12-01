import { data1, data2, data3, data4 } from "./data/data.js";
import {buildResponse, calcDistance} from "./helper.functions.js";
import analyticsService from "./services/analytics.service.js";
import productService from "./services/product.service.js";
import serviceService from "./services/service.service.js";
import storeService from "./services/store.service.js";


const BASE_URL = '/api';
const GET_MOST_SOLD_PRODUCTS = BASE_URL + '/mostSoldProducts';
const GET_MOST_SOLD_SERVICES = BASE_URL + '/mostSoldServices';
const GET_POPULAR_IN_STORE= BASE_URL + '/popularNearYou';
const GET_BOUGHT_NEAR_YOU = BASE_URL + '/boughtNearYou/:zipcode';

export default function (app) {
    app.get(GET_MOST_SOLD_PRODUCTS, async (request, response) => {
        try {
            // var mostSoldProducts = await analyticsService.getMostSoldProducts();
            // var ids = await mostSoldProducts.map(item => item._id );
            // var products = await productService.getByIds(ids);
            setTimeout( () => {
                response.status(200).json(buildResponse(data1)).end()
            }, 1000 )
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_MOST_SOLD_SERVICES, async (request, response) => {
        try {
            // var mostSoldServices = await analyticsService.getMostSoldServices();
            // var ids = await mostSoldServices.map(item => item._id );
            // var services = await serviceService.getByIds(ids);
            setTimeout( () => {
                response.status(200).json(buildResponse(data2)).end()
            }, 1000 )
            // response.status(200).json(buildResponse(data2)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.post(GET_POPULAR_IN_STORE, async (request, response) => {
        try {
            const lat = request.body.lat;
            const lng = request.body.lng;
            if ( lat == null || lng == null ) {
                response.status(400).json(buildResponse(null, 'Invalid input')).end()
                return
            }
            // var stores = await storeService.getAll();
            // for (let index = 0; index < stores.length; index++) {
            //     const element = stores[index];
            //     element.distance = await calcDistance( { lat, lng }, { lat : element.lat, lng : element.lng } )
            // }
            // stores.sort( (a,b) => a.distance.value - b.distance.value);
            // var popularProducts = await analyticsService.getPopularInStore( stores[0].id );
            // var ids = await popularProducts.map(item => item._id );
            // var products = await productService.getByIds(ids);
            setTimeout( () => {
                response.status(200).json(buildResponse(data3)).end()
            }, 1000 )
            // response.status(200).json(buildResponse(data3)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_BOUGHT_NEAR_YOU, async (request, response) => {
        try {
            const zipcode = request.params.zipcode;
            if ( isNaN(zipcode) ) {
                response.status(400).json(buildResponse(null, 'Invalid zipcode Id')).end()
                return
            }
            // var popularProducts = await analyticsService.getBoughtInZipcode( zipcode );
            // if (popularProducts.length == 0) {
            //     response.status(200).json(buildResponse([])).end()
            //     return
            // }
            // var ids = await popularProducts.map(item => item._id );
            // console.log(ids)
            // var products = await productService.getByIds(ids);
            setTimeout( () => {
                response.status(200).json(buildResponse(data4)).end()
            }, 1000 )
            // response.status(200).json(buildResponse(data4)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });
}