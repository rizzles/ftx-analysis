/* eslint-disable max-len */
const fetch = require('./ftx');

const pair = 'SUSHI-PERP';
const inputs = {
    tenkan: -20, kijun: -30, senkou: -120, chikou: -60,
};

const ichimoku = (data, isChikou = false) => {
    const highPrices = data.map((candle) => candle.high);
    const lowPrices = data.map((candle) => candle.low);
    const high = isChikou ? highPrices.slice(0, inputs.chikou) : highPrices;
    const low = isChikou ? lowPrices.slice(0, inputs.chikou) : lowPrices;
    const getHi = (val) => Math.max(...high.slice(val));
    const getLo = (val) => Math.min(...low.slice(val));
    const tenkan = (getHi(inputs.tenkan) + getLo(inputs.tenkan)) / 2;
    const kijun = (getHi(inputs.kijun) + getLo(inputs.kijun)) / 2;
    const spliceTo = isChikou ? data.length + inputs.chikou * 2 : data.length + inputs.chikou;
    const tenkanOld = (Math.max(...high.slice(spliceTo + inputs.tenkan, spliceTo)) + Math.min(...low.slice(spliceTo + inputs.tenkan, spliceTo))) / 2;
    const kijunOld = (Math.max(...high.slice(spliceTo + inputs.kijun, spliceTo)) + Math.min(...low.slice(spliceTo + inputs.kijun, spliceTo))) / 2;
    const senkouA = (tenkanOld + kijunOld) / 2;
    const senkouB = (Math.max(...high.slice(spliceTo + inputs.senkou, spliceTo)) + Math.min(...low.slice(spliceTo + inputs.senkou, spliceTo))) / 2;
    return {
        tenkan, kijun, senkouA, senkouB,
    };
};

if (require.main === module) {
    fetch(pair)
        .then((result) => {
            const latest = result[result.length - 1];
            const cloud = ichimoku(result);
            console.log(latest);
            console.log(cloud);
            process.exit(0);
        })
        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
}

module.exports = ichimoku;
