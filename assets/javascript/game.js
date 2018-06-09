
function startGame(){
    var gameWins = 0;
    var losses = 0;
    var guesses = 10;
    var randomNum = 0;
    var guessedWordSoFar = [];
    var guessSoFar = [];
    var compare = [];
    var compareCounter = 0; //to keep track if guessed word matches secret word
    var previousTyped;
    var idLoss;
    var secretWord;
    var tickerCounter = 0;

    //data array with all possible cities, including corresponding hints and images
    var allPlaces = [["San Francisco","City by the bay","assets/images/San-Francisco.jpg"],
                    ["New York","The Big Apple","assets/images/New-York.jpg"],
                    ["Paris","City of Romance","assets/images/Paris.jpg"],
                    ["Rome","City","assets/images/Rome.jpg"],
                    ["Iceland","Land of fire and ice","assets/images/Iceland.jpg"],
                    ["Hawaii","Tropical Paradise","assets/images/Hawaii.jpg"],
                    ["Frankfurt","The business and financial center of Germany","assets/images/Frankfurt.jpg"],
                    ["Mumbai","Home of Bollywood","assets/images/Mumbai.jpg"],
                    ["Sydney","The iconic Opera House","assets/images/Sydney.jpg"],
                    ["Dar e Salam","Gateway to the Serengeti Park","assets/images/Dar.jpeg"]]


    //Generate secret word
    var secretWord = randomPlace();
    
    //Resets page state/conditions
    resetVals();

    //call ticker to update text
    tickerText("initial");

    //function to reset page to defaut state
    function resetVals(){
        //Generate secret word
        secretWord = randomPlace();
        // compareCounter = 0;
        guesses = 10;//total number of guesses for a user
        secretWord[0] = secretWord[0].toUpperCase();//make secret word uppercase for consistency
        guessSoFar = [];
        guessedWordSoFar = [];
        compare = [];
        
        document.querySelector("#word").innerHTML = "";

        for(var y=0; y<secretWord[0].length;y++){
            guessedWordSoFar[y] = " ";
            compare[y] = secretWord[0][y];
            document.querySelector("#word").innerHTML += "_ " ;
        }
        // guessedWordSoFar = guessedWordSoFar.join(" ");
        document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + guesses;
        // document.querySelector("#word").innerHTML = guessedWordSoFar;
        document.querySelector("#guessSoFar").innerHTML = "";
        console.log(secretWord[0] + " rest loop");
        // document.getElementById("guessesLeft").innerHTML = "Guesses Left: ";
        // document.querySelector("#word").innerHTML = "Word: ";
        // document.querySelector("#word").innerHTML = "Your Guesses so far: ";
    }
    

    //function to check if typed word is part of secret word or not
    function wordGuess(userInput){
        var key = userInput.key; //typed letter
        var found = 0; //to keep track if typed letter matches any letter in secret word
        compareCounter = 0; 
        previousTyped = 0; //to keep track of prevously typed letters
        var printed = 0;//to keep track a printed letter if it occurs multiple times in the same word
        key = key.toUpperCase();//make typed key uppercase for consistency

        // document.getElementById("guessSoFar").innerHTML += key+" ";
        document.querySelector("#wins").style.color = "";
        document.querySelector("#losses").style.color = "";
        

        
        // console.log(guessedWordSoFar);

        //check if typed letter was already previously entered
        // for (var i = 0; i<guessedWordSoFar.length; i++){
        //     if (key == guessedWordSoFar[i] && key == secretWord[0][i]){
        //         previousTyped++;
        //         found++;
        //         // document.getElementById("guessSoFar").innerHTML += key+" ";
        //         console.log("checking previous in secert");
        //         //CALL TICKER
        //     }
        //     else if (key == guessedWordSoFar[i] && key != secretWord[0][i]){
        //         previousTyped++;
        //         console.log("checking previous not in secert");
        //     }
        // }



        for (var i = 0; i<guessSoFar.length; i++){
            if (key == guessSoFar[i]){
                previousTyped++;
                found++;
                // document.getElementById("guessSoFar").innerHTML += key+" ";
                console.log("checking previous in secert");
                //CALL TICKER
            }
        }

        guessSoFar.push(key);











        
        
        //check if typed letter is present in the secret word
        for(i=0;i<secretWord[0].length;i++){
            
            //if key typed matches secret word AND was not entered previously
            if (key == secretWord[0][i] && previousTyped == 0){
                guessedWordSoFar[i] = secretWord[0][i];
                // console.log(guessedWordSoFar);
                // console.log(secretWord[0]);
                if (printed <1){
                    document.getElementById("guessSoFar").innerHTML += key+" ";
                    printed++;
                }
                // document.getElementById("word").innerHTML = guessedWordSoFar  
                
                
                document.getElementById("word").innerHTML = "";
                for (var c = 0; c < guessedWordSoFar.length; c++){
                    if (guessedWordSoFar[c] != " "){
                        document.getElementById("word").innerHTML += guessedWordSoFar[c];
                    }
                    else{
                        document.getElementById("word").innerHTML += "_ ";
                    }
                    // document.getElementById("word").innerHTML += guessedWordSoFar[c];
                }



                found++;
                // compare[i] = secretWord[0][i];
                console.log(guessedWordSoFar);
                console.log(compare);
                console.log(printed);
            }
        }
        
        //check if guessed word is equal to secret word
        for (var x = 0; x < compare.length; x++){
                if (guessedWordSoFar[x] == compare[x]){
                    compareCounter++;
                    // console.log(compareCounter);
                    // console.log(compare.length);
                }           
        }

        //if guessed word is equal to secret word then post a win and reset
        if(compareCounter == compare.length){
            gameWins++;
            // console.log(gameWins);
            document.querySelector("#wins").innerHTML = gameWins;
            var msg = new SpeechSynthesisUtterance(allPlaces[randomNum][0]);
            window.speechSynthesis.speak(msg);
            tickerText("won");
            resetVals();
            
        }
        
        console.log("previous:"+previousTyped);

        //if typed word is not present in secret word, reduce guesses left by 1
        if (found == 0 && previousTyped == 0){
            guesses = guesses - 1;
            document.getElementById("guessSoFar").innerHTML += key+" ";
            document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + guesses;
            if (guesses == 3){
                tickerText("hint");
            }

        }

        //if secret word not guessed within 10 attempts, post a loss and reset
        if (guesses == 0){
            losses++;
            // console.log(document.querySelector("#losses").innerHTML);
            document.querySelector("#losses").innerHTML = losses;
            // reset
            resetVals();
            tickerText("lose");
            // document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + guesses;
            // document.querySelector("#word").innerHTML = "Word: ";
            // document.querySelector("#word").innerHTML = "Your Guesses so far: ";
        }
        
        

    }

    //Call word guess function when key is released
    document.onkeyup = wordGuess;

    //Function to generate random secret word
    function randomPlace(){
        //Math.random returns a number between 0 and 1
        //Math.floor rounds number down so that we have no decimals
        randomNum = Math.floor(Math.random() * 10);
        return allPlaces[randomNum];

    }
    function tickerText(status){
        if (status == "initial"){
            document.getElementById("ticker").innerHTML = "Start Guessing...";
        }
        if (status == "hint"){
            setTimeout(function(){document.getElementById("ticker").innerHTML = "Hint: " + allPlaces[randomNum][1]},3000);
            document.getElementById("ticker").innerHTML = "Yikes!! Only 3 guesses left. Here is a hint...";
        }
        if (status == "won"){
            document.getElementById("Body1").style.backgroundSize = "100% 100%";
            var winImage = "url('"+allPlaces[randomNum][2]+"')";
            console.log(winImage);
            document.getElementById("Body1").style.backgroundImage = winImage;
            document.getElementById("ticker").innerHTML = "WINNER!!!";
            setTimeout(function(){document.getElementById("ticker").innerHTML = "Let's play again!"},3000);
            setTimeout(function(){document.getElementById("ticker").innerHTML = "Start Guessing..."},5000);
        }
        if (status == "lose"){
            document.getElementById("ticker").innerHTML = "LOSER!!!";
            setTimeout(function(){document.getElementById("ticker").innerHTML = "Try again!"},3000);
            setTimeout(function(){document.getElementById("ticker").innerHTML = "Start Guessing..."},5000);
        }
    }
}
document.getElementById("ticker").innerHTML = "Press Any Key To Start Playing";
document.onkeyup = startGame;