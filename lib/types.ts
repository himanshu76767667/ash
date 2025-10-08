export interface ClassSession {
  courseCode: string;
  courseName: string;
  classroom: string;
  time: string;
  color: string;
}

export interface DaySchedule {
  [time: string]: ClassSession;
}

export interface WeekSchedule {
  [day: string]: DaySchedule;
}

export interface UserEvent {
  id?: string;
  type: 'deadline' | 'exam';
  courseCode: string;
  title: string;
  date: string; // ISO string
  time: string;
  completed: boolean;
  createdAt: number;
}

export const courseColors: { [key: string]: string } = {
  'CS230': '#84CC16', // lime
  'CS215': '#EC4899', // pink
  'CS228': '#A855F7', // purple
  'EC101': '#FB923C', // orange
  'CS231': '#84CC16', // lime
  'CS405': '#EC4899', // pink
  'CS213': '#FB923C', // orange
  'CS293': '#A855F7', // purple
};

export const courseNames: { [key: string]: string } = {
  'CS230': 'Data Structures and Algorithms',
  'CS215': 'Computer Organization',
  'CS228': 'Data Structures and Algorithms Lab',
  'EC101': 'Economics',
  'CS231': 'Operating Systems Lab',
  'CS405': 'Computer Networks',
  'CS213': 'Database Management Systems',
  'CS293': 'Software Engineering Lab',
};
