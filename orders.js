import buildResponse from "./helper.functions.js";
import orderService from "./services/order.service.js";
import orderItemService from "./services/orderItem.service.js";

const BASE_URL = '/api';
const PLACE_ORDER = BASE_URL + '/placeOrder';

export default function (app) {
    app.post(PLACE_ORDER, async (request, response) => {
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
    });
}