const axios = require('axios');
require('dotenv').config();

const method = 'GET';

const fetch = async (market = 'SUSHI-PERP', limit = 1500, resolution = 900) => {
    const path = `/futures/${market}/mark_candles?resolution=${resolution}&limit=${limit}`;

    const resp = await axios({
        method,
        url: `https://ftx.com/api${path}`,
        headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
        },
    });
    return resp.data.result;
};

if (require.main === module) {
    fetch()
        .then((result) => {
            console.log(result);
            process.exit(0);
        })
        .catch((error) => {
            console.error(error.response.status);
            console.error(error.response.statusText);
            console.error(error.response.data);
            process.exit(1);
        });
}

module.exports = fetch;
