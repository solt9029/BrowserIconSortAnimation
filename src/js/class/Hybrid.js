import Method from './Method';
import * as util from '../util';

export default class Hybrid extends Method {
    method() {
        const min_size = Method.MIN_SIZE;
        const min_space = Method.MIN_SIZE * Method.RATIO;
        let currentXNum = this.getXNum(min_size, min_space);
        let currentYNum = this.getYNum(min_size, min_space);

        if (currentXNum >= this.query['xnum'] && currentYNum >= this.baseYNum) {
            this.scaling();
            this.prevXNum = currentXNum;
        } else {
            this.size = Method.MIN_SIZE;
            this.space = this.size * Method.RATIO;
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
        this.space = this.size * Method.RATIO;
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
}