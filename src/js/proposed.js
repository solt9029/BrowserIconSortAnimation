import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");
import '../scss/proposed.scss';
import Proposed from './class/Proposed';

$(() => {
    new Proposed();
});