import Method from './Method';
import * as util from '../util';

export default class Proposed extends Method {
    constructor() {
        super();
        this.prevXNum = 0;
        this.patterns = this.getPatterns();
        this.init();
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

    method() {
        let currentXNum = this.getXNum(this.size, this.space);
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
}