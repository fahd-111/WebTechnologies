// Function to fetch and display stories
function displayStories() {
    $.ajax({
        url: "http://localhost:4000/api/landscapes",
        method: "GET",
        dataType: "json",
        success: function (data) {
            const storiesList = $("#storiesList");
            storiesList.empty();
            $.each(data, function (index, story) {
                // Assuming `story._id` is available and used to construct the URL to the image
                let imageUrl = `http://localhost:4000/api/landscapes/image/${story._id}`;
                let storyContent = `

                <div class="mb-3 storiesChild">
                    <div class="d-flex col-12">
                        <div class="col-8">
                            <h3>${story.name}</h3>
                            <p>${story.description}</p>
                        </div>
                        <img src="${imageUrl}" alt="${story.name}" 
                         class="image-thumbnail col-4"
                         style="max-width: 150px;">
                    </div>
                    <div>
                        <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${story._id}">Edit</button>
                        <button class="btn btn-danger btn-sm btn-del" data-id="${story._id}">Delete</button>
                    </div>
                </div>
                <hr />`;
                storiesList.append(storyContent);
            });
        },
        error: function (error) {
            console.error("Error fetching stories:", error);
        },
    });
}

const limit = 8;

function displayStoriesClient(page = 1) {
    $.ajax({
        url: `http://localhost:4000/api/landscapes?page=${page}&limit=${limit}`,
        method: "GET",
        dataType: "json",
        success: function (response) {
            const storiesList = $("#storiesListClient");
            storiesList.empty();
            $.each(response.landscapes, function (index, story) {
                let imageUrl = `http://localhost:4000/api/landscapes/image/${story._id}`;
                let storyContent = `
                    <div class="card" style="width: 18rem;">
                      <img class="card-img-top" src="${imageUrl}" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title">${story.name}</h5>
                        <p class="card-text">${story.description}</p>
                      </div>
                    </div>
                
                <hr />`;
                storiesList.append(storyContent);
            });

            updatePagination(response.total, response.page, response.limit);
        },
        error: function (error) {
            console.error("Error fetching stories:", error);
        },
    });
}

function updatePagination(totalItems, currentPage, limit) {
    const totalPages = Math.ceil(totalItems / limit);
    const pagination = $("#pagination");
    pagination.empty();

    // Previous button
    pagination.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
          <a class="page-link" href="#" tabindex="-1" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>
    `);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        pagination.append(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
              <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `);
    }

    // Next button
    pagination.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
          <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>
    `);
}

function changePage(page) {
    if (page < 1) return;
    displayStoriesClient(page);
}

// Function to delete a story
async function deleteStory() {
    const landscapeId = $(this).attr("data-id");
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage or other storage

    if (!token) {
        alert("No token found. Please login.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/api/landscapes/${landscapeId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to delete landscape:", errorData.message);
            return;
        }

        displayStories(); // Refresh the list after deleting a landscape
    } catch (error) {
        console.error("Error deleting landscape:", error);
    }
}

function handleCreateLandscape(event) {
    event.preventDefault();
    let id = $("#createBtn").attr("data-id");
    const formData = new FormData();
    formData.append('name', $("#createName").val()); // Updated field ID
    formData.append('description', $("#createDescription").val()); // Updated field ID
    formData.append('image', $("#createImage")[0].files[0]); // New field for image
    
    if (id) {
        $.ajax({
            url: `http://localhost:4000/api/landscapes/${id}`,
            method: "PUT",
            processData: false,
            contentType: false,
            data: formData,
            success: function () {
                displayStories(); // Refresh the list after updating the story
            },
            error: function (error) {
                console.error("Error updating story:", error);
            },
        });
    } else {

        $.ajax({
            url: "http://localhost:4000/api/landscapes",
            method: "POST",
            processData: false,
            contentType: false,
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")} `,
            },
            data: formData,
            success: function(response) {
                console.log(response);
                displayStories(); // Assuming you want to refresh the stories list here as well
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
}

function editBtnClicked(event) {
    event.preventDefault();
    let storyId = $(this).attr("data-id");
    $.ajax({
        url: "http://localhost:4000/api/landscapes/" + storyId,
        method: "GET",
        success: function (data) {
            console.log(data);
            $("#clearBtn").show();
            $("#createName").val(data.name); // Updated field ID for name
            $("#createDescription").val(data.description); // Updated field ID for description
            $("#createBtn").text("Update"); // Changed from .html to .text for security
            $("#createBtn").attr("data-id", data._id);
        },
        error: function (error) {
            console.error("Error retrieving story:", error); // Corrected error message
        },
    });
}

$(document).ready(function () {
    // Initial display of stories
    displayStories();
    displayStoriesClient();

    $(document).on("click", ".btn-del", deleteStory);
    $(document).on("click", ".btn-edit", editBtnClicked);
    // Create Form Submission
    $("#createForm").submit(handleCreateLandscape);
    $("#clearBtn").on("click", function (e) {
        e.preventDefault();
        $("#clearBtn").hide();
        $("#createBtn").removeAttr("data-id");
        $("#createBtn").html("Create");
        $("#createTitle").val("");
        $("#createContent").val("");
    });
});
async function handleFormSubmission(event) {
    event.preventDefault();

    const email = $("#email").val()
    const password = $("#password").val()

    try {
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("Response Data:", data); // Log the response to verify

        console.log("Response:", response); // Log the response to verify
        if (response.ok) {
            // Handle successful login
            console.log("Login session:", data.session);
            localStorage.setItem("token", data.token); // Save the token
            // save cookie

            document.cookie = `Session Token=${data.session}; Secure; SameSite=Strict`;
            document.cookie = `UserRole=${data.session.userRoles}; Secure; SameSite=Strict`;
            document.cookie = `userData=${data.session.userData}; Secure; SameSite=Strict`;
            console.log("Cookie:", document.cookie);
            // Redirect to the dashboard or other authenticated route
            // window.location.href = "/";
            // Optionally redirect or update the UI
        } else {
            // Handle login failure
            console.error("Login failed:", data.message);
            alert("Login failed: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
}

$(document).ready(function() {
    $("#Login-Form").on("submit", handleFormSubmission);
});
function handleRegisterFormSubmission(event) {
    event.preventDefault();
    const name = $("#exampleInputName").val()
    const email = $("#exampleInputEmail").val()
    const password = $("#exampleInputPassword").val()
    $.ajax({
        url: "http://localhost:4000/api/auth/register",
        method: "POST",
        // contentType: "application/json",
        data:{
            "name":`${name}`,
            "email":`${email}`,
            "password":`${password}`,
            "roles":["user"]
        },
        success: function(response) {
            console.log(response);
            // Handle successful registration here, such as redirecting to the login page
            alert("Registration successful. Please log in.");
            window.location.href = "/login";
        },
        error: function(error) {
            console.error('Error:', error);
            // alert('Registration failed: ' + error.responseJSON.message);
        }
    });
}

$(document).ready(function() {
    $("#Register-Form").on("submit", handleRegisterFormSubmission);
});

