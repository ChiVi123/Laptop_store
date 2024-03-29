'use server';

import cloudinary from 'cloudinary';
import { EKeys } from '~/common/enums';

cloudinary.v2.config({
    cloud_name: process.env.REACT_CLOUDINARY_NAME,
    api_key: process.env.REACT_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_CLOUDINARY_API_SECRET,
    secure: true,
});
const options: cloudinary.UploadApiOptions = {
    folder: process.env.REACT_CLOUDINARY_FOLDER_NAME,
    resource_type: 'image',
};

export async function uploadSingleImageAction(formData: FormData) {
    const file = formData.get(EKeys.LOGO);
    if (file instanceof File) {
        return await handleUploadImage(file);
    }
}
export async function uploadMultiImageAction(formData: FormData) {
    const imageResponses: cloudinary.UploadApiResponse[] = [];
    const files = formData.getAll(EKeys.IMAGE);
    const filesLength = files.length;

    for (let index = 0; index < filesLength; index++) {
        const file = files[index];
        if (file instanceof File) {
            const response = await handleUploadImage(file);
            imageResponses.push(response);
        }
    }

    return imageResponses;
}

export async function handleUploadImage(file: File) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return (await new Promise((resolve) => {
        cloudinary.v2.uploader
            .upload_stream(options, (_, uploadResult) => {
                if (uploadResult) {
                    return resolve(uploadResult);
                }
            })
            .end(buffer);
    })) as cloudinary.UploadApiResponse;
}
//{
//  "public_id": "laptop_store/tl7vi2c15ztyi8co65a2",
//  "width": 564,
//  "height": 1002,
//  "format": "jpg", ?
//  "created_at": "2024-02-29T16:43:07Z", ?
//  "bytes": 76513,
//  "secure_url": "https://res.cloudinary.com/dat2lyvva/image/upload/v1709224987/laptop_store/tl7vi2c15ztyi8co65a2.jpg",
//  "folder": "laptop_store",
//}
