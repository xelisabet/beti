class PiggyBank {
    // hoiavad säästude summat (protected tähendab, et alamklassid näevad ka)
    protected balance: number = 0;

    // lisab raha hoiupõrsasse
    addMoney(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    // teeb hoiupõrsa tühjaks
    smashBank(): void {
        this.balance = 0;
    }

    // kontrollib, kui kaugel on eesmärk (näiteks 100€)
    checkGoal(target: number): string {
        if (this.balance >= target) {
            return "goal reached! you are rich!";
        } else {
            let missing = target - this.balance;
            return `you still need ${missing}€ to reach your goal.`;
        }
    }

    getBalance(): number {
        return this.balance;
    }
}

export { PiggyBank };
if (typeof window !== 'undefined') {
    (window as any).PiggyBank = PiggyBank;
}