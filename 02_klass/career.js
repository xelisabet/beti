var careerProfile = /** @class */ (function () {
    function careerProfile(name, interest, skills, experience) {
        this.name = name;
        this.interest = interest;
        this.skills = skills;
        this.experience = experience;
    }
    careerProfile.prototype.calculateScore = function () {
        return this.interest + this.skills + this.experience;
    };
    careerProfile.prototype.getResult = function () {
        var total = this.calculateScore();
        if (total >= 12) {
            return "Strong career profile";
        }
        else if (total >= 8) {
            return "Developing career profile";
        }
        else {
            return "Early career stage";
        }
    };
    return careerProfile;
}());
var user1 = new careerProfile("Alice", 4, 5, 3);
var user2 = new careerProfile("Bob", 3, 4, 2);
console.log(user1.name + ": " + user1.getResult());
console.log(user2.name + ": " + user2.getResult());
