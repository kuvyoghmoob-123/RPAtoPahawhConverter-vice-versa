const pahawhUnshifted = [
  ['`','𖭑','𖭒','𖭓','𖭔','𖭕','𖭖','𖭗','𖭘','𖭙','𖭐','-','=','⌫'],
  ['𖬀','𖬁','𖬂','𖬃','𖬄','𖬅','𖬆','𖬇','𖬈','𖬉','𖬊','𖬋','𖬌','𖬍'],
  ['𖬜','𖬝','𖬞','𖬟','𖬠','𖬡','𖬢','𖬣','𖬤','𖬥',';',"'"],
  ['⇧','𖬰','𖬱','𖬲','𖬴','𖬵','𖬶',',','.','/','⇧'],
  ['␣']
];

const pahawhShifted = [
  ['~','!','@','#','$','%','^','&','*','(',')','_','+','⌫'],
  ['𖬎','𖬏','𖬐','𖬑','𖬒','𖬓','𖬔','𖬕','𖬖','𖬗','𖬘','𖬙','𖬚','𖬛'],
  ['𖬦','𖬧','𖬨','𖬩','𖬪','𖬫','𖬬','𖬭','𖬮','𖬯',':','"'],
  ['⇧','𖬰','𖬱','𖬲','𖬴','𖬵','𖬶','<','>','𖬷','⇧'],
  ['␣']
];

let isShift = false;
let isCaps = false;

function renderKeyboard() {
  const container = document.getElementById('pahawh-keyboard-container');
  container.innerHTML = '';

  const layout = isShift ? pahawhShifted : pahawhUnshifted;

  layout.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';

    row.forEach(key => {
      const keyDiv = document.createElement('div');
      keyDiv.className = 'key';
      if (key === '␣') keyDiv.classList.add('spacebar');
      if (key === '⇧') keyDiv.classList.add('shift');
      if (key === '⇪') keyDiv.classList.add('capslock');
      if (key === '⌫') keyDiv.classList.add('backspace');

      keyDiv.textContent = key;
      keyDiv.addEventListener('click', () => handleKeyPress(key));
      rowDiv.appendChild(keyDiv);
    });

    container.appendChild(rowDiv);
  });
}

function handleKeyPress(key) {
  const input = document.getElementById('inputText');
  if (!input) return;

  if (key === '⇧') {
    isShift = !isShift;
    renderKeyboard();
    return;
  }

  if (key === '⇪') {
    isCaps = !isCaps;
    renderKeyboard();
    return;
  }

  if (key === '⌫') {
    input.value = input.value.slice(0, -1);
    input.dispatchEvent(new Event('input'));
    return;
  }

  if (key === '␣') {
    input.value += ' ';
    input.dispatchEvent(new Event('input'));
    return;
  }

  input.value += key;
  input.dispatchEvent(new Event('input'));

  if (isShift) {
    isShift = false;
    renderKeyboard();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderKeyboard();

  const toggleBtn = document.getElementById('toggleKeyboard');
  const keyboardContainer = document.getElementById('pahawh-keyboard-container');

  toggleBtn.addEventListener('click', () => {
    const isVisible = keyboardContainer.style.display === 'block';
    keyboardContainer.style.display = isVisible ? 'none' : 'block';
    toggleBtn.textContent = isVisible ? 'Show Keyboard' : 'Hide Keyboard';
  });
});
