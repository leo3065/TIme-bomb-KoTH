# Time bomb KoTH

This is the code for [this challenge](https://codegolf.stackexchange.com/questions/224969/time-bomb-koth). 

In this challenge, players need to temper with a time bomb as late as possible without getting blasted in the face.

## Mechanics

Let `N` be the number of bots plus one. Each round, each bot receives the following arguments: 

- numbers played by all bots last round in ascending order.
- number of points it received last round. Negative if it lost last round.

The bot is asked to play an integer between 1 to `N` inclusive. After all bots played their numbers, a counter is initialized with half of the sum of numbers from all bots. Each bots then subtracts the number it played from the counter. Bots are sorted from the lowest to the highest. Bots with the same number are considered subtracts the counter at the same time. The bomb explodes when the counter hits zero or becomes negative. 

## Scoring

After the bomb exploded, the round ends, and the points for this round is calculated as the following: 

- Bots that played before the explosion get the number of points equal to **twice** the number it played this round.
- Bots that played when the explosion lose the number of points equal to the number it played this round.
- Bots that played after the explosion do not get nor receive point.

Example rounds:
 - Number played: `[1,2,3,4,5]`. The initial counter is 7.5, and the bomb explodes on 4. The bot with 1, 2, and 3 gets 2, 4, and 6 points respectively, the bot with 4 loses 4, and the bot with 5 neither gets not lose points.
 - Number played: `[1,1,2,4]`. The initial counter is 4, and the bomb explodes on 2. Bots with 1 gets 2 points, the bot with 2 loses 2, and the bot with 4 neither gets not lose points.
 - Number played: `[3,3,3,3]`. The initial counter is 6, and the bomb explodes on 3. All bots lose 3 points.

The point for each round is added to a total score for that run. Each run consist of 1000 rounds, and there will be 10 runs. The final total score is the sum of each run, and the bot with the highest final score the the end wins. 

## Specifications

The challenge is in JS.

Your bot must be an object that has a `run` method that takes an array of numbers and a number as input, and returns a integer between 1 and `N` inclusive. The value being outside the valid range will be rounded and clamped. If the value is not a number, a number in the valid range will be selected and the behavior of selecting the number is not specified. 

On the first round, the array of numbers given will be initialized with random numbers, and the number for points last round will be 0.

## Other rules

- Storing data in your bot's properties is allowed.
- You can use the `Math.random` method. During scoring, [seedrandom.min.js](http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html) will be used, with a secret string concatenated with the run number as the seed for each run. The md5 of the secret string is `4311868bf10b3f7c1782982e68e6d7ca`, for proving that I didn't change the key after the challenge. 
- You can use the helper function `sum`.
- Trying to access any other variables outside your bot's own properties is forbidden.
- [Standard loopholes apply.](https://codegolf.meta.stackexchange.com/questions/1061/loopholes-that-are-forbidden-by-default)

The code for controller can be found [here](https://github.com/leo3065/TIme-bomb-KoTH). Feel free to point out mistakes in my code, thanks. 

## Example bots

```js
{
  // Example bot
  // It always play the middle number.
  name: "Middle", 
  run(number) {
    return Math.round((numbers.length+2)/2);
  }
}
```

```js
{
  // Example bot
  // It starts at 1, advances when it got points last round,
  // and resets when it lost points.
  name: "Advance and reset",
  last: 1, // Setting properties is allowed
  run(numbers, points) {
    var own = this.last;
    if(points > 0){
      own = Math.min(this.last+1, numbers.length+1);
    }
    if(points < 0){
      own = 1;
    }
    this.last = own;
    return own;
  }
}
```

Both example bots above will also play in the game.

# Submissions are due by 2021-05-06 12:00 UTC, but might be lenient depending on when I'm online after the said time above.

