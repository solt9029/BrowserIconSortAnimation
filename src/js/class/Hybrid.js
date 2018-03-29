import Method from './Method';

export default class Hybrid extends Method {
    static get MIN_SIZE() {
        return 90;
    }

    constructor() {
        super();
        this.baseYNum = Math.ceil(this.query['num'] / this.query['xnum']);
        this.prevXNum = 0;
        this.prevYNum = 0;
        this.init();
    }

    method() {
        const min_size = Hybrid.MIN_SIZE;
        const min_space = Hybrid.MIN_SIZE * Hybrid.RATIO;
        let currentXNum = this.getXNum(min_size, min_space);
    }

    animateCards() {

    }
}