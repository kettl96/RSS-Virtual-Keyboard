const keyLayout = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'DEL',
  'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
  'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '/', '&uarr;',
  'Ctrl', 'Win', 'Alt', '&mdash;', 'Alt', 'Ctrl', '&larr;', '&darr;', '&rarr;',
];
const keyLayoutShift = [
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
  'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'DEL',
  'Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter',
  'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '/', '&uarr;',
  'Ctrl', 'Win', 'Alt', '&mdash;', 'Alt', 'Ctrl', '&larr;', '&darr;', '&rarr;',
];
const keyLayoutRu = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'DEL',
  'Caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '.', '&uarr;',
  'Ctrl', 'Win', 'Alt', '&mdash;', 'Alt', 'Ctrl', '&larr;', '&darr;', '&rarr;',
];
const keyLayoutRuShift = [
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
  'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '|', 'DEL',
  'Caps', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter',
  'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Ь', 'Б', 'Ю', ',', '&uarr;',
  'Ctrl', 'Win', 'Alt', '&mdash;', 'Alt', 'Ctrl', '&larr;', '&darr;', '&rarr;',
];
const endLineArray = ['backspace', 'DEL', 'enter', '&uarr;'];
const overSizeBtn = ['Ctrl', 'Tab', 'Caps', '&mdash;', 'backspace', 'enter', 'Shift', '&uarr;', 'Win', 'Alt', '&mdash;'];

const cursor = {
  cursorPosition: null,
  letterInString: null,
  indexInString: null,
  currentPositionInString: null,
};

let langFlag = true;
let sizeBtnCount = 0;
function addElement() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  document.body.prepend(wrapper);
  const textArea = document.createElement('textarea');
  wrapper.prepend(textArea);
  const keyBoardContainer = document.createElement('div');
  keyBoardContainer.classList.add('keyBoard_container');
  wrapper.append(keyBoardContainer);
  const textInfo = document.createElement('div');
  textInfo.classList.add('text_info');
  wrapper.append(textInfo);
  textInfo.innerHTML = 'Keyboard create on OS Windows <br> For change language: Shift + Alt or Click "Shift" then "Alt" ';
  const linkRepo = document.createElement('div');
  linkRepo.classList.add('link_rep');
  wrapper.append(linkRepo);
  const linkA = document.createElement('a');
  linkA.href = 'https://github.com/kettl96/RSS-Virtual-Keyboard';
  linkA.title = 'GH-repo';
  linkA.appendChild(document.createTextNode('GitHub - Repositori'));
  linkRepo.appendChild(linkA);

  // create button
  function createButton(arr) {
    arr.forEach((e) => {
      const key = document.createElement('button');
      key.classList.add('key');
      key.innerHTML = e;
      keyBoardContainer.append(key);
      if (endLineArray.includes(e)) {
        key.classList.add('end');
      }
      if (overSizeBtn.includes(e)) {
        key.classList.add(`oversize_${sizeBtnCount}`);
        sizeBtnCount += 1;
      }
    });
  }
  const langStore = localStorage.getItem('lang');
  if (langStore === 'ru') {
    createButton(keyLayoutRu);
    langFlag = false;
  } else {
    createButton(keyLayout);
    langFlag = true;
  }

  const endLine = document.querySelectorAll('.end');
  endLine.forEach((e) => e.after(document.createElement('br')));

  const keysList = document.querySelectorAll('.key');
  let capsFlag = false;

  function caps() {
    keysList.forEach((e) => {
      if (e.outerText.length === 1 && `${!capsFlag ? e.outerText !== e.outerText.toUpperCase() : e.outerText !== e.outerText.toLowerCase()}`) {
        if (!capsFlag) e.innerHTML = e.outerText.toUpperCase();
        else e.innerHTML = e.outerText.toLowerCase();
      }
    });
    if (!capsFlag) capsFlag = true;
    else capsFlag = false;
  }

  function shift(arr, btn) {
    if (btn !== 'Shift') return;
    keysList.forEach((e, i) => {
      e.innerHTML = arr[i];
    });
    if (capsFlag) {
      capsFlag = false;
      caps();
    }
  }
  function changeLang() {
    textArea.value += '';

    keysList.forEach((e, i) => {
      if (langFlag) e.innerHTML = keyLayoutRu[i];
      else e.innerHTML = keyLayout[i];
    });
    if (langFlag) {
      langFlag = false;
      localStorage.setItem('lang', 'ru');
    } else {
      langFlag = true;
      localStorage.setItem('lang', 'eng');
    }
    if (capsFlag) {
      capsFlag = false;
      caps();
    }
  }

  // keyboard push btn
  const wideBtn = {
    Tab: 'Tab',
    Backspace: 'backspace',
    Delete: 'DEL',
    CapsLock: 'Caps',
    Enter: 'enter',
    Control: 'Ctrl',
    ' ': '&mdash;',
    Meta: 'Win',
    ArrowUp: '&uarr;',
    ArrowDown: '&darr;',
    ArrowLeft: '&larr;',
    ArrowRight: '&rarr;',
    Shift: 'Shift',
    Alt: 'Alt',
  };

  // textArea cur

  textArea.addEventListener('click', (e) => {
    cursor.cursorPosition = e.target.selectionStart;
  });

  function updateCursorPosition() {
    textArea.selectionStart = cursor.cursorPosition;
    textArea.selectionEnd = cursor.cursorPosition;
  }

  // switch

  function switchCase(condition) {
    textArea.focus();
    updateCursorPosition();
    switch (condition) {
      case 'backspace':
        if (cursor.cursorPosition > 0) {
          textArea.value = (textArea.value).split('').filter((char, index) => index !== cursor.cursorPosition - 1).join('');
          cursor.cursorPosition -= 1;
          updateCursorPosition();
        }
        break;
      case 'Tab':
        textArea.value = `${textArea.value.slice(0, cursor.cursorPosition)}  ${textArea.value.slice(cursor.cursorPosition)}`;
        cursor.cursorPosition += 2;
        updateCursorPosition();
        break;
      case 'DEL':
        textArea.value = (textArea.value).split('').filter((char, index) => index !== cursor.cursorPosition).join('');
        updateCursorPosition();
        break;
      case 'Caps':
        caps();
        break;
      case 'enter':
        textArea.value = `${textArea.value.slice(0, cursor.cursorPosition)}\n${textArea.value.slice(cursor.cursorPosition)}`;
        cursor.cursorPosition += 1;
        updateCursorPosition();
        break;
      case 'Shift':
        if (langFlag) shift(keyLayoutShift, 'Shift');
        else shift(keyLayoutRuShift, 'Shift');
        break;
      case '—':
        textArea.value = `${textArea.value.slice(0, cursor.cursorPosition)} ${textArea.value.slice(cursor.cursorPosition)}`;
        cursor.cursorPosition += 1;
        updateCursorPosition();
        break;
      case 'Alt':
        break;
      case 'Ctrl':
        break;
      default:
        textArea.value = `${textArea.value.slice(0, cursor.cursorPosition)}${condition}${textArea.value.slice(cursor.cursorPosition)}`;
        cursor.cursorPosition += 1;
        textArea.selectionStart = cursor.cursorPosition;
        textArea.selectionEnd = cursor.cursorPosition;
    }
  }
  function pushButton(btn, indexKey) {
    const keys = document.querySelectorAll('.key');
    keys[indexKey].classList.add('push');
    switchCase(keys[indexKey].outerText);
  }

  function whatButton(btn) {
    const low = btn.toLowerCase();
    let index;
    /* eslint-disable-next-line */
    for (const k in wideBtn) {
      if (btn === k) {
        index = keyLayout.indexOf(wideBtn[k]);
        pushButton(wideBtn[k], index);
        return;
      }
    }
    if (keyLayout.includes(low)) {
      index = keyLayout.indexOf(low);
      pushButton(low, index);
      return;
    }
    if (keyLayoutRu.includes(low)) {
      index = keyLayoutRu.indexOf(low);
      pushButton(low, index);
      return;
    }
    if (keyLayoutShift.includes(btn) || keyLayoutRuShift.includes(btn)) {
      index = langFlag ? keyLayoutShift.indexOf(btn) : keyLayoutRuShift.indexOf(btn);
      pushButton(btn, index);
    }
  }

  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    whatButton(e.key);
  });

  document.addEventListener('keyup', (e) => {
    const pushKey = document.querySelector('.push');
    if (pushKey == null) return;
    pushKey.classList.remove('push');
    if (langFlag) shift(keyLayout, e.key);
    else shift(keyLayoutRu, e.key);
  });

  // add value
  let shiftClick = false;
  function presButton(e) {
    if (e.target.outerText.length > 10) return;
    if (e.target.outerText === 'Shift') {
      if (!shiftClick) {
        e.target.classList.add('push');
        shiftClick = true;
        if (langFlag) shift(keyLayoutShift, 'Shift');
        else shift(keyLayoutRuShift, 'Shift');
        return;
      }
      e.target.classList.remove('push');
      shiftClick = false;
      if (langFlag) shift(keyLayout, 'Shift');
      else shift(keyLayoutRu, 'Shift');
      return;
    }
    if (shiftClick) {
      shiftClick = false;
      document.querySelector('.push').classList.remove('push');
      changeLang();
      return;
    }
    switchCase(e.target.outerText);
  }
  keyBoardContainer.addEventListener('click', presButton);

  // double push
  function twoKeysDown(func, ...codes) {
    const pressed = new Set();

    document.addEventListener('keydown', (event) => {
      pressed.add(event.code);
      /* eslint-disable-next-line */
      for (const code of codes) {
        if (!pressed.has(code)) return;
      }
      pressed.clear();
      func();
    });
    document.addEventListener('keyup', (event) => {
      pressed.delete(event.code);
    });
  }
  twoKeysDown(() => changeLang(), 'ShiftLeft', 'AltLeft');
}
document.body.onload = addElement;
