// TODO: Write code to define and export the Employee class
class Employee {
    constructor (name, id, email, role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;       
    };
    getName() {
        return this.name;
    };
    getId() {
        return this.id;
    };
    getEmail() {
        return this.email;
    };
    getRole() {
        if (this.name != null){
            this.role = "Employee"
        };
        if (this.role != null){
            return this.role
            } else {
                console.log("This is not an employee of this company")
            };
        };
    };
};

module.exports = Employee;