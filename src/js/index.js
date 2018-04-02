$(() => {
    const query = 'ratio=0.1&default_size=180&min_size=90&step=0&animation=500&xnum=4&num=' + $('#num').val();
    $('button').on('click', function() {
        const path = './' + $(this).attr('id') + '.html';
        const query = 
            'num=' + $('#num').val() + 
            '&xnum=' + $('#xnum').val() + 
            '&defaultSize=' + $('#defaultSize').val() + 
            '&minSize=' + $('#minSize').val() + 
            '&animation=' + $('#animation').val() + 
            '&ratio=' + $('#ratio').val() + 
            '&step=' + $('#step:checked').val();
        location.href = path + '?' + query;
    });
});