"use strict";
class MaterialAmount {
    //Mass is simply how much stuff something contains
    mass;
    specificHeatCapacity;
    temperature;
    //create constructor
    constructor(mass, specificHeatCapacity, temperature) {
        this.mass = mass;
        this.specificHeatCapacity = specificHeatCapacity;
        this.temperature = temperature;
    }
    //take the temperature
    getTemperature() {
        return this.temperature;
    }
    changeEnergy(joules) {
        this.temperature += joules / (this.mass * this.specificHeatCapacity);
    }
    //Addenergy
    //temerature change = energy/ (mass* heat capacity)
    //This method tells how much energy is needed to raise the temperature by 1 degree in other words
    //how many joules needed to raise this object by `1 degree
    getJoulesPerKelvin() {
        //Q = m · c · ΔT
        //Q/ΔT =m.c
        //m.c is heat capcity of the object
        return this.mass * this.specificHeatCapacity;
    }
}
class AirAmount extends MaterialAmount {
    constructor(length, width, height, temperature) {
        super(length * width * height * 1.23, 1012, temperature);
    }
}
//write a function to find the one final temeprature for all the objects.
//Imaging mixing them together untill they all become the same temperature.
function getEqualTemperature(m) {
    //how much energy is needed to increase all the objects by 1 degree
    let jouleKelvinSum = 0;
    //total heat energy. This is different different from the previousone because this includes temperature too.
    let jouleSum = 0;
    //Go through each object one by one
    for (let i = 0; i < m.length; i++) {
        //add how much this object affects temperature
        jouleKelvinSum += m[i].getJoulesPerKelvin();
        //add this object's heat (size * temperature)
        jouleSum += m[i].getJoulesPerKelvin() * m[i].getTemperature();
    }
    //divde the total heat by total size to get the final temperature
    return jouleSum / jouleKelvinSum;
}
