var Student = /** @class */ (function () {
    function Student(name, grade) {
        this.name = name;
        this.grade = grade;
    }


    //method to get student's name
    Student.prototype.getName = function () {
        return this.name;
    };
    //method to get student's grade
    Student.prototype.getGrade = function () {
        return this.grade;
    };
    return Student;
}());
var SchoolClass = /** @class */ (function () {
    function SchoolClass() {
        //array to hold students in the class
        this.students = [];
    }
    //method to add a student to the class
    SchoolClass.prototype.addStudent = function (student) {
        this.students.push(student);
    };
    //method to get the average grade of the class
    SchoolClass.prototype.getAverageGrade = function () {
        var sum = 0;
        for (var _i = 0, _a = this.students; _i < _a.length; _i++) {
            var s = _a[_i];
            sum += s.getGrade(); //get the grade of each student and add it to the sum
        }
        //return the average by dividing the sum by the number of students
        return sum / this.students.length;
    };
    //method to list all students in the class
    SchoolClass.prototype.listStudents = function () {
        var result = "";
        for (var _i = 0, _a = this.students; _i < _a.length; _i++) {
            var s = _a[_i];
            result += s.getName() + " (" + s.getGrade() + ")<br>";
        }
        return result;
    };
    return SchoolClass;
}());
//create a school class instance
var myClass = new SchoolClass();
//create student instances
var s1 = new Student("Mari", 4);
var s2 = new Student("Jaan", 5);
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
// function for button - adds new student from input fields
function addStudentFromInput() {
    // get values from input fields
    var name = document.getElementById("nameInput").value;
    var grade = Number(document.getElementById("gradeInput").value);
    // create new student object
    var newStudent = new Student(name, grade);
    // add to class
    myClass.addStudent(newStudent);
    // update student list on page
    document.getElementById("students").innerHTML = myClass.listStudents();
    // update average grade
    document.getElementById("average").innerText =
        myClass.getAverageGrade().toFixed(2);
    // clear input fields
    document.getElementById("nameInput").value = "";
    document.getElementById("gradeInput").value = "";
}



