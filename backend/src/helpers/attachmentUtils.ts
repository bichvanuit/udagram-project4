import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)
const s3 = new XAWS.S3({ signatureVersion: 'v4'});

const bucketName: string = process.env.ATTACHMENT_S3_BUCKET
const urlExpiration: number = parseInt(process.env.SIGNED_URL_EXPIRATION)

export function getSignedUrl(todoId: string): string {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: todoId,
        Expires: urlExpiration
    });
}