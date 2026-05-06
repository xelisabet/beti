"use strict";
//States
//Create class Shop with opening and closing times
//Add method to check if shop is open at given timw
//Store schedule by weekday. Method takes weekday + time
//Also store internal current time and weekday. Allow advancing time by hour or day.
//Output: "Still closed", "Still open", "Closing", or "Opening".
class Shop {
    //0 pühapäev, 1 esmaspäev jne
    openingTimes;
    closingTimes;
    currentTime;
    currentDay;
    constructor(openingTimes, closingTimes) {
        this.openingTimes = openingTimes;
        this.closingTimes = closingTimes;
        this.currentDay = 1; // esmaspäev
        this.currentTime = 8; // 8am
    }
    //tagastab staatuse vastavalt päevale ja kellajajle
    checkAt(day, time) {
        const open = this.openingTimes[day];
        const close = this.closingTimes[day];
        // kui pood on sel päeval suletud (nt open ja close on mõlemad 0)
        if (open === 0 && close === 0)
            return "Still closed";
        if (time === open)
            return "Opening";
        if (time === close)
            return "Closing";
        if (time > open && time < close)
            return "Still open";
        return "Still closed";
    }
    // meetod poodi sisese kellaaja kontrollimiseks
    checkStatus() {
        return this.checkAt(this.currentDay, this.currentTime);
    }
    advanceTime(hours) {
        this.currentTime += hours;
        while (this.currentTime >= 24) {
            this.currentTime -= 24;
            this.currentDay = (this.currentDay + 1) % 7;
        }
    }
    getDayName() {
        const days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
        return days[this.currentDay];
    }
}
