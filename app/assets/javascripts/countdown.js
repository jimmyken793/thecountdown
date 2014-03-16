if (typeof requestAnimationFrame === 'undefined') {
    requestAnimationFrame = function(cb) {
        setInterval(cb, 50);
    };
}

var timesup = false;

var display = new SegmentDisplay("display");
display.pattern = "#####     ## : ## : ## . ###";
// display.pattern         = "## : ## : ## . ###";
display.displayAngle = 4;
display.digitHeight = 350;
display.digitWidth = 150;
display.digitDistance = 30;
display.segmentWidth = 30;
display.segmentDistance = 8;
display.segmentCount = 7;
display.cornerType = 3;
display.colorOn = "#e95d0f";
display.colorOff = "#220e02";
display.draw();

var units = countdown.DAYS |
    countdown.HOURS |
    countdown.MINUTES |
    countdown.SECONDS |
    countdown.MILLISECONDS;

var padTo2 = function(num) {
    return ("0" + num).slice(-2);
};

var padTo = function(num, n) {
    return (Array(n).join("0") + num).slice(-n);
};

var padTo3 = function(num) {
    return ("00" + num).slice(-3);
};

var update = function() {

    var now = new Date();
    document.getElementById('now').innerHTML = insertSpace(now.toLocaleString('zh-TW'));

    var timespan = countdown(now, dest_date, units);

    display.setValue(padTo(timespan.days, 4) + 'd     ' + padTo2(timespan.hours) + ' : ' + padTo2(timespan.minutes) + ' : ' + padTo2(timespan.seconds) + ' . ' + padTo3(timespan.milliseconds));

    var title = ""

    if (timespan.value < 0 && !timesup) {
        // Times up
        timesup = true;
        display.colorOn = "#ff0000";
        body.classList.add('is-timeup');
        title += "逾時 "
    }

    document.title = title + timespan.days + " 天 " + timespan.hours + " 小時 " + timespan.minutes + " 分鐘";

    requestAnimationFrame(update);
};
var body;
$(function() {
    body = document.body;
    if (document.getElementById('now')) {
        update();
    }
});