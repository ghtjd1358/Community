// import cloudinary from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
// });

// export const uploadImage = async (file) => {
//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       folder: 'Unsigned Preset', 
//       resource_type: 'image',
//     });
//     return result.secure_url;
//   } catch (error) {
//     console.error('이미지 업로드 실패:', error);
//     return null;
//   }
// };
