module.exports = {
  friendlyName: "Logout",
  description: "Log out of this app.",
  extendedDescription: ``,
  exits: {
    success: {
      description:
        "The requesting user agent has been successfully logged out.",
    },
    redirect: {
      description: "The requesting user agent looks to be a web browser.",
      extendedDescription:
        "After logging out from a web browser, the user is redirected away.",
      responseType: "redirect",
    },
  },
  fn: async function (inputs, exits) {
    delete this.req.session.user;
    return exits.success({ ok: true });
  },
};
