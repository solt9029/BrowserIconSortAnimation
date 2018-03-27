import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/reflow.scss';
import * as util from './util';
import { SIZE, SPACE } from "./const";

const query = util.getQuery();
let prevXNum = 0;

$(() => {
    addCards();
    prevXNum = sortIcons(prevXNum);
});

$(window).on('resize', function() {
    prevXNum = sortIcons(prevXNum);
});

function addCards() {
    for (let i = 0; i < query['num']; i++) {
        $('body').append(`<div class="card" id="card${i}">${i}</div>`);
    }
}

function sortIcons(startXNum) {
    let endXNum = getXNum();
    if (startXNum === endXNum) {
        return endXNum;
    }

    if (!query['step']) {
        startXNum = endXNum - 1;
    }

    for (let xNum = startXNum; xNum < endXNum; xNum++) {
        for (let y = 0; y < Math.ceil(query['num'] / (xNum + 1)); y++) {
            for (let x = 0; x < xNum + 1; x++) {
                $(`#card${x + y * (xNum + 1)}`).animate({
                    'top': (y * (SIZE + SPACE) + SPACE) + 'px',
                    'left': (x * (SIZE + SPACE) + SPACE) + 'px'
                }, query['animation']);
            }
        }
    }

    for (let xNum = startXNum; xNum > endXNum; xNum--) {
        for (let y = 0; y < Math.ceil(query['num'] / (xNum - 1)); y++) {
            for (let x = 0; x < xNum - 1; x++) {
                $(`#card${x + y * (xNum - 1)}`).animate({
                    'top': (y * (SIZE + SPACE) + SPACE) + 'px',
                    'left': (x * (SIZE + SPACE) + SPACE) + 'px'
                }, query['animation']);
            }
        }
    }

    return endXNum;
}

function getXNum() {
    let xNum = 1;
    if (Math.floor((window.innerWidth - SPACE) / (SPACE + SIZE)) > 0) {
        xNum = Math.floor((window.innerWidth - SPACE) / (SPACE + SIZE));
    }
    if (xNum > query['num']) {
        xNum = query['num'];
    }
    return xNum;
}