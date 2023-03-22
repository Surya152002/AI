// Function to generate timetable using TSP
function generateTimetable() {
  const classes = document.getElementById("classes").value;
  const teachers = document.getElementById("teachers").value;
  const rooms = document.getElementById("rooms").value;

  // Get review data for each teacher
  const teacherReviews = {
    "teacher1": 4.5,
    "teacher2": 3.8,
    "teacher3": 4.2
  };

  // Generate timetable using TSP
  // ...

  // Update timetable with generated schedule
  const timetableBody = document.getElementById("timetable").getElementsByTagName("tbody")[0];
  const timetableRows = timetableBody.getElementsByTagName("tr");

  // Remove any existing rows
  while (timetableRows.length > 0) {
    timetableRows[0].parentNode.removeChild(timetableRows[0]);
  }

  // Add new rows for generated schedule
  for (let i = 0; i < schedule.length; i++) {
    const row = timetableBody.insertRow(i);
    const timeCell = row.insertCell(0);
    const classCell = row.insertCell(1);
    const teacherCell = row.insertCell(2);
    const roomCell = row.insertCell(3);

    timeCell.innerHTML = schedule[i].time;
    classCell.innerHTML = schedule[i].class;
    teacherCell.innerHTML = schedule[i].teacher;
    roomCell.innerHTML = schedule[i].room;

    // Add review score for each teacher
    const reviewCell = row.insertCell(4);
    const teacherReview = teacherReviews[schedule[i].teacher];
    reviewCell.innerHTML = teacherReview.toFixed(1);
  }
}

