import axios from 'axios'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'

const WORDPRESS_URL = 'https://public-api.wordpress.com/wp/v2/sites/joyfulreview.wordpress.com'

export const getHelper = (uri, param) => makeRequest('GET', uri, param)
export const deleteHelper = (uri, param) => makeRequest('DELETE', uri, param)
export const postHelper = (uri, data) => makeRequest('POST', uri, data)
export const putHelper = (uri, data) => makeRequest('PUT', uri, data)

function makeRequest(method, url, data) {
    // console.log(method, url, data)
    if ((method === 'GET') && typeof data === 'object') {
        url = modifyGetUri(url, data)
    }

    if (method === 'DELETE' && !isEmpty(data)) {
        url = url + '/' + data
    }

    url = WORDPRESS_URL + url

    console.log('%s http request: %s', method, url, data)

    let headers = {}
    let responseType = 'json'

    return axios.request(url, method, data, headers, responseType)
}

function modifyGetUri(url, requestData) {
    url += '?'
    forEach(requestData, function (value, key) {
        if (value && key) {
            url += encodeURI(key) + '=' + encodeURI(value) + '&'
        }
    })
    // Get rid of extra &
    url = url.substring(0, url.length - 1)
    return url
}

export default { getHelper, postHelper, putHelper, deleteHelper }