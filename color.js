import chalk from 'chalk';

// Examples of colored text
console.log(chalk.red('This text is red'));
console.log(chalk.green('This text is green'));
console.log(chalk.blue('This text is blue'));
console.log(chalk.yellow('This text is yellow'));

// Examples of styled text
console.log(chalk.bold('This text is bold'));
console.log(chalk.underline('This text is underlined'));

// Combining styles
console.log(chalk.red.bold.underline('This text is red, bold, and underlined'));

// Using template literals for dynamic strings
const name = 'John';
console.log(chalk.blue(`Hello, ${name}!`));
