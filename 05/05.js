
import fs from 'fs';

const N_STACKS = 9;

function generateInitMatrix() {
  let result = [];
  for (let index = 0; index < N_STACKS; index++) {
    result.push([]);
  }
  return result;
}

function fillBaseMatrix(MATRIX, rawLine) {
  /*
    |01234567890123456789012345678901234|
    | .   .   .   .   .   .   .   .   . |
    |[G] [S]     [V] [H] [N] [T]        |
  */
  let start = 1;
  let offset = 4;
  for (let index = 0; index < N_STACKS; index++) {
    const item = rawLine[start];
    if (item !== ' ')
      MATRIX[index].push(item);
    start += offset;
  }
}

function generateRule(ruleLine) {
  let items = ruleLine.split(' ').reduce((prev, cur) => {
    return isNaN(parseInt(cur)) ? prev : [...prev, parseInt(cur)]
  }, []);
  return items;
}

function move(MATRIX, count, from, to) {
  for (let index = 0; index < count; index++) {
    let out = MATRIX[from].pop();
    MATRIX[to].push(out);
  }
}

function move2(MATRIX, count, from, to) {
  let stack = [];
  for (let index = 0; index < count; index++) {
    let out = MATRIX[from].pop();
    stack.push(out);
  }
  MATRIX[to] = MATRIX[to].concat(stack.reverse());
}

fs.readFile('./05_input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let GAME1_MATRIX = generateInitMatrix();
  let GAME2_MATRIX = generateInitMatrix();

  let raw = data.split('\n').filter(item => item !== '');

  let rawStacks = raw.slice(0, 8);
  rawStacks.forEach(rawStack => {
    fillBaseMatrix(GAME1_MATRIX, rawStack);
    fillBaseMatrix(GAME2_MATRIX, rawStack);
  });

  GAME1_MATRIX = GAME1_MATRIX.map(line => line.reverse());
  GAME2_MATRIX = GAME2_MATRIX.map(line => line.reverse());

  let rawRules = raw.slice(9);
  let rules = rawRules.map(r => generateRule(r));

  rules.forEach(rule => {
    move(GAME1_MATRIX, rule[0], rule[1] - 1, rule[2] - 1);
    move2(GAME2_MATRIX, rule[0], rule[1] - 1, rule[2] - 1);
  });

  // calculate result
  let result1 = GAME1_MATRIX.reduce((prev, cur) => prev + cur.pop(), "");
  let result2 = GAME2_MATRIX.reduce((prev, cur) => prev + cur.pop(), "");

  console.log('Part One: ', result1);
  console.log('Part Two: ', result2);
});
