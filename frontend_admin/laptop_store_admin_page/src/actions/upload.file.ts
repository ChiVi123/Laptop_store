'use server';

import { UploadApiOptions, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import logger from '~/libs/logger';
import { IImage } from '~/types/models';

cloudinary.config({
    cloud_name: process.env.REACT_CLOUDINARY_NAME,
    api_key: process.env.REACT_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_CLOUDINARY_API_SECRET,
    secure: true,
});

const options: UploadApiOptions = {
    folder: process.env.REACT_CLOUDINARY_FOLDER_NAME,
    resource_type: 'image',
};
function transformCloudinaryToImage(upload: UploadApiResponse) {
    const image: IImage = {
        publicId: upload.public_id,
        width: upload.width,
        height: upload.height,
        bytes: upload.bytes,
        folder: upload?.folder,
        secureUrl: upload.secure_url,
    };
    return image;
}
async function fetchUploadImage(file: File) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return (await new Promise((resolve) => {
        cloudinary.uploader
            .upload_stream(options, (uploadError, uploadSuccess) => {
                if (uploadSuccess) {
                    const resultUpload: IImage = transformCloudinaryToImage(uploadSuccess);
                    return resolve(resultUpload);
                } else {
                    logger.anger('upload image::', uploadError);
                }
            })
            .end(buffer);
    })) as IImage;
}

export async function single(key: string, formData: FormData) {
    const file = formData.get(key);
    if (file instanceof File) {
        return await fetchUploadImage(file);
    }
}
export async function multiple(key: string, formData: FormData) {
    const imageResponses: IImage[] = [];
    const files = formData.getAll(key);
    const filesLength = files.length;
    for (let index = 0; index < filesLength; index++) {
        const file = files[index];
        if (file instanceof File) {
            const response = await fetchUploadImage(file);
            imageResponses.push(response);
        }
    }
    return imageResponses;
}
