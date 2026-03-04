// Function that calculates the average of numbers in an array
function average(arr) {
    var sum = 0;
    // go through all numbers and add them
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    // divide by amount of numbers
    return sum / arr.length;
}
console.log(average([2, 4, 6]));
// Function that calculates sliding (moving) average
function slidingAverage(arr, size) {
    if (size === void 0) { size = 3; }
    var result = [];
    // move through the array
    for (var i = 0; i <= arr.length - size; i++) {
        // take part of the array
        var part = arr.slice(i, i + size);
        // calculate average of that part
        result.push(average(part));
    }
    return result;
}
console.log(slidingAverage([1, 2, 3, 4, 5]));
// Class that stores temperatures
var WeatherStation = /** @class */ (function () {
    // constructor gets starting temperatures
    function WeatherStation(temps) {
        this.temps = temps;
    }
    // add new temperature
    WeatherStation.prototype.add = function (temp) {
        this.temps.push(temp);
    };
    // get average temperature
    WeatherStation.prototype.getAverage = function () {
        return average(this.temps);
    };
    // find maximum temperature
    WeatherStation.prototype.getMax = function () {
        var max = this.temps[0];
        for (var i = 1; i < this.temps.length; i++) {
            if (this.temps[i] > max) {
                max = this.temps[i];
            }
        }
        return max;
    };
    return WeatherStation;
}());
// using the class
var ws = new WeatherStation([3, 5, 7]);
console.log(ws.getAverage());
console.log(ws.getMax());
ws.add(10);
console.log(ws.getAverage());
