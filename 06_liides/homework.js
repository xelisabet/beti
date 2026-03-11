// convert Earth weight to Moon weight
var EarthToMoon = /** @class */ (function () {
    function EarthToMoon() {
    }
    EarthToMoon.prototype.calculate = function (weight) {
        return weight / 6;
    };
    EarthToMoon.prototype.inputUnit = function () {
        return "kg on Earth";
    };
    EarthToMoon.prototype.outputUnit = function () {
        return "kg on Moon";
    };
    return EarthToMoon;
}());
// convert Moon weight to Earth weight
var MoonToEarth = /** @class */ (function () {
    function MoonToEarth() {
    }
    MoonToEarth.prototype.calculate = function (weight) {
        return weight * 6;
    };
    MoonToEarth.prototype.inputUnit = function () {
        return "kg on Moon";
    };
    MoonToEarth.prototype.outputUnit = function () {
        return "kg on Earth";
    };
    return MoonToEarth;
}());
