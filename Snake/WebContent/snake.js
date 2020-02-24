/**
 * 
 */
var x1 = 0;
var y1 = 500/2;
var y2 = y1;
var x2 = 2;
var orient = "front"; //{front, back, up, down}
var stop = false;
var b = -1;
var c = 1;
var d = 50;
var arr = [];
var interval;
var interval1;
var interval2;


function start()
{
	var name = document.getElementById("start");
	if(name.value == "START")
	{
		document.getElementById("left").onclick = turnLeft;
		document.getElementById("right").onclick = turnRight;
		name.value = "STOP";
		canvas = document.getElementById("game");
		if(canvas)
		{
			ctx = canvas.getContext("2d");
		}
		interval = setInterval(function()
				{
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.fillStyle = "black";
					ctx.fillRect(0, 0, 700, 500);

					
					var temp = {x:0 , y:0};
					temp.x = x1;
					temp.y = y1;
					arr.push(temp);
					
					ctx.lineWidth = 5;
					ctx.strokeStyle = "red";
					
					arr.forEach(function(stuff){
						if(stuff.x == x2 && stuff.y == y2)
						{
							document.getElementById("start").onclick = doNon;
							document.getElementById("left").onclick = doNon;
							document.getElementById("right").onclick = doNon;
							clearInterval(interval);
							ctx.font = "30px Arial";
							ctx.fillStyle = "white";
							ctx.textAlign = "center";
							ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
							name.value = "ENDED";
						}
					});
					
					ctx.stroke();
					coordinates();
					if(x2 >= canvas.width+b || x2 <= c || y2 >= canvas.height+b || y2 <= c)
					{
						document.getElementById("start").onclick = doNon;
						document.getElementById("left").onclick = doNon;
						document.getElementById("right").onclick = doNon;
						clearInterval(interval);
						ctx.font = "30px Arial";
						ctx.fillStyle = "white";
						ctx.textAlign = "center";
						ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
						name.value = "ENDED";
					}
				},d);
	}
	else
	{
		clearInterval(interval);
		clearInterval(interval1);
		clearInterval(interval2);

		document.getElementById("left").onclick = doNon;
		document.getElementById("right").onclick = doNon;
		name.value = "START";
	}
}

function turnLeft()
{
	stop = true;
	orient = checkOrientation(orient, "left");
	
	interval1 = setInterval(function()
			{
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				
				var temp = {x:0 , y:0};
				temp.x = x1;
				temp.y = y1;
				arr.push(temp);
				
				ctx.lineWidth = 5;
				ctx.strokeStyle = "red";
				
				arr.forEach(function(stuff){
					if(stuff.x == x2 && stuff.y == y2)
					{
						document.getElementById("start").onclick = doNon;
						document.getElementById("left").onclick = doNon;
						document.getElementById("right").onclick = doNon;
						clearInterval(interval1);
					}
				});
				
				ctx.stroke();
				coordinates();
				if(stop == true || x2 >= canvas.width+b || x2 <= c || y2 >= canvas.height+b || y2 <= c)
				{
					clearInterval(interval1);
				}
			},d);
}

function turnRight()
{
	stop = true;
	orient = checkOrientation(orient, "right");
	
	interval2 = setInterval(function()
			{
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				
				var temp = {x:0 , y:0};
				temp.x = x1;
				temp.y = y1;
				arr.push(temp);
				
				ctx.lineWidth = 5;
				ctx.strokeStyle = "red";
				
				arr.forEach(function(stuff){
					if(stuff.x == x2 && stuff.y == y2)
					{
						document.getElementById("start").onclick = doNon;
						document.getElementById("left").onclick = doNon;
						document.getElementById("right").onclick = doNon;
						clearInterval(interval2);
					}
				});
				
				ctx.stroke();
				coordinates();
				if(stop == true || x2 >= canvas.width+b || x2 <= c || y2 >= canvas.height+b || y2 <= c)
				{
					clearInterval(interval2);
				}
			},d);
}

//up : x is constant y is decreasing
//down : x is constant y is increasing
//front : y is constant x is increasing
//back : y is constant x is decreasing
function coordinates()
{
	var a = 2;
	switch(orient)
	{
		case "front":
			x1 = x2;
			x2 += a;
			y1 = y2;
			break;
		case "back":
			x1 = x2;
			x2 -= a;
			y1 = y2;
			break;
		case "up":
			y1 = y2;
			y2 -= a;
			x1 = x2;
			break;
		case "down":
			y1 = y2;
			y2 += a;
			x1 = x2;
			break; 
	}
}

function checkOrientation(direction, click)
{
	var facing = direction;
	var button = click;
	
	switch(facing)
	{
		case "front":
			if(button == "left"){facing = "up";}
			else{facing = "down";}
			break;
		case "back":
			if(button == "left"){facing = "down";}
			else{facing = "up";}
			break;
		case "up":
			if(button == "left"){facing = "back";}
			else{facing = "front";}
			break;
		case "down":
			if(button == "left"){facing = "front";}
			else{facing = "back";}
			break;
	}
	return facing;
}

function doNon(){}



