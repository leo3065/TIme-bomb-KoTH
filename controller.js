import "./seedrandom.min.js"

export function runGame(bots, n=1000){
  // Some consts
  const bot_n = bots.length
  const upperbound = bot_n+1

  // Total score
  let scores = new Array(bot_n).fill(0)

  // Initial previous decistions and points
  let prev_numbers = new Array(bot_n).fill(0).map(_=>(Math.ceil(Math.random()*upperbound)))
                        .sort((a,b)=>a-b)
  let prev_points = new Array(bot_n).fill(0)

  for(let round = 0; round < n; round++){
    // Gets decisions
    let numbers = []
    for(let [i, bot] of bots.entries()){
      let number = bot.run(prev_numbers, prev_points[i])
      if(!(Number.isInteger(number))){
        number = upperbound
      }
      number = Math.min(upperbound, Math.max(1, number))
      numbers.push(number)
    }
    //console.log("Numbers: " + numbers)

    // Calulates scores
    let counter = sum(numbers) / 2
    let count_subs = Array(upperbound+2).fill()
        .map((_,i)=>(numbers.filter(v=>v==i).length*i))
    let explode = 0
    for(let sub of count_subs){
      counter-=sub
      if(counter<=0){
        break
      }
      explode++
    }
    //console.log("Explode: " + explode)
    let points = [];
    for(let [i, number] of numbers.entries()){
      let point = 0
      if(number < explode){
        point = number*2
      }else if(number == explode){
        point = -number
      }
      points.push(point)
      scores[i] += point
    }
    //console.log("Points: " + points)
    //console.log("Scores: " + scores)

    prev_numbers = numbers.sort((a,b) => a-b).map((x) => x)
    prev_points = points.map((x) => x)

    //console.log()
  }
  return scores
}

export function printScores(bots, scores){
  let max_bot_name_len = Math.max(...bots.map(bot => bot.name.length))
  let results = bots.map((bot, i) => [bot.name, scores[i]]).sort((a, b) => b[1] - a[1])
  for(let [name, score] of results) {
    console.log(
      name,
      " ".repeat(max_bot_name_len + 1 - name.length),
      score
    )
  }
}

// Helper functions
export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}
