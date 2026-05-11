import React, {
  useRef,
  useState,
  useCallback,
  useEffect
} from "react"

import {
  initializeFaceMesh,
  detectExpression,
  classifyExpression
} from "./utils/utils"
import useSong from "../Home/hook/useSong"
import "./Faceexpression.css"

const ExpressionTracker = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const cameraRef = useRef(null)
  const landmarksRef = useRef(null)

  const { 
    song: currentPlayingSong, 
    suggestedSong, 
    allSongs, 
    loading: songLoading, 
    handleGetSongsByMood, 
    shuffleSuggestion, 
    playSuggestedSong 
  } = useSong()

  const [expression, setExpression] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [moodDetected, setMoodDetected] = useState(null)

  const startCamera = useCallback(async () => {
    setIsLoading(true)
    try {
      const camera = await initializeFaceMesh({
        videoRef,
        canvasRef,
        landmarksRef,
        setStats: () => {},
        setIsRunning,
        setIsLoading
      })
      cameraRef.current = camera
    } catch (error) {
      console.error("Camera failed:", error)
      setIsLoading(false)
    }
  }, [])

  const mapExpressionToMood = useCallback(async (label) => {
    const moodMap = {
      "Happy": "happy",
      "Surprised": "surprised",
      "Sad": "sad",
      "Neutral": "happy"
    }

    const mood = moodMap[label] || "happy"
    setMoodDetected(mood)
    await handleGetSongsByMood({ mood })
    setIsScanning(false)
  }, [handleGetSongsByMood])

  const handleStartAnalysis = useCallback(async () => {
    if (!isRunning) {
      await startCamera()
      return
    }

    if (!landmarksRef.current) {
      setExpression({ emoji: "🙈", label: "No face detected" })
      return
    }

    setIsScanning(true)
    setTimeout(async () => {
      const metrics = detectExpression(landmarksRef.current)
      const result = classifyExpression(metrics)
      setExpression(result)
      await mapExpressionToMood(result.label)
    }, 2000)
  }, [isRunning, startCamera, mapExpressionToMood])

  const isSongPlaying = currentPlayingSong?.url === suggestedSong?.url

  return (
    <div className="moodify-page">
      <div className="dashboard-container">
        
        <div className="video-section">
          <div className="glass-card">
            <div className="video-wrapper">
              <video ref={videoRef} autoPlay playsInline className="video-element" />
              <canvas ref={canvasRef} className="canvas-element" />
              <div className={`scanning-overlay ${isScanning ? 'active' : ''}`} />
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="expression-status">
                <span className="status-label">
                  {isRunning ? <><span className="live-indicator" />Live Feed</> : "Camera Offline"}
                </span>
                <span className="status-value">
                  {expression?.emoji || "🤖"} {expression?.label || "Ready"}
                </span>
              </div>

              <button
                className="action-btn"
                onClick={handleStartAnalysis}
                disabled={isLoading || songLoading || isScanning}
              >
                {isLoading ? "Initializing..." : 
                 songLoading ? "Finding Songs..." : 
                 isScanning ? "Analyzing Mood..." : 
                 !isRunning ? "Enable Camera" : "Re-Analyze Mood"}
              </button>
            </div>
          </div>
        </div>

        <div className="suggestion-section">
          <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>
                {moodDetected === 'neutral' ? 'Global Playlist' : `${moodDetected?.toUpperCase()} Vibes`}
              </h2>
              {allSongs.length > 0 && (
                <span className="song-mood-badge" style={{ fontSize: '0.7rem' }}>
                  {allSongs.length} Tracks
                </span>
              )}
            </div>
            
            {allSongs.length > 0 ? (
              <div className="playlist-container">
                {allSongs.map((s, idx) => (
                  <div 
                    key={idx} 
                    className={`playlist-item ${currentPlayingSong?.url === s.url ? 'active' : ''}`}
                    onClick={() => playSuggestedSong(s)}
                  >
                    <img 
                      src={s.posterUrl || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200"} 
                      alt={s.title} 
                      className="playlist-item-img"
                    />
                    <div className="playlist-item-info">
                      <div className="playlist-item-title">{s.title}</div>
                      <div className="playlist-item-mood">{s.mood}</div>
                    </div>
                    {currentPlayingSong?.url === s.url && <span className="playing-dot">🔊</span>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="placeholder-text">
                {isScanning ? (
                  <p>Our AI is curating the perfect playlist for your current state...</p>
                ) : (
                  <>
                    <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎵</p>
                    <p>Start your camera and click "Analyze My Mood" to discover songs tailored for you.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div style={{ marginTop: '3rem', opacity: 0.5, fontSize: '0.8rem', textAlign: 'center' }}>
        Moodify AI &bull; Premium Experience &bull; &copy; 2026
      </div>
    </div>
  )
}

export default ExpressionTracker
