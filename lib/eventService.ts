import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import { UserEvent } from './types';

const EVENTS_COLLECTION = 'events';

// Create a new event
export const createEvent = async (event: Omit<UserEvent, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
      ...event,
      createdAt: Date.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Update an event
export const updateEvent = async (id: string, updates: Partial<UserEvent>) => {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, id);
    await updateDoc(eventRef, updates);
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Delete an event
export const deleteEvent = async (id: string) => {
  try {
    await deleteDoc(doc(db, EVENTS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Subscribe to events (real-time updates)
export const subscribeToEvents = (callback: (events: UserEvent[]) => void) => {
  const q = query(collection(db, EVENTS_COLLECTION), orderBy('date', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const events: UserEvent[] = [];
    snapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() } as UserEvent);
    });
    callback(events);
  });
};
