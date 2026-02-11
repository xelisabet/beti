let personName: string = "Alice";
let weight: number = 68; // in kilograms
let height: number = 1.65; // in meters
    

function bmiInfo(personName: string, weight: number, height: number): string {  //function to calculate BMI and determine category
    let bmi = weight / (height * height);   //calculates BMI
    let category: string;   //variable to hold BMI category

    if (bmi < 18.5) {   //determines BMI category based on calculated BMI
        category = "Underweight";
    } else if (bmi < 24.9) {
        category = "Normal weight";
    } else if (bmi < 29.9) {
        category = "Overweight";
    } else {
        category = "Obesity";
    }

    return `Name: ${personName}, BMI: ${bmi.toFixed(2)}, Category: ${category}`;  
}

console.log(bmiInfo(personName, weight, height));