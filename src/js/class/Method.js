import * as util from '../util';

export default class Method {
    static get DEFAULT_SIZE() {
        return 180;
    }

    static get RATIO() {
        return 1.0 / 9.0;
    }

    constructor() {
        this.query = util.getQuery();
        this.size = Method.DEFAULT_SIZE;
        this.space = this.size * Method.RATIO;
        this.baseYNum = Math.ceil(this.query['num'] / this.query['xnum']);
        this.prevXNum = 0;
        this.patterns = this.getPatterns();
        this.addCards();

        this.method();
        let method = this;
        $(window).on('resize', function() {
            method.method();
        });
    }
    
    method() {
    }

    addCards() {
        for (let i = 0; i < this.query['num']; i++) {
            $('body').append(`<div class="card" id="card${i}">${i}</div>`);
        }
    }

    getXNum(size, space) {
        let xNum = 1;
        if (Math.floor((window.innerWidth - space) / (space + size)) > 0) {
            xNum = Math.floor((window.innerWidth - space) / (space + size));
        }
        if (xNum > this.query['num']) {
            xNum = this.query['num'];
        }
        return xNum;
    }

    getYNum(size, space) {
        let yNum = 1;
        if (Math.floor((window.innerHeight - space) / (space + size)) > 0) {
            yNum = Math.floor((window.innerHeight - space) / (space + size));
        }
        if (yNum > this.query['num']) {
            yNum = this.query['num'];
        }
        return yNum;
    }

    getSize() {
        let yNum = Math.ceil(this.query['num'] / this.query['xnum']);
        let xSizeUnitNum = this.query['xnum'] * 1 + Method.RATIO * (this.query['xnum'] + 1);
        let ySizeUnitNum = yNum * 1 + Method.RATIO * (yNum + 1);
        return window.innerWidth / xSizeUnitNum > window.innerHeight / ySizeUnitNum ? window.innerHeight / ySizeUnitNum : window.innerWidth / xSizeUnitNum;
    }

    getPatterns() {
        let patterns = util.newTwoDimensionalArray(this.query['num'], this.query['num']);
        for (let i = 0; i < this.query['num']; i++) {
            patterns[this.query['xnum'] - 1][i] = i;
        }
        // 減る場合
        for (let i = this.query['xnum'] - 2; i >= 0; i--) {
            patterns[i] = this.getMinusPattern(patterns[i + 1], i + 2);
        }
        // 増える場合
        for (let i = this.query['xnum']; i < this.query['num']; i++) {
            patterns[i] = this.getPlusPattern(patterns[i - 1], i);
        }
        return patterns;
    }

    getMinusPattern(array, xNum) {
        let pattern = new Array(this.query['num']);
        for (let x = 0; x < xNum - 1; x++) {
            for (let y = 0; y < Math.ceil(this.query['num'] / xNum); y++) {
                if (y * xNum + x > this.query['num'] - 1) {
                    break;
                }
                pattern[y * (xNum - 1) + x] = array[y * xNum + x];
            }
        }
        for (let i = 0; i < Math.floor(this.query['num'] / xNum); i++) {
            pattern[i + (this.query['num'] - Math.floor(this.query['num'] / xNum))] = array[(i + 1) * xNum - 1];
        }
        return pattern;
    }

    getPlusPattern(array, xNum) {
        let pattern = new Array(this.query['num']);
        for (let x = 0; x < xNum; x++) {
            for (let y = 0; y < Math.ceil(this.query['num'] / xNum); y++) {
                if (y * (xNum + 1) + x > this.query['num'] - 1) {
                    break;
                }
                pattern[y * (xNum + 1) + x] = array[y * xNum + x];
            }
        }
        for (let i = 0; i < Math.floor(this.query['num'] / (xNum + 1)); i++) {
            pattern[i * (xNum + 1) + xNum] = array[i + (this.query['num'] - 1) - (Math.floor(this.query['num'] / (xNum + 1)) - 1)];
        }
        return pattern;
    }
}