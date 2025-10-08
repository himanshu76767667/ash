import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import { UserEvent } from './types';

const EVENTS_COLLECTION = 'events';

// Create a new event with server timestamp
export const createEvent = async (event: Omit<UserEvent, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
      ...event,
      createdAt: serverTimestamp(), // Server timestamp for accurate sync
      lastModified: serverTimestamp(),
    });
    console.log('✅ Event created:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating event:', error);
    throw error;
  }
};

// Update an event with server timestamp
export const updateEvent = async (id: string, updates: Partial<UserEvent>) => {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, id);
    await updateDoc(eventRef, {
      ...updates,
      lastModified: serverTimestamp(), // Track last modification
    });
    console.log('✅ Event updated:', id);
  } catch (error) {
    console.error('❌ Error updating event:', error);
    throw error;
  }
};

// Delete an event
export const deleteEvent = async (id: string) => {
  try {
    await deleteDoc(doc(db, EVENTS_COLLECTION, id));
    console.log('✅ Event deleted:', id);
  } catch (error) {
    console.error('❌ Error deleting event:', error);
    throw error;
  }
};

// Subscribe to events (real-time updates with offline support)
export const subscribeToEvents = (callback: (events: UserEvent[]) => void) => {
  const q = query(collection(db, EVENTS_COLLECTION), orderBy('date', 'asc'));
  
  return onSnapshot(q, 
    (snapshot) => {
      const events: UserEvent[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        events.push({ 
          id: doc.id, 
          ...data,
          // Handle server timestamps
          createdAt: data.createdAt?.toMillis?.() || data.createdAt || Date.now(),
        } as UserEvent);
      });
      
      console.log(`📦 Loaded ${events.length} events (${snapshot.metadata.fromCache ? 'from cache' : 'from server'})`);
      callback(events);
    },
    (error) => {
      console.error('❌ Error subscribing to events:', error);
      // Even on error, try to provide cached data
      callback([]);
    }
  );
};

// Batch operations for better performance
export const batchUpdateEvents = async (updates: Array<{ id: string; data: Partial<UserEvent> }>) => {
  try {
    const batch = writeBatch(db);
    
    updates.forEach(({ id, data }) => {
      const eventRef = doc(db, EVENTS_COLLECTION, id);
      batch.update(eventRef, {
        ...data,
        lastModified: serverTimestamp(),
      });
    });
    
    await batch.commit();
    console.log(`✅ Batch updated ${updates.length} events`);
  } catch (error) {
    console.error('❌ Error batch updating events:', error);
    throw error;
  }
};
