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