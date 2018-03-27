import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/reflow.scss';
import * as util from './util';
import * as common from './common';
import { SIZE, SPACE } from "./const";

const query = util.getQuery();
let prevXNum = 0;

$(() => {
    common.addCards(query['num']);
    prevXNum = reflow(prevXNum);
});

$(window).on('resize', function() {
    prevXNum = reflow(prevXNum);
});

function reflow(startXNum) {
    let endXNum = common.getXNum(query['num'], SIZE, SPACE);
    if (startXNum === endXNum) {
        return endXNum;
    }

    for (let xNum = startXNum + 1; xNum < endXNum + 1; xNum++) {
        animateCards(xNum);
    }

    for (let xNum = startXNum - 1; xNum > endXNum - 1; xNum--) {
        animateCards(xNum);
    }

    return endXNum;
}

function animateCards(xNum) {
    for (let y = 0; y < Math.ceil(query['num'] / xNum); y++) {
        for (let x = 0; x < xNum; x++) {
            if (!query['step']) {
                $(`#card${x + y * xNum}`).stop();
            }
            $(`#card${x + y * xNum}`).animate({
                'top': (y * (SIZE + SPACE) + SPACE) + 'px',
                'left': (x * (SIZE + SPACE) + SPACE) + 'px'
            }, query['animation']);
        }
    }
}