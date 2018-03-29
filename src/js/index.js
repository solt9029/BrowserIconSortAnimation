$(() => {
    $('#proposed').click(() => {
        location.href = './proposed.html?step=0&animation=500&xnum=4&num=' + $('#num').val(); 
    });
    $('#reflow').click(() => {
        location.href = './reflow.html?step=0&animation=500&num=' + $('#num').val();
    });
    $('#scaling').click(() => {
        location.href = './scaling.html?step=0&animation=500&xnum=4&num=' + $('#num').val();
    });
    $('#hybrid').click(() => {
        location.href = './hybrid.html?step=0&animation=500&xnum=4&num=' + $('#num').val();
    });
});