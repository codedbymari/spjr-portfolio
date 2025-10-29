// src/services/googleSheetsService.js
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbytBGpZ4Uo_SMvpLag_U7WRHvmvnVUMfjVcBJt4M313FxcVU0-ZBTqshZ8w2S0Ndgxo/exec';

/**
 * Save email and form data to Google Sheets
 * @param {string} email - User's email address
 * @param {string} howFound - How user found the site
 * @param {boolean} consentUpdates - Whether user wants updates
 * @returns {Promise<boolean>} - Success status
 */
export const saveEmailToGoogleSheets = async (email, howFound, consentUpdates) => {
  try {
    const payload = {
      email: email.toLowerCase().trim(),
      howFound: howFound,
      consentUpdates: consentUpdates, // Send as boolean, Apps Script will convert to Y/N
      metadata: {
        timestamp: new Date().toISOString()
      }
    };

    console.log('📤 Sending to Google Sheets:', payload);
    console.log('📋 Consent value:', consentUpdates);

    // Use no-cors mode for Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    // With no-cors, we can't read the response, but if fetch completes without error,
    // the request was sent successfully
    console.log('✅ Request sent to Google Sheets');
    return true;

  } catch (error) {
    console.error('❌ Error saving to Google Sheets:', error);
    throw new Error('Failed to save email. Please try again.');
  }
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Debug helper - can be called from browser console
if (typeof window !== 'undefined') {
  window.sheetsDebug = {
    testSubmit: async (email = 'test@example.com') => {
      try {
        await saveEmailToGoogleSheets(email, 'Test', false);
        console.log('✅ Test submission successful');
      } catch (error) {
        console.error('❌ Test submission failed:', error);
      }
    }
  };
}