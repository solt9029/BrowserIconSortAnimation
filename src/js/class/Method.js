import * as util from '../util';

export default class Method {
    constructor() {
        this.query = util.getQuery();
        this.size = this.query['default_size'];
        this.space = this.size * this.query['ratio'];
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

    // patternに合わせて並べる（Proposed）
    animatePatternCards(xNum) {
        for (let y = 0; y < Math.ceil(this.query['num'] / xNum); y++) {
            for (let x = 0; x < xNum; x++) {
                if (!this.query['step']) {
                    $(`#card${this.patterns[xNum - 1][x + y * xNum]}`).stop();
                }
                $(`#card${this.patterns[xNum - 1][x + y * xNum]}`).animate({
                    'top': (y * (this.size + this.space) + this.space) + 'px',
                    'left': (x * (this.size + this.space) + this.space) + 'px',
                    'width': this.size + 'px',
                    'height': this.size + 'px',
                    'fontSize': this.size / 2 + 'px'
                }, this.query['animation']);
            }
        }
    }

    // 順番通りに並べる（ReflowとかScaling）
    animateOrderCards(xNum) {
        for (let y = 0; y < Math.ceil(this.query['num'] / xNum); y++) {
            for (let x = 0; x < xNum; x++) {
                if (!this.query['step']) {
                    $(`#card${x + y * xNum}`).stop();
                }
                $(`#card${x + y * xNum}`).animate({
                    'top': (y * (this.size + this.space) + this.space) + 'px',
                    'left': (x * (this.size + this.space) + this.space) + 'px',
                    'width': this.size + 'px',
                    'height': this.size + 'px',
                    'fontSize': this.size / 2 + 'px'
                }, this.query['animation']);
            }
        }
    }

    scaling() {
        this.size = this.getSize();
        this.space = this.size * this.query['ratio'];
        this.animateOrderCards(this.query['xnum']);
    }

    proposed(endXNum) {
        if (this.prevXNum === endXNum) {
            return;
        }
        // 幅が広がる場合
        for (let xNum = this.prevXNum + 1; xNum < endXNum + 1; xNum++) {
            this.animatePatternCards(xNum);
        }
        // 幅が狭まる場合
        for (let xNum = this.prevXNum - 1; xNum > endXNum - 1; xNum--) {
            this.animatePatternCards(xNum);
        }
        this.prevXNum = endXNum;
        return;
    }

    reflow(endXNum) {
        if (this.prevXNum === endXNum) {
            return;
        }
        for (let xNum = this.prevXNum + 1; xNum < endXNum + 1; xNum++) {
            this.animateOrderCards(xNum);
        }
        for (let xNum = this.prevXNum - 1; xNum > endXNum - 1; xNum--) {
            this.animateOrderCards(xNum);
        }
        this.prevXNum = endXNum;
        return;
    }

    hybrid() {
        const MIN_SPACE = this.query['min_size'] * this.query['ratio'];
        let currentXNum = this.getXNum(this.query['min_size'], MIN_SPACE);
        let currentYNum = this.getYNum(this.query['min_size'], MIN_SPACE);

        if (currentXNum >= this.query['xnum'] && currentYNum >= this.baseYNum) {
            this.scaling();
            this.prevXNum = currentXNum;
        } else {
            this.size = this.query['min_size'];
            this.space = this.size * this.query['ratio'];
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
        let xSizeUnitNum = this.query['xnum'] * 1 + this.query['ratio'] * (this.query['xnum'] + 1);
        let ySizeUnitNum = yNum * 1 + this.query['ratio'] * (yNum + 1);
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