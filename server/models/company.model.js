module.exports = (sequelize, Sequelize) => {
  const companyUser = sequelize.define("companyUser", {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return companyUser;
};
