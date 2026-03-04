// Function that calculates the average of numbers in an array
function average(arr: number[]): number {
    let sum = 0;

    // go through all numbers and add them
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    // divide by amount of numbers
    return sum / arr.length;
}

console.log(average([2, 4, 6]));


// Function that calculates sliding (moving) average
function slidingAverage(arr: number[], size: number = 3): number[] {

    let result: number[] = [];

    // move through the array
    for (let i = 0; i <= arr.length - size; i++) {

        // take part of the array
        let part = arr.slice(i, i + size);

        // calculate average of that part
        result.push(average(part));
    }

    return result;
}

console.log(slidingAverage([1, 2, 3, 4, 5]));


// Class that stores temperatures
class WeatherStation {

    // constructor gets starting temperatures
    constructor(private temps: number[]) {}

    // add new temperature
    add(temp: number): void {
        this.temps.push(temp);
    }

    // get average temperature
    getAverage(): number {
        return average(this.temps);
    }

    // find maximum temperature
    getMax(): number {
        let max = this.temps[0];

        for (let i = 1; i < this.temps.length; i++) {
            if (this.temps[i] > max) {
                max = this.temps[i];
            }
        }

        return max;
    }
}


// using the class
let ws = new WeatherStation([3, 5, 7]);

console.log(ws.getAverage());
console.log(ws.getMax());

ws.add(10);

console.log(ws.getAverage());