// class that simulates a flowerpot being watered
class flowerpot {
    moisture: number; // current moisture level in % (0-100)
    plantname: string;

    constructor(name: string, startmoisture: number) {
        this.plantname = name;
        this.moisture = startmoisture;
    }

    // method to add a specific amount of water
    // every 10ml of water increases moisture by 5%
    addwater(ml: number): void {
        let increase = ml * 0.5;
        this.moisture += increase;

        // cap the moisture at 100%
        if (this.moisture > 100) {
            this.moisture = 100;
        }
        console.log(`added ${ml}ml of water to ${this.plantname}.`);
    }

    // simple method to check the status
    getstatus(): string {
        return `${this.plantname} moisture level is: ${this.moisture}%`;
    }

    // calculation: how much water is needed to reach a target %
    calculatewaterneeded(target: number): number {
        if (target <= this.moisture) return 0;
        
        let gap = target - this.moisture;
        // since 0.5% = 1ml, then 1% = 2ml
        let mlneeded = gap * 2;
        return mlneeded;
    }
}

// --- using the flowerpot ---

let myrose = new flowerpot("rose", 30);
console.log(myrose.getstatus());

// we want to reach 80% moisture
let needed = myrose.calculatewaterneeded(80);
console.log(`to reach 80%, we need to add: ${needed}ml`);

// let's actually water it
myrose.addwater(needed);
console.log(myrose.getstatus());