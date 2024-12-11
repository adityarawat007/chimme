(()=>{class t{constructor(){this.totalSeconds=1500,this.remainingSeconds=this.totalSeconds,this.isRunning=!1,this.intervalId=null,this.timerDisplay=document.getElementById("timer"),this.startBtn=document.getElementById("startBtn"),this.pauseBtn=document.getElementById("pauseBtn"),this.resetBtn=document.getElementById("resetBtn"),this.workTimeInput=document.getElementById("workTime"),this.chimeSound=document.getElementById("chimeSound"),this.startBtn.addEventListener("click",(()=>this.start())),this.pauseBtn.addEventListener("click",(()=>this.pause())),this.resetBtn.addEventListener("click",(()=>this.reset())),this.workTimeInput.addEventListener("change",(()=>this.updateWorkTime())),this.pauseBtn.disabled=!0}start(){this.isRunning||(this.isRunning=!0,this.intervalId=setInterval((()=>this.tick()),1e3),this.startBtn.disabled=!0,this.pauseBtn.disabled=!1)}pause(){this.isRunning&&(clearInterval(this.intervalId),this.isRunning=!1,this.startBtn.disabled=!1,this.pauseBtn.disabled=!0)}reset(){clearInterval(this.intervalId),this.isRunning=!1,this.remainingSeconds=this.totalSeconds,this.updateDisplay(),this.startBtn.disabled=!1,this.pauseBtn.disabled=!0}updateWorkTime(){const t=parseInt(this.workTimeInput.value);t>0&&t<=60&&(this.totalSeconds=60*t,this.remainingSeconds=this.totalSeconds,this.updateDisplay())}tick(){this.remainingSeconds>0?(this.remainingSeconds--,this.remainingSeconds%60==0&&this.playChime(),this.updateDisplay()):(this.reset(),this.showNotification())}updateDisplay(){const t=Math.floor(this.remainingSeconds/60),i=this.remainingSeconds%60;this.timerDisplay.textContent=`${t.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`}playChime(){this.chimeSound.currentTime=0,this.chimeSound.play()}showNotification(){"granted"===Notification.permission?new Notification("Pomodoro Timer",{body:"Work session completed!"}):"denied"!==Notification.permission&&Notification.requestPermission()}}document.addEventListener("DOMContentLoaded",(()=>{new t}))})();