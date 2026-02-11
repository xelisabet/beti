var personName = "Alice";
var weight = 68; // in kilograms
var height = 1.65; // in meters
function bmiInfo(personName, weight, height) {
    var bmi = weight / (height * height); //calculates BMI
    var category; //variable to hold BMI category
    if (bmi < 18.5) { //determines BMI category based on calculated BMI
        category = "Underweight";
    }
    else if (bmi < 24.9) {
        category = "Normal weight";
    }
    else if (bmi < 29.9) {
        category = "Overweight";
    }
    else {
        category = "Obesity";
    }
    return "Name: ".concat(personName, ", BMI: ").concat(bmi.toFixed(2), ", Category: ").concat(category); //returns a string with the person's name, calculated BMI (rounded to 2 decimal places), and BMI category/
}
console.log(bmiInfo(personName, weight, height));
