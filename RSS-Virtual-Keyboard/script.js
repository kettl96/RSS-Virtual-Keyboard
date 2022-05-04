document.body.onload = addElement

const keyLayout = [
  "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
  "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", '\\', "DEL",
  "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
  "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "/", "&uarr;",
  "Ctrl", "Win", "Alt", "&mdash;", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"
]
const keyLayoutRu = [
  "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
  "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", '\\', "DEL",
  "Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
  "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", ".", "&uarr;",
  "Ctrl", "Win", "Alt", "&mdash;", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"
]
const endLineArray = ["backspace", "DEL", "enter", "&uarr;"]
const overSizeBtn = ["Ctrl", "Tab", "Caps", "&mdash;", "backspace", "enter", "Shift", "&uarr;", "Win", "Alt", "&mdash;"]

let langFlag = true
let sizeBtnCount = 0
function addElement() {
  let wrapper = document.createElement('div')
  wrapper.classList.add('wrapper')
  document.body.prepend(wrapper)
  let textArea = document.createElement('textarea')

  // textArea.setAttribute('readonly', 'readonly')
  wrapper.prepend(textArea)
  let keyBoardContainer = document.createElement('div')
  keyBoardContainer.classList.add('keyBoard_container')
  wrapper.append(keyBoardContainer)
  let textInfo = document.createElement('div')
  textInfo.classList.add('text_info')
  wrapper.append(textInfo)
  textInfo.innerHTML = 'Клавиатура создана в операционной системе Windows  Для переключения языка комбинация: Shift + Alt'

  let langStore = localStorage.getItem('lang')
  langStore == 'ru' ? `${createButton(keyLayoutRu), langFlag = false}` : `${createButton(keyLayout), langFlag = true}`

  const endLine = document.querySelectorAll('.end')
  endLine.forEach(e => e.after(document.createElement('br')))

  // create button 
  function createButton(arr) {
    arr.forEach(e => {
      let key = document.createElement('button')
      key.classList.add('key')
      key.innerHTML = e
      keyBoardContainer.append(key)
      if (endLineArray.includes(e)) {
        key.classList.add('end')
      }
      if (overSizeBtn.includes(e)) {
        key.classList.add('oversize' + '_' + `${sizeBtnCount}`)
        sizeBtnCount++
      }
    })
  }

  // add value
  function presButton(e) {
    switchCase(e.target.outerText)
  }
  keyBoardContainer.addEventListener('click', presButton)

  // keyboard push btn
  const wideBtn = {
    'Tab': 'Tab',
    'Backspace': "backspace",
    'Delete': 'DEL',
    'CapsLock': 'Caps',
    'Enter': 'enter',
    'Control': 'Ctrl',
    ' ': '&mdash;',
    'Meta': 'Win',
    'ArrowUp': "&uarr;",
    'ArrowDown': "&darr;",
    'ArrowLeft': "&larr;",
    'ArrowRight': "&rarr;",
    'Shift' : 'Shift',
    'Alt': 'Alt'
  }

  function whatButton(btn) {
    let low = btn.toLowerCase()
    let index
    for (let k in wideBtn) {
      if (btn === k) {
        index = keyLayout.indexOf(wideBtn[k])
        return pushButton(wideBtn[k], index)
      }
    }
    if (keyLayout.includes(low)) {
      index = keyLayout.indexOf(low)
      return pushButton(low, index)
    }
    if (keyLayoutRu.includes(low)) {
      index = keyLayoutRu.indexOf(low)
      return pushButton(low, index)
    }
  }
  function pushButton(btn, indexKey) {
    // let indexKey = keyLayout.indexOf(btn)
    // indexKey == undefined ? indexKey = keyLayoutRu.indexOf(btn) :  indexKey = keyLayout.indexOf(btn)
    let keys = document.querySelectorAll('.key')
    keys[indexKey].classList.add('push')
    switchCase(keys[indexKey].outerText)
  }
  document.addEventListener('keydown', (e) => whatButton(e.key))

  document.addEventListener('keyup', (e) => {
    let pushKey = document.querySelector('.push')
    pushKey == null ? '' : pushKey.classList.remove('push')
  })

  // switch
  let capsFlag = false
  function switchCase(condition) {
    console.log(condition);
    switch (condition) {
      case "backspace":
        // textArea.focus();

        textArea.value = textArea.value.substring(0, textArea.value.length - 1)
        // backspace()
        break
      case "Tab":
        textArea.value += '  '
        break
      // case "DEL":
      // break
      case "Caps":
        caps()
        break
      case "enter":
        textArea.value += "\n"
        break
      case "Shift":
        textArea.value += ''
        break
      case "Alt":
        textArea.value += ''
        break
      case "Ctrl":
        textArea.value += ''
        break

      default:
        if (capsFlag) textArea.value += condition.toUpperCase()
        else textArea.value += condition
    }
  }
  function changeLang() {
    textArea.value += ''
    
    keysList.forEach((e, i) => {
      langFlag ? e.innerHTML = keyLayoutRu[i] : e.innerHTML = keyLayout[i]
    })
    langFlag ? `${langFlag = false, localStorage.setItem('lang', 'ru')}` : `${langFlag = true, localStorage.setItem('lang', 'eng')}`
    
  }


  const keysList = document.querySelectorAll('.key')
  function caps() {
    keysList.forEach(e => {
      if (e.outerText.length == 1 && `${!capsFlag ? e.outerText !== e.outerText.toUpperCase() : e.outerText !== e.outerText.toLowerCase()}`) {
        !capsFlag
          ? e.innerHTML = e.outerText.toUpperCase()
          : e.innerHTML = e.outerText.toLowerCase()
      }
    })
    !capsFlag ? capsFlag = true : capsFlag = false
  }

  // double push
  function twoKeysDown(func, ...codes) {
    let pressed = new Set()

    document.addEventListener('keydown', function (event) {
      pressed.add(event.code)
      for (let code of codes) {
        if (!pressed.has(code)) return
      }
      pressed.clear()
      func()
    })
    document.addEventListener('keyup', function (event) {
      pressed.delete(event.code)
    })
  }
  twoKeysDown(() => changeLang(), 'ShiftLeft', 'AltLeft')


  function backspace() {
    textArea.se
    var ss = textArea.selectionStart;
    var se = textArea.selectionEnd;
    var ln = textArea.value.length;

    var textbefore = textArea.value.substring(0, ss)
    var textselected = textArea.value.substring(ss, se)
    var textafter = textArea.value.substring(se, ln)

    if (ss == se) {
      textArea.value = textArea.value.substring(0, textArea.value.length - 1)
      textArea.focus();
      textArea.selectionStart = ss - 1;
      textArea.selectionEnd = ss - 1;
    } else {
      textArea.value = textbefore + textafter;
      textArea.focus();
      textArea.selectionStart = ss;
      textArea.selectionEnd = ss;
    }

  }
  // document.addEventListener('keydown', (e) => textArea.value='')


}