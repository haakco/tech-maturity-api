import app from './app';
import defaults from './defaults.json';

const { PORT = defaults.port } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
