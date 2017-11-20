export default function slugify(str, separator = '-') {
  // lower case original string to a new one
  let s = str.toLowerCase();
  // replace special characters based in a
  s = s.replace(/[\u00C0-\u00C5]/ig, 'a');
  // replace special characters based in e
  s = s.replace(/[\u00C8-\u00CB]/ig, 'e');
  // replace special characters based in i
  s = s.replace(/[\u00CC-\u00CF]/ig, 'i');
  // replace special characters based in o
  s = s.replace(/[\u00D2-\u00D6]/ig, 'o');
  // replace special characters based in u
  s = s.replace(/[\u00D9-\u00DC]/ig, 'u');
  // replace special characters based in n
  s = s.replace(/[\u00D1]/ig, 'n');
  // replace ç for c
  s = s.replace('ç', 'c');
  // remove non parsed symbols
  s = s.replace(/[^a-z0-9 ]+/gi, '');
  // replace blank spaces for separator argument
  s = s.trim().replace(/ /g, separator);
  // regex for cleaning unnecessary separators from original string
  const regex = new RegExp('/[^a-z\\' + separator + '/ ]*/ig'); // eslint-disable-line
  return (s.replace(regex, ''));
}

