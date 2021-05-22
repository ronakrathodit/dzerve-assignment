import { endpoints } from './endPoint';
const fetchHeader = { "Content-Type": "application/json" } //"appId":data
const fetchHeaderFile = { "Content-Type": "application/json", "mimeType": "multipart/form-data" }


export default class Api {
    

    fetch = (url, method, body) => {
        let opt = {
            method: method,
            headers: fetchHeader,
            body: body,
            //credentials: 'same-origin'
        }


        return fetch(url, opt).then((response) => response.json())
    }

    fetchFile = (url, method, body) => {

        let opt = {
            method: method,
            headers: fetchHeaderFile,
            body: body,
            credentials: 'same-origin'
        }

        return fetch(url, opt).then((response) => response.json())

    }

    buildUrl = (path) => {
        return `${endpoints.baseUrl}${path}`;
    }

}