import fs from 'fs';
import { PRIORITY_DIC } from './util.js';

fs.readFile('./03_input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let rawSacks = data.split('\n').filter(item => item !== '');

  let groups = rawSacks.reduce((prev, cur, index) => {
    let position = prev.length;
    if (index %3 === 0) {
      prev.push([]);
      prev[position].push(cur);
    } else {
      prev[position - 1].push(cur);
    }
    return prev;
  }, []);

  let items = groups.map(group => {
    let [s1, s2, s3] = group.map(sack => sack.split(""));
    let commonBetweenOneAndTwo = s1.filter(item => s2.includes(item));
    let allInCommon = commonBetweenOneAndTwo.filter(item => s3.includes(item));
    return allInCommon[0];
  });

  let sum = items.reduce((prev, cur) => prev + PRIORITY_DIC[cur], 0);
  console.log('Sum priority: ', sum);
});