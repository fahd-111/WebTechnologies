// Function to fetch and display stories
function displayStories() {
    console.log('Hello')
    $.ajax({
        url: "http://localhost:4000/api/landscapes",
        method: "GET",
        dataType: "json",
        success: function (data) {
            const storiesList = $("#storiesList");
            storiesList.empty();
            // console.log('Hello',data)
            $.each(data, function (index, story) {
                console.log(story._id)
                storiesList.append(
                    `<div class="mb-3">
                <h3>${story.name}</h3>
                <div>${story.description}</div>
                <div>
                    <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${story._id}">Edit</button>
                    <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${story._id}">Delete</button>
                </div>
            </div>
            <hr />
            `
                );
            });
        },
        error: function (error) {
            console.error("Error fetching stories:", error);
        },
    }
    );
    console.log('Hello')
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
    const name = $("#createTitle").val();
    const description = $("#createContent").val();
    if (id) {
        $.ajax({
            url: "http://localhost:4000/api/landscapes/" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                name: name,
                description: description
            }),
            success: function () {
                displayStories(); // Refresh the list after updating the story
            },
            error: function (error) {
                console.error("Error updating story:", error);
            },
        });

    } else {
        console.log(name,"name")
        console.log(description,"description")
        $.ajax({
            url: "http://localhost:4000/api/landscapes",
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                name: "Sample Name",
                description: "Sample Description"
            }),
            success: function(response) {
                console.log(response);
                displayStories()
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
        url: "http://localhost:4000/api/landscapes/"+ storyId,
        method: "GET",
        success: function (data) {
            console.log(data);
            $("#clearBtn").show();
            $("#createTitle").val(data.name);
            $("#createContent").val(data.description);
            $("#createBtn").html("Update");
            $("#createBtn").attr("data-id", data._id);
        },
        error: function (error) {
            console.error("Error deleting story:", error);
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