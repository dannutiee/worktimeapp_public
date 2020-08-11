import React from 'react';

export const convertMS = milliseconds => {
  var day, hour, minute, seconds, hourDecimal;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  hourDecimal = minute / 60;
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;

  // const hasDays = convertedTime.day !== 0;
  // const hasHours = convertedTime.hour !== 0;
  // const hasMinutes = converted.minutes != 0 ;

  return {
    day: day,
    hour: hour,
    minute: minute,
    seconds: seconds,
    hourDecimal: hourDecimal
  };
};

export const returnHTMLTime = (convertedTime, status) => (
  <span>
    {!!convertedTime.day && convertedTime.day + 'd '}
    {!!convertedTime.day && !convertedTime.hour && '0h '}
    {!!convertedTime.hour && convertedTime.hour + 'h '}
    {!!convertedTime.minute && convertedTime.minute + 'm '}
    {!convertedTime.day &&
      !convertedTime.hour &&
      !convertedTime.minute &&
      status !== 'done' &&
      '< 1 min'}
  </span>
);
