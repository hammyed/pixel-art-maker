//Canvas variable declared to be reset/set via the makeGrid function
const canvas = document.getElementById('pixelCanvas');
//Color selection variable declared with default value (black)
var colorChoice = document.getElementById('colorPicker').value;
//Grid size form is selected for listener event
var gridForm = document.getElementById('sizePicker');
//Variable to show whether mouse is clicked on canvas to allow click-and-drag drawing
var isDrawing = false;

//Listens for submition of grid size form to create grid
gridForm.addEventListener('submit', makeGrid);

//Listens for color to be chosen to update the value of colorChoice from the default
document.getElementById('colorPicker').onchange = function() {
  colorChoice = event.target.value;
};

//function creates the grid based on the height and width values submitted via grid form
function makeGrid() {
  event.preventDefault();
  canvas.innerHTML = '';
  //var canvas = document.getElementById('pixelCanvas');
  let height = Number(gridForm.children[0].value);
  let width = Number(gridForm.children[1].value);
    for (i=0; i<height; i++) {
      var row = canvas.insertRow(i);
      for (j=0; j<width; j++) {
        var column = row.insertCell(j);
      };
    };
  //Sets event listeners on the drawing canvas for mouse presses to toggle isDrawing
  canvas.addEventListener('mousedown', function(){
    isDrawing = true;
  });
  canvas.addEventListener('mouseup', function(){
    isDrawing = false;
  });

  //Sets event listeners on each canvas cell to listen for a click to color the cell,
  //or the mouse to be dragged over cell while isDrawing is true to color the cell.
  let tds = canvas.querySelectorAll('td');
  tds.forEach(function(td){
    td.addEventListener('click', colorCell);
    td.addEventListener('mousemove', function(){
      if (isDrawing === true){
        //colorCell;
        let cellRow = event.target.parentElement.rowIndex;
        let cellCol = event.target.cellIndex;
        canvas.rows[cellRow].cells[cellCol].setAttribute('bgColor', colorChoice);
      };
    });
  });
};

//function to set target cell background color to selected colorChoice
function colorCell() {
  let cellRow = event.target.parentElement.rowIndex;
  let cellCol = event.target.cellIndex;
  canvas.rows[cellRow].cells[cellCol].setAttribute('bgColor', colorChoice);
};
