import { SongContext } from "../song.context";
import { useContext } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/songs",
    withCredentials: true
})

export const getSongsByMood = async ({mood}) => {
    try {
        const {data} = await api.get(`/get-songs?mood=`+ mood)  
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}