$(() => {
    const query = 'ratio=0.1&default_size=180&min_size=90&step=0&animation=500&xnum=4&num=' + $('#num').val();
    $('#proposed').click(() => {
        location.href = './proposed.html?' + query;
    });
    $('#reflow').click(() => {
        location.href = './reflow.html?' + query;
    });
    $('#scaling').click(() => {
        location.href = './scaling.html?' + query;
    });
    $('#hybrid').click(() => {
        location.href = './hybrid.html?' + query;
    });
});