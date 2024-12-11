const bcrypt = require('bcryptjs');

const newPassword = 'admin'; // Replace with your desired password
const hashedPassword = bcrypt.hashSync(newPassword, 10);

console.log('Hashed Password:', hashedPassword);
console.log('Script is running...');
