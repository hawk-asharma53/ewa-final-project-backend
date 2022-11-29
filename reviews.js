import { buildResponse } from "./helper.functions.js";
import reviewService from "./services/review.service.js";

const BASE_URL = '/api';
const REVIEW = BASE_URL + '/review';
const GET_REVIEW_BY_IDS = BASE_URL + '/reviewById';

export default function (app) {

    app.post(REVIEW, async (request, response) => {
        try {
            const reivew = request.body;
            await reviewService.addReview( reivew );
            response.status(200).json(buildResponse(true)).end()
        } catch(error) {
            response.status(500).json(buildResponse(null, error)).end()
        }
    });

}