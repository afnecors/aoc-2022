
import fs from 'fs';

function createList(start, end) {
  let list = new Array(end - start + 1);
  let index = 0;
  while (start <= end) {
    list[index] = start;
    start += 1;
    index += 1;
  }
  return list;
}

function containsAll(list1, list2) {
  if (list1.every(element => list2.indexOf(element) !== -1))
    return true;
  else if (list2.every(element => list1.indexOf(element) !== -1))
    return true;
  else
    return false;
}

function overlap(list1, list2) {
  return list1.filter(x => list2.includes(x)).length != 0;
}

fs.readFile('./04_input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let rawPairs = data.split('\n').filter(item => item !== '');

  let pairsLists = rawPairs
    .map(rawPair => {
      let pairs = rawPair.split(',');
      return pairs.map(pair => pair.split('-').map(x => parseInt(x)));
    })
    .map(([p1, p2]) => [createList(p1[0], p1[1]), createList(p2[0], p2[1])]);

  // part 1
  let result1 = pairsLists
    .map(([p1, p2]) => containsAll(p1, p2))
    .reduce((prev, cur) => cur ? prev + 1 : prev, 0);

  // part 2
  let result2 = pairsLists
    .map(([p1, p2]) => overlap(p1, p2))
    .reduce((prev, cur) => cur ? prev + 1 : prev, 0);

  console.log('Part I, all in common: ', result1);
  console.log('Part II, overlap: ', result2);
});
