//every vehicle must have a registration number
abstract class vehicle {
    // every vehicle has a registration number
    constructor(public regnum: string) {}

    // abstract, each vehicle type calculates its fee differently
    abstract calculatefee(hours: number): number;
}


// for a car, the fee is 2€ per hour
class car extends vehicle {
    calculatefee(hours: number): number {
        return hours * 2;
    }
}

// for a motorcycle, the fee is 1€ per hour
class motorcycle extends vehicle {
    calculatefee(hours: number): number {
        return hours * 1;
    }
}

// for a truck, the fee is 5€ per hour, larger
class truck extends vehicle {
    calculatefee(hours: number): number {
        return hours * 5;
    }
}

//manages a collection of different vehicles
class parkinglot {
    // array stores any object that belongs to the "vehicle" tree
    private vehicles: vehicle[] = [];

    // method to add a new vehicle to the parking lot system
    addvehicle(v: vehicle): void {
        this.vehicles.push(v);
        console.log(`parked vehicle: ${v.regnum}`);
    }
    // method to calculate total money made from all parked vehicles
    printtotalearnings(hours: number): void {
        let total = 0;
        // 'v' can be a car, motorcycle, or truck.
        // the computer automatically finds the correct calculatefee() method.
        for (let v of this.vehicles) {
            // polymorphism: calls the correct version of calculatefee
            total += v.calculatefee(hours);
        }
        console.log(`total earnings for ${hours} hours: ${total}€`);
    }
}

// (demonstration)
const mycityparking = new parkinglot();

// adding different types of vehicles to the same system
mycityparking.addvehicle(new car("123 abc"));
mycityparking.addvehicle(new motorcycle("88 zz"));
mycityparking.addvehicle(new truck("999 big"));

// calculating the total result
mycityparking.printtotalearnings(3);