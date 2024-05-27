// function handleRegisterFormSubmission(event) {
//     event.preventDefault();
//     const name = $("#exampleInputName").val()
//     const email = $("#exampleInputEmail").val()
//     const password = $("#exampleInputPassword").val()
//     $.ajax({
//         url: "http://localhost:4000/api/auth/register",
//         method: "POST",
//         // contentType: "application/json",
//         data:{
//             "name":`${name}`,
//             "email":`${email}`,
//             "password":`${password}`,
//             "roles":["user"]
//         },
//         success: function(response) {
//             console.log(response);
//             // Handle successful registration here, such as redirecting to the login page
//             alert("Registration successful. Please log in.");
//             window.location.href = "/login";
//         },
//         error: function(error) {
//             console.error('Error:', error);
//             // alert('Registration failed: ' + error.responseJSON.message);
//         }
//     });
// }
//
// $(document).ready(function() {
//     $("#Register-Form").on("submit", handleRegisterFormSubmission);
// });
