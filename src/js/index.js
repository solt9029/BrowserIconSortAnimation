import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");

$(() => {
    $('#proposed').click(() => {
        location.href = './proposed.html?step=0&num=' + $('#num').val(); 
    });
    $('#reflow').click(() => {
        location.href = './reflow.html?step=0&num=' + $('#num').val();
    })
});