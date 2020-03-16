
    // The data/time we want to countdown to
    var countDownDate = new Date("Jul 25, 2021 16:37:52").getTime();

    // Run myfunc every second
    var myfunc = setInterval(function() {

    var now = new Date().getTime();
    var timeleft = countDownDate - now;
        
    // Calculating the days, hours, minutes and seconds left
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        
    // Result is output to the specific element
    document.getElementById("days").innerHTML = days + " days "
    document.getElementById("hours").innerHTML = hours + "hrs " 
    document.getElementById("mins").innerHTML = minutes + "min " 
    document.getElementById("secs").innerHTML = seconds + "sec " 
        
    // Display the message when countdown is over
    if (timeleft < 0) {
        clearInterval(myfunc);
        document.getElementById("days").innerHTML = ""
        document.getElementById("hours").innerHTML = "" 
        document.getElementById("mins").innerHTML = ""
        document.getElementById("secs").innerHTML = ""
        document.getElementById("end").innerHTML = "TIME UP!!";
    }
    }, 1000);












// var endDate = new Date("Jan 25, 2020 12:00:00").getTime();
// var timer = setInterval(function () {
// let now = new Date().getTime();
// let t = endDate - now;
// if (t >= 0) {
// document.getElementById("remainder").innerHTML = 
// Math.floor(t / (1000 * 60 * 60 * 24)) + "DAY(S) " + 
// ("0" + Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2) + "HR(S) " + 
// ("0" + Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))).slice(-2) + "MIN(S) " +
// ("0" + Math.floor((t % (1000 * 60)) / 1000)).slice(-2) + "SEC(S)";
// } else {
// document.getElementById("remainder").innerHTML = "End of timer.";
// }

// }, 1000);

