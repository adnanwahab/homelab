'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Square, Volume2 } from 'lucide-react';

const VoiceCoach = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  useEffect(() => {
    // Request microphone permission on component mount
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  const analyzeAudio = async (audioBlob) => {
    setIsAnalyzing(true);
    
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Get audio data for analysis
      const channelData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;
      
      // Perform FFT analysis
      const fftSize = 2048;
      const frequencies = new Float32Array(fftSize / 2);
      
      // Calculate spectral centroid and other features
      const spectralCentroid = calculateSpectralCentroid(channelData, sampleRate);
      const spectralFlux = calculateSpectralFlux(channelData);
      const zeroCrossingRate = calculateZeroCrossingRate(channelData);
      const rms = calculateRMS(channelData);
      
      // Analyze nasality (typically indicated by emphasis in 1-3kHz range)
      const nasalityScore = analyzeNasality(channelData, sampleRate);
      
      // Analyze relaxation (smoother spectral distribution, lower tension)
      const relaxationScore = analyzeRelaxation(spectralCentroid, spectralFlux, zeroCrossingRate, rms);
      
      const result = {
        nasality: {
          score: nasalityScore,
          level: nasalityScore > 0.7 ? 'High' : nasalityScore > 0.4 ? 'Moderate' : 'Low',
          feedback: getNasalityFeedback(nasalityScore)
        },
        relaxation: {
          score: relaxationScore,
          level: relaxationScore > 0.7 ? 'Very Relaxed' : relaxationScore > 0.4 ? 'Moderately Relaxed' : 'Tense',
          feedback: getRelaxationFeedback(relaxationScore)
        },
        overall: getOverallFeedback(nasalityScore, relaxationScore)
      };
      
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis({
        error: 'Unable to analyze audio. Please try recording again.'
      });
    }
    
    setIsAnalyzing(false);
  };

  const calculateSpectralCentroid = (data, sampleRate) => {
    const fftSize = 1024;
    let sum = 0;
    let weightedSum = 0;
    
    for (let i = 0; i < Math.min(data.length, fftSize); i++) {
      const magnitude = Math.abs(data[i]);
      const frequency = (i * sampleRate) / (2 * fftSize);
      sum += magnitude;
      weightedSum += magnitude * frequency;
    }
    
    return sum > 0 ? weightedSum / sum : 0;
  };

  const calculateSpectralFlux = (data) => {
    let flux = 0;
    for (let i = 1; i < data.length; i++) {
      const diff = Math.abs(data[i]) - Math.abs(data[i - 1]);
      flux += Math.max(0, diff);
    }
    return flux / data.length;
  };

  const calculateZeroCrossingRate = (data) => {
    let crossings = 0;
    for (let i = 1; i < data.length; i++) {
      if ((data[i] >= 0) !== (data[i - 1] >= 0)) {
        crossings++;
      }
    }
    return crossings / data.length;
  };

  const calculateRMS = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i] * data[i];
    }
    return Math.sqrt(sum / data.length);
  };

  const analyzeNasality = (data, sampleRate) => {
    // Nasal voices typically have more energy in the 1-3kHz range
    // This is a simplified analysis
    const fftSize = 1024;
    let nasalRangeEnergy = 0;
    let totalEnergy = 0;
    
    for (let i = 0; i < Math.min(data.length, fftSize); i++) {
      const frequency = (i * sampleRate) / (2 * fftSize);
      const magnitude = Math.abs(data[i]);
      
      if (frequency >= 1000 && frequency <= 3000) {
        nasalRangeEnergy += magnitude;
      }
      totalEnergy += magnitude;
    }
    
    return totalEnergy > 0 ? Math.min(1, nasalRangeEnergy / totalEnergy * 3) : 0;
  };

  const analyzeRelaxation = (centroid, flux, zcr, rms) => {
    // Relaxed voices typically have:
    // - Lower spectral centroid (warmer tone)
    // - Lower spectral flux (less variation)
    // - Moderate RMS (not too quiet or loud)
    
    const centroidScore = Math.max(0, 1 - (centroid / 2000)); // Normalize around 2kHz
    const fluxScore = Math.max(0, 1 - (flux * 100));
    const rmsScore = rms > 0.01 && rms < 0.3 ? 1 : 0.5; // Good dynamic range
    
    return (centroidScore + fluxScore + rmsScore) / 3;
  };

  const getNasalityFeedback = (score) => {
    if (score > 0.7) {
      return "Your voice sounds quite nasal. Try lowering your soft palate and speaking from your chest rather than your nose.";
    } else if (score > 0.4) {
      return "There's some nasality in your voice. Focus on oral resonance and breath support.";
    } else {
      return "Great! Your voice has good oral resonance with minimal nasality.";
    }
  };

  const getRelaxationFeedback = (score) => {
    if (score > 0.7) {
      return "Your voice sounds very relaxed and natural. Excellent breath support and tension control!";
    } else if (score > 0.4) {
      return "Your voice is moderately relaxed. Try some breathing exercises to release more tension.";
    } else {
      return "Your voice sounds tense. Focus on relaxing your throat, jaw, and shoulders before speaking.";
    }
  };

  const getOverallFeedback = (nasality, relaxation) => {
    if (relaxation > 0.6 && nasality < 0.4) {
      return "Excellent vocal quality! Your voice is relaxed and has good resonance.";
    } else if (nasality > 0.6) {
      return "Work on reducing nasality by focusing on oral resonance and proper breath placement.";
    } else if (relaxation < 0.4) {
      return "Focus on relaxation techniques and breath support to reduce vocal tension.";
    } else {
      return "Good progress! Continue practicing breath support and resonance exercises.";
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      
      streamRef.current = stream;
      audioChunksRef.current = [];
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        analyzeAudio(audioBlob);
        
        // Clean up stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAnalysis(null);
      setAudioURL(null);
    } catch (error) {
      console.error('Recording error:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
    }
  };

  if (!hasPermission) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Mic className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Microphone Access Needed</h2>
          <p className="text-gray-600">Please allow microphone access to use the voice coach.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Voice Coach</h1>
          <p className="text-gray-600">Record your voice to analyze nasality and relaxation</p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {/* Recording Controls */}
          <div className="flex items-center space-x-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-colors duration-200 shadow-lg"
              >
                <Mic className="h-5 w-5" />
                <span>Start Recording</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full transition-colors duration-200 shadow-lg animate-pulse"
              >
                <Square className="h-5 w-5" />
                <span>Stop Recording</span>
              </button>
            )}

            {audioURL && (
              <button
                onClick={playAudio}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full transition-colors duration-200 shadow-lg"
              >
                <Play className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div className="flex items-center space-x-2 text-red-600">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="font-medium">Recording...</span>
            </div>
          )}

          {/* Analysis Loading */}
          {isAnalyzing && (
            <div className="flex items-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Analyzing your voice...</span>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && !analysis.error && (
            <div className="w-full max-w-2xl space-y-6">
              <h3 className="text-xl font-semibold text-center text-gray-800">Voice Analysis Results</h3>
              
              {/* Nasality Analysis */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-gray-800">Nasality</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    analysis.nasality.level === 'High' ? 'bg-red-100 text-red-800' :
                    analysis.nasality.level === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {analysis.nasality.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${analysis.nasality.score * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-700">{analysis.nasality.feedback}</p>
              </div>

              {/* Relaxation Analysis */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-gray-800">Relaxation</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    analysis.relaxation.level === 'Very Relaxed' ? 'bg-green-100 text-green-800' :
                    analysis.relaxation.level === 'Moderately Relaxed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {analysis.relaxation.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${analysis.relaxation.score * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-700">{analysis.relaxation.feedback}</p>
              </div>

              {/* Overall Feedback */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <Volume2 className="h-5 w-5 mr-2" />
                  Overall Assessment
                </h4>
                <p className="text-gray-700 font-medium">{analysis.overall}</p>
              </div>
            </div>
          )}

          {/* Error Display */}
          {analysis && analysis.error && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-800">{analysis.error}</p>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Voice Training Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Reducing Nasality:</h4>
              <ul className="space-y-1">
                <li>• Practice speaking with your mouth more open</li>
                <li>• Focus on chest resonance rather than head resonance</li>
                <li>• Do "ng" to "ah" exercises</li>
                <li>• Keep your soft palate raised</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Improving Relaxation:</h4>
              <ul className="space-y-1">
                <li>• Practice diaphragmatic breathing</li>
                <li>• Relax your jaw, neck, and shoulders</li>
                <li>• Warm up with humming exercises</li>
                <li>• Speak at a comfortable pace</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCoach;