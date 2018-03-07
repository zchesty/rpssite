/*global $*/
/*global name*/

$(document).ready(function() {
    console.log("Page is Ready");
    setupButtons();
});

function setupButtons() {
    $("#rock").click(function() {
        humanChoice($(this).attr("name"));
    });
    $("#paper").click(function() {
        humanChoice($(this).attr("name"));
    });
    $("#scissors").click(function() {
        humanChoice($(this).attr("name"));
    });
}


function humanChoice(tool) {
    var computerChoice = computer.makeChoice(4);
    computer.addHumanHistory(tool);
    $("#userChoice").html(toolIcons[tool]);
    $("#computerChoice").html(toolIcons[computerChoice]);
    $("#history").prepend("<li>" + resultLogic.winnerString(tool, computerChoice) + "</li>");
}

var toolArr = ["rock", "paper", "scissors"];
var toolIcons = {
    rock: '<i class="far fa-hand-rock"></i>',
    paper: '<i class="far fa-hand-paper">',
    scissors: '<i class="far fa-hand-scissors">'
};
//computer opponent logic

var computer = {
    humanHistory: [],
    addHumanHistory: function(tool) {
        this.humanHistory.push(tool);
    },
    randomChoice: function() {
        return toolArr[Math.floor(Math.random() * 3)];
    },
    makeVect: function(checksize, start) {
        var vect = [];
        for (var i = 0; i < checksize; i++) {
            vect.push(this.humanHistory[start - i]);
        }
        return vect;
    },
    equalVects: function(search, compare, checkSize) {
        for (var i = 0; i < checkSize; i++) {
            if (search[i] != compare[i]) {
                return false;
            }
        }
        return true;
    },
    analyzeResults: function(results) {
       //need to work on this part
    },
    makeChoice: function(checkSize) {
        var checkStart = this.humanHistory.length - 1;
        var checkEnd = checkStart - checkSize;
        if (checkSize < 2 || checkSize >= checkStart) {
            return this.randomChoice();
        } 
        var search = this.makeVect(checkSize, checkStart);
        var results = [];
        while (checkEnd >= 0) {
            checkStart--;
            checkEnd--;
            var compare = this.makeVect(checkSize, checkStart);
            if (this.equalVects(search, compare, checkSize)) {
                results.push(this.humanHistory[checkStart + 1]);
            }
        }
        if (results.length != 0) {
            //analyze results need to fix
             return this.randomChoice();
        }
        else {
            return this.makeChoice(checkSize - 1);
        }
    }
};

var resultLogic = {
    winnerString: function(humanChoice, computerChoice) {
      if (humanChoice === "rock") {
          if (computerChoice === "scissors") {
              return this.humanWins(humanChoice, computerChoice);
          }
          else if (computerChoice === "paper") {
              return this.computerWins(humanChoice, computerChoice);
          }
          else {
              return this.tie(humanChoice, computerChoice);
          }
      }
      if (humanChoice === "paper") {
          if (computerChoice === "rock") {
              return this.humanWins(humanChoice, computerChoice);
          }
          else if (computerChoice === "scissors") {
              return this.computerWins(humanChoice, computerChoice);
          }
          else {
              return this.tie(humanChoice, computerChoice);
          }
      }
      if (humanChoice === "scissors") {
          if (computerChoice === "paper") {
              return this.humanWins(humanChoice, computerChoice);
          }
          else if (computerChoice === "rock") {
              return this.computerWins(humanChoice, computerChoice);
          }
          else {
              return this.tie(humanChoice, computerChoice);
          }
      }
  },
  humanWins: function(humanChoice, computerChoice) {
      return name + " beat the computers " + computerChoice + " with " + humanChoice;
  },
  computerWins: function(humanChoice, computerChoice) {
      return name + " lost to the computers " + computerChoice + " with " + humanChoice;
  },
  tie: function(humanChoice, computerChoice) {
      return name + " tied with the computers " + computerChoice + " with " + humanChoice;
  }
};

