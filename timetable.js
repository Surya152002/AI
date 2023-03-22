// Define the graph as an adjacency matrix
const graph = [  [0, 1, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 1, 1, 0]
];

// Define the weights for each edge
const weights = [  [0, 3, 1, 2, 3],
  [3, 0, 2, 1, 3],
  [1, 2, 0, 3, 1],
  [2, 1, 3, 0, 2],
  [3, 3, 1, 2, 0]
];

// Function to find the shortest Hamiltonian path through the graph
function tsp() {
  const n = graph.length;
  const visited = new Array(n).fill(false);
  const path = new Array(n).fill(-1);

  visited[0] = true;
  path[0] = 0;

  for (let i = 1; i < n; i++) {
    let minWeight = Infinity;
    let nextNode = -1;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && weights[path[i - 1]][j] < minWeight) {
        minWeight = weights[path[i - 1]][j];
        nextNode = j;
      }
    }

    visited[nextNode] = true;
    path[i] = nextNode;
  }

  // Add the last edge to complete the cycle
  path[n] = path[0];

  return path;
}

// Generate the schedule based on the TSP path
function generateSchedule(path) {
  const schedule = [];

  for (let i = 0; i < path.length - 1; i++) {
    const time = `${i + 8}:00am - ${i + 9}:00am`;
    const class_ = classes[path[i]];
    const teacher = teachers[path[i]];
    const room = rooms[path[i]];

    schedule.push({time, class_, teacher, room});
  }

  return schedule;
}

// Function to generate timetable using TSP
function generateTimetable() {
  const classes = document.getElementById("classes").value;
  const teachers = document.getElementById("teachers").value;
  const rooms = document.getElementById("rooms").value;

// Validate inputs
if (!classes || !teachers || !rooms) {
return "Please provide values for all inputs";
}

// Convert input strings into arrays
const classesArr = classes.split(",");
const teachersArr = teachers.split(",");
const roomsArr = rooms.split(",");

// Check if inputs have the same length
if (classesArr.length !== teachersArr.length || classesArr.length !== roomsArr.length) {
return "Number of classes, teachers, and rooms should be equal";
}

// Create a dictionary to map class names to indices
const classIndices = {};
for (let i = 0; i < classesArr.length; i++) {
classIndices[classesArr[i]] = i;
}

// Create a dictionary to map teacher names to indices
const teacherIndices = {};
for (let i = 0; i < teachersArr.length; i++) {
teacherIndices[teachersArr[i]] = i;
}

// Create a dictionary to map room names to indices
const roomIndices = {};
for (let i = 0; i < roomsArr.length; i++) {
roomIndices[roomsArr[i]] = i;
}

// Create the graph based on the input arrays
const n = classesArr.length;
const graph = [];
const weights = [];

for (let i = 0; i < n; i++) {
const row = new Array(n).fill(0);
const weightRow = new Array(n).fill(0);
for (let j = 0; j < n; j++) {
  if (i !== j) {
    row[j] = 1;
    weightRow[j] = Math.floor(Math.random() * 10) + 1;
  }
}

graph.push(row);
weights.push(weightRow);
}

// Find the shortest Hamiltonian path through the graph
const path = tsp();

// Generate the schedule based on the TSP path
const schedule = generateSchedule(path);

return schedule;
}
