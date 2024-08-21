const fs = require('fs');
const crypto = require('crypto');

// Read data from usersBackEnd.json
fs.readFile('usersBackEnd.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading usersBackEnd.json:', err);
    return;
  }

  const users = JSON.parse(data);

  // Function to create unique users
  function createUniqueUsers(users) {
    const uniqueUsers = [];
    const seenUsers = new Set();

    users.forEach(user => {
      const userHash = `${user.name}-${user.surname}    -${user.designation}-${user.department}`;
      
      if (!seenUsers.has(userHash)) {
        const uniqueUser = { ...user, id: crypto.randomUUID() };
        uniqueUsers.push(uniqueUser);
        seenUsers.add(userHash);
      }
    });

    return uniqueUsers;
  }

  // Create the uniqueUsers.json file
  const uniqueUsers = createUniqueUsers(users);

  fs.writeFile('uniqueUsers1.json', JSON.stringify(uniqueUsers, null, 2), (err) => {
    if (err) {
      console.error('Error writing uniqueUsers1.json:', err);
    } else {
      console.log('Task 1: uniqueUsers1.json file created successfully.');
    }
  });
});
