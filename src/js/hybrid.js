import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/hybrid.scss';
import * as util from './util';

const query = util.getQuery();
let patterns = util.newTwoDimensionalArray(query['num'], query['num']);
let prevXNum;
let size = 180;
let space = 20;

$(() => {
    for (let i = 0; i < query['num']; i++) {
        $('body').append(`<div class="card" id="card${i}">${i}</div>`);
    }

    for (let i = 0; i < query['num']; i++) {
        patterns[query['xnum'] - 1][i] = i;
    }
    // 減る場合
    for (let i = (query['xnum'] - 1) - 1; i >= 0; i--) {
        patterns[i] = getMinusPattern(patterns[i + 1], i + 2);
    }
    // 増える場合
    for (let i = query['xnum']; i < query['num']; i++) {
        patterns[i] = getPlusPattern(patterns[i - 1], i);
    }

    prevXNum = proposed(prevXNum);
});

$(window).on('resize', function() {
    prevXNum = proposed(prevXNum);
});

function proposed(startXNum) {
    let endXNum = Math.floor((window.innerWidth - space) / (size + space));
    if (endXNum > query['num']) {
        endXNum = query['num'];
    }

    if (startXNum === endXNum) {
        return endXNum;
    }

    if (!query['step']) {
        startXNum = endXNum - 1;
    }

    for (let xNum = startXNum; xNum < endXNum; xNum++) {
        for (let y = 0; y < Math.ceil(query['num'] / (xNum + 1)); y++) {
            for (let x = 0; x < xNum + 1; x++) {
                $(`#card${patterns[xNum][x + y * (xNum + 1)]}`).animate({
                    'top': (y * (size + space) + space) + 'px',
                    'left': (x * (size + space) + space) + 'px'
                }, query['animation']);
            }
        }
    }

    for (let xNum = startXNum; xNum > endXNum; xNum--) {
        for (let y = 0; y < Math.ceil(query['num'] / (xNum - 1)); y++) {
            for (let x = 0; x < xNum - 1; x++) {
                $(`#card${patterns[xNum - 2][x + y * (xNum - 1)]}`).animate({
                    'top': (y * (size + space) + space) + 'px',
                    'left': (x * (size + space) + space) + 'px'
                }, query['animation']);
            }
        }
    }

    return endXNum;
}

function getMinusPattern(array, xNum) {
    let returnArray = new Array(query['num']);

    for (let x = 0; x < xNum - 1; x++) {
        for (let y = 0; y < Math.ceil(query['num'] / xNum); y++) {
            if (y * xNum + x > query['num'] - 1) {
                break;
            }
            returnArray[y * (xNum - 1) + x] = array[y * xNum + x];
        }
    }

    for (let i = 0; i < Math.floor(query['num'] / xNum); i++) {
        returnArray[i + (query['num'] - Math.floor(query['num'] / xNum))] = array[(i + 1) * xNum - 1];
    }

    return returnArray;
}

function getPlusPattern(array, xNum) {
    let returnArray = new Array(query['num']);

    for (let x = 0; x < xNum; x++) {
        for (let y = 0; y < Math.ceil(query['num'] / xNum); y++) {
            if (y * (xNum + 1) + x > query['num'] - 1) {
                break;
            }
            returnArray[y * (xNum + 1) + x] = array[y * xNum + x];
        }
    }

    for (let i = 0; i < Math.floor(query['num'] / (xNum + 1)); i++) {
        returnArray[i * (xNum + 1) + xNum] = array[i + (query['num'] - 1) - (Math.floor(query['num'] / (xNum + 1)) - 1)];
    }

    return returnArray;
}