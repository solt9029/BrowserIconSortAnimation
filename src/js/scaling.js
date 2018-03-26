import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/scaling.scss';
import * as util from './util';
import { RATIO } from './const';

const query = util.getQuery();
let size;
let space;

$(() => {
    addCards();
    scaling();
});

$(window).on('resize', function() {
    scaling();
});

function scaling() {
    size = getSize();
    space = getSpace();

    $('.card').css('width', size);
    $('.card').css('height', size);
    $('.card').css('fontSize', size / 2);

    for (let y = 0; y < Math.ceil(query['num'] / query['xnum']); y++) {
        for (let x = 0; x < query['xnum']; x++) {
            $(`#card${x + y * query['xnum']}`).css('top', (y * (size + space) + space) + 'px');
            $(`#card${x + y * query['xnum']}`).css('left', (x * (size + space) + space) + 'px');
        }
    }
}

function addCards() {
    for (let i = 0; i < query['num']; i++) {
        $('body').append(`<div class="card" id="card${i}">${i}</div>`);
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