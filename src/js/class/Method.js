import * as util from '../util';

export default class {
    constructor() {
        this.query = util.getQuery();
        this.size = 180;
        this.space = 20;
    }

    addCards() {
        for (let i = 0; i < this.query['num']; i++) {
            $('body').append(`<div class="card" id="card${i}">${i}</div>`);
        }
    }

    getXNum() {
        let xNum = 1;
        if (Math.floor((window.innerWidth - this.space) / (this.space + this.size)) > 0) {
            xNum = Math.floor((window.innerWidth - this.space) / (this.space + this.size));
        }
        if (xNum > this.query['num']) {
            xNum = this.query['num'];
        }
        return xNum;
    }
}