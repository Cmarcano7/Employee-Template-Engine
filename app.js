// Requires necessary do not remove
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Paths to where html file will be created
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array containing each members information
const teamMembers = [];

// Array used to validate ids used as they are unique
const idsArray = [];

// Variables containing questions for the prompts
var managerQuestions = [
    {
        type: 'input',
        name: 'managerName',
        message: "What is the manager's name?",
        validate: function name(answers) {
            if (answers !== ""){
                return true
            } else {
                return "Please enter a valid name."
            };
        },
    },
    {
        type: 'input',
        name: 'managerID',
        message: "What is your manager's ID?",
        validate: function id(answers) {
            if (answers.match(/(^[+]?[1-9]\d*$)/gm)) {
                if (idsArray.includes(answers)) {
                    return "This ID is used by another team member, please enter another ID number"
                } else {
                    return true
                }; 
            } else {
                return "Please enter a valid ID."
            };
        },
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: "What is your manager's Email?",
        validate: function email(answers) {
            if (answers.match(/((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm))
            {
              return (true)
            } else {
                return 'Please enter a valid email address.'
            };
        },
    },
    {
        type: 'input',
        name: 'managerOffice',
        message: "What is your manager's office number?",
        validate: function office(answers) {
            if(answers.match(/(^[+]?[1-9]\d*$)/gm)) {
                return true
            } else {
                return 'Please enter a valid office number.'
            };
        },
    }
];

var engineerQuestions = [
    {
        type: 'input',
        name: 'engineerName',
        message: "What is the engineer's name?",
        validate: function name(answers) {
            if (answers !== ""){
                return true || "Please enter a valid name."
            };
        },
    },
    {
        type: 'input',
        name: 'engineerID',
        message: "What is your engineer's ID?",
        validate: function id(answers) {
            if (answers.match(/(^[+]?[1-9]\d*$)/gm)) {
                if (idsArray.includes(answers)) {
                    return "This ID is used by another team member, please enter another ID number"
                } else {
                    return true
                }; 
            } else {
                return "Please enter a valid ID."
            };
        },
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "What is your engineer's Email?",
        validate: function email(i) {
            if (i.match(/((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm))
            {
              return (true) || 'Please enter a valid email address.'
            };
        },
    },
    {
        type: 'input',
        name: 'engineerGithub',
        message: "What is your engineer's Github?",
    },
]

var internQuestions = [
    {
        type: 'input',
        name: 'internName',
        message: "What is the intern's name?",
        validate: function name(answers) {
            if (answers !== ""){
                return true 
            } else {
                return "Please enter a valid name."
            };
        },
    },
    {
        type: 'input',
        name: 'internID',
        message: "What is your intern's ID?",
        validate: answers => {
            if (answers.match(/(^[+]?[1-9]\d*$)/gm)) {
                if (idsArray.includes(answers)) {
                    return "This ID is used by another team member, please enter another ID number"
                } else {
                    return true
                }; 
            } else {
                return "Please enter a valid ID."
            };
        },
    },
    {
        type: 'input',
        name: 'internEmail',
        message: "What is your intern's Email?",
        validate: function email(answers) {
            if (answers.match(/((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm))
            {
              return (true) 
            } else {
                return 'Please enter a valid email address.'
            };
        },
    },
    {
        type: 'input',
        name: 'internSchool',
        message: "Where does your intern go to school?",
        validate: answers => {
            if (answers !== "") {
                return true;
            } else {
                return "Please enter a valid school."
            };
        },
    },
];

function nodeCli() {
    
    // Initial prompt creating manager for the team
    function beginTeam() {
        console.log("Please build your software engineering team");
        inquirer.prompt(managerQuestions).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice);
            teamMembers.push(manager);
            
            idsArray.push(answers.managerID);
            console.log(idsArray.length)
            employees();
    });
    }
    
    // Employee choice prompts after a manager is created
    function employees() {
        console.log("Who are your employees?")
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeChoice',
                message: 'What type of employee(s) are on this team?',
                choices: [
                    'Engineer',
                    'Intern',
                    'There are no more employees on this team.'
                ],
                default: 'There are no more employess on this team.'
            }
        ]).then(answers =>{
            switch(answers.employeeChoice) {
                case 'Engineer':
                    engineerChoice();
                    break;
                case 'Intern':
                    internChoice();
                    break;
                default:
                    createTeam()
            }
        })
    };

    // Generates the engineers question dialogue from the engineerQuestions var
    function engineerChoice() {
        console.log("Please enter your engineer's information.");
        inquirer.prompt(engineerQuestions).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            ids.push(answers.managerID);
            employees();
        });
    };

    // Generates the interns question dialogue from the internQuestions var
    function internChoice() {
        console.log("Please enter your intern's information.");
        inquirer.prompt(internQuestions).then(answers => {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            ids.push(answers.internID);
            employees();
        });
    };

    // Creates the HTML file
    function createTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdir(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    };
    
    // Initialize the prompts within the function.
    beginTeam();
};

// Function to run the prompts.
nodeCli();
