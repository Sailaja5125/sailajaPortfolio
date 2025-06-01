import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration of Cloudinary
cloudinary.config({ 
    cloud_name: 'dglnpuq0z', 
    api_key: 884185165598194, 
    api_secret: "RTNX-KvixzT4GM_lqVSriVOtTJ4"
});
// Function to upload image to Cloudinary when local file path is given
const imageupload = async (localfilepath) => {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    try {
        const uploadResult = await cloudinary.uploader.upload(localfilepath, options);

        // Remove the local file after successful upload
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }

        return uploadResult; // Send the response
    } catch (error) {
        // Remove the local file if the upload operation failed
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }

        console.error("Error during image upload:", error);
        return { success: false, error: error.message };
    }
};

export { imageupload };