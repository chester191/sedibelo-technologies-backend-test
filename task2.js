const fs = require('fs');
const csvWriter = require('csv-writer').createObjectCsvWriter;

// Read data from usersBackEnd.json
fs.readFile('usersBackEnd.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading usersBackEnd.json:', err);
    return;
  }

  const users = JSON.parse(data);

  // Function to count duplicates and prepare CSV data
  function countDuplicates(users) {
    const userCounts = {};

    users.forEach(user => {
      const userKey = `${user.name}-${user.surname}`;
      if (!userCounts[userKey]) {
        userCounts[userKey] = { ...user, count: 0 };
      }
      userCounts[userKey].count += 1;
    });

    return Object.values(userCounts);
  }

  const userCountArray = countDuplicates(users);

  // Define the CSV writer
  const csvWriterInstance = csvWriter({
    path: 'uniqueUsers.csv',
    header: [
      { id: 'name', title: 'Name' },
      { id: 'surname', title: 'Surname' },
      { id: 'count', title: 'Number of times duplicated' }
    ]
  });

  // Write the CSV file
  csvWriterInstance.writeRecords(userCountArray)
    .then(() => {
      console.log('Task 2: uniqueUsers.csv file created successfully.');
    })
    .catch(err => {
      console.error('Error writing uniqueUsers.csv:', err);
    });
});
