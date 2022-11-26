import e from "cors"

function buildResponse ( data, error = null ) {
    if (data) 
        return { data, error }
    else 
        return { data, error : { message : error } }
}

export default buildResponse;