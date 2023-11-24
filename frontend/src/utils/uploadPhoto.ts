import Axios from "axios"

export async function uploadPhoto(image: File) {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "hexacomb")
    let response = await Axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CDN_ID}/image/upload`,
        formData)
    return response.data["secure_url"]
}