import Method from './Method';
import * as util from '../util';

export default class Proposed extends Method {
    method() {
        let currentXNum = this.getXNum(this.size, this.space);
        if (this.prevXNum === currentXNum) {
            return;
        }

        // 幅が広がる場合
        for (let xNum = this.prevXNum + 1; xNum < currentXNum + 1; xNum++) {
            this.animatePatternCards(xNum);
        }
        // 幅が狭まる場合
        for (let xNum = this.prevXNum - 1; xNum > currentXNum - 1; xNum--) {
            this.animatePatternCards(xNum);
        }

        this.prevXNum = currentXNum;
        return;
    }
}