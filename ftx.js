const axios = require('axios');
require('dotenv').config();

const method = 'GET';
const marketName = 'SUSHI-PERP';
const resolution = 900; // 15 minute
const limit = 35;

const fetch = async (market) => {
    if (!market) {
        market = marketName;
    }
    const path = `/futures/${market}/mark_candles?resolution=${resolution}&limit=${limit}`;

    const resp = await axios({
        method,
        url: `https://ftx.com/api${path}`,
        headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
        },
    });
    return resp.data.result.reverse();
};

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

module.exports = fetch;
