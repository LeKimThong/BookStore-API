const { Sequelize } = require('sequelize');


const dbModel = new Sequelize('account', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    logging: false
  });

const connectingDatabase = async () => {
  try {
    await dbModel.authenticate();
    console.log('ket noi db thanh cong')
  } catch (error) {
    console.error('ket noi db that bai', error)
  }
}
connectingDatabase();


