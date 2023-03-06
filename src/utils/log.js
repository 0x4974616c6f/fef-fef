const fs = require("fs");

function writeErrorsToLog(errors, logFileName) {
  const errorMessages = errors.array().map((error) => error.msg);
  const logMessage = `Validation errors: ${errorMessages.join("; ")}`;

  fs.appendFile(
    logFileName,
    `${new Date().toISOString()} - ${logMessage}\n`,
    (err) => {
      if (err) {
        console.error(`Error writing to log file: ${err.message}`);
      }
    }
  );
}

module.exports = writeErrorsToLog;
