import axios from 'axios';

// Define the response type for the API
interface DataLeakResult {
  email: string;
  hash_password: boolean;
  password: string;
  sha1: string;
  hash: string;
  sources: string;
}

interface DataLeakResponse {
  success: boolean;
  found: number;
  result: DataLeakResult[];
}

/**
 * Checks for data leaks using the BreachDirectory API.
 * Check if an email, username, password, or phone number was compromised in a data breach.
 * Portions of data displayed are obtained from HaveIBeenPwned, Leakcheck.io, and Vigilante.pw.
 * @param {string} data - The data to check for leaks.
 * @returns {Promise<DataLeakResponse>} - A promise resolving to the API response.
 */
export const checkDataLeak = async (data: string): Promise<DataLeakResponse> => {
  try {
    const response = await axios.get<DataLeakResponse>('https://breachdirectory.p.rapidapi.com/', {
      params: { func: 'auto', term: data },
      headers: {
        'X-Rapidapi-Key': import.meta.env.VITE_RAPIDAPI_KEY || '',
        'X-Rapidapi-Host': import.meta.env.VITE_RAPIDAPI_HOST || '',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error checking data leak:', error);
    throw error;
  }
};