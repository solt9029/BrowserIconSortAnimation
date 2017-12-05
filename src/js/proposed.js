import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/proposed.scss';
import * as util from './util';
import { SIZE, SPACE } from "./const";

const query = util.getQuery();
let patterns = util.newTwoDimensionalArray(query['num'], query['num']);
let prevXNum;
const step = query['step']; // 数字1だったら1段階ずつ実行する
const animation = query['animation'];

$(() => {
    for (let i = 0; i < query['num']; i++) {
        $('body').append(`<div class="card" id="card${i}">${i}</div>`);
    }

    // ベースとなる横にならぶアイコン数を、ウィンドウ幅から計算して決める。0になってしまう場合には1を代入する
    let baseXNum = 1;
    if (Math.floor(window.innerWidth - SPACE) / (SPACE + SIZE) > 0) {
        baseXNum = Math.floor((window.innerWidth - SPACE) / (SPACE + SIZE));
    }
    if (baseXNum > query['num']) {
        baseXNum = query['num'];
    }

    // 初期化時のウィンドウサイズに応じて
    for (let i = 0; i < query['num']; i++) {
        patterns[baseXNum - 1][i] = i;
    }
    // 減る場合
    for (let i = (baseXNum - 1) - 1; i >= 0; i--) {
        patterns[i] = getMinusPattern(patterns[i + 1], i + 2);
    }
    // 増える場合
    for (let i = baseXNum; i < query['num']; i++) {
        patterns[i] = getPlusPattern(patterns[i - 1], i);
    }

    initIcons();

    // 300ミリ秒ごとにウィンドウ幅を確認する
    // setInterval(function() {
    //     let xNum = Math.floor((window.innerWidth - SPACE) / (SIZE + SPACE));
    //     if (xNum > query['num']) {
    //         xNum = query['num'];
    //     }
    //     sortIcons(prevXNum, xNum);
    //     prevXNum = xNum;
    // }, 300);
});

$(window).on('resize', function() {
    let xNum = Math.floor((window.innerWidth - SPACE) / (SIZE + SPACE));
    if (xNum > query['num']) {
        xNum = query['num'];
    }
    sortIcons(prevXNum, xNum);
    prevXNum = xNum;
});

function sortIcons(startXNum, endXNum) {
    if (startXNum === endXNum) {
        return;
    }

    if (!step) {
        startXNum = endXNum - 1;
    }

    for (let xNum = startXNum; xNum < endXNum; xNum++) {
        for (let y = 0; y < Math.ceil(query['num'] / (xNum + 1)); y++) {
            for (let x = 0; x < xNum + 1; x++) {
                $(`#card${patterns[xNum][x + y * (xNum + 1)]}`).animate({
                    'top': (y * (SIZE + SPACE) + SPACE) + 'px',
                    'left': (x * (SIZE + SPACE) + SPACE) + 'px'
                }, 500);
            }
        }
    }

    for (let xNum = startXNum; xNum > endXNum; xNum--) {
        for (let y = 0; y < Math.ceil(query['num'] / (xNum - 1)); y++) {
            for (let x = 0; x < xNum - 1; x++) {
                $(`#card${patterns[xNum - 2][x + y * (xNum - 1)]}`).animate({
                    'top': (y * (SIZE + SPACE) + SPACE) + 'px',
                    'left': (x * (SIZE + SPACE) + SPACE) + 'px'
                }, 500);
            }
        }
    }
}

function initIcons() {
    let xNum = Math.floor((window.innerWidth - SPACE) / (SIZE + SPACE));
    if (xNum > query['num']) {
        xNum = query['num'];
    }

    for (let y = 0; y < Math.ceil(query['num'] / xNum); y++) {
        for (let x = 0; x < xNum; x++) {
            if (x + y * xNum >= query['num']) {
                break;
            }
            $(`#card${patterns[xNum - 1][x + y * xNum]}`).animate({
                'top': (y * (SIZE + SPACE) + SPACE) + 'px',
                'left': (x * (SIZE + SPACE) + SPACE) + 'px'
            }, 500);
        }
    }
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