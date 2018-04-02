$(() => {
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