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
        let currentYNum = this.getYNum(min_size, min_space);
        
        if (currentXNum >= this.query['xnum'] && currentYNum >= this.baseYNum) {
            // スケーリング
        } else if (currentXNum < this.query['xnum']) {
            // 提案手法
        } else if (currentYNum < this.baseYNum) {
            // forを利用した提案手法
        }
    }

    animateCards() {

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
}