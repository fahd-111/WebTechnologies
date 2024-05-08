$(document).ready(function() {
    // Image click event handler
    $('#dynamic-img').click(function() {
        // Get the source of the image
        var imgSource = $(this).attr('src');
        // Set the text of the 'img-source' element and toggle its display
        $('#img-source').text('Source: ' + imgSource).toggle();
    });
});