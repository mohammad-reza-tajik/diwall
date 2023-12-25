const handleResponse = async (response: any) => {
    return await response.json();
}
const get = async (url: string, options?: RequestInit) => {
    const requestOptions = {
        method: 'GET',
        ...options

    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

const post = async (url: string, body: any, options?: RequestInit) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        ...options
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

const put = async (url: string, body: any, options?: RequestInit) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        ...options
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
const _delete = async (url: string, options?: RequestInit) => {
    const requestOptions = {
        method: 'DELETE',
        ...options
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}


const fetcher = {
    get,
    post,
    put,
    delete: _delete
};

export default fetcher;