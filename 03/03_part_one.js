import fs from 'fs';
import { PRIORITY_DIC } from './util.js';

fs.readFile('./03_input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let rawSacks = data.split('\n').filter(item => item !== '');
  
  let sacks = rawSacks.map(rawSack => [rawSack.slice(0, rawSack.length / 2), rawSack.slice(rawSack.length / 2)]);

  let items = sacks.map(sack => {
    let compartment1 = sack[0].split("");
    let compartment2 = sack[1].split("");
    return compartment1.filter(item => compartment2.includes(item))[0];
  })
  
  let sum = items.reduce((prev, cur) => prev + PRIORITY_DIC[cur], 0);
  console.log('Sum priority: ', sum);
});
