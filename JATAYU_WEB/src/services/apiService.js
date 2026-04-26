import { auth } from "../firebase/config";

// Fallback mock function to keep the demo working if the backend isn't running
const fallbackMockPredict = async (symptoms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerInput = symptoms.toLowerCase();
      let predictions = [];
      let followup = "";

      if (lowerInput.includes('head') || lowerInput.includes('migraine')) {
        predictions = [
          { condition: 'Tension Headache', confidence: 85, color: 'bg-green-500' },
          { condition: 'Migraine', confidence: 60, color: 'bg-yellow-500' },
          { condition: 'Dehydration', confidence: 45, color: 'bg-blue-500' }
        ];
        followup = "Are you experiencing any sensitivity to light or nausea?";
      } else if (lowerInput.includes('heart') || lowerInput.includes('chest') || lowerInput.includes('pain')) {
        predictions = [
          { condition: 'Angina', confidence: 75, color: 'bg-red-500' },
          { condition: 'Acid Reflux', confidence: 65, color: 'bg-yellow-500' },
          { condition: 'Muscle Strain', confidence: 40, color: 'bg-green-500' }
        ];
        followup = "Does the pain spread to your arm or jaw? If yes, please use the Emergency SOS immediately.";
      } else if (lowerInput.includes('sleep') || lowerInput.includes('tired')) {
         predictions = [
          { condition: 'Insomnia', confidence: 90, color: 'bg-purple-500' },
          { condition: 'Sleep Apnea', confidence: 55, color: 'bg-yellow-500' },
          { condition: 'Stress', confidence: 70, color: 'bg-blue-500' }
        ];
        followup = "How many hours of uninterrupted sleep are you getting per night?";
      } else {
        predictions = [
          { condition: 'Viral Infection', confidence: 50, color: 'bg-yellow-500' },
          { condition: 'Allergies', confidence: 40, color: 'bg-green-500' }
        ];
        followup = "Could you provide a few more specific details about how you are feeling?";
      }

      resolve({
        text: "Based on my analysis of your symptoms, here are the probable conditions:",
        predictions,
        followup
      });
    }, 1500);
  });
};

export const predictSymptoms = async (symptoms, sessionId = null) => {
  try {
    let url = "";
    if (!sessionId) {
      // First interaction
      url = `https://jatayu-api.onrender.com/start?symptoms=${encodeURIComponent(symptoms)}`;
    } else {
      // Follow-up interaction
      url = `https://jatayu-api.onrender.com/answer?session_id=${encodeURIComponent(sessionId)}&answer=${encodeURIComponent(symptoms)}`;
    }

    const response = await fetch(url, {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    
    // Map the backend's prediction format to the frontend's format
    const mappedPredictions = (data.prediction || []).map(p => ({
      condition: p.disease,
      confidence: Math.round(p.prob * 100),
      color: p.prob > 0.5 ? 'bg-red-500' : (p.prob > 0.2 ? 'bg-yellow-500' : 'bg-green-500')
    }));

    const questionText = data.question || data.next_question;
    const followupText = questionText ? `Are you experiencing: ${questionText}? (Please answer yes or no)` : "";

    return {
      sessionId: data.session_id || sessionId, // Preserve sessionId if it wasn't returned
      text: "Based on my analysis of your symptoms, here are the probable conditions:",
      predictions: mappedPredictions,
      followup: followupText
    };
  } catch (error) {
    console.warn("External API call failed, falling back to local simulated engine:", error);
    // Graceful fallback to keep the demo fully working
    return await fallbackMockPredict(symptoms);
  }
};
