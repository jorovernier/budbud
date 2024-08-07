import { Sequelize } from 'sequelize';

async function connectToDB(dbURI) {
  console.log(`Connecting to DB: ${dbURI}`);

  const sequelize = new Sequelize(dbURI, {
    logging: console.log, // set logging: false to disable outputting SQL queries to console
    define: {
      underscored: true,
      timestamps: false,
    },
  });

  try {
    await sequelize.authenticate();
    console.log("...I'm in");
  } catch (error) {
    console.error('ERR: ', error);
  }

  return sequelize;
}

export default connectToDB;