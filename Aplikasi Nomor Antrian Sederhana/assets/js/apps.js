const noAntrian = [0, 0, 0];
let antrian = 0;
const card = document.getElementsByClassName('card');

function updateNoAntrian() {
  const actions = document.getElementById('actions');
  actions.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', function () {
      if (this.id == 'reset') {
        location.reload(true);
      } else {
        const noConter = this.id.slice(-1);
        renderUi(noConter - 1);
      }
    });
  });
}

function renderUi(params) {
  noAntrian[params] = counterAntrian(antrian);
  let lastCounterActive = noAntrian.indexOf(Math.max(...noAntrian));
  noAntrian.forEach((e, i) => {
    if (lastCounterActive === i) {
      card[i].className = 'card loket-active';
    } else {
      card[i].className = 'card';
    }
    card[i].children[0].innerHTML = `LOKET 0${i + 1}`;
    card[i].children[1].innerHTML = noAntrian[i];
  });
}

function counterAntrian(num) {
  return (antrian = num + 1);
}
updateNoAntrian();
