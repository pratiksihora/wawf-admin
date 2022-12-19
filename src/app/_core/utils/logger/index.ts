import { LoggingLevel } from 'src/app/constants/enum/logger/logger.enum';
import { environment } from 'src/environments/environment';

export class LoggerUtil {
  static log(message: any, level = LoggingLevel.Info, ...optionalParams: any[]) {
    switch (level) {
      case LoggingLevel.Error:
        environment.logger.error && console.error(message, optionalParams);
        break;
      case LoggingLevel.Warning:
        environment.logger.warn && console.warn(message, optionalParams);
        break;
      case LoggingLevel.Debug:
        environment.logger.debug && console.debug(message, optionalParams);
        break;
      default:
        environment.logger.info && console.info(message, optionalParams);
    }
  }

  static logError(message: any, ...optionalParams: any[]) {
    this.log(message, LoggingLevel.Error, optionalParams);
  }

  static logWarning(message: any, ...optionalParams: any[]) {
    this.log(message, LoggingLevel.Warning, optionalParams);
  }

  static logInfo(message: any, ...optionalParams: any[]) {
    this.log(message, LoggingLevel.Info, optionalParams);
  }

  static logVerbose(message: any, ...optionalParams: any[]) {
    this.log(message, LoggingLevel.Verbose, optionalParams);
  }
}