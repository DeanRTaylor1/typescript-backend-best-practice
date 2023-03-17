import { app } from './app';
import { colors } from './util';

const PORT = process.env.PORT || 8080;

// start the Express server and do initial setup here
// TODO - add database connection and env variable setup
(async () => {
  app.listen(PORT, () => {
    console.log(colors.FgCyan, `Listening on port ${PORT}`);
    console.log(colors.Reset, '');
  });
})();
