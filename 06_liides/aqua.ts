//formula to get volume: height * widht * lenght

class aqua {
    //dimensions of the aquarium (cm)
    protected length: number; // front-to-back depth
    protected width: number;  // left-to-right
    protected height: number; // top-to-bottom

    //capacity cm^3 and current water amount cm^3
    protected capacityCm3: number;
    protected waterCm3: number = 0; // initially empty

    
     /* create a new Aquarium.
     lengthCm front-to-back length in cm
     widthCm left-to-right width in cm
     heightCm top-to-bottom height in cm
     the constructor computes capacity and prints the capacity (in litres)
     to the console 
      */
    constructor(lengthCm: number, widthCm: number, heightCm: number) {
        this.length = lengthCm;
        this.width = widthCm;
        this.height = heightCm;
        // capacity in cm^3
        this.capacityCm3 = this.length * this.width * this.height;
        // output the volume (litres)
        console.log(`Aquarium capacity: ${this.getVolumeLiters().toFixed(2)} L`);
    }

    //Return total capacity in cm^3
    getVolumeCm3(): number {
        return this.capacityCm3;
    }

    //Return total capacity in litres (rounded only when displayed).
    getVolumeLiters(): number {
        return this.capacityCm3 / 1000;
    }

    // Return current water amount in litres.
    getWaterLiters(): number {
        return this.waterCm3 / 1000;
    }

    /*
     add water (litres).returns the number of litres that overflowed (0 if none).
     method updates the internal water amount and send an overflow message
     when overflow occurs.
     */
    addWaterLiters(liters: number): number {
        const addCm3 = liters * 1000; // convert litres to cm^3
        this.waterCm3 += addCm3;
        if (this.waterCm3 > this.capacityCm3) {
            const overflowCm3 = this.waterCm3 - this.capacityCm3;
            this.waterCm3 = this.capacityCm3; 
            const overflowLiters = overflowCm3 / 1000;
            console.log(`Overflow: ${overflowLiters.toFixed(2)} L`);
            return overflowLiters;
        }
        return 0;
    }

    /*
     remove water (litres).returns the actual litres removed.if the
     removal empties the aquarium, method logs that the aquarium is emptied
     */
    removeWaterLiters(liters: number): number {
        const remCm3 = liters * 1000;
        const removed = Math.min(remCm3, this.waterCm3);
        this.waterCm3 -= removed;
        if (this.waterCm3 === 0 && removed < remCm3) {
            console.log(`Aquarium emptied.`);
        }
        return removed / 1000; // return litres removed
    }
}
