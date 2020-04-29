const inquirer = require("inquirer");

const  getUserInput =  async ( employees = [] ) =>
{

    const job_role_prompt = [
        {
            type: 'list',
            name: 'title',
            message: 'Employee Role: ',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
      ];

    const common_prompts = [
        {
          type: 'input',
          name: 'name',
          message: 'Enter name: '
        },

        {
            type: 'input',
            name: 'id',
            message: 'Enter Id: '
        },

        {
            type: 'input',
            message: 'email : ',
            name: 'email',
            validate: function(email) {
                var pass = email.match(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
                return pass ? true : 'Please enter a valid email address';   
            }
        }
      ];

      const engineer_prompts = [
        {
          type: 'input',
          name: 'github',
          message: 'Enter github: '
        },
      ];

      const manager_prompts = [
        {
          type: 'input',
          name: 'office_number',
          message: 'Office Number: '
        },
      ];

      const intern_prompts = [
        {
          type: 'input',
          name: 'school',
          message: 'School: '
        },
      ];

      const add_employee_prompt = [
        {
            type: 'confirm',
            name: 'repeat',
            message: 'Enter another employee? ',
            default: true
        }
      ];
      
      const employee_details = {};
      const job_role = await inquirer.prompt(job_role_prompt);
      employee_details.role = job_role.title;

      const common_answers = await inquirer.prompt(common_prompts);

      employee_details.name = common_answers.name;
      employee_details.id = common_answers.id;
      employee_details.email = common_answers.email;

      switch(job_role.title) {
        case 'Manager':
            const manager_answers = await inquirer.prompt(manager_prompts);
            employee_details.officeNumber =  manager_answers.office_number;
          break;
        case 'Engineer':
            const engineer_answers = await inquirer.prompt(engineer_prompts);
            employee_details.github =  engineer_answers.github;
          break;
        case 'Intern':
            const intern_answers = await inquirer.prompt(intern_prompts);
            employee_details.school =  intern_answers.school;
        break;
        default:
        // code block
      }

      const add_employee = await inquirer.prompt(add_employee_prompt);

      const  new_employees = [...employees , employee_details];

      return ( add_employee.repeat ) ? getUserInput( new_employees ) : new_employees;

}


/*    const main = async () => {
    const inputs = await getUserInput();
    console.log(inputs);
};

main();*/

module.exports = getUserInput;

