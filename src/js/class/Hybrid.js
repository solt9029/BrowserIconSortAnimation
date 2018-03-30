import Method from './Method';
import * as util from '../util';

export default class Hybrid extends Method {
    static get MIN_SIZE() {
        return 90;
    }

    constructor() {
        super();
        this.baseYNum = Math.ceil(this.query['num'] / this.query['xnum']);
        this.prevXNum = this.query['xnum'];
        this.patterns = this.getPatterns();
        this.init();
    }

    method() {
        const min_size = Hybrid.MIN_SIZE;
        const min_space = Hybrid.MIN_SIZE * Hybrid.RATIO;
        let currentXNum = this.getXNum(min_size, min_space);
        let currentYNum = this.getYNum(min_size, min_space);

        if (currentXNum >= this.query['xnum'] && currentYNum >= this.baseYNum) {
            this.scaling();
            this.prevXNum = currentXNum;
        } else {
            this.size = Hybrid.MIN_SIZE;
            this.space = this.size * Hybrid.RATIO;
            if (currentXNum < this.query['xnum']) {
                this.proposed(currentXNum); // 提案手法
            } else if (currentYNum < this.baseYNum) {
                // whileを利用した提案手法
                let xNum = this.query['xnum'];
                while (xNum < currentXNum) {
                    xNum++;
                    let yNum = Math.ceil(this.query['num'] / xNum);
                    if (yNum <= currentYNum) {
                        break;
                    }
                }
                this.proposed(xNum);
            }
        } 
    }

    scaling() {
        this.size = this.getSize();
        this.space = this.size * Hybrid.RATIO;
        this.animateScalingCards();
    }

    proposed(currentXNum) {
        // let currentXNum = this.getXNum(this.size, this.space);
        if (this.prevXNum === currentXNum) {
            return;
        }
        // 幅が広がる場合
        for (let xNum = this.prevXNum + 1; xNum < currentXNum + 1; xNum++) {
            this.animateProposedCards(xNum);
        }
        // 幅が狭まる場合
        for (let xNum = this.prevXNum - 1; xNum > currentXNum - 1; xNum--) {
            this.animateProposedCards(xNum);
        }
        this.prevXNum = currentXNum;
        return;
    }

    animateProposedCards(xNum) {
        for (let y = 0; y < Math.ceil(this.query['num'] / xNum); y++) {
            for (let x = 0; x < xNum; x++) {
                $(`#card${this.patterns[xNum - 1][x + y * xNum]}`).stop().animate({
                    'top': (y * (this.size + this.space) + this.space) + 'px',
                    'left': (x * (this.size + this.space) + this.space) + 'px',
                    'width': this.size + 'px',
                    'height': this.size + 'px',
                    'fontSize': this.size / 2 + 'px'
                }, this.query['animation']);
            }
        }
    }

    animateScalingCards() {
        for (let y = 0; y < Math.ceil(this.query['num'] / this.query['xnum']); y++) {
            for (let x = 0; x < this.query['xnum']; x++) {
                $(`#card${x + y * this.query['xnum']}`).stop().animate({
                    'top': (y * (this.size + this.space) + this.space) + 'px',
                    'left': (x * (this.size + this.space) + this.space) + 'px',
                    'width': this.size + 'px',
                    'height': this.size + 'px',
                    'fontSize': this.size / 2 + 'px'
                }, this.query['animation']);
            }
        }
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
        let xSizeUnitNum = this.query['xnum'] * 1 + this.ratio * (this.query['xnum'] + 1);
        let ySizeUnitNum = yNum * 1 + this.ratio * (yNum + 1);
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