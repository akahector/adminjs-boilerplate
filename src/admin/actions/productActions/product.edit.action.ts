import fs from 'fs'
import path from 'path'

export const beforeProductEdit = async (request,context)=>{
    if(request.method ==='post'){
        const {image,gallery,...otherParams} = request.payload
        context.image = image
        context.gallery = gallery
        return {
            ...request,
            payload:otherParams
        }

    }

    return request

}

export const afterProductEdit = async (response,request,context)=>{
    const { record, image, gallery } = context;
    console.log(gallery)
    if (record.isValid() && image) {
        const imageFilePath = path.join('uploads', record.id().toString(), `${image.name}_${Math.random().toString(36).substring(7)}`);

        await fs.promises.mkdir(path.dirname(imageFilePath),{recursive:true})

        await fs.promises.rename(image.path,imageFilePath)
         
        await record.update({image:`/${imageFilePath}`})
    }

    let galleryFilePaths = [];
    if (record.isValid() && gallery) {
        await Promise.all(gallery.map(async (file,index) => {
            console.log(index,file)
            const galleryFilePath = path.join('uploads', record.id().toString(), `${file.name}_${Math.random().toString(36).substring(7)}`);

            await fs.promises.mkdir(path.dirname(galleryFilePath), { recursive: true });

            await fs.promises.rename(file.path, galleryFilePath);

            galleryFilePaths.push(`/${galleryFilePath}`);
        }));
        await record.update({gallery:galleryFilePaths})
    }


    return response

}