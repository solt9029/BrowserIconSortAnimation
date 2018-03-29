import Method from './Method';

export default class Scaling extends Method {
    constructor() {
        super();
        this.scaling();
        let scaling = this;
        $(window).on('resize', function() {
            scaling.scaling();
        });
    }

    scaling() {
        this.size = this.getSize();
        this.space = this.getSpace();
        this.animateCards();
    }

    animateCards() {
        for (let y = 0; y < Math.ceil(this.query['num'] / this.query['xnum']); y++) {
            for (let x = 0; x < this.query['xnum']; x++) {
                $(`#card${x + y * this.query['xnum']}`).stop().animate({
                    'top': (y * (this.size + this.space) + this.space) + 'px',
                    'left': (x * (this.size + this.space) + this.space) + 'px',
                    'width': this.size + 'px',
                    'height': this.size + 'px',
                    'fontSize': this.size / 2 + 'px'
                }, this.query['animation']);
            }
        }
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