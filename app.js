const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const mkdirSync = util.promisify(fs.mkdirSync);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const getUserInput = require("./lib/userInput");


const main = async () => {
    const employees = await getUserInput();
    const team = [];

    for (let i = 0; i < employees.length; i++) {
      
        switch(employees[i].role) 
        {
          case 'Manager':
            let new_manager = new Manager(employees[i].name,employees[i].id,employees[i].email,employees[i].officeNumber);
            team.push(new_manager);
            break;
          case 'Engineer':
            let new_engineer = new Engineer(employees[i].name,employees[i].id,employees[i].email,employees[i].github);
            team.push(new_engineer);
            break;
          case 'Intern':
            let new_intern = new Intern(employees[i].name,employees[i].id,employees[i].email,employees[i].school);
            team.push(new_intern);
          break;
          default:
        } 

      }

      html = render(team);

      uploadFolerExists =  async () => {
        try {
          await mkdirSync(OUTPUT_DIR);
          return true;
        } catch(error) {
          if (error.code != 'EEXIST') throw error;
          return false
        }
      }

      uploadFolerExists(); 

      uploadFolerExists ? writeFile() : 'Problem';      
      
      async function writeFile()
      {  
          try {
              await writeFileAsync(`${outputPath}`, html);
              console.log('SUCCESS: team.html is created');
          }
          catch(error) {
              console.error('ERROR WHEN WRITING FILE: ' + error);
              return false;
          }
      }

    };
    
  main();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
