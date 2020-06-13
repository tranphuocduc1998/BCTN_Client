export const localHost = "http://192.168.1.8:3030";

//key openrouteservice 
const api_Key = '5b3ce3597851110001cf624839aa6df4bcb34370a5459030e9990018';
const linkOpenRouteService = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${api_Key}`;

export const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? { 'Content-Type': 'application/json' } : {}
    })
        .then(response => {
            if (response.status >= 400) {
                throw new Error('Có gì đó sai!');
            }
            return response.json();
        });
}

export const getDirection = (latitudeStart, longitudeStart, latitudeEnd, longitudeEnd) => {
    return fetch(`${linkOpenRouteService}&start=${longitudeStart},${latitudeStart}&end=${longitudeEnd},${latitudeEnd}`)
        .then(response => {
            if (response.status >= 400) {
                throw new Error('Có gì đó sai!');
            }
            return response.json();
        });
}