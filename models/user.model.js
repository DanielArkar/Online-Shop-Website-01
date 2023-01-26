const bcrypt = require("bcryptjs");
const e = require("express");

const db = require("../data/database");

class User {
  constructor(email, password, fullname, steet, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      steet: steet,
      postalCode: postal,
      city: city,
    };
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
