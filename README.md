# Winston Multi File Logger

**winston-multi-file** is used to create multiple files based on label, base of this package is [winston](https://www.npmjs.com/package/winston), you can integrate other winston transporter also.


# Install

    npm i winston-multi-file

## Use

    import  winston  from  "winston"; //this is required for transporter
	import  Logger  from  "winston-multi-file";

	// for commonjs module
	//const  winston  =  require("winston"); //this is required for transporter
	//const  Logger  =  require("winston-multi-file");

	const  logger  =  new  Logger();
	
	//set log directory default will be logs
	logger.setLogDir('logs'); 

	//set custom format default format will be `${timestamp} : ${level} : ${message}`
	logger.setFormat(({ level, message, label, timestamp }) => {
		return  `${timestamp} : ${label} : ${level} : ${message}`;
	});

	//include console transporter, it will console each log
	logger.transporter([new  winston.transports.Console({})])
	//include file transporter, it will combined all logs in combined.log file
	logger.transporter([new  winston.transports.File({ filename:  'combined.log' })])

	const  userModuleLog  =  logger.getLogger('user_module');
	const  paymentModuleLog  =  logger.getLogger('payment_module');

	//creates user_module_YYYY_MM_DD.log file and add this log
	userModuleLog.info('User has been created successfully.'); 
	//creates payment_module_YYYY_MM_DD.log file and add this log
	paymentModuleLog.error('payment of user failed.'); 

