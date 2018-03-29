import Method from './Method';

export default class Hybrid extends Method {
    constructor() {
        super();
        this.hybrid();
        let hybrid = this;
        $(window).on('resize', function() {
            hybrid.hybrid();
        });
    }
}