//formula to get volume: height * widht * lenght
var aquarium = /** @class */ (function () {
    /* create a new Aquarium.
    lengthCm front-to-back length in cm
    widthCm left-to-right width in cm
    heightCm top-to-bottom height in cm
    the constructor computes capacity and prints the capacity (in litres)
    to the console
     */
    function aquarium(lengthCm, widthCm, heightCm) {
        this.waterCm3 = 0; // initially empty
        this.length = lengthCm;
        this.width = widthCm;
        this.height = heightCm;
        // capacity in cm^3
        this.capacityCm3 = this.length * this.width * this.height;
        // output the volume (litres)
        console.log("Aquarium capacity: ".concat(this.getVolumeLiters().toFixed(2), " L"));
    }
    //Return total capacity in cm^3
    aquarium.prototype.getVolumeCm3 = function () {
        return this.capacityCm3;
    };
    //Return total capacity in litres (rounded only when displayed).
    aquarium.prototype.getVolumeLiters = function () {
        return this.capacityCm3 / 1000;
    };
    // Return current water amount in litres.
    aquarium.prototype.getWaterLiters = function () {
        return this.waterCm3 / 1000;
    };
    /*
     add water (litres).returns the number of litres that overflowed (0 if none).
     method updates the internal water amount and send an overflow message
     when overflow occurs.
     */
    aquarium.prototype.addWaterLiters = function (liters) {
        var addCm3 = liters * 1000; // convert litres to cm^3
        this.waterCm3 += addCm3;
        if (this.waterCm3 > this.capacityCm3) {
            var overflowCm3 = this.waterCm3 - this.capacityCm3;
            this.waterCm3 = this.capacityCm3;
            var overflowLiters = overflowCm3 / 1000;
            console.log("Overflow: ".concat(overflowLiters.toFixed(2), " L"));
            return overflowLiters;
        }
        return 0;
    };
    /*
     remove water (litres).returns the actual litres removed.if the
     removal empties the aquarium, method logs that the aquarium is emptied
     */
    aquarium.prototype.removeWaterLiters = function (liters) {
        var remCm3 = liters * 1000;
        var removed = Math.min(remCm3, this.waterCm3);
        this.waterCm3 -= removed;
        if (this.waterCm3 === 0 && removed < remCm3) {
            console.log("Aquarium emptied.");
        }
        return removed / 1000; // return litres removed
    };
    return aquarium;
}());
