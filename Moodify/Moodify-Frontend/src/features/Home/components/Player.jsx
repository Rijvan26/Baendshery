import React, { useState, useRef, useEffect, useContext } from 'react'
import { SongContext } from '../song.context'
import './Player.css'

const Player = () => {
  const { song } = useContext(SongContext)
  const audioRef = useRef(null)
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(100)
  const [speed, setSpeed] = useState(1)

  // Handle play/pause
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle next song (placeholder - adjust based on your needs)
  const handleNext = () => {
    // You can emit an event or call a function from context to get next song
    setCurrentTime(0)
    setIsPlaying(false)
  }

  // Handle previous song
  const handlePrevious = () => {
    if (currentTime > 3) {
      audioRef.current.currentTime = 0
    } else {
      // Call your API to get previous song
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }

  // Skip backward 5 seconds
  const handleSkipBackward = () => {
    const newTime = Math.max(0, currentTime - 5)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Skip forward 5 seconds
  const handleSkipForward = () => {
    const newTime = Math.min(duration, currentTime + 5)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Update current time as song plays
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0)
  }

  // When metadata loads (get duration)
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0)
  }

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    audioRef.current.volume = newVolume / 100
  }

  // Handle speed change
  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value)
    setSpeed(newSpeed)
    audioRef.current.playbackRate = newSpeed
  }

  // When song changes, reset player and load new song
  useEffect(() => {
    if (song?.url) {
      setCurrentTime(0)
      if (audioRef.current) {
        audioRef.current.src = song.url
        audioRef.current.load()
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(err => {
          console.error("Auto-play failed:", err)
          setIsPlaying(false)
        })
      }
    }
  }, [song?.url])

  // Handle audio errors
  const handleAudioError = () => {
    console.error('Failed to load audio:', song?.url)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  // Format time to MM:SS
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="player-container">
      <audio
      autoPlay={false}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onError={handleAudioError}
      />

      {/* Song Info */}
      <div className="song-info">
        {song?.posterUrl && (
          <img src={song.posterUrl} alt="song poster" className="song-poster" />
        )}
        <div className="song-details">
          <h3 className="song-title">{song?.title || 'No Song Selected'}</h3>
          <p className="song-artist">{song?.artist || 'Unknown Artist'}</p>
          <p className="song-mood">{song?.mood || ''}</p>
        </div>
      </div>

      {/* Main Controls Hub */}
      <div className="main-controls">
        <div className="controls-section">
          <button className="control-btn previous" onClick={handlePrevious} title="Previous">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" /></svg>
          </button>

          <button className="control-btn skip-backward" onClick={handleSkipBackward} title="Skip Backward 5s">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm0-15c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7zm1.5 5h-1V6h-1v8.5h1V8h1V5zm-1 3h-1v5h1v-5z" /></svg>
          </button>

          <button className="control-btn play-pause" onClick={handlePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>

          <button className="control-btn skip-forward" onClick={handleSkipForward} title="Skip Forward 5s">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm0-15c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7zm1.5 5h-1V6h-1v8.5h1V8h1V5zm-1 3h-1v5h1v-5z" transform="scale(-1, 1) translate(-24, 0)" /></svg>
          </button>

          <button className="control-btn next" onClick={handleNext} title="Next">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 18h2V6h-2v12zM2 18l8.5-6L2 6v12z" /></svg>
          </button>
        </div>

        <div className="progress-section">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="progress-bar"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Secondary Controls (Volume/Speed) */}
      <div className="secondary-controls">
        <select className="speed-control" value={speed} onChange={handleSpeedChange}>
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>

        <div className="control-group volume-control-group">
          <svg className="volume-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Player