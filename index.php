<?php
// Start PHP code
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marco Polo — a Text Adventure</title>
	<link rel="icon" type="image/png" href="cir3.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Itim&family=Playwrite+DE+Grund:wght@100..400&family=VT323&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script defer src="script.js"></script>
    <script defer src="data.js"></script>
</head>
<body>
    <div id="menuBrg">&#9776;</div>
    <div id="fileLoad"><input type="file" id="file_input"></div>
    <div id="container">
        <div id="buttonDiv" class="flexer">
            <button onclick="toggleVisibility('#howToPlay')">How to Play</button>
            <button onclick="boot();">New Game</button>
            <button onclick="loadGame();">Load Game</button>
            <button onclick="saveGame();">Save Game</button>
        </div>
        <div id="intro">
            <h2 class="introTitle">Marco Polo</h2>
            <h3 class="introTitle">a text adventure</h3>
            <p class="introTitle"><em>Marco Polo</em> is a <strong>hybrid</strong> game: It emulates the text-adventure video games of the 80s, yet it's also an adaptation of the eponymous board game of the same period. You assume the role of Marco Polo, the famous explorer who traveled from Italy to China and back. You must cross the entire continent of Asia, experiencing adventures and dangers, trading, and successfully negotiating with others.</p>
        </div>
        <div id="howToPlay">
            <h3>How to Play</h3>
            <p>You begin in Venice with 300 golden florins. To finish the game, you must find your way to Beijing and back to Venice, having experienced (among others) <em>6 affective events</em> — experiences that cause a lasting impact on you.</p>
            <h4>Game Display</h4>
            <p>The game screen indicates information about your current location — including its market — and what other cities can be found when traveling from the current city. During the course of the game, there are also messages relevant to actions, movement, and other events.</p>
            <p>At the bottom of the screen is the game interface that, as in a retro text-adventure game, accepts commands you type in. Those can be related to movement, action, or information. For example, typing in "status" will display your current position, any items you carry, etc. Typing in the command "help" displays a list of all game commands, with examples.</p>
            <h4>Game Functions</h4>
            <p>Movement requires a <strong>mode of transportation:</strong> a horse, a caravan, or a a ship. Obviously, the former two can only be used on land, and the latter only for crossing a body of water. Each mode of transportation has four attributes: i) acquisition price (paid when purchasing), ii) maintenance cost (paid after every "turn"; action or movement), iii) maximum cargo, and iv) maximum speed. When in a city, you can purchase any mode of transportation your funds allow — ships can only be purchased in a port city, and they are the only available mode of transportation out of an island.</p>
            <p>Without a mode of transportation, you can carry up to 3 trade items but you <em>cannot</em> move. That means, if you are running low on florins or have otherwise lost your mode of transportation, you are allowed to make some minor trading and react to the various events in the game, but you cannot move until you can purchase a new mode of transportation. Note that being on your own, without transport, still costs 1 florin per week for "maintenance costs", that is supporting yourself.</p>
            <h4>Money, Points, and Other Metrics</h4>
            <p>Besides money (necessary for moving), other important metrics include your <strong>xp points</strong>, <strong>free passes</strong>, and the <strong>weeks elapsed</strong>. Xp points affect, among other things, prices of transportation (the more experienced you get, the better deals you can strike), whereas free passes refer to official documents (granted by various authorities) that can influence certain events in the game. <p>As for the number of weeks elapsed, that affects your movement (the older you get, the slower) as well as the probability of encountering an <em>affective event</em> — the older you get, the more likely it becomes. Note that affective events can occur <em>only on land</em>. Xp points can be earned during the course of the game, as a result of your actions. The same stands, to a lesser extent, for free passes.</p>
            <h4>Strategy and Tips</h4>
            <p>The main concern (especially early in the game) is financial management. It's easy to run out of funds because of increased maintenance costs or trading failures. If you run out of funds, you return to Venice and start over with new funds but without transport or cargo. Other metrics, such as the number of weeks elapsed, xp points, or events remain unaltered. In that sense, running out of funds is <em>not</em> a failure, but a setback.</p>
            <p>Overall, it's a better idea to start modestly, using a horse for movement and avoiding risky trading, until you build up enough experience.</p>
        </div>
        <div id="gameInterface">
            <div id="gameArea" class="mainTxt"></div>
            <div id="commandBox" class="flexer">
                <input type="text" placeholder="enter command (try 'help')" name="commandInput" id="commandInput"><button id="commandButton">Enter</button>
            </div>
        </div>
    </div>
</body>
</html>
