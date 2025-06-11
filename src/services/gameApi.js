const API_BASE_URL = 'http://localhost:3001/api';

/**
 * @param {Array} words - Array of 16 words from the current game
 * @returns {Promise} - Returns the backend's analysis of word groups
 */
export async function analyzeWordGroups(words) {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ words }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing word groups:', error);
    throw error;
  }
}

/**
 * Sends a specific group of words to the backend for validation
 * @param {Array} words - Array of 4 words to validate
 * @returns {Promise} - Returns whether the group is valid and its category if valid
 */
export async function validateWordGroup(words) {
  try {
    const response = await fetch(`${API_BASE_URL}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ words }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error validating word group:', error);
    throw error;
  }
}

/**
 * @param {Array} words - Array of 16 words from the current game
 * @param {Array} solvedGroups - Array of already solved groups
 * @returns {Promise} - Returns hints for the remaining words
 */
export async function getHints(words, solvedGroups) {
  try {
    const response = await fetch(`${API_BASE_URL}/hints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ words, solvedGroups }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting hints:', error);
    throw error;
  }
}

/**
 * Sends the game data to the backend for processing and training
 * @param {Array} gameData - The CONNECTION_GAMES data
 * @returns {Promise} - Returns the backend's confirmation
 */
export async function sendGameData(gameData) {
  try {
    const response = await fetch(`${API_BASE_URL}/train`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending game data:', error);
    throw error;
  }
}

/**
 * Gets the correct answers for the current game
 * @param {Array} gameData - The current game's words
 * @returns {Promise} - Returns the correct groupings
 */
export async function getAnswers(gameData) {
  try {
    const response = await fetch(`${API_BASE_URL}/get-answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting answers:', error);
    throw error;
  }
}

/**
 * Sends the current game words to the backend to get the correct groupings
 * @param {Array} gameData - Array of word objects from the current game
 * @returns {Promise} - Returns the correct groupings from the backend
 */
export async function getCurrentGameAnswers(gameData) {
  try {
    // Extract just the words from the game data
    const words = gameData.flatMap(category => category.words);
    
    const response = await fetch(`${API_BASE_URL}/get-answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameData: words.map(word => ({ word })) }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting current game answers:', error);
    throw error;
  }
}

/**
 * Sends the current game words to the backend for prediction
 * @param {Array} words - Array of 16 words from the current game
 * @returns {Promise} - Returns the backend's predicted groupings
 */
export async function getPredictedGroups(words) {
  try {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ words }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting predicted groups:', error);
    throw error;
  }
} 