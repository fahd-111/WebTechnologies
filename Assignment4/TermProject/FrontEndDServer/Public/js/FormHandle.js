$(document).ready(function() {
    $('#contact').submit(function(event) {
        event.preventDefault();

        const formData = {
            name: $('input[placeholder="Name"]').val(),
            email: $('input[placeholder="Email Address"]').val(),
            phoneNumber: $('input[placeholder="Phone Number"]').val(),
            message: $('textarea[placeholder="Type your message here...."]').val()
        };

        console.log(JSON.stringify(formData, null, 4));
    });
});