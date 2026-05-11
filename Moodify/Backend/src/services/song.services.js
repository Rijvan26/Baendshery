const axios = require("axios")

async function getSongsByMood(mood) {
  try {
    if (!mood || mood.trim() === '') {
      console.warn("Empty mood provided")
      return []
    }

    console.log(`Fetching songs for mood: ${mood}`)

    const response = await axios.get(
      `https://saavn.dev/api/search/songs?query=${encodeURIComponent(mood)}`,
      {
        timeout: 10000 // 10 second timeout
      }
    )

    console.log(`JioSaavn API Response for "${mood}":`, JSON.stringify(response.data, null, 2))

    if (!response.data?.data?.results || !Array.isArray(response.data.data.results)) {
      console.warn(`No songs found for mood: ${mood}`)
      return []
    }

    const results = response.data.data.results.slice(0, 10).map(song => {
      const downloadUrl = song.downloadUrl?.[4]?.url || song.downloadUrl?.[3]?.url || song.downloadUrl?.[2]?.url || song.downloadUrl?.[1]?.url || song.downloadUrl?.[0]?.url
      const imageUrl = song.image?.[2]?.url || song.image?.[1]?.url || song.image?.[0]?.url
      
      return {
        id: song.id,
        title: song.name || "Unknown",
        artist: song.primaryArtists || "Unknown Artist",
        image: imageUrl,
        url: downloadUrl,
        mood: mood
      }
    }).filter(song => song.url) // Only return songs with valid URLs

    console.log(`Returning ${results.length} songs for mood: ${mood}`)
    return results
  } catch (error) {
    console.error(`Error fetching songs for mood "${mood}":`, error.message)
    if (error.response) {
      console.error("API Response:", error.response.status, error.response.data)
    }
    return []
  }
}

module.exports = {
  getSongsByMood
}