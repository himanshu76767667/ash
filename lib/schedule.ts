import { WeekSchedule, courseColors, courseNames } from './types';

// Hardcoded class schedule (valid until November 22, 2025)
export const SCHEDULE_END_DATE = new Date('2025-11-22');

export const weekSchedule: WeekSchedule = {
  Monday: {
    '09:30': {
      courseCode: 'CS230',
      courseName: courseNames['CS230'],
      classroom: 'LH102',
      time: '09:30',
      color: courseColors['CS230'],
    },
    '10:30': {
      courseCode: 'CS215',
      courseName: courseNames['CS215'],
      classroom: 'LA002',
      time: '10:30',
      color: courseColors['CS215'],
    },
    '11:30': {
      courseCode: 'CS228',
      courseName: courseNames['CS228'],
      classroom: 'LA001',
      time: '11:30',
      color: courseColors['CS228'],
    },
    '15:30': {
      courseCode: 'EC101',
      courseName: courseNames['EC101'],
      classroom: 'LA001',
      time: '15:30',
      color: courseColors['EC101'],
    },
  },
  Tuesday: {
    '08:30': {
      courseCode: 'CS228',
      courseName: courseNames['CS228'],
      classroom: 'LA001',
      time: '08:30',
      color: courseColors['CS228'],
    },
    '10:30': {
      courseCode: 'CS230',
      courseName: courseNames['CS230'],
      classroom: 'LH102',
      time: '10:30',
      color: courseColors['CS230'],
    },
    '11:30': {
      courseCode: 'CS215',
      courseName: courseNames['CS215'],
      classroom: 'LA002',
      time: '11:30',
      color: courseColors['CS215'],
    },
    '14:00': {
      courseCode: 'CS231',
      courseName: courseNames['CS231'],
      classroom: 'SL2',
      time: '14:00',
      color: courseColors['CS231'],
    },
  },
  Wednesday: {
    '09:30': {
      courseCode: 'CS405',
      courseName: courseNames['CS405'],
      classroom: 'LA002',
      time: '09:30',
      color: courseColors['CS405'],
    },
    '11:00': {
      courseCode: 'CS213',
      courseName: courseNames['CS213'],
      classroom: 'LA002',
      time: '11:00',
      color: courseColors['CS213'],
    },
  },
  Thursday: {
    '08:30': {
      courseCode: 'CS215',
      courseName: courseNames['CS215'],
      classroom: 'LA002',
      time: '08:30',
      color: courseColors['CS215'],
    },
    '09:30': {
      courseCode: 'CS228',
      courseName: courseNames['CS228'],
      classroom: 'LA001',
      time: '09:30',
      color: courseColors['CS228'],
    },
    '11:30': {
      courseCode: 'CS230',
      courseName: courseNames['CS230'],
      classroom: 'LH102',
      time: '11:30',
      color: courseColors['CS230'],
    },
    '15:30': {
      courseCode: 'EC101',
      courseName: courseNames['EC101'],
      classroom: 'LA001',
      time: '15:30',
      color: courseColors['EC101'],
    },
  },
  Friday: {
    '09:30': {
      courseCode: 'CS405',
      courseName: courseNames['CS405'],
      classroom: 'LA002',
      time: '09:30',
      color: courseColors['CS405'],
    },
    '11:00': {
      courseCode: 'CS213',
      courseName: courseNames['CS213'],
      classroom: 'LA002',
      time: '11:00',
      color: courseColors['CS213'],
    },
    '14:00': {
      courseCode: 'CS293',
      courseName: courseNames['CS293'],
      classroom: 'SL2',
      time: '14:00',
      color: courseColors['CS293'],
    },
  },
  Saturday: {},
  Sunday: {},
};

export const getDaySchedule = (date: Date) => {
  // Check if the date is after the schedule end date
  if (date >= SCHEDULE_END_DATE) {
    return {};
  }

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  return weekSchedule[dayName] || {};
};
