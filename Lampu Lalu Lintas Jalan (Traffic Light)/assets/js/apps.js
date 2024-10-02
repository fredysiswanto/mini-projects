// Traffic light timing settings (milliseconds)
const greenTime = 8000; // 3 seconds for green light
const yellowTime = 3000; // 1 second for yellow light
const redTime = 10000; // 4 seconds for red light

// Directions (traffic lights IDs)
const directions = ['north', 'east', 'south', 'west'];

let currentIndex = 0; // Start with the first direction (north)

// Control function for traffic lights
function changeLights() {
  const currentDirection = directions[currentIndex];
  const previousDirection =
    directions[(currentIndex + directions.length - 1) % directions.length];

  // Transition previous direction to yellow before turning red
  setTimeout(() => {
    activateLight(previousDirection, 'yellow');
  }, redTime - yellowTime);

  // Set previous direction to red after yellow
  setTimeout(() => {
    activateLight(previousDirection, 'red');
  }, redTime);

  // Transition current direction to yellow before turning green
  setTimeout(() => {
    activateLight(currentDirection, 'yellow');
  }, redTime - yellowTime);

  // Set current direction to green
  setTimeout(() => {
    activateLight(currentDirection, 'green');
  }, redTime);

  // After the green and yellow cycle, move to the next direction and repeat the process
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % directions.length;
    changeLights();
  }, redTime + greenTime + yellowTime);
}

// Activate specific light color for the given direction
function activateLight(direction, color) {
  const light = document.getElementById(`${direction}-light`);
  const colors = ['red', 'yellow', 'green'];

  colors.forEach((c) => {
    const element = light.querySelector(`.${c}`);
    if (c === color) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  });
}

// Start the traffic light cycle
changeLights();
