import axios from 'axios';

const BaseURL = "http://localhost:5000/api";
const BaseURLOauth = "http://localhost:5000/";
const headers = { 
    Accept: "application/json",
    "Content-Type": "application/json",
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