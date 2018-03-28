import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/scaling.scss';
import Scaling from './class/Scaling';

$(() => {
    new Scaling();
});