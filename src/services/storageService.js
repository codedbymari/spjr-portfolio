// src/services/storageService.js
const MUSIC_ACCESS_KEY = 'musicAccessVerified';

/**
 * Check if user has music access
 * @returns {boolean}
 */
export const hasMusicAccess = () => {
  try {
    const access = localStorage.getItem(MUSIC_ACCESS_KEY);
    console.log('🔍 Checking music access:', access === 'true' ? 'GRANTED' : 'DENIED');
    return access === 'true';
  } catch (error) {
    console.error('❌ localStorage access error:', error);
    return false;
  }
};

/**
 * Set music access for user
 * @param {string} email - User's email (optional)
 * @returns {boolean} - Success status
 */
export const setMusicAccess = (email = null) => {
  try {
    localStorage.setItem(MUSIC_ACCESS_KEY, 'true');
    localStorage.setItem(`${MUSIC_ACCESS_KEY}_timestamp`, Date.now().toString());
    
    if (email) {
      localStorage.setItem(`${MUSIC_ACCESS_KEY}_email`, email);
    }
    
    console.log('✅ Music access granted and saved to localStorage');
    console.log('📧 Email saved:', email);
    
    // Verify it was saved
    const verified = localStorage.getItem(MUSIC_ACCESS_KEY) === 'true';
    console.log('✓ Verification:', verified ? 'SUCCESS' : 'FAILED');
    
    return verified;
  } catch (error) {
    console.error('❌ localStorage write error:', error);
    return false;
  }
};

/**
 * Clear music access
 * @returns {boolean} - Success status
 */
export const clearMusicAccess = () => {
  try {
    localStorage.removeItem(MUSIC_ACCESS_KEY);
    localStorage.removeItem(`${MUSIC_ACCESS_KEY}_timestamp`);
    localStorage.removeItem(`${MUSIC_ACCESS_KEY}_email`);
    console.log('🗑️ Music access cleared');
    return true;
  } catch (error) {
    console.error('❌ localStorage clear error:', error);
    return false;
  }
};

/**
 * Get the timestamp of when access was granted
 * @returns {number|null}
 */
export const getAccessTimestamp = () => {
  try {
    const timestamp = localStorage.getItem(`${MUSIC_ACCESS_KEY}_timestamp`);
    return timestamp ? parseInt(timestamp, 10) : null;
  } catch (error) {
    console.error('❌ localStorage read error:', error);
    return null;
  }
};

/**
 * Get the email associated with access
 * @returns {string|null}
 */
export const getAccessEmail = () => {
  try {
    return localStorage.getItem(`${MUSIC_ACCESS_KEY}_email`);
  } catch (error) {
    console.error('❌ localStorage read error:', error);
    return null;
  }
};

/**
 * Clear all storage
 * @returns {boolean}
 */
export const clearAllStorage = () => {
  return clearMusicAccess();
};

// Debug helper - can be called from browser console
if (typeof window !== 'undefined') {
  window.storageDebug = {
    check: hasMusicAccess,
    grant: (email = 'test@example.com') => setMusicAccess(email),
    clear: clearMusicAccess,
    getEmail: getAccessEmail,
    getTimestamp: getAccessTimestamp,
    viewAll: () => {
      console.log(' Music Access Status:');
      console.log('  - Has Access:', hasMusicAccess());
      console.log('  - Email:', getAccessEmail());
      console.log('  - Timestamp:', getAccessTimestamp());
    }
  };
  
  console.log('💡 Storage debug available: window.storageDebug.viewAll()');
}