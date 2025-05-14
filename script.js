const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timeDisplay = document.getElementById('timeDisplay');
const timerOption = document.getElementById('timerOption');
const stopwatchOption = document.getElementById('stopwatchOption');
const timeInputs = document.getElementById('timeInputs');
const endMessage = document.getElementById('endMessage');
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
let countdown;
let stopwatchInterval;
let isTimer = true;
let elapsedTime = 0; 

function updateDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timeDisplay.textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function triggerConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        particleCount: count,
        spread: 70
    };

    confetti({
        ...defaults,
        angle: 60,
        spread: 55
    });
    
    confetti({
        ...defaults,
        angle: 120,
        spread: 55
    });
}

startBtn.addEventListener('click', () => {
    if (isTimer) {
        const mins = parseInt(minutesInput.value);
        const secs = parseInt(secondsInput.value);
        let totalSeconds = mins * 60 + secs;
        
        if (totalSeconds <= 0) return;

        startBtn.disabled = true;
        resetBtn.disabled = false;
        minutesInput.disabled = true;
        secondsInput.disabled = true;
        endMessage.style.display = 'none'; 

        countdown = setInterval(() => {
            totalSeconds--;
            updateDisplay(totalSeconds);
            
            if (totalSeconds <= 0) {
                clearInterval(countdown);
                triggerConfetti();
                endMessage.style.display = 'block'; 
                setTimeout(() => {
                    endMessage.style.display = 'none'; 
                }, 3000);
                startBtn.disabled = false;
                resetBtn.disabled = true;
                minutesInput.disabled = false;
                secondsInput.disabled = false;
            }
        }, 1000);
    } else {
        startBtn.disabled = true;
        resetBtn.disabled = false;

        stopwatchInterval = setInterval(() => {
            elapsedTime++;
            updateDisplay(elapsedTime);
        }, 1000);
    }
    startBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        startBtn.style.transform = 'scale(1)';
    }, 200);
});

resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    clearInterval(stopwatchInterval);
    timeDisplay.textContent = '00:00';
    minutesInput.value = 0;
    secondsInput.value = 0;
    startBtn.disabled = false;
    resetBtn.disabled = true;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    endMessage.style.display = 'none'; 
    elapsedTime = 0; 
    resetBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        resetBtn.style.transform = 'scale(1)';
    }, 200);
});


timerOption.addEventListener('click', () => {
    isTimer = true;
    timeInputs.style.display = 'flex';
    resetBtn.disabled = true;
    endMessage.style.display = 'none'; 
    elapsedTime = 0; 
    updateDisplay(0); 
    timerOption.classList.add('active');
    stopwatchOption.classList.remove('active');
});

stopwatchOption.addEventListener('click', () => {
    isTimer = false;
    timeInputs.style.display = 'none';
    resetBtn.disabled = false;
    endMessage.style.display = 'none';
    elapsedTime = 0; 
    updateDisplay(0); 
    stopwatchOption.classList.add('active');
    timerOption.classList.remove('active');
});

if (isMobile) {
    document.querySelectorAll('.options button').forEach(button => {
        button.style.transition = 'none';
    });
}
