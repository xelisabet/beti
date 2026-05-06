//States
//Create class Shop with opening and closing times
//Add method to check if shop is open at given timw
//Store schedule by weekday. Method takes weekday + time
//Also store internal current time and weekday. Allow advancing time by hour or day.
//Output: "Still closed", "Still open", "Closing", or "Opening".

class Shop{
    openingTimes: number[];
    closingTimes: number[];
    currentTime: number;
    currentDay: number;

    //0 pühapäev, 1 esmaspäev jne
    constructor(openingTimes: number[], closingTimes: number[]){
        this.openingTimes=openingTimes;
        this.closingTimes=closingTimes;
        this.currentDay=1; // esmaspäev
        this.currentTime=8; // 8am
    }

    //kontrollib taatust vastavalt päevale ja kellajajle
    checkAt(day: number, time: number): string {
        const open = this.openingTimes[day];
        const close = this.closingTimes[day];

        // kui pood on sel päeval suletud (nt open ja close on mõlemad 0)
        if (open === 0 && close === 0) return "Still closed";

        //kontrollime täpseid kellaaegu ja vahemike
        if (time === open) return "Opening";
        if (time === close) return "Closing";

        //kui aeg on lahtioleku vahemikus
        if (time > open && time < close) return "Still open";
        
        //kõik muud juhud
        return "Still closed";
    }

    // meetod prg staatuse kontrollimiseks
    checkStatus(): string {
        return this.checkAt(this.currentDay, this.currentTime);
    }

    //meetod aja edasi liigutamiseks
    advanceTime(hours: number): void{
        this.currentTime += hours;

        //kui tunnid ületavad 24, siis liigume järgmisele päevale
        while(this.currentTime >= 24){
            this.currentTime -= 24;
            //et peale 6 tuleks jälle 0 mitte 7
            this.currentDay = (this.currentDay + 1) % 7;
        }

    }

    //teisendab numbrid päevade nimedeks
    getDayName(): string{
        const days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
        return days[this.currentDay];
    }
}


