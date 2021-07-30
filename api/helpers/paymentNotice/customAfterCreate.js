const customAfterCreate = {
  friendlyName: "PaymentNotice AfterCreate",
  description: "PaymentNotice AfterCreate",
  inputs: {
    created: {
      type: {},
      example: { id: 1, description: "" },
      description: "Elemento creado",
      required: true,
    },
  },
  fn: async ({ created }) => {
    try {
      await UserLog.create({
        description: "Abono registrado por XX",
        paymentNotice: created.id,
      });
      return true;
    } catch (error) {
      sails.log(error);
      return false;
    }
  },
};
module.exports = customAfterCreate;
