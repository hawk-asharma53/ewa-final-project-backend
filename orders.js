import { buildResponse } from "./helper.functions.js";
import orderService from "./services/order.service.js";
import orderItemService from "./services/orderItem.service.js";

const BASE_URL = '/api';
const PLACE_ORDER = BASE_URL + '/placeOrder';
const GET_ORDER_BY_IDS = BASE_URL + '/orderById';
const GET_ORDER_BY_STORE = BASE_URL + '/orderByStore/:storeId';
const GET_ORDER_BY_USER = BASE_URL + '/orderByUser/:userId';
const GET_ONGOING_ORDER = BASE_URL + '/ongoingOrders';
const GET_ONGOING_ORDER_BY_STORE = BASE_URL + '/ongoingOrders/:storeId';
const UPDATE_ORDER_STATUS = BASE_URL + '/updateOrderStatus';
const GET_WEEKLY_REVENUE = BASE_URL + '/weekelyRevenue';
const GET_WEEKLY_REVENUE_BY_STORE = BASE_URL + '/weekelyRevenue/:storeId';

async function addItemsToOrder( orders ) {
    for (let index = 0; index < orders.length; index++) {
        const element = orders[index];
        element.orderItems = await orderItemService.getByOrderId(element.id)
    }
}

export default function (app) {
    app.post(PLACE_ORDER, async (request, response) => {
        try { 
            const order = request.body;
            if ( order == null ) {
                response.status(400).json(buildResponse(null, 'Invalid input')).end()
                return
            }
            const orderItems = request.body.orderItems;
            if ( !Array.isArray(orderItems) || orderItems.length == 0 ) {
                response.status(400).json(buildResponse(null, 'Invalid input')).end()
                return
            }
            var id = await orderService.addOrder(order);
            for (let index = 0; index < orderItems.length; index++) {
                const element = orderItems[index];
                element.orderId = id;
                await orderItemService.addOrderItem(element);
            }
            response.status(200).json(buildResponse(id)).end();
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.post(GET_ORDER_BY_IDS, async (request, response) => {
        try {
            const ids = request.body;
            if ( !Array.isArray(ids) ) {
                response.status(400).json(buildResponse(null, 'Invalid input')).end()
                return
            }
            var orders = await orderService.getByIds(ids);
            await addItemsToOrder(orders);
            response.status(200).json(buildResponse(orders)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_ORDER_BY_STORE, async (request, response) => {
        try {
            const storeId = request.params.storeId;
            if ( isNaN(storeId) ) {
                response.status(400).json(buildResponse(null, 'Invalid store Id')).end()
                return
            }
            var orders = await orderService.getByStore(storeId);
            await addItemsToOrder(orders);
            response.status(200).json(buildResponse(orders)).end();
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_ORDER_BY_USER, async (request, response) => {
        try {
            const userId = request.params.userId;
            if ( isNaN(userId) ) {
                response.status(400).json(buildResponse(null, 'Invalid user Id')).end()
                return
            }
            var orders = await orderService.getByUser(userId);
            await addItemsToOrder(orders);
            response.status(200).json(buildResponse(orders)).end();
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_ONGOING_ORDER, async (request, response) => {
        try {
            var orders = await orderService.getOverallOngoingOrders();
            await addItemsToOrder(orders);
            response.status(200).json(buildResponse(orders)).end();
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_ONGOING_ORDER_BY_STORE, async (request, response) => {
        try {
            const storeId = request.params.storeId;
            if ( isNaN(storeId) ) {
                response.status(400).json(buildResponse(null, 'Invalid store Id')).end()
                return
            }
            var orders = await orderService.getOverallOngoingOrdersByStore( storeId );
            await addItemsToOrder(orders);
            response.status(200).json(buildResponse(orders)).end();
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.post(UPDATE_ORDER_STATUS, async (request, response) => {
        try {
            const orderId = request.body.orderId;
            const status = request.body.status;
            if ( orderId == null && isNaN(orderId) && status == null ) {
                response.status(400).json(buildResponse(null, 'Invalid input')).end()
                return
            }
            var isSuccess = await orderService.updateOrderStatus(orderId, status);
            response.status(200).json(buildResponse(isSuccess)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_WEEKLY_REVENUE, async (request, response) => {
        try {
            var revenue = await orderService.getWeeklyRevenue();
            response.status(200).json(buildResponse(revenue)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

    app.get(GET_WEEKLY_REVENUE_BY_STORE, async (request, response) => {
        try {
            const storeId = request.params.storeId;
            if ( isNaN(storeId) ) {
                response.status(400).json(buildResponse(null, 'Invalid store Id')).end()
                return
            }
            var revenue = await orderService.getWeeklyRevenueByStore(storeId);
            response.status(200).json(buildResponse(revenue)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });
}