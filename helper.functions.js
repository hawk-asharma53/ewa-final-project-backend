import e from 'cors';
import axios from'axios';

function degreesToRadians(degrees) {
  var radians = (degrees * Math.PI) / 180;
  return radians;
}

export function buildResponse(data, error = null) {
  if (data) return { data, error };
  else return { data, error: { message: error } };
}

export async function calcDistance(startCoords, destCoords) {
    var url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    var params = '';
    params += `origins=${startCoords.lat},${startCoords.lng}&`
    params += `destinations=${destCoords.lat},${destCoords.lng}&`
    params += `units=imperial&`
    params += `key=AIzaSyBX5MrMufpjy1E8EPZpQ2cmgpdpVs-fGgU`
    url = `${url}?${params}`
    var headers = { 'Accept': 'application/json', 'Accept-Encoding': 'identity' }
    var response = await axios({ url, method : 'get', headers });
    return response.data.rows[0].elements[0].distance;
}