var https = require('http');

var scraperAPIClient = class {
    constructor(apikey) {
        this.apikey = apikey;
    }

    get(url, render, template_id) {
        return new Promise((resolve, reject) => {
            let params = {apikey:this.apikey, url, render, template_id}
            let u = new URLSearchParams(params).toString();
            let apiurl = `http://127.0.0.1:8000/request?${u}`
            console.log(apiurl);
            https.get(apiurl, (response) => {
                let chunks_of_data = [];
        
                response.on('data', (fragments) => {
                    chunks_of_data.push(fragments);
                });
        
                response.on('end', () => {
                    let response_body = Buffer.concat(chunks_of_data);
                    
                    // promise resolved on success
                    resolve(response_body.toString());
                });
        
                response.on('error', (error) => {
                    // promise rejected on error
                    reject(error);
                });
            });
        });
    }
};


module.exports = scraperAPIClient