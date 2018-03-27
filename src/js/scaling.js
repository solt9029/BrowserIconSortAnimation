import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/scaling.scss';
import * as util from './util';
import * as common from './common';
import { RATIO } from './const';

const query = util.getQuery();
let size;
let space;

$(() => {
    common.addCards(query['num']);
    scaling();
});

$(window).on('resize', function() {
    scaling();
});

function scaling() {
    size = getSize();
    space = getSpace();

    animateCards(query['xnum']);
}

function animateCards(xNum) {
    for (let y = 0; y < Math.ceil(query['num'] / xNum); y++) {
        for (let x = 0; x < xNum; x++) {
            if (!query['step']) {
                $(`#card${x + y * xNum}`).stop();
            }
            $(`#card${x + y * xNum}`).animate({
                'top': (y * (size + space) + space) + 'px',
                'left': (x * (size + space) + space) + 'px',
                'width': size + 'px',
                'height': size + 'px',
                'fontSize': size / 2 + 'px'
            }, query['animation']);
        }
    }
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