import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/reflow.scss';
import Reflow from './class/Reflow';

$(() => {
    new Reflow();
});