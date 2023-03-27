//variables

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 1;
let breakTime = 5;

let seconds = "00";

//display

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

// start timer

function start() {
    //change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    let breakCount = 0;

    //countdown

    let timerFunction = () => {

        //Change the display
        
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        //start
        seconds = seconds - 1;
        let alarm = new Audio('./audio/alarm.wav');

        function showNotification(title, message) {
            // Verifica se le notifiche sono supportate dal browser
            if (!("Notification" in window)) {
                console.log("This browser does not support system notifications");
            } else if (Notification.permission === "granted") {
                // Crea una nuova notifica
                new Notification(title, {
                    body: message,
                    icon: "/icon/coffe-break.png"
                });
            } else if (Notification.permission !== "denied") {
                // Richiede il permesso per le notifiche
                Notification.requestPermission().then(function(permission) {
                    if (permission === "granted") {
                        // Crea una nuova notifica
                        new Notification(title, {
                            body: message,
                            icon: "/icon/coffe-break.png"
                        });
                    }
                });
            }
        }

        if(seconds === 0) {
            workMinutes = workMinutes - 1;
            if(workMinutes === -1) {
                if(breakCount % 2 === 0){
                    //start break
                    workMinutes = breakMinutes;
                    breakCount++

                    //change the panel
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');

                    //show notification
                    showNotification("Break Time", "It's time for a break!");
                    //play sound
                    alarm.play()

                } else {
                    //continue work
                    workMinutes = workTime
                    breakCount++

                    showNotification("Work Time", "It's time to work!");

                    alarm.play()
                    
                }
            }
            seconds = 59;
        }
    }

    // start countdown
    setInterval(timerFunction, 1000);
}