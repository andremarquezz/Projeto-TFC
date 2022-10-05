const shell = require('shelljs');

const sequelize = {
  drop: 'npx sequelize-cli db:drop',
  create: 'npx sequelize-cli db:create',
  migrate: 'npx sequelize-cli db:migrate',
  seed: 'npx sequelize-cli db:seed:all',
};

const resetDatabase = () => {
  shell.exec(
    [sequelize.drop, sequelize.create, sequelize.migrate, sequelize.seed].join(' && ')
  );
};

export default resetDatabase;
