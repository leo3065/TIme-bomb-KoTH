import {runGame, printScores, sum} from "./controller.js"

// the whole seed will be replaced by the secret seed for the final ranking
let seed = "" + Date()
Math.seedrandom(seed,{"global": true})

const bots = [
  {
    // Example bot
    // It always play the middle number.
    name: "Middle",
    run(numbers) {
      return Math.floor((numbers.length + 2) / 2);
    }
  },
  {
    // Example bot
    // It starts at 1, advances when it got points last round,
    // and resets when it lost points.
    name: "Advance and reset",
    last: 1, // Setting properties is allowed
    run(numbers, points) {
      var own = this.last;
      if (points > 0) {
        own = Math.min(this.last + 1, numbers.length + 1);
      }
      if (points < 0) {
        own = 1;
      }
      this.last = own;
      return own;
    }
  },

  // "testing" bots
  {
    name: "33%",
    run(numbers) {
      return numbers[Math.floor(numbers.length/3)];
    }
  },
  {
    name: "Pure random",
    run(numbers) {
      return Math.floor(Math.random() * (numbers.length+1))+1;
    }
  },
  {
    name: "Copy random",
    run(numbers) {
      return numbers[Math.floor(Math.random() * numbers.length)];
    }
  },
  {
    name: "Alternate",
    round: 0,
    run(numbers) {
      this.round++
      return (this.round % 2)? 1 : (numbers.length + 1)
    }
  },

  // submittions
  {
    name: "Playing It Safe",
    run(numbers) {
      return 1;
    }
  },
  {
    name: "Smart Random", 
    run(numbers) {
      var random_int = Math.floor(Math.random() * 3 * (numbers.length+1)/4);
      return random_int
    }
  },
  {
    name: "Painfully Average",
    run: (n)=>Math.abs(Math.floor(n.reduce((a,x)=>a+x))/n.length-1)
  },
  {
    name: "OnePlus",
    run(numbers) {
      return 1 + Math.random() * Math.floor(Math.random() * 5);
    }
  },
  {
    name: "Coinflipper",
    run(numbers) {
      return Math.floor(Math.random()*2)+1;
    }
  },
  {
    name: "D8roller",
    run(numbers) {
      return Math.floor(Math.random()*8)+1;
    }
  },
]

let total_scores = new Array(bots.length).fill(0)
let scores = new Array(bots.length).fill(0)

for(let run=0; run<10; run++){
  console.log("Run",run)
  Math.seedrandom(seed+run,{"global": true})
  let cloned_bots = clone(bots)
  scores = runGame(cloned_bots)
  printScores(cloned_bots,scores)

  for(let [i,score] of scores.entries()){
    total_scores[i] += score
  }
  console.log("")
}
console.log("Final")
printScores(bots,total_scores)

function clone(obj) {
  if (obj === null || typeof (obj) !== "object" || "isActiveClone" in obj) {
    return obj
  }

  if (obj instanceof Date) {
    var temp = new obj.constructor()
  } else {
    var temp = obj.constructor()
  }

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj["isActiveClone"] = null
      temp[key] = clone(obj[key])
      delete obj["isActiveClone"]
    }
  }
  return temp
}