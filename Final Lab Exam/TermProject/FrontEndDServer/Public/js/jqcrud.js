
const limit = 8;

// Function to fetch and display stories
function displayStories(page = 1) {
    $.ajax({
        url: `http://localhost:4000/api/landscapes?page=${page}&limit=${limit}`,
        method: "GET",
        dataType: "json",
        success: function (response) {
            const storiesList = $("#storiesListAdmin");
            storiesList.empty();
            $.each(response.landscapes, function (index, story) {
                console.log(story.name, 'story name')
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

            updatePaginationAdmin(response.total, response.page, response.limit);
        },
        error: function (error) {
            console.error("Error fetching stories:", error);
        },
    });
}

function updatePaginationAdmin(totalItems, currentPage, limit) {
    const totalPages = Math.ceil(totalItems / limit);
    const pagination = $("#paginationAdmin");
    pagination.empty();

    // Previous button
    pagination.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
          <a class="page-link" href="#storiesListAdmin" tabindex="-1" onclick="changePageAdmin(${currentPage - 1})">Previous</a>
        </li>
    `);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        pagination.append(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
              <a class="page-link" href="#storiesListAdmin" onclick="changePageAdmin(${i})">${i}</a>
            </li>
        `);
    }

    // Next button
    pagination.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
          <a class="page-link" href="#storiesListAdmin" onclick="changePageAdmin(${currentPage + 1})">Next</a>
        </li>
    `);
}

function changePage(page) {
    if (page < 1) return;
    const search = $('#searchInput').val();
    displayStoriesClient(page, search);
}

function changePageAdmin(page) {
    if (page < 1) return;
    displayStories(page);
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // add other defaults here if necessary
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
// Function to add to search history in cookies
function addToSearchHistory(searchTerm) {
    let searchHistory = getCookie('searchHistory');
    searchHistory = searchHistory ? JSON.parse(searchHistory) : [];

    if (!searchHistory.includes(searchTerm)) {
        searchHistory.push(searchTerm);
        setCookie('searchHistory', JSON.stringify(searchHistory), { 'max-age': 3600 });
    }
}

function displayStoriesClient(page = 1, search = '') {

    $.ajax({
        url: `http://localhost:4000/api/landscapes?page=${page}&limit=${limit}&search=${search}`,
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
            if (search) {
                addToSearchHistory(search);
            }
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

    $(".page-link").click(function (event) {
        event.preventDefault();
        const page = $(this).data("page");
        const search = $('#searchInput').val();

        displayStoriesClient(page, search);
        if (page && !$(this).parent().hasClass('disabled')) {


        }
    });
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
        if (response.ok) {
            // Handle successful login
            localStorage.setItem("token", data.token); // Save the token
            // save cookie

            document.cookie = `Session Token=${data.session}; Secure; SameSite=Strict`;
            document.cookie = `UserRole=${data.session.userRoles}; Secure; SameSite=Strict`;
            document.cookie = `userData=${data.session.userData}; Secure; SameSite=Strict`;
            // Redirect to the dashboard or other authenticated route
            alert("Login successful.")
            window.location.href = "/";
            // Optionally redirect or update the UI
        } else {
            // Handle login failure
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
            // Handle successful registration here, such as redirecting to the login page

            alert("Registration successful. Please log in.");
            window.location.href = "/login";
        },
        error: function(error) {

            console.error('Error:', error);
            alert('Registration failed: ' + error.responseJSON.message);
        }
    });
}
function displaySearchHistory() {
    const searchHistoryDiv = $("#searchHistory");
    let searchHistory = getCookie('searchHistory');
    searchHistory = searchHistory ? JSON.parse(searchHistory) : [];

    if (searchHistory.length === 0) {
        searchHistoryDiv.html('<p>No search history found.</p>');
    } else {
        const historyList = $('<ul class="list-group"></ul>');
        searchHistory.forEach(term => {
            historyList.append(`<li class="list-group-item">${term}</li>`);
        });
        searchHistoryDiv.append(historyList);
    }
}

function handleLogout(event){
    event.preventDefault();


    $.ajax({
        url: "http://localhost:4000/api/auth/logout",
        method: "POST",
        success: function(response) {
            if (response.message) {
                // Show flash message

                console.log(response.message,"message")
                // Hide the flash message after 3 seconds

                alert("Logout successful.");
                localStorage.removeItem("token");
                // cookies clear
                document.cookie = `Session Token=; Secure`
                document.cookie = `UserRole=; Secure`
                document.cookie = `userData=; Secure`
                window.location.href = "/";
                // Optionally, you can redirect the user after logout
                // window.location.href = '/login';
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }

    })
}
$(document).ready(function() {
    $("#Register-Form").on("submit", handleRegisterFormSubmission);
    $("#logoutForm").on("submit", handleLogout);
    $('#searchButton').click(function () {
        const search = $('#searchInput').val();
        displayStoriesClient(1, search); // Start from page 1 for new search
    });

});
$(document).ready(function() {
    displaySearchHistory();
});
document.addEventListener('DOMContentLoaded', function () {
    var userWidget = document.querySelector('.user-widget');
    var userPopup = document.querySelector('.user-popup');

    userWidget.addEventListener('mouseenter', function () {
        userPopup.classList.remove('hidden');
        userPopup.style.display = 'block';
    });

    userWidget.addEventListener('mouseleave', function () {
        userPopup.classList.add('hidden');
        setTimeout(function () {
            if (!userWidget.matches(':hover')) {
                userPopup.style.display = 'none';
            }
        }, 1000); // Delay for 1 second
    });
});