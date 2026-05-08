require("dotenv").config()
const { default: ImageKit } = require("@imagekit/nodejs")


const client = new ImageKit({
   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})


console.log(process.env.IMAGEKIT_PUBLIC_KEY)
console.log(process.env.IMAGEKIT_PRIVATE_KEY)
console.log(process.env.IMAGEKIT_URL_ENDPOINT)

async function uploadFile({ buffer, filename, folder = "" }) {
  const file = await client.files.upload({ //new sdk method for uploading files in imagkit
    file: buffer.toString("base64"), //convert buffer to base64 string
    fileName: filename,
    folder: folder
  })

  return file
}
console.log(typeof client.files.upload)

module.exports = {uploadFile}