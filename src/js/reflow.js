import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");

import '../scss/common.scss';

const SIZE = 180;
const SPACE = 20;
const query = getQuery();
let prevXNum;

$(() => {
    for (let i = 0; i < query['num']; i++) {
        $('body').append(`<div class="card" id="card${i}">${i}</div>`);
    }

    initIcons();
});

$(window).on('resize', function() {
    let xNum = Math.floor((window.innerWidth - SPACE) / (SIZE + SPACE));
    if (xNum > query['num']) {
        xNum = query['num'];
    }

    if (prevXNum === xNum) {
        return;
    }

    sortIcons(prevXNum, xNum);

    prevXNum = xNum;
});

function sortIcons(startXNum, endXNum) {
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

function getQuery() {
    if(window.location.search === "") return;
    const variables = window.location.search.split("?")[1].split("&");
    const obj = {};
    variables.forEach(function(v, i) {
        const variable = v.split("=");
        obj[variable[0]] = Number(variable[1]);
    });
    return obj;
}

function newTwoDimensionalArray(x, y) {
    return Array.from(new Array(y), () => new Array(x).fill(0));
}