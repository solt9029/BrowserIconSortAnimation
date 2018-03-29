import Method from './Method';
import * as util from '../util';

export default class Proposed extends Method {
    constructor() {
        super();
        this.prevXNum = 0;
        this.patterns = this.getPatterns();
        this.proposed();
        let proposed = this;
        $(window).on('resize', function() {
            proposed.proposed();
        });
    }

    animateCards(xNum) {
        for (let y = 0; y < Math.ceil(this.query['num'] / xNum); y++) {
            for (let x = 0; x < xNum; x++) {
                if (!this.query['step']) {
                    $(`#card${this.patterns[xNum - 1][x + y * xNum]}`).stop();
                }
                $(`#card${this.patterns[xNum - 1][x + y * xNum]}`).animate({
                    'top': (y * (this.size + this.space) + this.space) + 'px',
                    'left': (x * (this.size + this.space) + this.space) + 'px'
                }, this.query['animation']);
            }
        }
    }

    proposed() {
        let currentXNum = this.getXNum();
        if (this.prevXNum === currentXNum) {
            return;
        }

        // 幅が広がる場合
        for (let xNum = this.prevXNum + 1; xNum < currentXNum + 1; xNum++) {
            this.animateCards(xNum);
        }
        // 幅が狭まる場合
        for (let xNum = this.prevXNum - 1; xNum > currentXNum - 1; xNum--) {
            this.animateCards(xNum);
        }

        this.prevXNum = currentXNum;
        return;
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