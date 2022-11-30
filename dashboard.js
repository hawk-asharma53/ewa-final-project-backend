import { buildResponse } from './helper.functions.js';
import serviceService from './services/service.service.js';
import orderService from './services/order.service.js';
import moment from 'moment';
import productService from './services/product.service.js';

const BASE_URL = '/api';
const DASHBOARD = BASE_URL + '/dashboard';
const DASHBOARD_BY_STORE = BASE_URL + '/dashboard/:storeId';
const SEARCH = BASE_URL + '/searchItem';

export default function (app) {
  app.get(DASHBOARD, async (request, response) => {
    try {
      var currentDate = moment();
      var weekStart = currentDate.clone().startOf('week');
      var weekEnd = currentDate.clone().endOf('week');
  
      var overallOngoingOrders = await orderService.getOverallOngoingOrders();
      var ongoingOrdersInCurrentWeek =
        await orderService.getOngoingOrdersForDates(
          weekStart.format('YYYY-MM-DD'),
          weekEnd.format('YYYY-MM-DD'),
        );
  
      var thisWeekRevenue = await orderService.getTotalRevenueForDate(weekStart.format('YYYY-MM-DD'), weekEnd.format('YYYY-MM-DD'));
      var lastWeekRevenue = await orderService.getTotalRevenueForDate(weekStart.subtract(7,'d').format('YYYY-MM-DD'), weekEnd.subtract(7,'d').format('YYYY-MM-DD'));
  
      var products = await productService.getAll();
      var services = await serviceService.getAll();
  
      var data = {
        numbers: {
          ongoingOrders: {
              overall : overallOngoingOrders.length,
              thisWeek : ongoingOrdersInCurrentWeek.length,
          },
          revenue : {
            thisWeek : parseFloat( thisWeekRevenue[0]["sum(total)"] ),
            lastWeel : parseFloat( lastWeekRevenue[0]["sum(total)"] )
          },
          productCount : products.length,
          serviceCount : services.length
        },
      };
  
      response
        .status(200)
        .json(buildResponse({ ...data }))
        .end();
    } catch(error) {
      response.status(500).json(buildResponse(null, error)).end()
    }
  });

  app.get(DASHBOARD_BY_STORE, async (request, response) => {
    try {
      const storeId = request.params.storeId;
      if ( isNaN(storeId) ) {
          response.status(400).json(buildResponse(null, 'Invalid store id')).end()
          return
      }
      var currentDate = moment();
      var weekStart = currentDate.clone().startOf('week');
      var weekEnd = currentDate.clone().endOf('week');
  
      var overallOngoingOrders = await orderService.getOverallOngoingOrdersByStore(storeId);
      var ongoingOrdersInCurrentWeek =
        await orderService.getOngoingOrdersForDatesAndStore(
          weekStart.format('YYYY-MM-DD'),
          weekEnd.format('YYYY-MM-DD'),
          storeId
        );
  
      var thisWeekRevenue = await orderService.getTotalRevenueForDateAndStore(weekStart.format('YYYY-MM-DD'), weekEnd.format('YYYY-MM-DD'), storeId);
      var lastWeekRevenue = await orderService.getTotalRevenueForDateAndStore(weekStart.subtract(7,'d').format('YYYY-MM-DD'), weekEnd.subtract(7,'d').format('YYYY-MM-DD'), storeId);
  
      var products = await productService.getAll();
      var services = await serviceService.getAll();
  
      var data = {
        numbers: {
          ongoingOrders: {
              overall : overallOngoingOrders.length,
              thisWeek : ongoingOrdersInCurrentWeek.length,
          },
          revenue : {
            thisWeek : parseFloat( thisWeekRevenue[0]["sum(total)"] ),
            lastWeel : parseFloat( lastWeekRevenue[0]["sum(total)"] )
          },
          productCount : products.length,
          serviceCount : services.length
        },
      };
  
      response
        .status(200)
        .json(buildResponse({ ...data }))
        .end();
    } catch(error) {
      response.status(500).json(buildResponse(null, error)).end()
    }
  });

  app.post(SEARCH, async (request, response) => {
    try {
        const queryString = request.body.queryString;
        if ( queryString == null ) {
            response.status(400).json(buildResponse(null, 'Invalid query')).end()
            return
        }
        var items = await productService.searchItems(queryString);
        response.status(200).json(buildResponse(items)).end();
    } catch(error) {
      console.log(error)     

        response.status(500).json(buildResponse(null, error)).end()
    }
  });
}
