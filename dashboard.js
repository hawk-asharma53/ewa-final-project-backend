import { buildResponse } from './helper.functions.js';
import addressService from './services/address.service.js';
import orderService from './services/order.service.js';
import moment from 'moment';

const BASE_URL = '/api';
const DASHBOARD = BASE_URL + '/dashboard';

export default function (app) {
  app.get(DASHBOARD, async (request, response) => {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('week');
    var weekEnd = currentDate.clone().endOf('week');

    var overallOngoingOrders = await orderService.getOverallOngoingOrders();
    var ongoingOrdersInCurrentWeek =
      await orderService.getOngoingOrdersForDates(
        weekStart.format('YYYY-MM-DD'),
        weekEnd.format('YYYY-MM-DD'),
      );

    var data = {
      numbers: {
        ongoingOrders: {
            overall : overallOngoingOrders.length,
            thisWeek : ongoingOrdersInCurrentWeek.length,
        }
      },
    };

    response
      .status(200)
      .json(buildResponse({ ...data }))
      .end();
  });
}
