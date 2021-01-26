const axios = require('axios');
require('dotenv').config();

const ts = Date.now();

const main = async () => {
    const resp = await axios({
        method: 'get',
        url: 'https://ftx.com',
        headers: {
            'FTX-KEY': process.env.FTX_KEY,
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
