(()=>{let i={startTime:null,duration:1500,remainingTime:1500,isRunning:!1},n=new Audio("chime.mp3");async function e(){await chrome.storage.local.set({timerState:{startTime:i.startTime,duration:i.duration,remainingTime:i.remainingTime,isRunning:i.isRunning}})}function t(){if(i.isRunning&&i.startTime){const t=Date.now(),a=Math.floor((t-i.startTime)/1e3);i.remainingTime=Math.max(0,i.duration-a),Math.floor(a/60)!==Math.floor((t-i.startTime)/6e4)&&n.play(),i.remainingTime<=0&&(i.isRunning=!1,chrome.notifications.create({type:"basic",iconUrl:"icon128.png",title:"Pomodoro Timer",message:"Time is up!"})),e()}}setInterval(t,1e3),chrome.runtime.onMessage.addListener(((n,a,r)=>{switch(n.action){case"start":i.startTime=Date.now(),i.duration=n.duration||1500,i.remainingTime=i.duration,i.isRunning=!0,e(),r({success:!0});break;case"pause":i.isRunning=!1,e(),r({success:!0});break;case"reset":i.isRunning=!1,i.startTime=null,i.remainingTime=i.duration,e(),r({success:!0});break;case"getState":t(),r({isRunning:i.isRunning,remainingTime:i.remainingTime,duration:i.duration})}return!0})),async function(){const n=await chrome.storage.local.get("timerState");n.timerState&&(i=n.timerState)}()})();