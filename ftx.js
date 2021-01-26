const axios = require('axios');
const CryptoJS = require('crypto-js');
require('dotenv').config();

const ts = Date.now();
const method = 'GET';
const path = '/markets/BTC-PERP';

const main = async () => {
    const payload = `${ts}${method}${path}`;
    const signature = CryptoJS.HmacSHA256(process.env.FTX_PRIV_KEY, payload)
        .toString(CryptoJS.enc.Hex);

    const resp = await axios({
        method: 'get',
        url: `https://ftx.com/api${path}`,
        headers: {
            'FTX-KEY': process.env.FTX_KEY,
            'FTX-TX': ts.toString(),
            'FTX-SIGN': signature,
        },
    });
    console.log(resp.status);
    console.log(resp.data);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
