import axios from "axios";

export const uploadImage = async (images:File[]) => {
    try {
        const imageUrls:string[]=[];
        for(const image of images){
            const formData = new FormData()
            formData.append('file',image);
            formData.append('upload_preset','product_upload');
            

            const response = await axios.post('https://api.cloudinary.com/v1_1/dbnh7x1ml/image/upload',
                formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data',
                },
            });
            const downloadURL = response.data.secure_url;
            imageUrls.push(downloadURL)
        }
        return imageUrls
    } catch (error) {
        console.error(error);
    if (error instanceof Error) {
        throw new Error(error.message);
    } else {
        throw new Error('An Unexpected Error Occurred');
    }
    }
}