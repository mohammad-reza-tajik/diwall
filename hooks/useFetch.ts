const handleResponse = async (response) => {
    return await response.json();
}
const get = async (url: string) => {
    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

const post = async (url: string, body) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

const put = async (url: string, body) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
const _delete = async (url: string) => {
    const requestOptions = {
        method: 'DELETE'
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}


const useFetch = {
    get,
    post,
    put,
    delete: _delete
};

export default useFetch;