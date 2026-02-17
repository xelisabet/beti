class careerProfile {
    constructor(
        public name: string,
        private interest: number,
        private skills: number,
        private experience: number
    ) {}
    calculateScore(): number {
        return this.interest + this.skills + this.experience;
    }

    getResult(): string {
    let total = this.calculateScore();

    if (total >= 12) {
        return "Strong career profile";
    } else if (total >= 8) {
        return "Developing career profile";
    } else {
        return "Early career stage";
    }
}
}


let user1 = new careerProfile("Alice", 4, 5, 3);
let user2 = new careerProfile("Bob", 3, 4, 2);

console.log(user1.name + ": " + user1.getResult());
console.log(user2.name + ": " + user2.getResult());