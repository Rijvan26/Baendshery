import { useState } from "react";
import { createContext } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({children}) => {
    const [song, setsong] = useState({
        url: "https://ik.imagekit.io/nnxrkxddlh/cohort2/moodify/songs/Burdah_-_Bonus__ApniISP.Com__MlcBrd55z.mp3",
        posterUrl: null,
        title: "Burdah - Bonus (ApniISP.Com)",
        artist: "Unknown Artist",
        mood: "happy"
    })

    const [loading, setloading] = useState(false)

    return (
        <SongContext.Provider value={{song, setsong, loading, setloading}}>
            {children}
        </SongContext.Provider>
    )
}
