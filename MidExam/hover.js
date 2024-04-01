$(document).ready(function(){
    // Retrieve the alt text from the logo image.
    var logoCaptionText = $(".logo").attr('alt');

    // Attach the mouseenter event handler to all images.
    $("img").on('mouseenter', function(){
        // Check if a caption already exists to avoid adding multiple captions.
        if($(this).next('.caption').length === 0) {
            // Create a caption using the logo's alt text, hide it, insert it after the image, then fade it in.
            $('<div class="caption">' + logoCaptionText + '</div>')
                .hide()
                .insertAfter($(this))
                .fadeIn(200);
        }
    });

    // Attach the mouseleave event handler to all images.
    $("img").on('mouseleave', function(){
        // Fade out and remove the caption on mouse leave.
        $(this).next('.caption').fadeOut(200, function() {
            $(this).remove();
        });
    });
});
