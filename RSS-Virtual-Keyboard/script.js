document.body.onload = addElement

const keyLayout = [
  "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
  "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", '\\', "DEL",
  "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
  "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "/", "&uarr;",
  "Ctrl", "Win", "Alt", "&mdash;", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"
]
const keyLayoutShift = [
  "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
  "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", '|', "DEL",
  "Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "enter",
  "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "/", "&uarr;",
  "Ctrl", "Win", "Alt", "&mdash;", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"
]
const keyLayoutRu = [
  "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
  "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", '\\', "DEL",
  "Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
  "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", ".", "&uarr;",
  "Ctrl", "Win", "Alt", "&mdash;", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"
]
const keyLayoutRuShift = [
  "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
  "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", '|', "DEL",
  "Caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", 'Э', "enter",
  "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Ь", "Б", "Ю", ",", "&uarr;",
  "Ctrl", "Win", "Alt", "&mdash;", "Alt", "Ctrl", "&larr;", "&darr;", "&rarr;"
]
const endLineArray = ["backspace", "DEL", "enter", "&uarr;"]
const overSizeBtn = ["Ctrl", "Tab", "Caps", "&mdash;", "backspace", "enter", "Shift", "&uarr;", "Win", "Alt", "&mdash;"]

let cursor = {
  cursorPosition: null,
  letterInString: null,
  indexInString: null,
  currentPositionInString: null
}

let langFlag = true
let sizeBtnCount = 0
function addElement() {
  let wrapper = document.createElement('div')
  wrapper.classList.add('wrapper')
  document.body.prepend(wrapper)
  let textArea = document.createElement('textarea')
  wrapper.prepend(textArea)
  let keyBoardContainer = document.createElement('div')
  keyBoardContainer.classList.add('keyBoard_container')
  wrapper.append(keyBoardContainer)
  let textInfo = document.createElement('div')
  textInfo.classList.add('text_info')
  wrapper.append(textInfo)
  textInfo.innerHTML = 'Keyboard create on OS Windows <br> For change language: Shift + Alt or Click "Shift" then "Alt" '
  let linkRepo = document.createElement('div')
  linkRepo.classList.add('link_rep')
  wrapper.append(linkRepo)
  let linkA = document.createElement('a')
  linkA.href = 'https://github.com/kettl96/RSS-Virtual-Keyboard'
  linkA.title = 'GH-repo'
  linkA.appendChild(document.createTextNode('GitHub - Repositori'))
  linkRepo.appendChild(linkA)

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
  let shiftClick = false
  function presButton(e) {
    if (e.target.outerText.length > 10) return
    if (e.target.outerText == 'Shift') {
      if (!shiftClick) {
        e.target.classList.add('push')
        shiftClick = true
        return langFlag ? shift(keyLayoutShift, 'Shift') : shift(keyLayoutRuShift, 'Shift')
      } else {
        e.target.classList.remove('push')
        shiftClick = false
        return langFlag ? shift(keyLayout, 'Shift') : shift(keyLayoutRu, 'Shift')
      }
    }
    if (shiftClick) {
      shiftClick = false
      document.querySelector('.push').classList.remove('push')
      return changeLang()
    } 
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
    'Shift': 'Shift',
    'Alt': 'Alt',
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
    if (keyLayoutShift.includes(btn) || keyLayoutRuShift.includes(btn)) {
      index = langFlag ? keyLayoutShift.indexOf(btn) : keyLayoutRuShift.indexOf(btn)
      return pushButton(btn, index)
    }
  }
  function pushButton(btn, indexKey) {
    let keys = document.querySelectorAll('.key')
    keys[indexKey].classList.add('push')
    switchCase(keys[indexKey].outerText)
  }
  document.addEventListener('keydown', (e) => {
    e.preventDefault()
    whatButton(e.key)
  })

  document.addEventListener('keyup', (e) => {
    let pushKey = document.querySelector('.push')
    pushKey == null ? '' : pushKey.classList.remove('push')
    langFlag ? shift(keyLayout, e.key) : shift(keyLayoutRu, e.key)
  })

  // switch
  let capsFlag = false

  function switchCase(condition) {
    textArea.focus();
    updateCursorPosition();
    switch (condition) {
      case "backspace":
        if (cursor.cursorPosition > 0) {
          textArea.value = (textArea.value).split('').filter((char, index) => index !== cursor.cursorPosition - 1).join('')
          cursor.cursorPosition -= 1
          updateCursorPosition()
        }
        break
      case "Tab":
        textArea.value = `${textArea.value.slice(0, cursor.cursorPosition)}  ${textArea.value.slice(cursor.cursorPosition)}`
        cursor.cursorPosition += 2
        updateCursorPosition()
        break
      case "DEL":
        textArea.value = (textArea.value).split('').filter((char, index) => index !== cursor.cursorPosition).join('')
        updateCursorPosition()
        break
      case "Caps":
        caps()
        break
      case "enter":
        textArea.value = `${textArea.value.slice(0, cursor.cursorPosition)}\n${textArea.value.slice(cursor.cursorPosition)}`
        cursor.cursorPosition += 1
        updateCursorPosition()
        break
      case "Shift":
        langFlag ? shift(keyLayoutShift, 'Shift') : shift(keyLayoutRuShift, 'Shift')
        break
      case "—":
        textArea.value = `${textArea.value.slice(0, cursor.cursorPosition)} ${textArea.value.slice(cursor.cursorPosition)}`
        cursor.cursorPosition += 1
        updateCursorPosition()
        break
      case "Alt":
        break
      case "Ctrl":
        break
      default:
        textArea.value = `${textArea.value.slice(0, cursor.cursorPosition)}${condition}${textArea.value.slice(cursor.cursorPosition)}`
        cursor.cursorPosition += 1
        textArea.selectionStart = cursor.cursorPosition
        textArea.selectionEnd = cursor.cursorPosition
    }
  }

  function changeLang() {
    textArea.value += ''

    keysList.forEach((e, i) => {
      langFlag ? e.innerHTML = keyLayoutRu[i] : e.innerHTML = keyLayout[i]
    })
    langFlag ? `${langFlag = false, localStorage.setItem('lang', 'ru')}` : `${langFlag = true, localStorage.setItem('lang', 'eng')}`
    if (capsFlag) {
      capsFlag = false
      caps()
    }
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

  function shift(arr, btn) {
    if (btn !== 'Shift') return
    keysList.forEach((e, i) => {
      e.innerHTML = arr[i]
    })
    if (capsFlag) {
      capsFlag = false
      caps()
    }
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

  // textArea cur

  textArea.addEventListener('click', (e) => {
    cursor.cursorPosition = e.target.selectionStart
  })

  function updateCursorPosition() {
    textArea.selectionStart = cursor.cursorPosition;
    textArea.selectionEnd = cursor.cursorPosition;
  }

}