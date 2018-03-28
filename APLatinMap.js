let canvas = document.getElementById("canvas");
let next = document.getElementById("nextButton");
let previous = document.getElementById("previousButton");
let aeneid = document.getElementById("aeneidButton");
let ctx = canvas.getContext("2d");
let aeneidMap = null;
let currentLoc = null;

canvas.addEventListener("mousedown", mouseClick, false);

aeLoc = [
	[579, 284],
	[575, 268],
	[555, 336],
	[546, 362],
	[499, 321],
	[487, 285],
	[465, 282],
	[417, 328],
	[385, 318],
	[346, 340],
	[385, 318],
	[404, 265],
	[380, 252]
];

aeDes = [
	"Troy",
	"Point 2",
	"Point 3",
	"Point 4",
	"Point 5",
	"Point 6",
	"Point 7",
	"Point 8",
	"Point 9 & 11",
	"Point 10",
	"Point 9 & 11",
	"Point 12",
	"Point 13"];

initialPrintMap();

aeneid.onclick = function(){
	aeneidMap = true;

	ctx.beginPath();
	ctx.moveTo(aeLoc[0][0], aeLoc[0][1]);

	for (var i = 1; i < aeLoc.length; i++) {
			ctx.lineTo(aeLoc[i][0], aeLoc[i][1]);
	}
	ctx.stroke();

	ctx.fillStyle = "#7344f4";

	for (var i = 0; i < aeLoc.length; i++) {
		star(ctx, aeLoc[i][0], aeLoc[i][1]);
	}
}

previous.onclick = function(){
	if (currentLoc == 0 || currentLoc == null)
	{
		return;
	}
	if (aeneidMap)
	{
		ctx.fillStyle = "#7344f4";
		star(ctx, aeLoc[currentLoc][0], aeLoc[currentLoc][1])
		currentLoc -= 1;
		ctx.fillStyle = "black";
		star(ctx, aeLoc[currentLoc][0], aeLoc[currentLoc][1])
		displayDescription(currentLoc);
	}
}

next.onclick = function(){
	if (currentLoc == aeLoc.length - 1 || currentLoc == null)
	{
		return;
	}

	if (aeneidMap)
	{
		ctx.fillStyle = "#7344f4";
		star(ctx, aeLoc[currentLoc][0], aeLoc[currentLoc][1])
		currentLoc += 1;
		ctx.fillStyle = "black";
		star(ctx, aeLoc[currentLoc][0], aeLoc[currentLoc][1])
		displayDescription(currentLoc);
	}
}

function mouseClick(event)
{
	let x = event.x - canvas.offsetLeft;
	let y = event.y - canvas.offsetTop;

	for (var i = 0; i < aeLoc.length; i++) {
		if (x >= aeLoc[i][0] - 8 && x <= aeLoc[i][0] + 8 && y >= aeLoc[i][1] - 8 && y <= aeLoc[i][1] + 8)	{
			if (currentLoc != null)
			{
				ctx.fillStyle = "#7344f4";
				star(ctx, aeLoc[currentLoc][0], aeLoc[currentLoc][1])
			}
			currentLoc = i;
			ctx.fillStyle = "black";
			star(ctx, aeLoc[i][0], aeLoc[i][1])
			displayDescription(currentLoc);
		}
	}
	//ctx.clearRect(0, 0, canvas.width, canvas.height)

	//alert("x:" + x + " y:" + y);
}

/*	This function draws a solid star in canvas and was adapted from:
*	https://programmingthomas.wordpress.com/2012/05/16/drawing-stars-with-html5-canvas/
*/
function star(ctx, x, y)
{
	radius = 8;
	points = 5;
	insetFraction = .5;
	ctx.save();
	ctx.beginPath();
	ctx.translate(x, y);
	ctx.moveTo(0,0-radius);
	for (var i = 0; i < points; i++)
	{
		ctx.rotate(Math.PI / points);
		ctx.lineTo(0, 0 - (radius*insetFraction));
		ctx.rotate(Math.PI / points);
		ctx.lineTo(0, 0 - radius);
	}
	ctx.closePath()
	ctx.fill();
	ctx.restore();
}

//Prints initial stars on map
function initialPrintMap()
{
	ctx.fillStyle = "#7344f4";	//Purple

	//Aeneid star map markers
	for (var i = 0; i < aeLoc.length; i++) {
		star(ctx, aeLoc[i][0], aeLoc[i][1]);
	}
}

/*	Sets description element below canvas to tell about the
*	currently selected location.
*/
function displayDescription(location)
{
	let description = document.getElementById("description");
	description.innerText = aeDes[location];
}