import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");

$(() => {
    $('#proposed').click(() => {
        location.href = './proposed.html?step=0&num=' + $('#num').val(); 
    });
    $('#reflow').click(() => {
        location.href = './reflow.html?step=0&num=' + $('#num').val();
    });
    $('#scaling').click(() => {
        location.href = './scaling.html?xnum=4&num=' + $('#num').val();
    });
});