class PomodoroTimer {
    constructor() {
        this.totalSeconds = 25 * 60;
        this.remainingSeconds = this.totalSeconds;
        this.isRunning = false;
        this.intervalId = null;

        // DOM Elements
        this.timerDisplay = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.workTimeInput = document.getElementById('workTime');
        this.chimeSound = document.getElementById('chimeSound');

        // Bind event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.workTimeInput.addEventListener('change', () => this.updateWorkTime());

        // Initial button states
        this.pauseBtn.disabled = true;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.intervalId = setInterval(() => this.tick(), 1000);
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
        }
    }

    reset() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.remainingSeconds = this.totalSeconds;
        this.updateDisplay();
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
    }

    updateWorkTime() {
        const newWorkTime = parseInt(this.workTimeInput.value);
        if (newWorkTime > 0 && newWorkTime <= 60) {
            this.totalSeconds = newWorkTime * 60;
            this.remainingSeconds = this.totalSeconds;
            this.updateDisplay();
        }
    }

    tick() {
        if (this.remainingSeconds > 0) {
            this.remainingSeconds--;
            
            // Play chime sound every minute
            if (this.remainingSeconds % 60 === 0) {
                this.playChime();
            }
            
            this.updateDisplay();
        } else {
            this.reset();
            this.showNotification();
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    playChime() {
        this.chimeSound.currentTime = 0;
        this.chimeSound.play();
    }

    showNotification() {
        if (Notification.permission === 'granted') {
            new Notification('Pomodoro Timer', {
                body: 'Work session completed!'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});