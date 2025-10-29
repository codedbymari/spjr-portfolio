// src/components/EmailGate.js
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { saveEmailToGoogleSheets } from '../services/googleSheetsService';
import { setMusicAccess } from '../services/storageService';

const EmailGate = ({ onVerified = () => {} }) => {
  const [formData, setFormData] = useState({
    email: '',
    howFound: '',
    consentUpdates: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isDark, colors } = useTheme();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Valid email required');
      return;
    }

    if (!formData.howFound) {
      setError('Please select how you found this');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Save to Google Sheets
      console.log('📤 Submitting to Google Sheets...', formData.email);
      await saveEmailToGoogleSheets(
        formData.email,
        formData.howFound,
        formData.consentUpdates
      );
      console.log('✅ Google Sheets submission successful');

      // Step 2: Save access to localStorage
      console.log('💾 Saving access to localStorage...');
      const saved = setMusicAccess(formData.email);
      if (!saved) {
        console.warn('⚠️ localStorage save failed, but continuing...');
      }
      console.log('✅ Access saved to localStorage');

      // Step 3: Notify parent component
      onVerified();
      
    } catch (err) {
      console.error('❌ Submission error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 px-6 overflow-y-auto py-16 md:py-12 transition-colors duration-500 md:flex md:items-center md:justify-center"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="w-full max-w-xl mx-auto">
        <div className="space-y-10 w-full">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1
              className="transition-colors duration-500"
              style={{
                color: colors.text.primary,
                fontSize: 'clamp(28px, 4.5vw, 38px)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.15
              }}
            >
              The Music Room
            </h1>
            <p
              className="transition-colors duration-500"
              style={{
                color: colors.text.primary,
                opacity: 0.5,
                fontSize: '13px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.01em'
              }}
            >
              Unreleased Works by Sir Practice
            </p>
          </div>

          {/* Intro Copy */}
          <div className="space-y-5 max-w-lg mx-auto pb-8 md:pb-0">
            <p
              className="text-center transition-colors duration-500"
              style={{
                color: colors.text.primary,
                opacity: 0.8,
                fontSize: '15px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 300,
                lineHeight: 1.7,
                letterSpacing: '-0.01em'
              }}
            >
              This page isn't public. It's not polished. It's practice — in its purest form.
            </p>

            <p
              className="text-center transition-colors duration-500"
              style={{
                color: colors.text.primary,
                opacity: 0.8,
                fontSize: '15px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 300,
                lineHeight: 1.7,
                letterSpacing: '-0.01em'
              }}
            >
              Inside, you'll find fragments of songs, voice notes, live demos, and sonic experiments — pieces that may never be released, but deserve to be heard by those who get it.
            </p>

            <p
              className="text-center transition-colors duration-500"
              style={{
                color: colors.text.primary,
                opacity: 0.8,
                fontSize: '15px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 300,
                lineHeight: 1.7,
                letterSpacing: '-0.01em'
              }}
            >
              To enter, you'll need to request access below. Think of it as a key - not a gate.
            </p>

            <p
              className="text-center transition-colors duration-500"
              style={{
                color: colors.text.primary,
                opacity: 0.85,
                fontSize: '15px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 400,
                lineHeight: 1.7,
                letterSpacing: '-0.01em'
              }}
            >
              I value every listener who joins this circle. You're not an audience. You're part of the evolution.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6 max-w-md mx-auto pt-4">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              disabled={loading}
              className="w-full px-0 py-3 transition-all duration-200 focus:outline-none border-b"
              style={{
                backgroundColor: 'transparent',
                color: colors.text.primary,
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                fontSize: '15px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 300
              }}
              onFocus={(e) => e.target.style.borderColor = colors.text.primary}
              onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
            />

            <select
              value={formData.howFound}
              onChange={(e) => setFormData({ ...formData, howFound: e.target.value })}
              disabled={loading}
              className="w-full px-0 py-3 transition-all duration-200 focus:outline-none border-b cursor-pointer appearance-none"
              style={{
                backgroundColor: 'transparent',
                color: formData.howFound ? colors.text.primary : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'),
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                fontSize: '15px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 300,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='${isDark ? '%23fafafa' : '%230a0a0a'}' stroke-opacity='0.4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0 center',
                paddingRight: '20px'
              }}
              onFocus={(e) => e.target.style.borderColor = colors.text.primary}
              onBlur={(e) => e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
            >
              <option value="">How Did You Find My Work?</option>
              <option value="Social Media">Social Media</option>
              <option value="Friend/Word of Mouth">Friend / Word of Mouth</option>
              <option value="Search Engine">Search Engine</option>
              <option value="Live Performance">Live Performance</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Other">Other</option>
            </select>

            <div className="space-y-4 pt-2">
              <label
                className="flex items-start gap-3 cursor-pointer group"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div 
                  className="relative flex-shrink-0"
                  style={{ 
                    width: '18px', 
                    height: '18px',
                    marginTop: '2px'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.consentUpdates}
                    onChange={(e) => setFormData({ ...formData, consentUpdates: e.target.checked })}
                    disabled={loading}
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <div
                    className="w-full h-full border transition-all duration-200"
                    style={{
                      borderColor: formData.consentUpdates ? colors.text.primary : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'),
                      backgroundColor: formData.consentUpdates ? colors.text.primary : 'transparent',
                      borderWidth: '1px'
                    }}
                  >
                    {formData.consentUpdates && (
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 18 18" 
                        fill="none"
                        style={{ display: 'block' }}
                      >
                        <path 
                          d="M4 9L7.5 12.5L14 6" 
                          stroke={colors.primary}
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className="transition-colors duration-500"
                  style={{
                    color: colors.text.primary,
                    opacity: 0.4,
                    fontSize: '12px',
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: 300,
                    lineHeight: 1.4
                  }}
                >
                  Send me updates about new releases
                </span>
              </label>
            </div>

            <p
              className="text-center pt-2 transition-colors duration-500"
              style={{
                color: colors.text.primary,
                opacity: 0.35,
                fontSize: '11px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 300,
                lineHeight: 1.4
              }}
            >
              By requesting access, you agree to data storage
            </p>

            {error && (
              <p
                className="text-center"
                style={{
                  color: '#ef4444',
                  fontSize: '13px',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 400,
                  marginTop: '12px'
                }}
              >
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 transition-all duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed mt-6"
              style={{
                backgroundColor: colors.text.primary,
                color: colors.primary,
                fontSize: '14px',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.01em',
                border: 'none'
              }}
            >
              {loading ? 'Requesting Access...' : 'Request Access to the Private Listening Room'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGate;