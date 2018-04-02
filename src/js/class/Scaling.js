import Method from './Method';

export default class Scaling extends Method {
    method() {
        this.size = this.getSize();
        this.space = this.size * Method.RATIO;
        this.animateOrderCards(this.query['xnum']);
    }
}