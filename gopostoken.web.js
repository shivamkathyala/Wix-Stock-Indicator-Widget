import { Permissions, webMethod } from "wix-web-module";
import axios from 'axios';

export const generateToken = webMethod(
    Permissions.Anyone,
    () => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://app.gopos.io/oauth/token?client_id=f85faccc-854a-451c-8ba9-7695901f19d3&client_secret=51e36c1a-412a-45eb-9b2c-8db6121be520&grant_type=password&username=zarzad@ubraci.pizza&password=87Damian59Krzysztof49',
            headers: {}
        };

        // Return a Promise that resolves with the token
        return new Promise((resolve, reject) => {
            axios.request(config)
                .then((response) => {
                    const token = response.data.access_token;
                    resolve(token); 
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    }
);
