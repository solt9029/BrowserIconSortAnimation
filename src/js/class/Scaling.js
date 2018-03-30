import Method from './Method';

export default class Scaling extends Method {
    method() {
        this.size = this.getSize();
        this.space = this.size * Method.RATIO;
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
}