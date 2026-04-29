"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiggyBank = void 0;
class PiggyBank {
    // hoiavad säästude summat (protected tähendab, et alamklassid näevad ka)
    balance = 0;
    // lisab raha hoiupõrsasse
    addMoney(amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
    // teeb hoiupõrsa tühjaks
    smashBank() {
        this.balance = 0;
    }
    // kontrollib, kui kaugel on eesmärk (näiteks 100€)
    checkGoal(target) {
        if (this.balance >= target) {
            return "goal reached! you are rich!";
        }
        else {
            let missing = target - this.balance;
            return `you still need ${missing}€ to reach your goal.`;
        }
    }
    getBalance() {
        return this.balance;
    }
}
exports.PiggyBank = PiggyBank;
if (typeof window !== 'undefined') {
    window.PiggyBank = PiggyBank;
}
//# sourceMappingURL=piggybank.js.map