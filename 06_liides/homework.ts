// interface that describes a converter
interface GravityConverter{
    calculate(x:number):number;
    inputUnit():string;
    outputUnit():string;
}

// convert Earth weight to Moon weight
class EarthToMoon implements GravityConverter{

    calculate(weight:number):number{
        return weight/6;
    }

    inputUnit():string{
        return "kg on Earth";
    }

    outputUnit():string{
        return "kg on Moon";
    }
}

// convert Moon weight to Earth weight
class MoonToEarth implements GravityConverter{

    calculate(weight:number):number{
        return weight*6;
    }

    inputUnit():string{
        return "kg on Moon";
    }

    outputUnit():string{
        return "kg on Earth";
    }
}