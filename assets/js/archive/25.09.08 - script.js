   // Getting pixel width of a character
// let letterLength = {};
// let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// for (let letter of letters) {
//   let span = document.createElement('span');
//   span.append(document.createTextNode(letter));
//   document.body.append(span);
//   letterLength[letter] = span.offsetWidth;
//   span.remove();
// }

// let word = "X";

// for (let i = 0; i < word.length; i++) {
//   console.log(word[i] + ": " + letterLength[word[i]])
// }

// var w = window.innerWidth;
// var charN = w / letterLength[word];
// var nRounded = Math.floor(charN);
// var addW = (letterLength[word] + (CharN - nRounded) / nRounded);

// console.log(w);
// console.log(CharN);
// console.log(nRounded);
// console.log(addW);

  // Getting pixel width of span element

function typeFill() {
  let span = document.getElementsByTagName('span');
  let p = document.getElementsByTagName('p');

  const frag = document.createDocumentFragment();

  // const cloneP = p.cloneNode(true);
  

  for (let i= p.length - 1; i >= 0; i--) {
    p[i].remove();
  }

  for (let i = span.length - 1; i >= 0; i--) {
    span[i].remove();
  }
  
  // meausure character width & height
  const charInit = document.createElement('span');
  charInit.append(document.createTextNode('█'));
  document.body.append(charInit);
  const rect = charInit.getBoundingClientRect();
  const charW = rect.width;
  const charH = rect.height;
  charInit.remove();

  // type fill - width
  var winW = window.innerWidth;
  var charN = winW / charW;
  var charNR = Math.floor(charN);
  var addW = ((winW - (charW * charNR)) / charNR) + charW;

  // type fill - height
  var winH = window.innerHeight;
  var lineN = winH / charH;
  var lineNR = Math.ceil(lineN);
  var addH = ((winH - (charH * lineNR)) / lineNR) + charH;

  // type fill - lines
  // for (let i = 0; i < lineNR; i++) {
  //   let line = document.createElement('p');
  //   line.setAttribute('data-height', addH);
  //   // document.body.append(line);
  //   frag.appendChild(line);

  //     // optimise w/ cloneNode
  //   // let lineSpan = line.cloneNode(true);
  //   // dFrag.body.append(lineSpan);
  // }

  // document.body.appendChild(frag);

  
  // type fill - characters
  // for (let i = 0; i < charNR; i++) {
  for (let i = 0; i < lineNR; i++) {
    const line = document.createElement('p');
    // line.textContent = "Hello World"
    line.setAttribute('data-height', addH);
    document.body.appendChild(line);

    // for (let j = 0; j < p.length; j++) {
    for (let j = 0; j < charNR; j++) {

      let char = document.createElement('span');
      char.textContent = "X";
      // char.append(document.createTextNode('X'));
      char.setAttribute('data-width', addW);

      line.appendChild(char);

        // optimise w/ cloneNode
      // const cloneSpan = char.cloneNode(true);
      // p[j].append(cloneSpan);

      // p[j].appendChild(cloneSpan);
      
    }
  }
  // console.log(charW);
  console.log(charH);
  console.log(addH);
  // console.log(winW);
  // console.log(charN);
  // console.log(charNR);
  // console.log(addW);
}
window.addEventListener('DOMContentLoaded', typeFill);
window.addEventListener('resize', typeFill);