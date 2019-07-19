//Font Awesome CSS - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
//Bootstrap CSS - https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css
//JQuery JS - https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
//Bootstrap JS - https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js


/*
Button preference:
<i class="fa fa-circle-thin" aria-hidden="true"></i> // Circle -O - Green -1
<i class="fa fa-heart-o" aria-hidden="true"></i> // Heart - Red -2
<i class="fa fa-square-o" aria-hidden="true"></i> // Square - Yellow -3
<i class="fa fa-times" aria-hidden="true"></i> // X - Blue -4
*/

/*
Sound resources
https://s3.amazonaws.com/freecodecamp/simonSound1.mp3
https://s3.amazonaws.com/freecodecamp/simonSound2.mp3
https://s3.amazonaws.com/freecodecamp/simonSound3.mp3
https://s3.amazonaws.com/freecodecamp/simonSound4.mp3
*/

/*
This is a Simon-like game in javascript.
Specifications include:
- I am presented with a random series of button presses.
- Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
- I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
- If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
- I can see how many steps are in the current series of button presses.
- If I want to restart, I can hit a button to do so, and the game will return to a single step.
- I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
- I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

*I've added a few extra buttons based on my own preferences. (Sound toggle, Repeat pattern)


*/

var power = false;
var strict = false;
var goalCount = 0;
var playerCount =0;
var goalPattern="";
//var playerPattern ="";
var initialized = false;
var noPlay=true;
var soundOn = true;

//Turns on and off the game. Nothing else works unless power = true.
function powerToggle ()
{
	if (power)
	{
		power = false;
		$('#current').empty();
		$('#powerButton').css('background-color', "Black");
		$('#powerButton').css('color', "White");
		strict = false;	
		$('#strictButton').css('background-color', "Black");
		$('#strictButton').css('color', "White");		
		goalCount = 0;
		playerCount =0;
		updateCount();
		goalPattern="";
		//playerPattern ="";
		initialized = false;
		noPlay=true;
		$('#startButton').css('background-color', "Black");
		$('#startButton').css('color', "White");	
		$('#repeatButton').css('background-color', "Black");
		$('#repeatButton').css('color', "White");			
	}
	else
	{
		power = true;
		$('#powerButton').css('background-color', 'Chartreuse');
		$('#powerButton').css('color', "Black");		
	}
	
}

//Updates the counter in the browser. 
//I thought it was helpful to show which step you were on in the pattern, unlike the original, which only shows the pattern length.
function updateCount()
{
	$('#gameCounter').empty();
	$('#gameCounter').append('<div>');	
	if (playerCount < 10)
	{
		$('#gameCounter').append('0');
	}
	$('#gameCounter').append(playerCount + ' / ');
	if (goalCount < 10)
	{
		$('#gameCounter').append('0');		
	}
	$('#gameCounter').append(goalCount + '</div>');	
	
}

//Make a mistake, start over from scratch
function strictToggle ()
{
	if (strict)
	{
		strict = false;
		$('#strictButton').css('background-color', 'Black');
		$('#strictButton').css('color', "White");		
	}
	else if (power)
	{
		strict = true;
		$('#strictButton').css('background-color', 'Magenta ');
		$('#strictButton').css('color', "Black");				
	}
}

//Toggles the sound on and off. Sometimes, you have heard enough noise.
function soundToggle ()
{
	if (soundOn)
	{
		soundOn = false;	
		$('#soundButton').css('background-color', 'Black');
		$('#soundButton').css('color', "White");		
	}
	else 
	{
		soundOn = true;	
		$('#soundButton').css('background-color', 'Purple');
		$('#soundButton').css('color', "White");	
	}
}


//Starts a new game from scratch.
function initPlay()
{

	if (power)
	{
		$('#startButton').css('background-color', 'Gold');
		$('#startButton').css('color', "Black");
		setTimeout(function()
		{
			$('#startButton').css('background-color', "Black");
			$('#startButton').css('color', "White");			
		} , 500);		
		goalCount = 0;
		playerCount =0;
		goalPattern="";
		//playerPattern ="";		
		initialized = true;					
		addPattern();
		updateCount();
		playPattern(0);
		noPlay=false;			
	}
}

//Repeats the goal pattern back to you.
//I really did not like the time-out function in the original, so I made a button to repeat the pattern on demand, instead of after a delay.
function repeatToggle()
{
	if (initialized && power)
	{
		$('#repeatButton').css('background-color', 'SteelBlue');
		$('#repeatButton').css('color', "White");			
		playPattern(0);
		setTimeout(function()
		{
			$('#repeatButton').css('background-color', "Black");
			$('#repeatButton').css('color', "White");			
		} , 500);		
			
	}	
}

//Adds the next step to the pattern.
function addPattern()
{
	goalPattern += Math.floor(Math.random()*4+1);
	goalCount	= goalPattern.length;

}


//Repeats the pattern back to the player.
function playPattern(id)
{
	//console.log(id, goalPattern);
	if (id ==0)
	{
		$('#current').empty();
		$('#current').append('<div>Watch carefully.</div>');
		//console.log('Started pattern', id, goalPattern.length);
		console.log(goalPattern);
	}	
	if (id == goalPattern.length)
	{
		$('#current').empty();
		$('#current').append('<div>Your turn</div>');		
		//console.log('Reached end of pattern', id, goalPattern.length);
	}
	else
	{
		//console.log(id, goalPattern[id]);
		var audio;
		switch (goalPattern[id])
		{
			case '1':
			{
				
				playerPressed=1;
				$('#greenSquare').css('background-color', 'GreenYellow');
				if (soundOn)
				{
					audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
					audio.play();
				}
				setTimeout(function()
				{
					$('#greenSquare').css('background-color', 'Green');
					setTimeout(function()
					{
						playPattern(id+1);
						
					} , 250);											
				} , 500);			
				break;
			}
			case '2':
			{
				playerPressed=2;
				$('#redSquare').css('background-color', 'HotPink');
				if (soundOn)
				{
					audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
					audio.play();
				}				
				setTimeout(function()
				{
					$('#redSquare').css('background-color', 'Red');
					setTimeout(function()
					{
						playPattern(id+1);
						
					} , 250);
				} , 500);					
				break;
			}
			case '3':
			{
				playerPressed=3;
				$('#yellowSquare').css('background-color', 'Yellow');
				if (soundOn)
				{
					audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
					audio.play();
				}				
				setTimeout(function()
				{
					$('#yellowSquare').css('background-color', 'Orange');
					setTimeout(function()
					{
						playPattern(id+1);
						
					} , 250);
				} , 500);				
				break;
			}
			case '4':
			{
				playerPressed=4;
				$('#blueSquare').css('background-color', 'Turquoise');
				if (soundOn)
				{
					audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
					audio.play();
				}				
				setTimeout(function()
				{
					$('#blueSquare').css('background-color', 'Blue');
					setTimeout(function()
					{
						playPattern(id+1);
						
					} , 250);				
				} , 500);				
				break;
			}		
		}

	}

}


//Test to see if your button press matches the pattern.
//Plays associated sound with the button.
function play(id)
{
	var playerPressed=0;
	var audio;

	switch (id)
	{
		case 'greenSquare':
		{
			
			playerPressed=1;
			$('#greenSquare').css('background-color', 'GreenYellow');
			setTimeout(function()
			{
				$('#greenSquare').css('background-color', 'Green');
			} , 500);			
			audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
			break;
		}
		case 'redSquare':
		{
			playerPressed=2;
			$('#redSquare').css('background-color', 'HotPink');
			setTimeout(function()
			{
				$('#redSquare').css('background-color', 'Red');
			} , 500);					
			audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
			break;
		}
		case 'yellowSquare':
		{
			playerPressed=3;
			$('#yellowSquare').css('background-color', 'Yellow');
			setTimeout(function()
			{
				$('#yellowSquare').css('background-color', 'Orange');
			} , 500);				
			audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
			break;
		}
		case 'blueSquare':
		{
			playerPressed=4;
			$('#blueSquare').css('background-color', 'Turquoise');
			setTimeout(function()
			{
				$('#blueSquare').css('background-color', 'Blue');
			} , 500);				
			audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
			break;
		}		
	}
	if (soundOn)
	{
		audio.play();
	}
	//console.log('Player Pressed:', playerPressed, ' Pattern Position:', ' Correct Button: ', goalPattern[playerCount]);
	if (goalPattern[playerCount]==playerPressed)
	{
		//Got it right. Inform player
		$('#current').empty();
		$('#current').append('<div>Correct</div>');
		++playerCount;
		updateCount();		
		// Add onto the pattern if we got it all
		if (playerCount == goalCount)
		{
			if (goalCount < 20)  //At this point, you've won the game. Time to start over!
			{
				$('#current').empty();
				$('#current').append('<div>Good job. Adding On.</div>');
				playerCount = 0;
				addPattern();
				
				setTimeout(function()
				{
					updateCount();
					playPattern(0);
					noPlay=false;
				} , 2000);
			}
			else
			{
				$('#current').empty();
				$('#current').append('<div>You won! Excellent! Try again!</div>');
				setTimeout(function()
				{
					initialized = false;
					initPlay();
					noPlay=false;
				} , 2000);				

			}
		}
		else
		{
			noPlay=false;
			updateCount();
		}
		
		
	}
	else
	{
		if (!strict)	//Make a mistake, start over from scratch
		{
			//Mistake - Inform player 
			$('#current').empty();
			$('#current').append('<div>Wrong Move! Try again!</div>');
			//Reset player pattern, replay pattern
			playerCount =0;
			//playerPattern ="";
			updateCount();
			setTimeout(function()
			{
			
				playPattern(0);
				//Turn counter back to white			
				noPlay=false;
			} , 2000);			
		}
		else 
		{
				$('#current').empty();
				$('#current').append('<div>Wrong move! Time to Start Over.</div>');
				setTimeout(function()
				{
					initialized = false;
					initPlay();
					noPlay=false;
				} , 2000);				
			
		}
	
			
	}
	
}

//Mouse click event
$('.square').click(function()
{
	//console.log('Clicked!',initialized , noPlay);
	if (initialized && !noPlay)
	{
		noPlay = true;
		play(this.id);
	}

});

//Keyboard press capture for gameplay buttons
//Sometimes you want to play quicker than a mouse allows... like when you're testing.
$(document).keydown( function(event) 
{
	switch (event.which) 
	{
		case 49: // 1 97
		case 97:
		{
			if (initialized && !noPlay)
			{
				noPlay = true;
				play('greenSquare');
			}
			break;
		}
		case 50: // 2 98
		case 98:
		{
			if (initialized && !noPlay)
			{
				noPlay = true;
				play('redSquare');
			}
			break;
		}
		case 51: // 3 99
		case 99:
		{
			if (initialized && !noPlay)
			{
				noPlay = true;
				play('yellowSquare');
			}
			break;
		}
		case 52: // 4 100
		case 100:
		{
			if (initialized && !noPlay)
			{
				noPlay = true;
				play('blueSquare');
			}
			break;
		}			

	}
	return false;
});