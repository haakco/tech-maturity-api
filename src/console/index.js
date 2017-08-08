import chalk from 'chalk';
import comander from 'commander';
import * as uuid from 'uuid';

comander
  .version('1.0.0');

comander
  .command('uuid')
  .description('Gen a uuid')
  .action(() => {
    console.log(uuid.v4());
  });

comander
  .command('initialise')
  .description('setup db')
  .action(() => {
    require('../database/initialise-db');
  });


comander.parse(process.argv);


if (!comander.args.length) {
  comander.help(txt => chalk.green(txt));
}
