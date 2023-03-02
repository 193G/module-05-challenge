
// Select all save buttons
const saveButtons = document.querySelectorAll(".saveBtn");

// Add click event listener to each save button
saveButtons.forEach((saveButton) => {
  saveButton.addEventListener("click", function () {
    // Get the id of the time-block containing the save button
    const timeBlockId = this.parentNode.id;

    // Get the user input description from the textarea in the time-block
    const description = this.parentNode.querySelector(".description").value;

    // Save the description in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, description);
  });
});

// Get the current hour in 24-hour time using Day.js
const currentHour = dayjs().hour();

// Loop through each time-block element
$(".time-block").each(function () {
  // Get the hour value from the time-block's id
  const blockHour = parseInt($(this).attr("id").split("-")[1]);

  // Compare the blockHour to the currentHour to determine if it's past, present, or future
  if (blockHour < currentHour) {
    $(this).addClass("past");
  } else if (blockHour === currentHour) {
    $(this).addClass("present");
  } else {
    $(this).addClass("future");
  }
});

// Loop through each time-block element
$(".time-block").each(function () {
  // Get the id of the time-block element
  const timeBlockId = $(this).attr("id");

  // Get the saved description from localStorage using the timeBlockId as the key
  const savedDescription = localStorage.getItem(timeBlockId);

  // If there is a saved description, set the value of the textarea element
  if (savedDescription) {
    $(this).find(".description").val(savedDescription);
  }
});

// Get the current date using Day.js
const currentDate = dayjs().format("dddd, MMMM D");

// Append the current date to the header element
$("header").append(`<h2>${currentDate}</h2>`);

$("#clear").click(function(event) {
  event.preventDefault();
  if (confirm("Are you sure you want to clear all?  Click 'OK' for yes. ")) {
   $(".description").val("");
  localStorage.clear();
} else {
  alert("Nothing has been cleared.");
}
 
})