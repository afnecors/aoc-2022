function generatePriorityDic() {
  let charLow = "a";
  let charUp = "A";

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