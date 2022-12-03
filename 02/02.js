import fs from 'fs';

function generateShape(value, score) { return { value, score }; }
function generateRock() { return generateShape('ROCK', 1); }
function generatePaper() { return generateShape('PAPER', 2); }
function generateScissors() { return generateShape('SCISSORS', 3); }

// GAME PART ONE
const GAME = {
  // PLAYER 1 (OPPONENT)
  'A': generateRock(),
  'B': generatePaper(),
  'C': generateScissors(),
  // PLAYER 2 (YOU)
  'X': generateRock(),
  'Y': generatePaper(),
  'Z': generateScissors(),
};

const ROUND_OUTCOME = {
  'LOST': 0,
  'DRAW': 3,
  'WON': 6
};

// GAME PART TWO
const toWinAgainst = {
  'ROCK': generatePaper(),
  'SCISSORS': generateRock(),
  'PAPER': generateScissors()
};

const toDrawAgainst = {
  'ROCK': generateRock(),
  'SCISSORS': generateScissors(),
  'PAPER': generatePaper()
};

const toLooseAgainst = {
  'ROCK': generateScissors(),
  'SCISSORS': generatePaper(),
  'PAPER': generateRock()
};

const GAME_TWO = {
  'X': toLooseAgainst,
  'Y': toDrawAgainst,
  'Z': toWinAgainst,
};

// calculate score of 2nd input
function yourScore(opponent, you) {
  let result = you.score;
  if (opponent.value === you.value)
    return result += ROUND_OUTCOME.DRAW;
  if (opponent.value === 'ROCK' && you.value === 'SCISSORS')
    return result += ROUND_OUTCOME.LOST;
  if (opponent.value === 'ROCK' && you.value === 'PAPER')
    return result += ROUND_OUTCOME.WON;
  if (opponent.value === 'SCISSORS' && you.value === 'ROCK')
    return result += ROUND_OUTCOME.WON;
  if (opponent.value === 'SCISSORS' && you.value === 'PAPER')
    return result += ROUND_OUTCOME.LOST;
  if (opponent.value === 'PAPER' && you.value === 'SCISSORS')
    return result += ROUND_OUTCOME.WON;
  if (opponent.value === 'PAPER' && you.value === 'ROCK')
    return result += ROUND_OUTCOME.LOST;
}

fs.readFile('./02_input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let rounds = data.split('\n').filter(item => item !== '');
  // rounds = ['A Y', 'B X', 'C Z'];

  let totalScore = 0;
  let totalScorePartTwo = 0;

  for (let index = 0; index < rounds.length; index++) {
    const [letter1, letter2] = rounds[index].split(' ');

    let p1 = GAME[letter1];
    let p2 = GAME[letter2];

    // part two
    let p3 = GAME_TWO[letter2][p1.value];
    
    totalScore += yourScore(p1, p2);
    totalScorePartTwo += yourScore(p1, p3);
  }
  console.log('Your total score PART ONE: ', totalScore);
  console.log('Your total score PART TWO: ', totalScorePartTwo);
});
