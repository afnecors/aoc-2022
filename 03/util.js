function generatePriorityDic() {
  // 97 is "a", 65 is "A"
  let charLow = String.fromCharCode(97);
  let charUp = String.fromCharCode(65);

  let priorityDic = {};

  for (let index = 0; index < 26; index++) {
    priorityDic[charLow] = index + 1;
    priorityDic[charUp] = index + 1 + 26;
    // update
    charLow = String.fromCharCode(charLow.charCodeAt(0) + 1);
    charUp = String.fromCharCode(charUp.charCodeAt(0) + 1);
  }

  return priorityDic;
}

const PRIORITY_DIC = generatePriorityDic();

export { PRIORITY_DIC };