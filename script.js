//some variables
let firstTry = true;
let progFactor;
let disallowSave = false;

// document ready
$(document).ready(function(){
    $('.introTitle').each(function(i) {
        $(this).delay(i * 1000).fadeIn(1500);
    });
    setTimeout(function(){
        $("#buttonDiv").animate({opacity: 1}, 2000);
    }, 3500);
    $("#commandInput").val("");

    //setting up some buttons and input
    $("#commandButton").click(function(){
        command();
    });
    $("#menuBrg").click(function(){
       toggleVisibility('#buttonDiv', false, false);
    });
    $('input').focus(function() {
        $(this).val(null);
    });

});

//boot
function boot() {
    $("#intro").fadeOut(500);
    toggleVisibility('#howToPlay', true);
    toggleVisibility('#buttonDiv', true, false);
    setTimeout(function(){
        //initial info
        displayCurrentInfo();

        //check/set theme
        swapTheme(currentTheme);
		$("#file_input").fadeOut(300);
        $("#fileLoad").css("height", "0px");
        $("#gameInterface").fadeIn(1000);
        $("#menuBrg").fadeIn(1000);
    }, 750);
}

// change element visibility
function toggleVisibility(element, forceOff = false, opMode = false) {
    if (opMode) {
        if ($(element).css("opacity") == "1" || forceOff) {
            $(element).animate({opacity: 0}, 500);
            $(element).css("pointer-events", "none");
        }
        else {
            $(element).animate({opacity: 1}, 1000);
            $(element).css("pointer-events", "auto");
        }
        return;
    }

    if ($(element).is(":visible") || forceOff) {
        $(element).fadeOut(500);
    } else {
        $(element).fadeIn(1000);
    }
}

// register enter event (also see #commandButton in document.ready)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        command();
    }
});

// handle commands
function command() {
    if (firstTry) {
        firstTry = false;
        $("#commandInput").attr("placeholder", "enter command");
    }
    let cmd = $("#commandInput").val().trim().toLowerCase();
    $("#commandInput").val(null);
    let str = "";

    if (cmd=="help") {
        str = "<p style='font-size:14px'>All commands are case-insensitive (you can use either lowercase or uppercase). Commands requiring an operator (e.g. \"move constantinople\") should have precisely one empty space between them.</p><ul><li><em>help:</em> shows this screen</li><li><em>status:</em> displays your current status (amount of money, carried items, mode of transportation, etc)</li><li><em>move + destination:</em> e.g. \"move baghdad\". Initiates a travel toward the given city, which must be one of the possible destinations listed in the description screen.</li><li><em>trade + item + quantity:</em> e.g. \"trade silk 4\". You trade with the local market for the corresponding trade item(s). Positive integers (e.g. \"trade silk 4\") indicate <em>buying from the market</em>, while negative integers (e.g. \"trade silk -4\") indicate <em>selling to the market</em>. Buying is successful if i) you have enough funds to buy; ii) you have enough cargo space. Selling is successful if you have the item quantity in your inventory.</li><li><em>transport + mode of transportation:</em> e.g. \"transport caravan\". You purchase a transportation mode. The action is successful if i) you have sufficient funds; ii) the mode of transportation is compatible with your location (you can't buy a horse or a caravan on an island, neither a ship in a non-port area). Using <strong>transport none</strong> removes your current transport. Note that downgrading will automatically sell any excess cargo.</li><li><em>theme + [option]:</em> e.g. \"theme green\" . Changes the color scheme of the game. Options are \"green\" (the default), \"amber\", \"silver\", and \"amiga\".</li><li><em>clear:</em> Clears the screen from previous text and redisplays current location info.</li></ul>"
    }
    else if (cmd=="status") {
        let boolStr1 = "<span> have <em>not </em></span>";
        let boolStr2 =  "<span> have <em>not </em></span>";
        if (hasVisitedBeijing) {
            boolStr1 = "<span><em> have </em></span>";
        }
        if (hasReturnedVenice) {
            boolStr2 = "<span><em> have </em></span>";
        }
        str = "<p>Week: " + week + "</p><p>Florins: " + florins + "</p><p>Affective Events Experienced: " + (6-progressional.length) + "/6</p><p>You" + boolStr1 + "visited Beijing…</p><p>…and you" + boolStr2 + "returned to Venice</p><p>Experience Points: " + xp + "</p><p>Current transportation: " + currentTransport + "</p><p>Current Location: " + capitalizeFirstLetter(currentLocation) + "</p><p>Free Passes: " + freePass + "</p><p>Current Cargo: </p><ul>" + Object.entries(currentCargo).map(([key, value]) => `<li>${key}: ${value}</li>`).join('') + "</ul><p>Available Cargo Space: " + howMuchCargoSpace() + "</p>";
    }
    else if (cmd=="wait") {
        str = "<p>You decide to spend some time in the vicinity of " + capitalizeFirstLetter(currentLocation) +" </p>"
        endTurn({waitMode: true});
    }
    else if (cmd=="clear") {
        displayCurrentInfo(false); // false, to clear the screen
    }
    else if (cmd.startsWith("move")) {
        if (currentTransport == "none") {
            str = "<p>You currently have no mode of transportation. Traveling is not possible without one.</p>";
        }
        else {
            let theDestination = cmd.slice(5);
            let currentLocationObject = findByKeyValue(destinations, "cityName", currentLocation);
            let nearestCities = currentLocationObject.nearest;

            let destObject = findByKeyValue(nearestCities, "city", theDestination);
            if (destObject) {
                if (currentTransport == "ship") {
                    let maritime = filterByKeyValue(nearestCities, "maritime", true);
                    let destObjByMode = findByKeyValue(maritime, "city", theDestination);
                    if (destObjByMode) {
                        str = "<p>Your journey to " + capitalizeFirstLetter(theDestination) + " begins…</p>";
                        let travelDistance = destObjByMode.distance;
                        let course = destObjByMode.course;
                        endTurn({theDistance:travelDistance,course: course, destination:theDestination});
                    }
                    else {
                        str = "<p>Your chosen mode of transportation is a ship, but your destination is not accessible by sea.</p>";
                    }
                }
                else { // it can only be horse or caravan, because "none" has been checked earlier
                    let land = filterByKeyValue(nearestCities, "maritime", false);
                    let destObjByMode = findByKeyValue(land, "city", theDestination);
                    if (destObjByMode) {
                        str = "<p>Your journey to " + capitalizeFirstLetter(theDestination) + " begins…</p>";
                        let travelDistance = destObjByMode.distance;
                        let course = destObjByMode.course;
                        endTurn({theDistance:travelDistance, course: course, destination: theDestination});
                    }
                    else {
                        str = "<p>Your chosen mode of transportation is a " + currentTransport + ", but your destination is not accessible by land.</p>";
                    }
                }
            }
            else {
                str = "<p>Destination not found. Check spelling and redundant spaces, and verify destination is on the list.</p>";
            }
        }

    }
    else if (cmd.startsWith("trade")) {
        let theItem;
        if (cmd.slice(6, -2).includes(" ")) {
            theItem = cmd.slice(6, -3);
        }
        else {
            theItem = cmd.slice(6, -2);
        }
        theItem = theItem.trim();
        if (!cargoGoods.includes(theItem)) {
            str = "<p>Trade item not recognized. Check spelling and redundant spaces.</p>";
        }
        else {
            let buyPrice = tradingPrices[theItem][0];
            let sellPrice = tradingPrices[theItem][1];

            let theQuantity;
            if (!isNaN(parseInt(cmd.slice(-3)))) { // 2-digits attempts
                theQuantity = parseInt(cmd.slice(-3));
            } else {
                theQuantity = parseInt(cmd.slice(-2));
            }

            if (theQuantity < 0 ) { // selling
                if (parseInt(currentCargo[theItem]) >= Math.abs(theQuantity)) {
                    if (shortages.includes(theItem)) {
                        str = "<p>Transaction successful… Because the item was in short supply, you sold at a higher price than the listed one.</p>"
                        xp++;
                        florins += Math.round(randInt(12,17)/10*sellPrice*Math.abs(theQuantity));
                    }
                    else {
                        str = "<p>Transaction successful…</p>";
                        florins += sellPrice*Math.abs(theQuantity);
                        tradeSold += sellPrice*Math.abs(theQuantity);
                    }
                    currentCargo[theItem] -= Math.abs(theQuantity);
                }
                else {
                    str = "<p>You don't have that much in your inventory…</p>";
                }
            }
            else if (theQuantity > 0) { // buying
                if (buyPrice*theQuantity > florins) { // not enough florins
                    str = "<p>You don't have enough funds…</p>";
                }
                else if (howMuchCargoSpace() < theQuantity) { // not enough space
                    str = "<p>Not enough cargo space!</p>";
                }
                else if (shortages.includes(theItem)) { //market shortage
                    str = "<p>There is a shortage of " + theItem + " in " + currentLocation + ". You cannot buy any. But you can sell at a higher price than the listed one.</p>";
                }
                else { // ok
                    currentCargo[theItem] += theQuantity;
                    florins -= buyPrice*theQuantity;
                    tradeBought += buyPrice*theQuantity;
                    str = "<p>Transaction successful…</p>";
                }
            }
            else { // catching 0
                str = "<p>You entered \"0\" as the quantity. Nothing happens…</p>";
            }
        }
    }
    else if (cmd.startsWith("transport")) {
        let theMode = cmd.slice(10);
        if (theMode == "horse" || theMode == "caravan") {
            if (hasLandConnection) {
                let check = checkFunds(theMode);
                if (check[0]) {
                    currentTransport = theMode;
                }
                str = check[1];
            }
            else {
                str = "<p>You're on an island. You cannot purchase a " + theMode + " here.</p>";
            }
        }
        else if (theMode == "ship") {
            if (findByKeyValue(destinations, "cityName", currentLocation).port) {
                let check = checkFunds(theMode);
                if (check[0]) {
                    currentTransport = theMode;
                }
                str = check[1];
            }
            else {
                str = "<p>Ships can only be purchased in a port city.</p>";
            }
        }
        else if (theMode == "none") {
            str = "<p>You are now without a transport.</p>";
            currentTransport = "none";
            currentTransMaint = 1;
        }
        else {
            str = "<p>Transportation mode not recognized. Check spelling and redundant spaces.</p>";
        }

        function checkFunds(trans) {
            if (findByKeyValue(transports, "transport", trans).buy <= florins) {
                florins -= findByKeyValue(transports, "transport", trans).buy;
                currentTransSpeed = findByKeyValue(transports, "transport", trans).movement; // setting current movement value, to "lock" against variation presented in priceVolatility()
                currentTransMaint = findByKeyValue(transports, "transport", trans).maintenance; // setting current maintenance value, to "lock" against variation presented in priceVolatility()
                return [true, "<p>You purchased a " + trans + ". </p>"];
            }
            else {
                return [false, "<p>Not enough funds…</p>"];
            }
        }

        // dump extra cargo
        let totalCurrentCargo = Object.values(currentCargo).reduce((sum, quantity) => sum + quantity, 0);
        let newCapacity = findByKeyValue(transports, "transport", currentTransport).cargo;
        if (newCapacity < totalCurrentCargo) {
            str = str + "<p>The excess cargo was sold at an average price…</p>";
            reduceValues(currentCargo, newCapacity, [true, totalCurrentCargo - newCapacity]);
        }
    }
    else if (cmd.startsWith("theme")) {
        let theTheme = cmd.slice(6);
        if (["green", "silver", "amber", "amiga"].includes(theTheme)) {
            currentTheme = theTheme;
            swapTheme(theTheme);
            str = "<p>Theme successfully set…</p>";
        }
        else {
            str = "<p>Theme not recognized. Check spelling and redundant spaces.</p>";
        }
    }
    else {
        str ="<p>Command not recognized… Check spelling and redundant spaces.</p>"
    }

    showMsg(str, true);
}

//reduce object values
function reduceValues(obj, threshold, sellOK) {
    let total = Object.values(obj).reduce((acc, value) => acc + value, 0);
    while (total > threshold) {
        const count = Object.values(obj).filter(value => value > 0).length;
        if (count === 0) break;
        for (const key in obj) {
            if (obj[key] > 0) {
                obj[key]--;
            }
        }
        total = Object.values(obj).reduce((acc, value) => acc + value, 0);
    }
    while (total < threshold) {
        let needed = threshold - total;
        for (const key in obj) {
            if (needed > 0 && obj[key] === 0) {
                obj[key]++;
                needed--;
            }
        }
        total = Object.values(obj).reduce((acc, value) => acc + value, 0);
    }

    //we can sell (at an average price)
    if (sellOK[0]===true) {
        florins += sellOK[1] * calculateAverageSellingPrices(); // a little bit generic, maybe TODO differently in the future
    }
}

//get average selling price
function calculateAverageSellingPrices() {
    let total = 0;
    let count = 0;
    for (const key in tradingPrices) {
        total += tradingPrices[key][1];
        count++;
    }
    return Math.round(total / count);
}

//check if on island
function hasLandConnection() {
    let currentLocationObject = findByKeyValue(destinations, "cityName", currentLocation);
    let nearestCities = currentLocationObject.nearest;
    let land = filterByKeyValue(nearestCities, "maritime", false);
    if (land.length > 0) {
        return true;
    }
    return false;
}

//event function
function drawEvent(obj) {
    return new Promise((resolve) => {
        let theCard = cycleGen.next().value;

        if (theCard.zone.includes(obj.theZone) && !pastEvents.some(event => JSON.stringify(event) === JSON.stringify(theCard))) {

            pastEvents.push(theCard);

            showMsg("<p>" + theCard.desc + "</p>", true);

            let theOutcome = getRandomItem(theCard.outcomes);
            if (!theOutcome.otherActions) {
                performActions(theOutcome);
            }
            else {
                performActions(theOutcome.otherActions);
            }

            async function performActions(object) {
                let theOutcome = object;
                let str = "";
                if (theOutcome.event !== undefined) {
                    str = "<p>" + theOutcome.event + "</p>";
                }

                florins += theOutcome.money !== undefined ? theOutcome.money : 0;
                xp += theOutcome.xp !== undefined ? theOutcome.xp : 0;
                freePass += theOutcome.passes !== undefined ? theOutcome.passes : 0;

                if (theOutcome.cargoLoss !== undefined) {
                    let totalCurrentCargo = Object.values(currentCargo).reduce((sum, quantity) => sum + quantity, 0);
                    if (theOutcome.cargoLoss=="half") {
                        reduceValues(currentCargo, Math.round(totalCurrentCargo/2), [false, 0]);
                    }
                    else if (theOutcome.cargoLoss=="all") {
                        reduceValues(currentCargo, 0, [false, 0]);
                    }
                }

                if (theOutcome.delay !== undefined) {
                    florins -= currentTransMaint;
                    week++;
                }

                florins -= currentTransMaint;
                week++;

                await new Promise(resolve => setTimeout(resolve, 2000));
                showMsg(str, true);
                await new Promise(resolve => setTimeout(resolve, 2500));
                resolve();
            }
        }
        else {
            if (!obj.inCity && currentTransport != "ship" && progressional.length > 0 && week - lastProgWeek >= 7 && Math.random() > progFactor) { // progressionalEvent; NOT when simply waiting, NOT when on a ship, NOT if fewer than 5 weeks have elapsed.
                lastProgWeek = week;

                let str1 = progressional[0].title;
                let str2 = progressional[0].description;
                showMsg("<div id='progressionalEvent'><h3>" + str1 + "</h3><p>" + str2 + "</p></div>", true);

                progressional.shift();// remove item, shortening the array
                xp += 2;

                florins -= currentTransMaint;
                week++;

                setTimeout(function(){
                    $("#progressionalEvent").fadeOut(8500, function(){
                        $(this).remove();
                        resolve();
                    });
                }, 5000);
            }
            else if (obj.inCity) { // waiting
                str = "A week later, you are still in " + capitalizeFirstLetter(currentLocation);
                florins -= currentTransMaint;
                week++;
                if (currentTransport=="none" && florins < 1) {
                    florins = randInt(1, 6);
                    str = "A week later, you are still in " + capitalizeFirstLetter(currentLocation) + ", supporting yourself by begging on the streets…";
                }
                showMsg("<p>" + str + "</p>", true);
                resolve();
            }
            else {// simple traveling
                let str;
                if (currentTransport == "ship") {
                    str = getRandomItem(boatTravelNotes);
                }
                else {
                    str = getRandomItem(travelNotes);
                }
                florins -= currentTransMaint;
                week++;
                showMsg("<p>" + str + "</p>", true);
                resolve();
            }
        }
    });
}

//check player status functions
function hasFreePass() {
    if (freePass > 0) {
        return true;
    }
    else {
        return false;
    }
}
function howMuchCargoSpace() {
    let capacityObject = findByKeyValue(transports, "transport", currentTransport);
    let capacity = capacityObject.cargo;
    let totalCurrentCargo = Object.values(currentCargo).reduce((sum, quantity) => sum + quantity, 0);
    let availableCapacity = capacity - totalCurrentCargo;

    return availableCapacity;
}

//endTurn
async function endTurn(obj) {
    disallowSave = true;
    $("#commandBox").fadeOut(350);

    //check progFactor
    progFactor = scale(week, 0, 300, 95, 40)/100; // at the beginning, 5% chance to get a progressional event; at 300 weeks, a 60% chance.

    let isWaitMode = false;
    if (obj.waitMode) {
        isWaitMode = true;
    }

    await new Promise(resolve => setTimeout(resolve, 2500)); // Wait 2.5s
    if (isWaitMode) {
        let currentZoneObject = findByKeyValue(destinations, "cityName", currentLocation);
        let currentZone = currentZoneObject.zone;
        await drawEvent({theZone: currentZone, inCity: true});
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s
        displayCurrentInfo(false);
        $("#commandBox").fadeIn(350);
        $("#commandInput").focus();
    }
    else {
        //getting transport data
        let transObj = findByKeyValue(transports, "transport", currentTransport);

        //establish position;
        let bonJovi = false; //"halfway there"
        if (currentTransSpeed >= obj.theDistance/2) {
            bonJovi = true;
        }
        let currentPosition = obj.theDistance - currentTransSpeed;

        //determining current zone
        if (obj.course.length == 1) {
            currentZone = obj.course;
        }
        else {
            if (bonJovi) {
                currentZone = obj.course[1];
            }
            else {
                currentZone = obj.course[0];
            }
        }

        //events
        await drawEvent({theZone: currentZone});

        // continue journey, check for money OK, or signal arrival
        if (currentPosition > 0 && florins >=0) {
            endTurn({theDistance: currentPosition, course: obj.course, destination:obj.destination, journeying: true});
        }
        else if (florins < 0) {
            currentLocation = "Venice";
            florins = 300;
            currentCargo = {
                silk: 0,
                carpets: 0,
                porcelain: 0,
                gems: 0,
                handicraft: 0,
                textiles: 0,
                spices: 0,
            };
            freePass = 1;
            currentTransport = "none";
            showMsg("<p>You have run out of funds. With nothing left to continue your journey, you rely on the kindness of travelers and return to Venice, to start anew…</p>", true);
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3s
            displayCurrentInfo(false);
            $("#commandBox").fadeIn(350);
            $("#commandInput").focus();
            week = week+4;
            xp++;
            if (hasVisitedBeijing) {
                hasReturnedVenice = true;
            }
            return;
        }
        else {
            currentLocation = obj.destination;
            if (!placesVisited.includes(currentLocation)) {
                placesVisited.push(currentLocation);
            }
            showMsg("<p>You have arrived at " + capitalizeFirstLetter(currentLocation) + "</p>", true)
            await new Promise(resolve => setTimeout(resolve, 2500)); // Wait 2.5s
            displayCurrentInfo(false);
            $("#commandBox").fadeIn(350);
            $("#gameArea").scrollTop($('#gameArea')[0]);
            $("#commandInput").focus();

            //check if gone to Beijing/Returned to Venice
            if (currentLocation == "beijing") {
                hasVisitedBeijing = true;
            }
            if (currentLocation == "venice" && hasVisitedBeijing) {
                hasReturnedVenice = true;
            }
        }
    }

    //check winning conditions
    if (hasVisitedBeijing && hasReturnedVenice && progressional.length == 0) {
        $("#gameInterface").fadeOut(3000, function(){
            let str, str2;
            if (currentLocation == "venice") {
                str = endInVenice;
            }
            else {
                str = endOffVenice;
            }
            str2 = "<br>Weeks journeying: " + week + "<br>Experience points: " + xp + "<br>Number of places visited: " + placesVisited.length + "/36<br>Florins spent on trading: " + tradeBought + "<br>Florins made from trading: " + tradeSold + "<br>";
            $("#gameInterface").html("<p>" + str + "</p>" + "<p> " + str2 + "</p><div id='gameOver' style='display:none'></div>");
            $("#gameInterface").fadeIn(3000, function() {
                $("#gameOver").html("<h2>Game Over</h2>")
                $("#gameOver").fadeIn(3000);
            });
        });
    }

    disallowSave = false;
}

function displayCurrentInfo(noRedraw = true) {
    let str1, str2, str3, str4, str5;

    //market & transport setup: price and shortages
    priceVolatility();

    let shortageStr;
    if (shortages.length > 0) {
        shortageStr = shortages.join(", ");
    }
    else {
        shortageStr = "none";
    }

    let currentLocationObject = findByKeyValue(destinations, "cityName", currentLocation);
    let cityInfoObject = findByKeyValue(cityInfo, "city", currentLocation);
    let theInfo = cityInfoObject.description;
    let nearestCities = currentLocationObject.nearest;
    let landList = '<ul><em>By Land:</em>';
    let seaList = '<ul><em>By Sea:</em>';

    nearestCities.forEach(obj => {
        let cityInfo = `<li><strong>${obj.city}.</strong> Distance: ${obj.distance}, ${getDirection(obj.direction)}.</li>`;
        if (obj.maritime) {
            seaList += cityInfo;
        } else {
            landList += cityInfo;
        }
    });

    landList += '</ul>';
    seaList += '</ul>';

    let portCity = findByKeyValue(destinations, "cityName", currentLocation).port;


    str1 = "<h3>" + capitalizeFirstLetter(currentLocation) + "</h3>";
    str2 = "<p>" + theInfo + "</p>";
    str3 = "<div class='separator'></div><div class='flexer'><div><p>Market Prices: </p><ul><em>Buy – Sell</em>" + Object.entries(tradingPrices).map(([key, value]) => `<li><strong>${key}</strong>: ${value[0] + " – " + value[1]}</li>`).join('') + "</ul><p>Market Shortages: " + shortageStr + "</p></div>";
    str4 = "<div><p>Possible Destinations:</p>"+ landList + seaList + "</div></div>";
    str5 = "<div class='separator'></div><div><p>Available Transportation Info: </p><ul>" + transports.filter((item, index) => { if (!hasLandConnection()) { return index === 1; } return !(portCity === false && index === 1) && index > 0; }).map(item => `<li><strong>${item.transport}</strong>: Buy: ${item.buy}, Maintenance: ${item.maintenance}, Cargo: ${item.cargo}, Movement: ${item.movement}</li>`).join('') + "</ul></div><div class='separator'></div>";

    let str = str1+str2+str3+str4+str5;
    showMsg(str, noRedraw);

    function getDirection(dir) {
        const directions = { E: 'East', S: 'South', N: 'North', W: 'West' };
        return directions[dir] || dir;
    }
}

function priceVolatility(profit=false) {
    let currentLocationObject = findByKeyValue(destinations, "cityName", currentLocation);
    let currentZone = currentLocationObject.zone;

    let factor = randInt(6, 9)/10; // range: 0.6 - 0.9
    if (profit) {
        factor = 0.9;
    }

    if (currentZone == "1") {
        a = Math.round(a*randInt(8,14)/10);
        b = Math.round(b*randInt(9,15)/10);
        c = Math.round(c*randInt(9,15)/10);
        d = Math.round(d*randInt(9,12)/10);
        e = Math.round(e*randInt(5,15)/10);
        f = Math.round(f*randInt(5,15)/10);
        g = Math.round(g*randInt(9,15)/10);
    }
    else if (currentZone == "2") {
        a = Math.round(a*randInt(9,15)/10);
        b = Math.round(b*randInt(7,12)/10);
        c = Math.round(c*randInt(9,15)/10);
        d = Math.round(d*randInt(7,14)/10);
        e = Math.round(e*randInt(4,13)/10);
        f = Math.round(f*randInt(6,13)/10);
        g = Math.round(g*randInt(5,12)/10);
    }
    else if (currentZone == "3") {
        a = Math.round(a*randInt(8,14)/10);
        b = Math.round(b*randInt(9,15)/10);
        c = Math.round(c*randInt(9,17)/10);
        d = Math.round(d*randInt(9,13)/10);
        e = Math.round(e*randInt(7,16)/10);
        f = Math.round(f*randInt(5,16)/10);
        g = Math.round(g*randInt(9,16)/10);
    }
    else if (currentZone == "4") {
        a = Math.round(a*randInt(7,13)/10);
        b = Math.round(b*randInt(7,14)/10);
        c = Math.round(c*randInt(9,14)/10);
        d = Math.round(d*randInt(9,12)/10);
        e = Math.round(e*randInt(7,13)/10);
        f = Math.round(f*randInt(7,14)/10);
        g = Math.round(g*randInt(7,15)/10);
    }
    else if (currentZone == "5") {
        a = Math.round(a*randInt(9,17)/10);
        b = Math.round(b*randInt(7,13)/10);
        c = Math.round(c*randInt(9,14)/10);
        d = Math.round(d*randInt(7,15)/10);
        e = Math.round(e*randInt(5,12)/10);
        f = Math.round(f*randInt(6,14)/10);
        g = Math.round(g*randInt(5,12)/10);
    }
    else if (currentZone == "6") {
        a = Math.round(a*randInt(5,12)/10);
        b = Math.round(b*randInt(8,15)/10);
        c = Math.round(c*randInt(7,14)/10);
        d = Math.round(d*randInt(7,14)/10);
        e = Math.round(e*randInt(6,14)/10);
        f = Math.round(f*randInt(7,15)/10);
        g = Math.round(g*randInt(8,13)/10);
    }
    else if (currentZone == "7") {
        a = Math.round(a*randInt(8,14)/10);
        b = Math.round(b*randInt(9,17)/10);
        c = Math.round(c*randInt(8,16)/10);
        d = Math.round(d*randInt(9,17)/10);
        e = Math.round(e*randInt(7,15)/10);
        f = Math.round(f*randInt(7,14)/10);
        g = Math.round(g*randInt(9,18)/10);
    }
    else { // zone 8
        a = Math.round(a*randInt(7,14)/10);
        b = Math.round(b*randInt(9,17)/10);
        c = Math.round(c*randInt(8,14)/10);
        d = Math.round(d*randInt(9,12)/10);
        e = Math.round(e*randInt(6,14)/10);
        f = Math.round(f*randInt(6,14)/10);
        g = Math.round(g*randInt(9,15)/10);
    }

    a = Math.max(tradingRange[0][0], Math.min(a, tradingRange[0][1]));
    b = Math.max(tradingRange[1][0], Math.min(b, tradingRange[1][1]));
    c = Math.max(tradingRange[2][0], Math.min(c, tradingRange[2][1]));
    d = Math.max(tradingRange[3][0], Math.min(d, tradingRange[3][1]));
    e = Math.max(tradingRange[4][0], Math.min(e, tradingRange[4][1]));
    f = Math.max(tradingRange[5][0], Math.min(f, tradingRange[5][1]));
    g = Math.max(tradingRange[6][0], Math.min(g, tradingRange[6][1]));

    tradingPrices = {
        silk: [a, Math.round(a*factor)],
        carpets: [b, Math.round(b*factor)],
        porcelain: [c, Math.round(c*factor)],
        gems: [d, Math.round(d*factor)],
        handicraft: [e, Math.round(e*factor)],
        textiles: [f, Math.round(f*factor)],
        spices: [g, Math.round(g*factor)],
    }

    //generate shortages
    shortages.length = 0;
    let shortage1 = getRandomItem(cargoGoods);
    let shortage2 = getRandomItem(cargoGoods);
    if (Math.random() > 0.4) {
        shortages.push(shortage1);
        if (Math.random() > 0.5 && shortage2 != shortage1) {
            shortages.push(shortage2);
        }
    }

    //check if we are in a special trading city
    let specOb = findByKeyValue(specialTrades, "city", currentLocation);
    if (specOb) {
        tradingPrices[specOb.item][0] = Math.round(tradingPrices[specOb.item][0] * specOb.factor);
        tradingPrices[specOb.item][1] = Math.round(tradingPrices[specOb.item][1] * specOb.factor);
    }

    //transportation pricing and attributes
    let xpFactor = scale(xp, 0, 30, 5, -5); //xp factor; the more the xp, the cheaper the buying and maintenance prices
    for (let i = 1; i < transports.length; i++) { // using i=1 to avoid transports[0], for "none"
        transports[i].buy = Math.min(transBuy[i][1], Math.max(transBuy[i][0], xpFactor + Math.max(transBuy[i][0], Math.min(transBuy[i][1], Math.round(transports[i].buy * randInt(7, 13) / 10)))));
    }
    let weekFactor = scale(week, 0, 520, 1, -2); //week factor; the "older" the player (the more the weeks) the slower it gets to move. 520 weeks = 10 years
    for (let i = 1; i < transports.length; i++) { // using i=1 to avoid transports[0], for "none"
        //transports[i].movement = weekFactor + Math.max(transSpeed[i][0], Math.min(transSpeed[i][1], Math.round(transports[i].movement * randInt(7, 13) / 10)));
        transports[i].movement = Math.min(transSpeed[i][1], Math.max(transSpeed[i][0], weekFactor + Math.max(transSpeed[i][0], Math.min(transSpeed[i][1], Math.round(transports[i].movement * randInt(7, 13) / 10)))));
    }
    for (let i = 1; i < transports.length; i++) { // using i=1 to avoid transports[0], for "none"
        //transports[i].maintenance = xpFactor + Math.max(transMaint[i][0], Math.min(transMaint[i][1], Math.round(transports[i].maintenance * randInt(7, 13) / 10)));
        transports[i].maintenance = Math.min(transMaint[i][1], Math.max(transMaint[i][0], xpFactor + Math.max(transMaint[i][0], Math.min(transMaint[i][1], Math.round(transports[i].maintenance * randInt(7, 13) / 10)))));
    }

}

//save and load
function saveGame() {
    if (disallowSave) {
        alert("Saving not possible outside cities…");
        return;
    }

	var obj = {
        //fileCheck
		fileCheck: "marcoFile",
        //variables
        florins: florins,
        xp: xp,
        currentLocation: currentLocation,
        currentCargo: currentCargo,
        tradingPrices: tradingPrices,
        freePass: freePass,
        currentTransport: currentTransport,
        week: week,
        currentTheme: currentTheme,
        currentTransSpeed: currentTransSpeed,
        currentTransMaint: currentTransMaint,
        hasVisitedBeijing: hasVisitedBeijing,
        hasReturnedVenice: hasReturnedVenice,
        progressional: progressional,
        pastEvents:pastEvents,
        lastProgWeek:lastProgWeek,
        placesVisited:placesVisited,
        tradeBought:tradeBought,
        tradeSold:tradeSold,
    };
    var savedVariables = JSON.stringify(obj);

	var hiddenElement = document.createElement('a');
	hiddenElement.href = 'data:attachment/text,' + encodeURI(savedVariables);
	hiddenElement.target = '_blank';
	hiddenElement.download = ('MarcoPolo_GameSaveFile_' + new Date().toLocaleTimeString() + '.txt');
	hiddenElement.click();
}

function loadGame() {
    $("#fileLoad").css("height", "60px");
    $("#file_input").fadeIn(300);
	$('#file_input').on('change', function(e){
		if (this.files[0].type.match('text/plain')) {
			readFile(this.files[0], function(e) {
				let text = e.target.result;
				if (!text.includes("marcoFile")) {
                    alert("Not a Marco Polo save file. Try again…");
					return;
				}
				var obj = JSON.parse(text);
					//Implementing variables
					florins = obj.florins;
                    xp = obj.xp;
                    currentLocation = obj.currentLocation;
                    currentCargo = obj.currentCargo;
                    tradingPrices = obj.tradingPrices;
                    freePass = obj.freePass;
                    currentTransport = obj.currentTransport;
                    week = obj.week;
                    currentTheme = obj.currentTheme;
                    progressional = obj.progressional;
                    currentTransSpeed = obj.currentTransSpeed;
                    currentTransMaint = obj.currentTransMaint;
                    hasVisitedBeijing = obj.hasVisitedBeijing;
                    hasReturnedVenice = obj.hasReturnedVenice;
                    pastEvents = obj.pastEvents;
                    lastProgWeek = obj.lastProgWeek;
                    placesVisited = obj.placesVisited;
                    tradeBought = obj.tradeBought;
                    tradeSold = obj.tradeSold;

					boot();
			})
		}
		else {
			alert("Not a .txt file. Try again…");
		}
	})
	function readFile(file, callback){
		var reader = new FileReader();
		reader.onload = callback
		reader.readAsText(file);
	}
}

//swap theme
function swapTheme(theme) {
    let c1, c2, c3;
    let fontS = "18px";
    let fontF = "'Playwrite DE Grund'";

    if (theme=="green") {
        c1 = "#009500";
        c2 = "darkgreen";
        c3 = "black";
    }
    else if (theme=="amber") {
        c1 = "#a47904";
        c2 = "#8c6701";
        c3 = "#201700";
    }
    else if (theme=="amiga") {
        c1 = "#ffffff";
        c2 = "#ff8800";
        c3 = "#0057af";
        fontF = "'VT323'";
        fontS = "22px";
    }
    else { //silver
        c1 = "#b3b3b3";
        c2 = "#999999";
        c3 = "black";
    }

    toggleStyle(c1, c2, c3, fontS, fontF);

    function toggleStyle(c1, c2, c3, fontS, fontF) {
        var styleTag = $("#dynamicFontStyle");
        if (styleTag) {
            styleTag.remove();
        }
        $("head").append('<style id="dynamicFontStyle"></style>');
        styleTag = $("#dynamicFontStyle");
        styleTag.html(`
            ::placeholder {
                color: ${c1};
                opacity: 1; /* Firefox */
            }
            body, html {
                background-color: ${c3};
            }
            input {
                color: ${c1};
            }
            .mainTxt {
                color: ${c1};
            }
            #commandButton {
                background-color: ${c2};
            }
            #gameArea p, #gameArea ul, #gameArea span {
                font-family: ${fontF};
                font-size: ${fontS};
            }
        `);
    }
}

//helper functions
function showMsg(str, append = true) {
    let el = "#gameArea";

    if (!append) {
        $(el).fadeOut(350, function(){
            $(el).html(str);
            $("#gameArea").scrollTop($('#gameArea')[0]);
            $(el).fadeIn(500);
        })
    }
    else {
        $(el).append(str);
        $("#gameArea").scrollTop($('#gameArea')[0].scrollHeight);
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function findByKeyValue(arr, key, value) {
  return arr.find(function(obj) {
    // Ensure the key exists and is a string before calling toLowerCase
    const objValue = obj[key];
    return typeof objValue === 'string' && objValue.toLowerCase() === value.toLowerCase();
  });
}
function filterByKeyValue(arr, key, value) {
  return arr.filter(function(obj) {
    const objValue = obj[key];

    // Check if the objValue and value are both strings
    if (typeof objValue === 'string' && typeof value === 'string') {
      return objValue.toLowerCase() === value.toLowerCase();
    }

    // Check if both are booleans
    if (typeof objValue === 'boolean' && typeof value === 'boolean') {
      return objValue === value;
    }

    // Optionally handle other types or return false
    return false;
  });
}
function* cycleArray(array) {
  while (true) {
    for (let item of array) {
      yield item;
    }
  }
}
function scale(num, in_min, in_max, out_min, out_max) {
    return Math.round((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}
