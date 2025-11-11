import { Injectable, LoggerService, LogLevel } from '@nestjs/common';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: string;
}

@Injectable()
export class MemoryLoggerService implements LoggerService {
  private MAX_ENTRIES = 1000;
  private logs: LogEntry[] = [];

  log(message: string, context?: string) {
    this.addLog('log', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.addLog('error', `${message} ${trace ?? ''}`, context);
  }

  warn(message: string, context?: string) {
    this.addLog('warn', message, context);
  }

  debug(message: string, context?: string) {
    this.addLog('debug', message, context);
  }

  verbose(message: string, context?: string) {
    this.addLog('verbose', message, context);
  }

  private addLog(level: LogLevel, message: string, context?: string) {
    const entry: LogEntry = { level, message, context, timestamp: new Date() };
    this.logs.push(entry);
    if (this.logs.length > this.MAX_ENTRIES) {
      // keep only the last 1000 entries
      this.logs.splice(0, this.logs.length - this.MAX_ENTRIES);
    }

    // Also print to console
    const prefix = context ? `[${context}]` : '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    console[level](`[${entry.timestamp.toISOString()}] ${prefix} ${message}`);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clear() {
    this.logs = [];
  }
}
