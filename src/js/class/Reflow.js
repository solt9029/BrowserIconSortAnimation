import Method from './Method';

export default class Reflow extends Method {
    method() {
        let currentXNum = this.getXNum(this.size, this.space);
        if (this.prevXNum === currentXNum) {
            return;
        }
        for (let xNum = this.prevXNum + 1; xNum < currentXNum + 1; xNum++) {
            this.animateOrderCards(xNum);
        }
        for (let xNum = this.prevXNum - 1; xNum > currentXNum - 1; xNum--) {
            this.animateOrderCards(xNum);
        }
        this.prevXNum = currentXNum;
        return;
    }
}