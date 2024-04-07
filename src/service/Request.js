import axios from 'axios';

const BaseURL = "http://localhost:5000/api";
const BaseURLOauth = "http://localhost:5000/";
const headers = { 
    Accept: "application/json",
    "Content-Type": "application/json",
};

const formDataHeaders = { 
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Credentials": true
};

export const OauthRequest = axios.create({
    baseURL:BaseURLOauth,
    headers: headers,
    withCredentials: true
})

export const PublicRequest = axios.create({
    baseURL:BaseURL,
    headers:headers,
})


export const FormRequest = axios.create({
    baseURL:BaseURL,
    headers:formDataHeaders,
})

