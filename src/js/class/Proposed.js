import Method from './Method';
import * as util from '../util';

export default class Proposed extends Method {
    method() {
        let currentXNum = this.getXNum(this.size, this.space);
        this.proposed(currentXNum);
    }
}