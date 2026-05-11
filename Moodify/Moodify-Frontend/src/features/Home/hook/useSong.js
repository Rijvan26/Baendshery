import { getSongsByMood } from "../services/song.api";
import { SongContext } from "../song.context";
import { useContext, useState } from "react";

const useSong = () => {
    const {song, setsong, loading, setloading} = useContext(SongContext)
    const [allSongs, setAllSongs] = useState([])
    const [suggestedSong, setSuggestedSong] = useState(null)

    const handleGetSongsByMood = async ({mood}) => {
        setloading(true)
        try {
            // For neutral mood, we fetch all songs (passing empty string or null depends on API)
            const apiMood = mood === 'neutral' ? '' : mood
            const data = await getSongsByMood({mood: apiMood})
            
            if(data?.songs?.length > 0){
                setAllSongs(data.songs)
                if (mood === 'neutral') {
                    // In neutral mode, we don't pick just one suggestion for display,
                    // we show the whole list in the UI (Faceexpression will handle this)
                    setSuggestedSong(null) 
                } else {
                    const randomIndex = Math.floor(Math.random() * data.songs.length)
                    setSuggestedSong(data.songs[randomIndex])
                }
            } else {
                throw new Error("No songs found")
            }
        } catch (error) {
            console.log("Using mock data due to error:", error.message)
            const mocks = {
                happy: [
                    { title: "Walking On Sunshine", artist: "Katrina & The Waves", mood: "happy", posterUrl: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?w=800", url: "#" },
                    { title: "Good as Hell", artist: "Lizzo", mood: "happy", posterUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800", url: "#" },
                    { title: "Don't Stop Me Now", artist: "Queen", mood: "happy", posterUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800", url: "#" }
                ],
                sad: [
                    { title: "Someone Like You", artist: "Adele", mood: "sad", posterUrl: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800", url: "#" },
                    { title: "Mad World", artist: "Gary Jules", mood: "sad", posterUrl: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800", url: "#" },
                    { title: "Hurt", artist: "Johnny Cash", mood: "sad", posterUrl: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800", url: "#" }
                ],
                surprised: [
                    { title: "Bohemian Rhapsody", artist: "Queen", mood: "surprised", posterUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800", url: "#" },
                    { title: "Mr. Blue Sky", artist: "Electric Light Orchestra", mood: "surprised", posterUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800", url: "#" }
                ],
                neutral: [
                    { title: "Neutral Flow 1", artist: "Various", mood: "happy", url: "#" },
                    { title: "Neutral Flow 2", artist: "Various", mood: "sad", url: "#" }
                ]
            }
            const moodMocks = mocks[mood] || mocks.happy
            setAllSongs(moodMocks)
            if (mood !== 'neutral') {
                setSuggestedSong(moodMocks[0])
            } else {
                setSuggestedSong(null)
            }
        }
        setloading(false)
    }

    const shuffleSuggestion = () => {
        if (allSongs.length > 1) {
            let nextSong = suggestedSong
            while (nextSong === suggestedSong) {
                const randomIndex = Math.floor(Math.random() * allSongs.length)
                nextSong = allSongs[randomIndex]
            }
            setSuggestedSong(nextSong)
        }
    }

    const playSuggestedSong = (s) => {
        const songToPlay = s || suggestedSong
        if (songToPlay) {
            setsong(songToPlay)
        }
    }

    return { song, suggestedSong, allSongs, loading, handleGetSongsByMood, shuffleSuggestion, playSuggestedSong };
}

export default useSong
