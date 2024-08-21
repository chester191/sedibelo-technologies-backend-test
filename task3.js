const fs = require('fs');

// Read data from uniqueUsers.json
fs.readFile('uniqueUsers.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading uniqueUsers.json:', err);
    return;
  }

  const uniqueUsers = JSON.parse(data);

  // Sort users alphabetically by name
  const sortedUsers = uniqueUsers.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // Ignore case
    const nameB = b.name.toUpperCase(); // Ignore case

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  // Write sorted users to orderedUsers.json
  fs.writeFile('orderedUsers.json', JSON.stringify(sortedUsers, null, 2), (err) => {
    if (err) {
      console.error('Error writing orderedUsers.json:', err);
    } else {
      console.log('Task 3: orderedUsers.json file created successfully.');
    }
  });
});
