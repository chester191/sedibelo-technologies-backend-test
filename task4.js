const fs = require('fs');

// Read the uniqueUsers.json file
const users = JSON.parse(fs.readFileSync('uniqueUsers.json', 'utf8'));

// Define the reporting relationship
const supervisorName = "MICHAEL PHALANE";
const reportingDesignations = ["MECHANIC", "MECHANIC ASSISTANT"];

// Filter users in the ENGINEERING department who are Mechanics or Mechanic Assistants
const filteredUsers = users.filter(user => {
    return user.department === 'ENGINEERING' &&
           reportingDesignations.includes(user.designation);
});

// Count the number of people who report to Michael Phalane
const count = filteredUsers.length;

console.log(`Total number of people who report to ${supervisorName}: ${count}`);
