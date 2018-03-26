import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/hybrid.scss';
import * as util from './util';
import { RATIO, MIN_SIZE, MIN_SPACE } from './const';

const query = util.getQuery();
let patterns;
let prevXNum = 0;
let prevMethod = 'scaling';
let size;
let space;

$(() => {
    addCards();
    patterns = getPatterns(query['xnum']);

    scaling();
});

$(window).on('resize', function() {
    scaling();
});

function scaling() {
    size = getSize();
    space = getSpace();

    if (size <= MIN_SIZE) {
        size = MIN_SIZE;
        space = getSpace();
        prevXNum = proposed(prevXNum);
    } else {
        for (let y = 0; y < Math.ceil(query['num'] / query['xnum']); y++) {
            for (let x = 0; x < query['xnum']; x++) {
                $(`#card${x + y * query['xnum']}`).animate(getAnimationJson(x, y), 500);
            }
        }
        prevXNum = getXNum();
        prevMethod = 'scaling';
    }
}

function proposed(startXNum) {
    let endXNum = getXNum();

    if (startXNum === endXNum && prevMethod === 'proposed') {
        return endXNum;
    }

    if (!query['step']) {
        startXNum = endXNum - 1;
    }

    for (let xNum = startXNum; xNum < endXNum; xNum++) {
        for (let y = 0; y < Math.ceil(query['num'] / (xNum + 1)); y++) {
            for (let x = 0; x < xNum + 1; x++) {
                $(`#card${patterns[xNum][x + y * (xNum + 1)]}`).animate(getAnimationJson(x, y), query['animation']);
            }
        }
    }

    for (let xNum = startXNum; xNum > endXNum; xNum--) {
        for (let y = 0; y < Math.ceil(query['num'] / (xNum - 1)); y++) {
            for (let x = 0; x < xNum - 1; x++) {
                $(`#card${patterns[xNum - 2][x + y * (xNum - 1)]}`).animate(getAnimationJson(x, y), query['animation']);
            }
        }
    }

    prevMethod = 'proposed';
    return endXNum;
}

function getAnimationJson(x, y) {
    return {
        'top': (y * (size + space) + space) + 'px',
        'left': (x * (size + space) + space) + 'px',
        'width': size + 'px',
        'height': size + 'px',
        'fontSize': size / 2 + 'px'
    };
}

function addCards() {
    for (let i = 0; i < query['num']; i++) {
        $('body').append(`<div class="card" id="card${i}">${i}</div>`);
    }
}

function getXNum() {
    let xNum = 1;
    if (Math.floor((window.innerWidth - MIN_SPACE) / (MIN_SPACE + MIN_SIZE)) > 0) {
        xNum = Math.floor((window.innerWidth - MIN_SPACE) / (MIN_SPACE + MIN_SIZE));
    }
    if (xNum > query['num']) {
        xNum = query['num'];
    }
    return xNum;
}

function getPatterns(baseXNum) {
    let returnArray = util.newTwoDimensionalArray(query['num'], query['num']);

    // 初期化時のウィンドウサイズに応じて
    for (let i = 0; i < query['num']; i++) {
        returnArray[baseXNum - 1][i] = i;
    }
    // 減る場合
    for (let i = (baseXNum - 1) - 1; i >= 0; i--) {
        returnArray[i] = getMinusPattern(returnArray[i + 1], i + 2);
    }
    // 増える場合
    for (let i = baseXNum; i < query['num']; i++) {
        returnArray[i] = getPlusPattern(returnArray[i - 1], i);
    }

    return returnArray;
}

function getSize() {
    let yNum = Math.ceil(query['num'] / query['xnum']);
    let xSizeUnitNum = query['xnum'] * 1 + RATIO * (query['xnum'] + 1);
    let ySizeUnitNum = yNum * 1 + RATIO * (yNum + 1);
    return window.innerWidth / xSizeUnitNum > window.innerHeight / ySizeUnitNum ? window.innerHeight / ySizeUnitNum : window.innerWidth / xSizeUnitNum;
}

function getSpace() {
    return size * RATIO;
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