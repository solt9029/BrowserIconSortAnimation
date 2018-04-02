import Method from './Method';

export default class Proposed extends Method {
    method() {
        let currentXNum = this.getXNum(this.size, this.space);
        this.proposed(currentXNum);
    }
}