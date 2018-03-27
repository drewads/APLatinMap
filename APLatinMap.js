let canvas = document.getElementById("canvas");
canvas.style.backgroundImage = "url('MedMap.jpg')";

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
	[404, 265],
	[380, 252]
];

let currentLoc = null;

let ctx=canvas.getContext("2d");

//This function draws a solid star in canvas, and was sourced from: https://programmingthomas.wordpress.com/2012/05/16/drawing-stars-with-html5-canvas/
function star(ctx, x, y, r, p, m)
{
	ctx.save();
	ctx.beginPath();
	ctx.translate(x, y);
	ctx.moveTo(0,0-r);
	for (var i = 0; i < p; i++)
	{
		ctx.rotate(Math.PI / p);
		ctx.lineTo(0, 0 - (r*m));
		ctx.rotate(Math.PI / p);
		ctx.lineTo(0, 0 - r);
	}
	ctx.closePath()
	ctx.fill();
	ctx.restore();
}

ctx.fillStyle = "#7344f4";

ctx.beginPath();
ctx.moveTo(aeLoc[0][0], aeLoc[0][1]);

for (var i = 1; i <= aeLoc.length; i++) {
	if (i == 10)
	{
		ctx.lineTo(aeLoc[8][0], aeLoc[8][1]);
	}
	else if (i > 10)
	{
		ctx.lineTo(aeLoc[i - 1][0], aeLoc[i - 1][1]);
	}
	else
	{
		ctx.lineTo(aeLoc[i][0], aeLoc[i][1]);
	}
}
ctx.stroke();

for (var i = 0; i < aeLoc.length; i++) {
	star(ctx, aeLoc[i][0], aeLoc[i][1], 8, 5, .5);
}

//Just for development
canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event)
{
	let x = event.x - canvas.offsetLeft;
	let y = event.y - canvas.offsetTop;

	for (var i = 0; i < aeLoc.length; i++) {
		if (x >= aeLoc[i][0] - 8 && x <= aeLoc[i][0] + 8 && y >= aeLoc[i][1] - 8 && y <= aeLoc[i][1] + 8)	{
			if (currentLoc != null)
			{
				ctx.fillStyle = "#7344f4";
				star(ctx, aeLoc[currentLoc][0], aeLoc[currentLoc][1], 8, 5, .5)
			}
			currentLoc = i;
			ctx.fillStyle = "black";
			star(ctx, aeLoc[i][0], aeLoc[i][1], 8, 5, .5)
		}
	}

	//alert("x:" + x + " y:" + y);
}