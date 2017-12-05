import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/reflow.scss';
import * as util from './util';
import { SIZE, SPACE } from "./const";

const query = util.getQuery();
let prevXNum;
const step = query['step'];

$(() => {
    for (let i = 0; i < query['num']; i++) {
        $('body').append(`<div class="card" id="card${i}"></div>`);
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
                $(`#card${x + y * (xNum + 1)}`).animate({
                    'top': (y * (SIZE + SPACE) + SPACE) + 'px',
                    'left': (x * (SIZE + SPACE) + SPACE) + 'px'
                }, 500);
            }
        }
    }

    for (let xNum = startXNum; xNum > endXNum; xNum--) {
        for (let y = 0; y < Math.ceil(query['num'] / (xNum - 1)); y++) {
            for (let x = 0; x < xNum - 1; x++) {
                $(`#card${x + y * (xNum - 1)}`).animate({
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
            $(`#card${x + y * xNum}`).animate({
                'top': (y * (SIZE + SPACE) + SPACE) + 'px',
                'left': (x * (SIZE + SPACE) + SPACE) + 'px'
            }, 500);
        }
    }
}