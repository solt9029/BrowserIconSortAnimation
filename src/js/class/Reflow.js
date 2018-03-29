import Method from './Method';

export default class Reflow extends Method {
    constructor() {
        super();
        this.prevXNum = 0;
        this.init();
    }

    animateCards(xNum) {
        for (let y = 0; y < Math.ceil(this.query['num'] / xNum); y++) {
            for (let x = 0; x < xNum; x++) {
                if (!this.query['step']) {
                    $(`#card${x + y * xNum}`).stop();
                }
                $(`#card${x + y * xNum}`).animate({
                    'top': (y * (this.size + this.space) + this.space) + 'px',
                    'left': (x * (this.size + this.space) + this.space) + 'px'
                }, this.query['animation']);
            }
        }
    }

    method() {
        let currentXNum = this.getXNum();
        if (this.prevXNum === currentXNum) {
            return;
        }
        for (let xNum = this.prevXNum + 1; xNum < currentXNum + 1; xNum++) {
            this.animateCards(xNum);
        }
        for (let xNum = this.prevXNum - 1; xNum > currentXNum - 1; xNum--) {
            this.animateCards(xNum);
        }
        this.prevXNum = currentXNum;
        return;
    }
}