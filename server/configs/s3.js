const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')


const s3 = new S3Client({
    region: 'ap-south-1', credentials: {
        accessKeyId: 'AKIARRTLEVN4LSESV4QL',
        secretAccessKey: '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'
    }
})
const BUCKET = 'chess-user-images'

const uploadToS3 = async ({ file, userId }) => {
    console.log(file.buffer);
    const key = userId + file.originalname;
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
    })

    try {
        await s3.send(command)
        return { key }
    } catch (error) {
        console.log(error);
        return { error }
    }
}

module.exports = { uploadToS3 }