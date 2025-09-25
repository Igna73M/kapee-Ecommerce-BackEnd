// // Cloudinary configuration
// import { v2 as cloudinary } from 'cloudinary';
// import dotenv from 'dotenv';

// dotenv.config();

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// });

// export const uploadToCloudinary = async (filePath: string, folder: string) => {
//     try {
//         const result = await cloudinary.uploader.upload(filePath, {
//             folder,
//             resource_type: 'auto', // This will allow uploading images, videos, etc.
//         });
//         return result.secure_url; // Return the URL of the uploaded file
//     } catch (error) {
//         throw new Error('Cloudinary upload failed');
//     }
// };

// export const deleteFromCloudinary = async (publicId: string) => {
//     try {
//         await cloudinary.uploader.destroy(publicId);
//     } catch (error) {
//         throw new Error('Cloudinary deletion failed');
//     }
// };

import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
export default cloudinary;