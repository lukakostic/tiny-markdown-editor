const replacements = {
  ASCIIPunctuation: '!"#$%&\'()*+,\\-./:;<=>?@\\[\\]^_`{|}~',
  TriggerChars: '`_\*\[\]\(\)',

}

// From CommonMark.js. 
const punctuationLeading = new RegExp(/^(?:[!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B])/);

const punctuationTrailing = new RegExp(/(?:[!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B])$/);

// export const inlineTriggerChars = new RegExp(`[${replacements.TriggerChars}]`);

/**
 * This is CommonMark's block grammar, but we're ignoring nested blocks here.  
 */ 
const lineGrammar = { 
  TMH1: { 
    regexp: /^( {0,3}#)((?:\s+)(?:.*?))((?:#\s*)?)$/, 
    replacement: '<span class="TMMark TMMark_TMH1">$1</span>$$2<span class="TMMark TMMark_TMH1">$3</span>'
  },
  TMH2: { 
    regexp: /^( {0,3}##)((?:\s+)(?:.*?))((?:##\s*)?)$/, 
    replacement: '<span class="TMMark TMMark_TMH2">$1</span>$$2<span class="TMMark TMMark_TMH2">$3</span>'
  },
  TMH3: { 
    regexp: /^( {0,3}###)((?:\s+)(?:.*?))((?:###\s*)?)$/, 
    replacement: '<span class="TMMark TMMark_TMH3">$1</span>$$2<span class="TMMark TMMark_TMH3">$3</span>'
  },
  TMH4: { 
    regexp: /^( {0,3}####)((?:\s+)(?:.*?))((?:####\s*)?)$/, 
    replacement: '<span class="TMMark TMMark_TMH4">$1</span>$$2<span class="TMMark TMMark_TMH4">$3</span>'
  },
  TMH5: { 
    regexp: /^( {0,3}#####)((?:\s+)(?:.*?))((?:#####\s*)?)$/, 
    replacement: '<span class="TMMark TMMark_TMH5">$1</span>$$2<span class="TMMark TMMark_TMH5">$3</span>'
  },
  TMH6: { 
    regexp: /^( {0,3}######)((?:\s+)(?:.*?))((?:######\s*)?)$/, 
    replacement: '<span class="TMMark TMMark_TMH6">$1</span>$$2<span class="TMMark TMMark_TMH6">$3</span>'
  },
  TMBlockquote: { 
    regexp: /^( {0,3}>)( +.*)$/, 
    replacement: '<span class="TMMark TMMark_TMBlockquote">$1</span>$$2'
  },
  TMCodeFenceBacktickOpen: { 
    regexp: /^( {0,3}```).*$/, 
    replacement: '<span class="TMMark TMMark_TMCodeFenceBacktick">$0</span>'
  },
  TMCodeFenceTildeOpen: { 
    regexp: /^( {0,3}~~~).*$/, 
    replacement: '<span class="TMMark TMMark_TMCodeFenceTilde">$0</span>'
  },
  TMBlankLine: { 
    regexp: /^([ \t]*)$/, 
    replacement: '$0<br>'
  },
  TMSetextH1Marker: { 
    regexp: /^ {0,3}=+\s*$/, 
    replacement: '<span class="TMMark TMMark_TMSetextH1Marker">$0</span>'
  },
  TMSetextH2Marker: { 
    regexp: /^ {0,3}-+\s*$/, 
    replacement: '<span class="TMMark TMMark_TMSetextH1Marker">$0</span>'
  },
  TMHR: { 
    regexp: /^( {0,3}(\*[ \t]*\*[ \t]*\*[ \t\*]*)|(-[ \t]*-[ \t]*-[ \t-]*)|(_[ \t]*_[ \t]*_[ \t_]*))$/, 
    replacement: '<span class="TMMark TMMark_TMHR">$0</span>'
  },
  TMUL: { 
    regexp: /^( {0,3}[+*-] )(.*)$/, 
    replacement: '<span class="TMMark TMMark_TMUL">$1</span>$$2'
  },
  TMOL: { 
    regexp: /^( {0,3}\d{1,9}[.)] )(.*)$/, 
    replacement: '<span class="TMMark TMMark_TMOL">$1</span>$$2'
  },
  TMIndentedCode: { 
    regexp: /^(    |\t)(.*)$/, 
    replacement: '<span class="TMMark TMMark_TMIndentedCode">$1</span>$2'
  },
  TMLinkReferenceDefinition: {
    regexp: /^( {0,3}\[\s*)([^\s\]](?:[^\]]|\\\])*?)(\s*\]:)(.*)$/, // TODO the rest of the line can't quite have "any" format
    replacement: '<span class="TMMark TMMark_TMLinkReferenceDefinition">$1</span><span class="TMLinkLabel TMLinkLabel_Definition">$2</span><span class="TMMark TMMark_TMLinkReferenceDefinition">$3</span>$4',
    labelPlaceholder: 2 // this defines which placeholder in the above regex is the link "label"
  }
};


/**
 * Structure of the object:
 * Top level entries are rules, each consisting of a regular expressions (in string format) as well as a replacement.
 * In the regular expressions, replacements from the object 'replacements' will be processed before compiling into the property regexp.
 */
var inlineGrammar = {
  escape : {
    regexp: /^\\([ASCIIPunctuation])/,
    replacement : '<span class="TMMark TMMark_TMEscape">\\</span>$1'
  },
  code : {
    regexp: /^(`+)((?:[^`])|(?:[^`].*?[^`]))(\1)/,
    replacement : '<span class="TMMark TMMark_TMCode">$1</span><code class="TMCode">$2</code><span class="TMMark TMMark_TMCode">$3</span>' 
  },
  // autolink : {
  //   regexp: //,
  //   replacement: ''
  // },
  linkOpen : {
    regexp: /^\[/,
    replacement: ''
  },
  imageOpen : {
    regexp: /^\!\[/,
    replacement : ''
  },
  linkLabel : {
    regexp: /^(\[\s*)([^\]]*?)(\s*\])/,
    replacement: '',
    labelPlaceholder: 2
  },
  default : {
    regexp: /^(.|(?:[^TriggerChars]+))/,
    replacement: '$1'
  }
};

// Compile regexps
const rules =[...Object.keys(inlineGrammar)];
for (let rule of rules) {
  let re = inlineGrammar[rule].regexp.source;
  for (let rp of Object.keys(replacements)) {
    re = re.replace(rp, replacements[rp]);
  }
  inlineGrammar[rule].regexp = new RegExp(re, inlineGrammar[rule].regexp.flags);
};

/**
 * Escapes HTML special characters (<, >, and &) in the string.
 * @param {string} string The raw string to be escaped
 * @returns {string} The string, ready to be used in HTML
 */
function htmlescape(string) {
  return (string ? string : '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export { lineGrammar, inlineGrammar, punctuationLeading, punctuationTrailing, htmlescape };