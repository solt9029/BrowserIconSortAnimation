import Method from './Method';

export default class Scaling extends Method {
    constructor() {
        this.query = util.getQuery();
        this.size = 180;
        this.space = 20;
        this.ratio = 1.0 / 9.0;
    }

    scaling() {
        this.size = this.getSize();
        this.space = this.getSpace();
        this.animateCards();
    }

    animateCards() {
        for (let y = 0; y < Math.ceil(this.query['num'] / this.query['xnum']); y++) {
            for (let x = 0; x < this.query['xnum']; x++) {
                if (!this.query['step']) {
                    $(`#card${x + y * this.query['xnum']}`).stop();
                }
                $(`#card${x + y * this.query['xnum']}`).animate({
                    'top': (y * (size + space) + space) + 'px',
                    'left': (x * (size + space) + space) + 'px',
                    'width': size + 'px',
                    'height': size + 'px',
                    'fontSize': size / 2 + 'px'
                }, this.query['animation']);
            }
        }
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

    getSize() {
        let yNum = Math.ceil(this.query['num'] / this.query['xnum']);
        let xSizeUnitNum = this.query['xnum'] * 1 + this.ratio * (this.query['xnum'] + 1);
        let ySizeUnitNum = yNum * 1 + this.ratio * (yNum + 1);
        return window.innerWidth / xSizeUnitNum > window.innerHeight / ySizeUnitNum ? window.innerHeight / ySizeUnitNum : window.innerWidth / xSizeUnitNum;
    }

    getSpace() {
        return this.size * this.ratio;
    }
}