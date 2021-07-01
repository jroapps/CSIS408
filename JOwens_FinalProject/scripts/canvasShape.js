// About page canvas shape
const drawShape = () => {
  var canvas = document.getElementById("aboutCanvas");
  var context = canvas.getContext("2d");
  
  // top horizontal line
  drawLine(context, 100, 10, 150, 10);

  // top vertical lines
  drawLine(context, 100, 10, 100, 60);
  drawLine(context, 150, 10, 150, 60);

  // top middle horizontal lines
  drawLine(context, 50, 60, 100, 60);
  drawLine(context, 150, 60, 200, 60);

  // top middle vertical lines
  drawLine(context, 50, 60, 50, 110);
  drawLine(context, 200, 60, 200, 110);

  // bottom middle horizontal lines
  drawLine(context, 50, 110, 100, 110);
  drawLine(context, 150, 110, 200, 110);

  // bottom vertical lines
  drawLine(context, 100, 110, 100, 210);
  drawLine(context, 150, 110, 150, 210);

  // bottom horizontal line
  drawLine(context, 100, 210, 150, 210);

  // top fill
  context.rect(100, 10, 50, 200);

  // middle portion fill
  context.rect(50, 60, 150, 50);

  // fill shape
  context.fillStyle = "#7c1e00";
  context.fill();
  
}

// drawing About page shape
const drawLine = (context, startX, startY, endX, endY) => {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}