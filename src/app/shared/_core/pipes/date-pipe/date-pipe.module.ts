// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { TimezoneDate } from './date/timezone-date.pipe';
import { TimezoneDateTime } from './date-time/timezone-datetime.pipe';
import { TimezoneTime } from './time/timezone-time.pipe';
@NgModule({
  declarations: [TimezoneDate, TimezoneDateTime, TimezoneTime],
  imports: [
    CommonModule
  ],
  exports: [TimezoneDate, TimezoneDateTime, TimezoneTime],
})
export class DatePipeModule { }
