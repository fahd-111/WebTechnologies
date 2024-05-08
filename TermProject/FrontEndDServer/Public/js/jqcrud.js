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

// Function to delete a story
function deleteStory() {
    let storyId = $(this).attr("data-id");
    $.ajax({
        url: "http://localhost:4000/api/landscapes/" + storyId,
        method: "DELETE",
        success: function () {
            displayStories(); // Refresh the list after deleting a story
        },
        error: function (error) {
            console.error("Error deleting story:", error);
        },
    });
}
function handleFormSubmission(event) {
    event.preventDefault();

    let id = $("#createBtn").attr("data-id");
    const formData = new FormData();
    formData.append('name', $("#createName").val()); // Updated field ID
    formData.append('description', $("#createDescription").val()); // Updated field ID
    formData.append('image', $("#createImage")[0].files[0]); // New field for image

    console.log(formData,'formmm')
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

    console.log("hi i m uper")
    displayStories();
    console.log("hi i m neeche")
    $(document).on("click", ".btn-del", deleteStory);
    $(document).on("click", ".btn-edit", editBtnClicked);
    // Create Form Submission
    $("#createForm").submit(handleFormSubmission);
    $("#clearBtn").on("click", function (e) {
        e.preventDefault();
        $("#clearBtn").hide();
        $("#createBtn").removeAttr("data-id");
        $("#createBtn").html("Create");
        $("#createTitle").val("");
        $("#createContent").val("");
    });
});