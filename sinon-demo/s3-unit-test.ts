import { expect } from 'chai';
import * as sinon from 'sinon';
import * as AWS from 'aws-sdk';

// Function to be tested
async function uploadAndDownloadFile(s3: AWS.S3, params: AWS.S3.PutObjectRequest): Promise<string> {
    try {
        console.log(" ", s3, params)

        await s3.upload(params).promise();
        const data = await s3.getObject({ Bucket: params.Bucket, Key: params.Key }).promise();
        return data.Body.toString(); // Convert Buffer to string
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

describe('S3 Operations', function() {
    let s3: AWS.S3;
    const mockUpload = sinon.stub();
    const mockGetObject = sinon.stub();

    before(function() {
        s3 = new AWS.S3();
        sinon.stub(s3, 'upload').callsFake(mockUpload);
        sinon.stub(s3, 'getObject').callsFake(mockGetObject);
    });

    afterEach(function() {
        mockUpload.reset();
        mockGetObject.reset();
    });

    after(function() {
        sinon.restore();
    });

    it('should upload and download file', async function() {
        const params: AWS.S3.PutObjectRequest = { Bucket: '', Key: 'test_key.txt', Body: 'Hello, World!' };

        mockUpload.withArgs(params).returns({ promise: () => Promise.resolve() });
        mockGetObject.withArgs({ Bucket: params.Bucket, Key: params.Key }).returns({
            promise: () => Promise.resolve({ Body: params.Body.toString() }) // Convert Body to string
        });

        const result = await uploadAndDownloadFile(s3, params);
        console.log("44444444444444444", result)
        expect(result).to.equal(params.Body);
    });

    // it('should handle upload error', async function() {
    //     const params: AWS.S3.PutObjectRequest = { Bucket: 'image-reshape', Key: 'test_key.txt', Body: 'Hello, World!' };
    //     const errorMessage = 'Internal Server Error';

    //     mockUpload.withArgs(params).throws(new Error(errorMessage));

    //     try {
    //         await uploadAndDownloadFile(s3, params);
    //     } catch (error) {
    //         expect(error.message).to.equal(errorMessage);
    //     }
    // });
});
