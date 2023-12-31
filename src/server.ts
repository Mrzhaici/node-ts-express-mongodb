import errorHandler from "errorhandler";
import app from './app';

/**
 * Error Handler. Provides full stack
 */
if(process.env.NODE_ENV === "development") {
  app.use(errorHandler());
};

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log(`app is running at http://127.0.0.1:${app.get("port")} in ${app.get('env')} mode`);
  console.log("  Press ctrl+c to stop\n");
});

export default server
