// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go  라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호 < 유저번호 Down !!!
// 랜덤번호가 > 유저번호 Up !!
// Reset버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다 (더 이상 추측 불가, 버튼이  disable)
// 유저기 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let history = [];
let chanceArea = document.getElementById("chance-area");
let changeImg = document.getElementById("changeImg");

playButton.style.cursor = "pointer";

//버튼
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

//랜덤 번호 지정
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

pickRandomNum();

// go버튼을 눌렀을 때 반응
function play() {
  //마우스로 입력창을 클릭할 때 입력되어 있는 값을 리셋
  let userValue = userInput.value;

  if (userValue > 100 || userValue < 1) {
    resultArea.textContent = "1부터 100사이의 숫자만 입력해주세요.";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다.";
    return;
  }

  chances--;

  history.push(userValue);

  chanceArea.textContent = `남은기회 : ${chances}번`;

  if (userValue < computerNum) {
    resultArea.textContent = "UP !!!!";
    changeImg.src = "image/up.gif";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down !!!!!";
    changeImg.src = "image/down.gif";
  } else {
    resultArea.textContent = "맞췄습니다 !!!!!!!!!!";
    changeImg.src = "image/ok.gif";
    gameOver = true;
  }

  if (chances == 0) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
    playButton.style.backgroundColor = "rgba(75, 87, 255, 0.4)";
    playButton.style.cursor = "default";
  }
}

// 리셋버튼 함수
function reset() {
  // user input창이 깨끗하게 정리되고
  userInput.value = "";
  // 새로운 번호가 생성되고
  pickRandomNum();
  chances = 5;
  chanceArea.textContent = `남은 기회 : ${chances}`;
  gameOver = false;
  history = [];
  changeImg.src = "image/go!.gif";
  resultArea.textContent = "결과값이 여기 나옵니다";
}
