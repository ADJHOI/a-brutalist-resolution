// Getting pixel width of span element
const bgCont = document.getElementById('bg-cont');
// const bodyEl = document.body;
const bgp = bgCont.getElementsByTagName('p');
const measure = document.getElementById('measure');
const textWrap = document.getElementById('text-wrapper');
const textWrapP = textWrap.querySelectorAll('p');
const header = document.getElementById('header');
const side = document.getElementById('side');
const sideP = side.querySelectorAll('p');
const footer = document.getElementById('footer');
const bodyText = document.getElementById('body-text');

// write if condition
const charInfo = document.getElementsByClassName('char-info');
const charInfoP = charInfo[0].querySelectorAll('p');

const quality = document.getElementsByClassName('quality');
const active = document.getElementsByClassName('quality active');

const lq = document.getElementById('lq');
const nq = document.getElementById('nq');
const hq = document.getElementById('hq');
const toggleGrid = document.getElementById('toggle-grid');
const grid = document.getElementById('grid');

const fontSize = document.getElementById('font-size');
const charWSpan = document.getElementById('char-w');
const charHSpan = document.getElementById('char-h');
const winWSpan = document.getElementById('win-w');
const winHSpan = document.getElementById('win-h');
const totalChar = document.getElementById('char-no');
const totalLine = document.getElementById('line-no');
const charPerLine = document.getElementById('cpl');
const contentTotalChar = document.getElementById('content-char-no');
const contentTotalLine = document.getElementById('content-line-no');
const contentCharPerLine = document.getElementById('content-cpl');
const lineH = document.getElementById('line-h');
const letterSp = document.getElementById('letter-sp');

// let measureFS = parseInt(measure.style.fontSize);
let measureFS = bgCont.className;
let n = parseInt(bgCont.getAttribute('data-quality'));
console.log(n);
let charFill = ' ';
// let charFill = 'X';

function typeFill() {
  const span = bgCont.getElementsByTagName('span');
  const frag = document.createDocumentFragment();

  for (let i = bgp.length - 1; i >= 1; i--) {
    bgp[i].remove();
  }

  for (let i = span.length - 1; i >= 0; i--) {
    span[i].remove();
  }
  
  // measure character width & height
  // const pInit = document.createElement('p');
  // pInit.id = 'measureInit';
  // pInit.setAttribute('style', 'font-size:' + measureFS +'px');
  // document.body.append(pInit);
  const charInit = document.createElement('span');
  charInit.textContent = "█";
  document.getElementById('measure').appendChild(charInit);
  // pInit[0].append(charInit);
  const rect = charInit.getBoundingClientRect();
  const charW = rect.width;
  const charH = rect.height;
  // pInit.remove();
  charInit.remove();

  // type fill - width
  let winW = window.innerWidth;
  let charN = winW / charW;
  let charNR = Math.floor(charN);
  let addW = ((winW - (charW * charNR)) / charNR) + charW;

  // type fill - height
  let winH = window.innerHeight;
  let lineN = winH / charH;
  let lineNR = Math.floor(lineN);
  let addH = ((winH - (charH * lineNR)) / lineNR) + charH;

  // y-axis element
  const line = document.createElement('p');
  line.style.height = addH + 'px';
  line.style.lineHeight = addH + 'px';
  line.style.letterSpacing = (addW - charW) + 'px';
  line.className = 'line';
  // document.body.appendChild(line)

  // x-axis element
  const char = document.createElement('span');
  char.className = 'char';
  // char.style.letterSpacing = ;
  // line.appendChild(char)


  // type fill - characters
  // cloneNode the elements above
    // i = number of lines / y-axis
  for (let i = 0; i < lineNR; i++) {
    const cloneLine = line.cloneNode(true);

      // j = number of characters / x-axis
    for (let j = 0; j < charNR; j++) {

      const cloneChar = char.cloneNode(true);
      // cloneChar.classList.add(j);
      if (i <= (2 * (2 ** (n - 1))) - 1 || i >= lineNR - (2 * (2 ** (n - 1))) || j <= (4 * (2 ** (n - 1))) - 1 || j >= charNR - (4 * (2 ** (n - 1)))) {
        if (i <= (1 * (2 ** (n - 1))) - 1 || i >= lineNR - (1 * (2 ** (n - 1))) || j <= (2 * (2 ** (n - 1))) - 1 || j >= charNR - (2 * (2 ** (n - 1)))) {
          cloneChar.classList.add('border-1');
          cloneChar.textContent = '█';
        } else {
          cloneChar.classList.add('border-2');
          cloneChar.textContent = '▒';
        }
      } else {
        cloneChar.classList.add('character-grid');
        cloneChar.textContent = charFill;
      }
      cloneLine.appendChild(cloneChar);
    }
    frag.appendChild(cloneLine);
  }
  
  bgCont.appendChild(frag);
  
// SETTING ATTRIBUTES

// setting line height of <p> in #text-wrapper
  textWrapP.forEach(p => {
    p.style.letterSpacing = (addW - charW) + 'px';
    p.style.lineHeight = addH + 'px';
  });

  charInfoP.forEach(p => {
    p.style.marginBottom = (addH) + 'px';
  });

  const textWrapStyles = {
    margin: (addH * (2 * (2 ** (n - 1)))) + 'px ' + (addW * (4 * (2 ** (n - 1)))) + 'px',
    // marginLeft: ((addW * (4 * (2 ** (n - 1)))) + (addW - charW)) + 'px',
    marginRight: (addW * (4 * (2 ** (n - 1)))) - ((addW - charW) * (9 * (2 ** (n - 1)))) + 'px',
    paddingBottom: (addH * (2 * (2 ** (n - 1)))) - (1 * (addH - charH)) + 'px',
    minHeight: (addH * (lineNR - (4 * (2 ** (n - 1)))))  - (2 * (addH - charH)) + 'px'
  };
  Object.assign(textWrap.style, textWrapStyles);

   // NAV
  const headerStyles = {
    top: addH + 'px',
    left: addW + 'px'
  };
  Object.assign(header.style, headerStyles);

  const sideStyles = {
    top: (addH * (2 ** (n - 1))) + 'px',
    left: (addW * ((2 ** n) - 2)) + 'px'
  };
  Object.assign(side.style, sideStyles);

  sideP.forEach(p => {
    p.style.height = addH + 'px';
  });

  toggleGrid.style.marginTop = addH + 'px';

  fontSize.textContent = (32 * (0.5 ** (n - 1)));

  charWSpan.textContent = charW;
  charHSpan.textContent = charH;

  winWSpan.textContent = winW;
  winHSpan.textContent = winH;
  
  totalChar.textContent = (charNR * lineNR);
  totalLine.textContent = lineNR;
  charPerLine.textContent = charNR;

  contentTotalChar.textContent = (lineNR - (4 * (2 ** (n - 1)))) * (charNR - (8 * (2 **(n - 1))));
  contentTotalLine.textContent = lineNR - (4 * (2 ** (n - 1)));
  contentCharPerLine.textContent = charNR - (8 * (2 **(n - 1)));

  lineH.textContent = addH;
  letterSp.textContent = addW - charW;
    // debug
  // console.log(charW);
  // console.log(winW);
  console.log("Line Init. Height: " + charH);
  console.log("Line Added Height: " + addH);
  // console.log("No. of lines: " + lineNR)
  // console.log(charN);
  // console.log("No. of characters per line: " + charNR);
  // console.log("Total no. of characters: " + (lineNR * charNR));
  // console.log(addW);

  // content area
  // console.log("Content area no. of lines: " + (lineNR - (4 * (2 ** (n - 1)))));
  // console.log("Content area no. of characters: ");
  // console.log("Content area no. of characters per line: ");
}

function changeQuality (){
  let n= this.getAttribute('data-quality');
  for (let i = active.length - 1; i >= 0; i--) {
    active[i].classList.remove('active');
  }
  this.classList.add('active');
  bgCont.setAttribute('data-quality', n);
  textWrap.setAttribute('data-quality', n);
}

function typeGrid () {
  grid.classList.toggle('active');
  if (grid.classList.contains('active')){
    charFill = 'X'
  } else {
    charFill = ' ';
  }
  typeFill();
}

  // observing font size change
const fontObserver = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && (mutation.attributeName === 'data-quality')) {

      n = parseInt(bgCont.getAttribute('data-quality'));
      bgCont.className = 'q-' + n;
      textWrap.className = 'q-' + n;
      // console.log(`Attribute "${mutation.attributeName}" changed on element:`, mutation.target);

    // Further logic to handle the CSS change
      // console.log(x);
      typeFill();
    }
  }
});

const config = { attributes: true, attributeFilter: ['data-quality'], attribteOldValue: true };
fontObserver.observe(bgCont, config)

window.addEventListener('DOMContentLoaded', typeFill);
window.addEventListener('resize', typeFill);
// window.addEventListener('afterprint', typeFill)
lq.addEventListener('click', changeQuality);
nq.addEventListener('click', changeQuality);
hq.addEventListener('click', changeQuality);
grid.addEventListener('click', typeGrid);