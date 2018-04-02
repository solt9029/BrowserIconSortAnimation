import Method from './Method';

export default class Reflow extends Method {
    method() {
        let currentXNum = this.getXNum(this.size, this.space);
        this.reflow(currentXNum);
    }
}