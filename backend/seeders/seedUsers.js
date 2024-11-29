const axios = require("axios");
const { faker } = require("@faker-js/faker");

const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name,
        email,
        password,
      }
    );
    console.log(
      `User registered: ${response.data.user.name} (${response.data.user.email})`
    );
  } catch (error) {
    if (error.response) {
      console.error(`Error registering user: ${error.response.data.message}`);
    } else {
      console.error(`Error registering user: ${error.message}`);
    }
  }
};

const seedUsers = async (numUsers) => {
  for (let i = 0; i < numUsers; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await registerUser(name, email, password);
  }
};

seedUsers(30);
