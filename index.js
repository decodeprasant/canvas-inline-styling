import skia from 'skia-canvas';
const { Canvas } = skia;
import fs from 'fs';

let canvas = new Canvas(1200, 630);
let ctx = canvas.getContext('2d');

let formatWords = {
  bold: ['bold', 'abcd', 'test'],
  italic: ['italic', 'random', 'numbers'],
}

let text = "This is a test text with bold and italic words. some random text with numbers 1234567890";
let words = text.split(/ +/); // split on spaces to get all the words in an array
let fontSize = 40;
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = '#000';
ctx.font = `${fontSize}px Arial`;
ctx.textBaseline = 'top';

let startY = 20,
  startX = 20,
  desiredTotalWidth = canvas.width - startX * 2,
  previuosWordWidth = startX,
  previuosWordHeight = startY;

  startY = startY > fontSize ? startY : fontSize;


words.forEach((word, i) => {
  let wordWidth = ctx.measureText(word).width;
  let wordX = previuosWordWidth + 10;
  // let wordY = 100;
  if (wordX + wordWidth > desiredTotalWidth) {
    previuosWordWidth = startX;
    previuosWordHeight += fontSize + 10;
  }
  wordX = previuosWordWidth + 10;
  let wordY = previuosWordHeight;
  previuosWordWidth = wordX + wordWidth;
  ctx.save();
  if (formatWords.bold.includes(word)) {
    ctx.font = `bold ${fontSize}px Arial`;
    previuosWordWidth += 5;
  } else if (formatWords.italic.includes(word)) {
    ctx.font = `italic ${fontSize}px Arial`;
  }

  ctx.fillText(word, wordX, wordY);
  ctx.restore();

})

let image = await canvas.toBuffer('png');
fs.writeFileSync('./test.png', image);
