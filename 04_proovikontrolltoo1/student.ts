class Student {
    constructor(
        private name: string,
        private grade: number
    ) {}

    //method to get student's name
    getName(): string {
        return this.name;
    }

    //method to get student's grade
    getGrade(): number {
        return this.grade;
    }
}

class SchoolClass {
    //array to hold students in the class
    private students: Student[] = [];

    //method to add a student to the class
    addStudent(student: Student) {
        this.students.push(student);
    }

    //method to get the average grade of the class
    getAverageGrade(): number {
        let sum = 0;
        for (let s of this.students) {
            sum += s.getGrade(); //get the grade of each student and add it to the sum
        }

        //return the average by dividing the sum by the number of students
        return sum / this.students.length;
    }

    //method to list all students in the class
    listStudents(): string {

        let result = "";

        for (let s of this.students) {
            result += s.getName() + " (" + s.getGrade() + ")<br>";
        }

        return result;
    }
}

//create a school class instance
let myClass = new SchoolClass();

//create student instances
let s1 = new Student("Mari", 4);
let s2 = new Student("Jaan", 5);

//add students to the class
myClass.addStudent(s1);
myClass.addStudent(s2);



//function to start the page and display students and average grade
function startPage() {

    //list of students in the class on the page
    document.getElementById("students").innerHTML = myClass.listStudents();

    // display the average grade on the page
    document.getElementById("average").innerText =
        myClass.getAverageGrade().toFixed(2);
}