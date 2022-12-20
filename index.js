import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const title = chalkAnimation.rainbow("Morty calculator\n");
    await sleep();
    title.stop();
    console.log(`
    ${chalk.bgBlue('HOW TO USE')}
    I am a process in your computer
    Enter Two Numbers 
    Then Select an opreator
    See Results

    `);
}
// await welcome();
async function askName() {
    const answers = await inquirer.prompt({
        name: 'userName',
        type: 'input',
        message: 'What is your name?\n',
        default() {
            return 'Human';
        },
    });
}
async function main() {
    const spinner = createSpinner();
    const msg = "Wellcome To The Calculator";
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
    await sleep();
    const answers = await inquirer.prompt([{
            type: "number",
            name: "numberOne",
            message: "Enter First Number: "
        },
        {
            type: "number",
            name: "numberTwo",
            message: "Enter Second Number: "
        },
        {
            type: "list",
            name: "opreator",
            choices: ["+", "-", "/", "*"],
            message: "Select an opreator: "
        }
    ]);
    const { numberOne, numberTwo, opreator } = answers;
    if (numberOne && numberTwo && opreator) {
        let results = 0;
        if (opreator == "+") {
            results = numberOne + numberTwo;
        }
        else if (opreator == "-") {
            results = numberOne - numberTwo;
        }
        if (opreator == "*") {
            results = numberOne * numberTwo;
        }
        if (opreator == "/") {
            results = numberOne / numberTwo;
        }
        console.log("Your Answer is : ", results);
    }
    else {
        spinner.error({ text: `💀💀💀 Invalid input 💀💀💀` });
        process.exit(1);
    }
}
console.clear();
await welcome();
await askName();
await main();
