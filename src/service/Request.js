import axios from 'axios';

const BaseURL = "http://localhost:5000/";
const headers = { 
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true
};

export const OauthRequest = axios.create({
    baseURL:BaseURL,
    headers: headers,
    withCredentials: true
})

export const PublicRequest = axios.create({
    baseURL:BaseURL,
    headers:headers,
})