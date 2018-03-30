import * as util from '../util';

export default class Method {
    static get DEFAULT_SIZE() {
        return 180;
    }

    static get RATIO() {
        return 1.0 / 9.0;
    }

    constructor() {
        this.query = util.getQuery();
        this.size = Method.DEFAULT_SIZE;
        this.space = this.size * Method.RATIO;
        this.addCards();
    }

    init() {
        this.method();
        let method = this;
        $(window).on('resize', function() {
            method.method();
        });
    }

    method() {
    }

    addCards() {
        for (let i = 0; i < this.query['num']; i++) {
            $('body').append(`<div class="card" id="card${i}">${i}</div>`);
        }
    }

    getXNum(size, space) {
        let xNum = 1;
        if (Math.floor((window.innerWidth - space) / (space + size)) > 0) {
            xNum = Math.floor((window.innerWidth - space) / (space + size));
        }
        if (xNum > this.query['num']) {
            xNum = this.query['num'];
        }
        return xNum;
    }
}