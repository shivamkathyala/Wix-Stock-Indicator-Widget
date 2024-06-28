import { Permissions, webMethod } from "wix-web-module";
import axios from 'axios';

export const itemStock = webMethod(
  Permissions.Anyone, 
  (token) => {  
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://app.gopos.io/api/v3/5175/items/74?&include=stock_info',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };

    // Return a Promise to indicate completion of the operation
    return new Promise((resolve, reject) => {
      axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          resolve(response.data); 
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
);

