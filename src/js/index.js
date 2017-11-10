import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");

$(() => {
    $('#proposed').click(() => {
        location.href = './proposed.html?num=' + $('#num').val(); 
    });
    $('#reflow').click(() => {
        location.href = './reflow.html?num=' + $('#num').val();
    })
});