module.exports = (sequelize, Sequelize) => {
  const Workers = sequelize.define("workers", {
    name: {
      type: Sequelize.STRING,
    },
    joineddate: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    userid: {
      type: Sequelize.STRING,
    },
  });

  return Workers;
};
