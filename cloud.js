/* eslint-disable max-len */
const fetch = require('./ftx');

const pair = 'SUSHI-PERP';
const inputs = {
    tenkan: -9, kijun: -26, senkou: -52, chikou: -26,
};

const generateIchimoku = (data, isChikou = false) => {
    const high = isChikou ? data.high[pair].slice(0, inputs.chikou) : data.high[pair];
    const low = isChikou ? data.low[pair].slice(0, inputs.chikou) : data.low[pair];
    const getHi = (val) => Math.max(...high.slice(val));
    const getLo = (val) => Math.min(...low.slice(val));
    const tenkan = (getHi(inputs.tenkan) + getLo(inputs.tenkan)) / 2;
    const kijun = (getHi(inputs.kijun) + getLo(inputs.kijun)) / 2;
    const spliceTo = isChikou ? data.high[pair].length + inputs.chikou * 2 : data.high[pair].length + inputs.chikou;
    const tenkanOld = (Math.max(...high.slice(spliceTo + inputs.tenkan, spliceTo)) + Math.min(...low.slice(spliceTo + inputs.tenkan, spliceTo))) / 2;
    const kijunOld = (Math.max(...high.slice(spliceTo + inputs.kijun, spliceTo)) + Math.min(...low.slice(spliceTo + inputs.kijun, spliceTo))) / 2;
    const senkouA = (tenkanOld + kijunOld) / 2;
    const senkouB = (Math.max(...high.slice(spliceTo + inputs.senkou, spliceTo)) + Math.min(...low.slice(spliceTo + inputs.senkou, spliceTo))) / 2;
    return {
        tenkan, kijun, senkouA, senkouB,
    };
};

fetch(pair)
    .then((result) => {
        // console.log(result);
        const cloud = generateIchimoku(result);
        // console.log(cloud);
        process.exit(0);
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
