var lowercaseChars = "abcdefghijklmnopqrstuvwxyz".split("");
var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var numberChars = "0123456789".split("");
var symbolChars = ",<.>/?;:'\"[{]}\\|`~!@#$%^&*()-_=+".split("");

function getSelectedChars() {
  var selectedChars = [];
  if (document.getElementById("cbLowercase").checked) selectedChars = selectedChars.concat(lowercaseChars);
  if (document.getElementById("cbUppercase").checked) selectedChars = selectedChars.concat(uppercaseChars);
  if (document.getElementById("cbNumber").checked) selectedChars = selectedChars.concat(numberChars);
  if (document.getElementById("cbSymbol").checked) selectedChars = selectedChars.concat(symbolChars);
  if (selectedChars.length == 0) return;
  
  var excludeChars = document.getElementById("itExclude").value.split("");
  for (i = 0; i < excludeChars.length; i++) {
    var excludeIndex = selectedChars.indexOf(excludeChars[i]);
    if (excludeIndex != -1) selectedChars.splice(excludeIndex,1);
  }
  return selectedChars;
}

function generate() {
  document.getElementById("ibCopy").value = "Copy";
  var selectedChars = getSelectedChars();
  var unique = document.getElementById("cbUnique").checked;
  var lengthh = document.getElementById("itLength").value;
  var output = "";
  for (i = 0; i < lengthh; i++) {
    var randomIndex = Math.floor(Math.random() * selectedChars.length);
    var randomChar = selectedChars[randomIndex];
    output += randomChar;
    if (unique) selectedChars.splice(randomIndex,1);
    if (selectedChars.length == 0) break;
  }
  document.getElementById("itOutput").value = output;
}

function reset() {
  var cbLowercase = document.getElementById("cbLowercase");
  var cbUppercase = document.getElementById("cbUppercase");
  var cbNumber = document.getElementById("cbNumber");
  var cbSymbol = document.getElementById("cbSymbol");
  var countSelect = 0;
  if (cbLowercase.checked) countSelect++;
  if (cbUppercase.checked) countSelect++;
  if (cbNumber.checked) countSelect++;
  if (cbSymbol.checked) countSelect++;
  if (countSelect == 0) {
    cbLowercase.checked = true;
    cbUppercase.checked = true;
    cbNumber.checked = true;
    cbSymbol.checked = true;
  }
  
  var itLength = document.getElementById("itLength");
  var lengthh = itLength.value;
  if (lengthh == "" || lengthh < 1) lengthh = 10;
  else if (document.getElementById("cbUnique").checked) {
    var maxLength = getSelectedChars().length;
    if (lengthh > maxLength) lengthh = maxLength;
  }
  itLength.value = lengthh;
  
  document.getElementById("dSelectedChars").innerHTML = getSelectedChars().join("");
  generate();
}

function copy() {
  document.getElementById("itOutput").select();
  document.execCommand("copy");
  document.getElementById("ibCopy").value = "Copied!";
}

reset();
