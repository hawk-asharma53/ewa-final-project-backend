import e from "cors"

export function buildResponse ( data, error = null ) {
    if (data) 
        return { data, error }
    else 
        return { data, error : { message : error } }
}

export function calcDistance (startingCoords, destinationCoords){
    let startingLat = degreesToRadians(startCoords.latitude);
    let startingLong = degreesToRadians(startCoords.longitude);
    let destinationLat = degreesToRadians(destCoords.latitude);
    let destinationLong = degreesToRadians(destCoords.longitude);
  
    // Radius of the Earth in kilometers
    let radius = 6571;
  
    // Haversine equation
    let distanceInKilometers = Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
    Math.cos(startingLat) * Math.cos(destinationLat) *
    Math.cos(startingLong - destinationLong)) * radius;
    
    return distanceInKilometers;
}

//  default buildResponse;