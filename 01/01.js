import fs from 'fs';

fs.readFile('./01_input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let elves = data.split('\n\n');
  let elvesSum = elves.map(e => {
    // remove empty item
    let snacks = e.split('\n').filter(s => s !== '');
    let total = snacks.reduce((prev, curr) => prev + parseInt(curr), 0);
    return total;
  });

  let top3 = [];
  let top3sum = 0;
  for (let index = 0; index < 3; index++) {
    let max = Math.max(...elvesSum);
    top3.push(max);
    top3sum += max;
    // remove item from array
    elvesSum.splice(elvesSum.indexOf(max), 1);
  }

  console.log('Top 3 elves: ', ...top3);
  console.log('Top 3 elves sum: ', top3sum);
});