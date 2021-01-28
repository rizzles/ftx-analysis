const fetch = require('./ftx');

const rsi = (data, input = 8) => {
    const closes = data.map((candle) => candle.close);
    const len = closes.length;
    const arr = [];
    let prevAvgGain = 0;
    let prevAvgLoss = 0;

    for (let j = 250 + input; j > 250; j--) {
        let losses = 0;
        let gains = 0;
        const previous = closes[len - (j + 1)]; // -259
        const present = closes[len - j]; // -258

        if (previous < present) gains += present - previous; // If price went up, add gain amount
        else if (previous > present) losses += previous - present; // If price went down, add loss amount

        prevAvgGain = gains / input;
        prevAvgLoss = losses / input;
    }

    for (let i = 250; i > 0; i--) {
        let loss = 0;
        let gain = 0;
        const previous = closes[len - (i + 1)];
        const present = closes[len - i];

        if (previous < present) gain = present - previous;
        else if (previous > present) loss = previous - present;

        prevAvgGain = (prevAvgGain * (input - 1) + gain) / input;
        prevAvgLoss = (prevAvgLoss * (input - 1) + loss) / input;

        const rs = prevAvgGain / prevAvgLoss;
        arr.push(100 - (100 / (1 + rs)));
    }
    return arr.slice(arr.length - 5, arr.length);
    // return arr;
};

if (require.main === module) {
    fetch('ETH-PERP', 251, 900)
        .then((result) => {
            const strength = rsi(result);
            console.log(strength);
            process.exit(0);
        })
        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
}

module.exports = rsi;
