const fetch = require('./ftx');

const rsi = async () => {
    
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
