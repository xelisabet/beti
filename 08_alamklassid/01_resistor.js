"use strict";
//Abstract class or parent class
class AbstractResistor {
    getCurrent(u) {
        return u / this.getResistance();
    }
}
class Resistor extends AbstractResistor {
    r;
    constructor(r) {
        super();
        this.r = r;
    }
    getResistance() {
        return this.r;
    }
}
let resistor1 = new Resistor(220);
console.log("The value of resistor1 is: " + resistor1.getResistance());
class Switch extends AbstractResistor {
    //Default state is switch is off
    on = false;
    setOn(state) {
        this.on = state;
    }
    //method to to switch on and off if this.on what is the resistance 
    /* getResistance(): number {
        if(this.on){
            return 0;
        }else{
            return 100000000;
        }
    } */
    getResistance() {
        return (this.on ? 0 : 100000000);
    }
    getCurrent(u) {
        if (u > 0) {
            if (this.on) {
                throw new Error("Short circuit");
            }
        }
        return super.getCurrent(u);
    }
}
//Function that takes any AbstractResistor and prints its resistance value
function printResistance(r) {
    console.log(r.getResistance());
}
//create objects to see if the switch is working
let switch1 = new Switch();
console.log("The resistance of switch1 is when off: " + switch1.getResistance());
switch1.setOn(true);
console.log("The resistance of switch1 is when on: " + switch1.getResistance());
try {
    console.log("The " + switch1.getCurrent(5));
}
catch (e) {
    console.log("Caught error: ", e.message);
}
// current = u/resistance value
// current = 5/0 = infinity
switch1.setOn(false);
console.log("The " + switch1.getCurrent(5));
switch1.setOn(true);
printResistance(switch1);
//create array of resistors  
class MultipleConnection extends AbstractResistor {
    resistors = [];
    addResistor(r) {
        this.resistors.push(r);
    }
}
//Add resistors to array
//This class should finally return the total value of the resisors in the connection
//Total= R1 + R2 + R3 + ... + Rn
class SeriesConnection extends MultipleConnection {
    getResistance() {
        let totalResistance = 0;
        for (let r of this.resistors) {
            //get the resistance value of each resistor and add tothe total
            totalResistance += r.getResistance();
        }
        return totalResistance;
    }
}
//Resistors parallel connection 
// 1/Rtotal = 1/R1 + 1/R2 + 1/R3 + ... + 1/Rn
class ParallelConnection extends MultipleConnection {
    getResistance() {
        let inverseSum = 0;
        for (let resistor of this.resistors) {
            inverseSum += 1 / resistor.getResistance();
        }
        return 1 / inverseSum;
    }
}
let s = new SeriesConnection();
s.addResistor(new Resistor(100));
s.addResistor(new Resistor(200));
s.addResistor(new Resistor(300));
console.log("Resistance of series connection " + s.getResistance() + " ohms");
let p = new ParallelConnection();
p.addResistor(new Resistor(100));
p.addResistor(new Resistor(200));
p.addResistor(new Resistor(300));
console.log("Resistance of parallel connection " + p.getResistance() + " ohms");
