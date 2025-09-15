// Getting pixel width of span element
const bgCont = document.getElementById('bg-cont');
const bgp = bgCont.getElementsByTagName('p');
const measure = document.getElementById('measure');
const textWrap = document.getElementById('text-wrapper');
const textWrapP = textWrap.querySelectorAll('p');
const header = document.getElementById('header');
const side = document.getElementById('side');
const footer = document.getElementById('footer');

const quality = document.getElementsByClassName('quality');
const active = document.getElementsByClassName('quality active');

const lq = document.getElementById('lq');
const nq = document.getElementById('nq');
const hq = document.getElementById('hq');
const grid = document.getElementById('grid');

const totalChar = document.getElementById('char-no');
const totalLine = document.getElementById('line-no');
const charPerLine = document.getElementById('cpl');

const contentTotalChar = document.getElementById('content-char-no');
const contentTotalLine = document.getElementById('content-line-no');
const contentCharPerLine = document.getElementById('content-cpl');

// let measureFS = parseInt(measure.style.fontSize);
let measureFS = bgCont.className;
let n = parseInt(bgCont.getAttribute('data-quality'));
console.log(n);

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
  var winW = window.innerWidth + 1;
  var charN = winW / charW;
  var charNR = Math.floor(charN);
  var addW = ((winW - (charW * charNR)) / charNR) + charW;

  // type fill - height
  var winH = window.innerHeight + 1;
  var lineN = winH / charH;
  var lineNR = Math.floor(lineN);
  var addH = ((winH - (charH * lineNR)) / lineNR) + charH;

  // y-axis element
  const line = document.createElement('p');
  line.style.height = addH + 'px';
  line.style.lineHeight = addH + 'px';
  line.style.letterSpacing = (addW - charW) + 'px';
  // line.style.lineHeight = '115.7%';
  // line.setAttribute('data-h', addH);
  line.className = 'line';
  // line.setAttribute('style', 'font-size:' + measureFS + 'px');
  // document.body.appendChild(line)

  // x-axis element
  const char = document.createElement('span');
  char.className = 'char';
  // char.style.letterSpacing = ;
  // char.setAttribute('data-w', addW);
  // line.appendChild(char)


  // type fill - characters
  // cloneNode the elements above
    // i = number of lines / y-axis
  for (let i = 0; i < lineNR; i++) {
    const cloneLine = line.cloneNode(true);
    // cloneLine.classList.add(i);
    // bgCont.appendChild(cloneLine);

      // j = number of characters / x-axis
    for (let j = 0; j < charNR; j++) {

      const cloneChar = char.cloneNode(true);
      // cloneChar.classList.add(j);
      if (i <= (2 ** (n - 1)) - 1 || i >= lineNR - (2 ** (n - 1)) || j <= (2 ** n) - 1 || j >= charNR - (2 ** n)) {
        cloneChar.textContent = '▓'
      } else if (i <= 2 * (2 ** (n - 1)) - 1 && i > (2 ** (n - 1)) - 1 || i >= lineNR - 2 * (2 ** (n - 1)) && i < lineNR - (2 ** (n - 1)) || j <= 2 * (2 ** n) - 1 && j > (2 ** n) - 1 || j >= charNR - 2 * (2 ** n) && j < charNR - (2 ** n)){
        cloneChar.textContent = '░'
      } else {
        cloneChar.textContent = ' '
      }
      cloneLine.appendChild(cloneChar);
    }
    frag.appendChild(cloneLine);
  }
  
  bgCont.appendChild(frag);
  
// setting attributes

// setting line height of <p> in #text-wrapper
  textWrapP.forEach(p => {
    p.style.letterSpacing = (addW - charW) + 'px';
    p.style.lineHeight = addH + 'px';
    // p.setAttribute('data-h', addH)
    // p.setAttribute('data-w', addW);
    // p.setAttribute('data-char-w', charW);
  });

  const textWrapStyles = {
    margin: (addH * (2 * (2 ** (n - 1)))) + 'px ' + (addW * (4 * (2 ** (n - 1)))) + 'px',
    paddingBottom: (6 * addH) - (addH - charH) + 'px',
  };
  Object.assign(textWrap.style, textWrapStyles);

  // textWrap.setAttribute('style', "margin: " + (addH * (2 * (2 ** (n - 1)))) + "px " + (addW * (4 * (2 ** (n - 1)))) + "px")
  // textWrap.setAttribute('style', "padding-bottom: ")
  // textWrap.setAttribute('data-w', addW);
  // textWrap.setAttribute('data-h', addH);
  // textWrap.setAttribute('data-char-w', charW);
  // textWrap.setAttribute('data-line-h', charH);
  // textWrap.setAttribute('data-horizontal', addW * (4 * (2 ** (n - 1))));
  // textWrap.setAttribute('data-vertical', addH * (2 * (2 ** (n - 1))));

   // nav
  const headerStyles = {
    top: addH + 'px',
    left: addW + 'px'
  };
  Object.assign(header.style, headerStyles);
  // header.setAttribute('data-w', addW);  
  // header.setAttribute('data-h', addH);

  const sideStyles = {
    top: (addH * (2 ** (n - 1))) + 'px',
    left: (addW * ((2 ** n) - 2)) + 'px'
  };
  Object.assign(side.style, sideStyles);
  // side.setAttribute('data-w', addW);
  // side.setAttribute('data-h', addH);
  // side.setAttribute('data-left', addW * ((2 ** n) - 2));
  // side.setAttribute('data-top', addH * (2 ** (n - 1)));

  footer.setAttribute('data-w', addW);
  footer.setAttribute('data-h', addH);

  totalChar.textContent = charNR * lineNR;
  totalLine.textContent = lineNR;
  charPerLine.textContent = charNR;

  contentTotalChar.textContent = (lineNR - (4 * (2 ** (n - 1)))) * (charNR - (8 * (2 **(n - 1))));
  contentTotalLine.textContent = lineNR - (4 * (2 ** (n - 1)));
  contentCharPerLine.textContent = charNR - (8 * (2 **(n - 1)));

  // const charNo = document.getElementsByClassName('char');
  // if(lineNo[0]){
  //   charNo[12].textContent = "X";
  // }
    // debug
  // console.log(charW);
  // console.log(winW);
  console.log("Line Init. Height: " + charH);
  console.log("Line Added Height: " + addH);
  console.log("No. of lines: " + lineNR)
  // console.log(charN);
  console.log("No. of characters per line: " + charNR);
  console.log("Total no. of characters: " + (lineNR * charNR));
  // console.log(addW);
  // content area
  console.log("Content area no. of lines: " + (lineNR - (4 * (2 ** (n - 1)))));
  console.log("Content area no. of characters: ");
  console.log("Content area no. of characters per line: ");
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

function toggleGrid (){

}

  // observing font size change
const fontObserver = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && (mutation.attributeName === 'data-quality')) {
    // old way of chang'g font size
      // measureFS = parseInt(measure.style.fontSize);
      // let measureFS = bgCont.className;

    // new way of chang'g font size
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
lq.addEventListener('click', changeQuality)
nq.addEventListener('click', changeQuality)
hq.addEventListener('click', changeQuality)