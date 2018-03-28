let canvas = document.getElementById("canvas");
let next = document.getElementById("nextButton");
let previous = document.getElementById("previousButton");
let aeneid = document.getElementById("aeneidButton");
let deBello = document.getElementById("deBelloButton");
let ctx = canvas.getContext("2d");
let aeneidMap = null;
let currentLoc = null;
const aeUnFocused = "#7344f4";	//Purple
const dbUnFocused = "red";		//Red
const focused = "black";		//Black
const xCol = 0;
const yCol = 1;
const starRadius = 8;

canvas.addEventListener("mousedown", mouseClick, false);

const aeLoc = [
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

const aeDes = [
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

const dbLoc = [
	[362, 205],
	[226, 85],
	[247, 163]
];

const dbDes = [
	"Mutina?",
	"Britanni",
	"Avaricum"
];

initialPrintMap();

aeneid.onclick = function()
{
	if (!aeneidMap)
	{
		resetMap();

		aeneidMap = true;

		ctx.beginPath();
		ctx.moveTo(aeLoc[0][xCol], aeLoc[0][yCol]);

		for (var i = 1; i < aeLoc.length; i++)
		{
			ctx.lineTo(aeLoc[i][xCol], aeLoc[i][yCol]);
		}

		ctx.stroke();

		initialPrintMap();
	}
}

deBello.onclick = function()
{
	if (aeneidMap || aeneidMap == null)
	{
		resetMap();

		aeneidMap = false;

		ctx.beginPath();
		ctx.moveTo(dbLoc[0][xCol], dbLoc[0][yCol]);

		for (var i = 1; i < dbLoc.length; i++)
		{
			ctx.lineTo(dbLoc[i][xCol], dbLoc[i][yCol]);
		}

		ctx.stroke();

		initialPrintMap();
	}
}

previous.onclick = function()
{
	if (currentLoc == 0 || currentLoc == null)
	{
		return;
	}
	if (aeneidMap)
	{
		ctx.fillStyle = aeUnFocused;
		star(ctx, aeLoc[currentLoc][xCol], aeLoc[currentLoc][yCol])
		currentLoc -= 1;
		ctx.fillStyle = focused;
		star(ctx, aeLoc[currentLoc][xCol], aeLoc[currentLoc][yCol])
		displayDescription(currentLoc);
	}
	else if (aeneidMap != null)
	{
		ctx.fillStyle = dbUnFocused;
		star(ctx, dbLoc[currentLoc][xCol], dbLoc[currentLoc][yCol])
		currentLoc -= 1;
		ctx.fillStyle = focused;
		star(ctx, dbLoc[currentLoc][xCol], dbLoc[currentLoc][yCol])
		displayDescription(currentLoc);
	}
}

next.onclick = function()
{
	if (aeneidMap && currentLoc == aeLoc.length - 1 || !aeneidMap && currentLoc == dbLoc.length - 1 || currentLoc == null)
	{
		return;
	}

	if (aeneidMap)
	{
		ctx.fillStyle = aeUnFocused;
		star(ctx, aeLoc[currentLoc][xCol], aeLoc[currentLoc][yCol])
		currentLoc += 1;
		ctx.fillStyle = focused;
		star(ctx, aeLoc[currentLoc][xCol], aeLoc[currentLoc][yCol])
		displayDescription(currentLoc);
	}
	else if (aeneidMap != null)
	{
		ctx.fillStyle = dbUnFocused;
		star(ctx, dbLoc[currentLoc][xCol], dbLoc[currentLoc][yCol])
		currentLoc += 1;
		ctx.fillStyle = focused;
		star(ctx, dbLoc[currentLoc][xCol], dbLoc[currentLoc][yCol])
		displayDescription(currentLoc);
	}
}

function mouseClick(event)
{
	let x = event.x - canvas.offsetLeft;
	let y = event.y - canvas.offsetTop;

	if (aeneidMap)
	{
		for (var i = 0; i < aeLoc.length; i++)
		{
			if (x >= aeLoc[i][xCol] - starRadius && x <= aeLoc[i][xCol] + starRadius && y >= aeLoc[i][yCol] - starRadius && y <= aeLoc[i][yCol] + starRadius)
			{
				if (currentLoc != null)
				{
					ctx.fillStyle = aeUnFocused;
					star(ctx, aeLoc[currentLoc][xCol], aeLoc[currentLoc][yCol])
				}
				currentLoc = i;
				ctx.fillStyle = focused;
				star(ctx, aeLoc[i][xCol], aeLoc[i][yCol])
				displayDescription(currentLoc);
			}
		}
	}
	else if (aeneidMap != null)
	{
		for (var i = 0; i < dbLoc.length; i++)
		{
			if (x >= dbLoc[i][xCol] - starRadius && x <= dbLoc[i][xCol] + starRadius && y >= dbLoc[i][yCol] - starRadius && y <= dbLoc[i][yCol] + starRadius)
			{
				if (currentLoc != null)
				{
					ctx.fillStyle = dbUnFocused;
					star(ctx, dbLoc[currentLoc][xCol], dbLoc[currentLoc][yCol])
				}
				currentLoc = i;
				ctx.fillStyle = focused;
				star(ctx, dbLoc[i][xCol], dbLoc[i][yCol])
				displayDescription(currentLoc);
			}
		}
	}

	//alert("x:" + x + " y:" + y);
}

/*	This function draws a solid star in canvas and was adapted from:
*	https://programmingthomas.wordpress.com/2012/05/16/drawing-stars-with-html5-canvas/
*/
function star(ctx, x, y)
{
	radius = starRadius;
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
	ctx.fillStyle = aeUnFocused;

	//Aeneid star map markers
	for (var i = 0; i < aeLoc.length; i++)
	{
		star(ctx, aeLoc[i][xCol], aeLoc[i][yCol]);
	}

	ctx.fillStyle = dbUnFocused;

	//De Bello star map markers
	for (var i = 0; i < dbLoc.length; i++)
	{
		star(ctx, dbLoc[i][xCol], dbLoc[i][yCol]);
	}
}

//Resets webpage to initial state
function resetMap()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	aeneidMap = null;
	currentLoc = null;
	displayDescription(null);
	initialPrintMap();
}

/*	Sets description element below canvas to tell about the
*	currently selected location.
*/
function displayDescription(location)
{
	let description = document.getElementById("description");

	if (location != null)
	{
		if (aeneidMap)
		{
			description.innerText = aeDes[location];
		}
		else if (aeneidMap != null)
		{
			description.innerText = dbDes[location];
		}
	}
	else
	{
		description.innerText = "";
	}
}