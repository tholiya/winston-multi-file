import winston from "winston";
import 'winston-daily-rotate-file';

class Logger {
  // Private properties
  #transporters = [];
  #myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} : ${level} : ${message}`;
  });
  #logDir = 'logs';

  // Setter for log directory
  setLogDir(dir) {
    this.#logDir = dir;
  }

  // Setter for log format
  setFormat(format) {
    this.#myFormat = winston.format.printf(format);
  }

  // Method to add custom transporters
  transporter(transporters) {
    for (const transporter of transporters) {
      // If the transporter doesn't have a format, assign the default format
      if (!transporter.format) {
        transporter.format = this.#format();
      }
    }
    // Concatenate the new transporters with existing ones
    this.#transporters = [...this.#transporters, ...transporters];
  }

  // Method to get or create a logger
  getLogger(label) {
    if (!winston.loggers.has(label)) {
      // Add a file transport specific to the provided label
      let logTransporter = [...this.#transporters,this.#fileTransport(label)];
      // Create or get the logger with specified transports and label format
      winston.loggers.add(label, {
        transports: logTransporter,
        format: winston.format.label({ label }),
      });
    }
    // Return the logger with the specified label
    return winston.loggers.get(label);
  }

  // Private method to define the log format
  #format() {
    return winston.format.combine(
      winston.format.timestamp(),
      this.#myFormat,
    );
  }

  // Private method to configure the file transport
  #fileTransport = (label) => {
    return new winston.transports.DailyRotateFile({
      format: this.#format(),
      filename: `${this.#logDir}/${label}_%DATE%.log`,
      datePattern: 'YYYY_MM_DD',
    });
  };
}

export default Logger;