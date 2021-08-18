const bcrypt = require("bcrypt");

module.exports = {
  friendlyName: "Login",
  description: "Log in using the provided rut and password combination.",
  inputs: {
    username: {
      description: "Rut del usuario",
      type: "string",
      required: true,
    },
    password: {
      description: "Password del usuario",
      type: "string",
      required: true,
    },
  },
  exits: {
    success: {
      description: "The requesting user agent has been successfully logged in.",
    },
    noValidUser: {
      responseType: "badRequest",
      description: "Contraseña inválida",
    },
    notFoundUser: {
      responseType: "badRequest",
      description: "Usuario sin cuenta",
    },
  },
  fn: async function ({ username, password }) {
    const [user] = await User.find({ username }).limit(1);

    if (!user) {
      throw "notFoundUser";
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw "noValidUser";
    }

    this.req.session.user = user;
    return {
      user,
    };
  },
};
