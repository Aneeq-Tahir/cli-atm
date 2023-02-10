#!/usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
const questions = [
    {
        name: "accountId",
        message: "Enter your Account id: ",
        type: "input",
    },
    {
        name: "accountPin",
        type: "password",
        message: "Enter your account pin",
    },
    {
        name: "operations",
        type: "list",
        message: "What do u wanna do?",
        choices: ["Check Balance", "Cash Withdrawal", "Cash Deposit", "Exit"],
    },
];
const answers = await inquirer.prompt(questions.slice(0, 2));
const bankOperations = await inquirer.prompt(questions.slice(2, 3));
console.log(answers.accountId);
async function main() {
    let balance = 100000;
    if (bankOperations.operations === "Check Balance") {
        chalkAnimation.neon(`Your Balance is: ${balance}$`);
    }
    else if (bankOperations.operations === "Cash Withdrawal") {
        const withDraw = await inquirer.prompt({
            type: "input",
            name: "amount",
            message: "Enter the amount to withdraw: ",
            validate: (input) => {
                input > balance && chalkAnimation.neon(`Insufficient balance`);
                return true;
            },
        });
        let amount = withDraw.amount;
        Number(amount);
        balance -= amount;
        chalkAnimation.neon(`You withdrew ${amount}$, your current balance is ${balance}$`);
    }
    else if (bankOperations.operations === "Cash Deposit") {
        const deposit = await inquirer.prompt({
            type: "input",
            name: "amount",
            message: "Enter the amount to deposit: ",
        });
        let amount = deposit.amount;
        balance += Number(amount);
        chalkAnimation.neon(`You successfully deposited ${amount}$, your current balance is ${balance}$`);
    }
    else if (bankOperations.operations === "Exit") {
        chalkAnimation.neon(`Thank you for using our ATM have a nice day`);
    }
}
// main();
