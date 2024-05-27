// async function handleFormSubmission(event) {
//     event.preventDefault();
//
//     const email = $("#email").val()
//     const password = $("#password").val()
//
//     try {
//         const response = await fetch("http://localhost:4000/api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ email, password })
//         });
//
//         const data = await response.json();
//         console.log("Response Data:", data); // Log the response to verify
//
//         console.log("Response:", response); // Log the response to verify
//         if (response.ok) {
//             // Handle successful login
//             console.log("Login successful:", data);
//             localStorage.setItem("token", data.token); // Save the token
//             // Optionally redirect or update the UI
//         } else {
//             // Handle login failure
//             console.error("Login failed:", data.message);
//             alert("Login failed: " + data.message);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         alert("An error occurred. Please try again.");
//     }
// }
//
// $(document).ready(function() {
//     $("#Login-Form").on("submit", handleFormSubmission);
// });
