const fetch = require('./ftx');
const ichimoku = require('./cloud');
const rsi = require('./rsi');

fetch('SUSHI-PERP')
    .then((result) => {
        const last = result[result.length - 1];
        const cloud = ichimoku(result);
        const strength = rsi(result);
        console.log(last);
        console.log(cloud);
        console.log(strength);
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
