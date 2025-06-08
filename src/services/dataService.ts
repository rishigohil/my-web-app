import { UserData } from '../types';
import data from '../data.json';

// Like a bad joke at a party, this function always delivers... even when you don't want it to
export const getAppData = (): UserData => {
  try {
    // If data is emptier than my wallet after shopping, we've got problems
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Data array is emptier than a programmer\'s social calendar');
    }

    const userData = data[0];
    
    // Check if we have the essential stuff - like checking if your coffee has caffeine
    if (!userData || typeof userData !== 'object') {
      throw new Error('User data is more broken than a promise to fix bugs later');
    }

    // Validate required fields faster than a code review on Friday afternoon
    const requiredFields: (keyof UserData)[] = ['name', 'designation', 'bio', 'socialLinks'];
    for (const field of requiredFields) {
      if (!userData[field]) {
        throw new Error(`Missing required field: ${field}. That's like coding without Stack Overflow!`);
      }
    }

    return userData as UserData;
  } catch (error) {
    // When life gives you errors, make error messages
    console.error('getAppData failed harder than my first coding interview:', error);
    
    // Return a fallback that's more reliable than my internet connection
    return {
      name: 'Data Loading Error',
      designation: 'Professional Bug Creator',
      currentDesignation: 'Currently debugging life...',
      bio: 'Something went wrong loading the data. It\'s not you, it\'s me... actually, it might be you.',
      resumeUrl: '#',
      socialLinks: []
    };
  }
};