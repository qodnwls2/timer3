// 1. 상태 상수 (초 단위)
const WORK_TIME = 25 * 60; // 25분
const BREAK_TIME = 5 * 60; // 5분

let timeLeft = WORK_TIME;
let timerId = null;
let isWorking = true; // true: 집중 시간, false: 휴식 시간

// 2. DOM 요소 가져오기
const timerDisplay = document.getElementById('timer-display');
const modeText = document.getElementById('mode-text');
const toggleBtn = document.getElementById('toggle-btn');
const resetBtn = document.getElementById('reset-btn');
const switchModeBtn = document.getElementById('switch-mode-btn');

// 3. 화면 업데이트 함수
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// 4. 타이머 시작 / 일시정지 토글 함수
function toggleTimer() {
  if (timerId === null) {
    // 타이머 시작
    timerId = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft === 0) {
        clearInterval(timerId);
        timerId = null;
        alert(isWorking ? "집중 시간이 끝났습니다! 휴식하세요." : "휴식 시간이 끝났습니다! 다시 집중하세요.");
        switchMode();
      }
    }, 1000);

    toggleBtn.textContent = '일시정지';
  } else {
    // 타이머 일시정지
    clearInterval(timerId);
    timerId = null;
    toggleBtn.textContent = '시작';
  }
}

// 5. 타이머 초기화 함수
function resetTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
  
  timeLeft = isWorking ? WORK_TIME : BREAK_TIME;
  toggleBtn.textContent = '시작';
  updateDisplay();
}

// 6. 집중/휴식 전환 함수
function switchMode() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  isWorking = !isWorking;
  timeLeft = isWorking ? WORK_TIME : BREAK_TIME;
  modeText.textContent = isWorking ? '집중 시간' : '휴식 시간';
  toggleBtn.textContent = '시작';
  
  updateDisplay();
}

// 7. 이벤트 리스너 연결
toggleBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
switchModeBtn.addEventListener('click', switchMode);

// 초기 화면 설정
updateDisplay();