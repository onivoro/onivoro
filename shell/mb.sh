#!/bin/bash
profile=""
bucket=""
region=""
aws s3api create-bucket --profile "${profile}" --bucket "${bucket}" --region "${region}" --no-object-lock-enabled-for-bucket > /dev/null
aws s3api put-public-access-block --profile "${profile}" --bucket "${bucket}" --public-access-block-configuration "BlockPublicPolicy=false"
aws s3api put-bucket-policy --profile "${profile}" --bucket "${bucket}" --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::'"${bucket}"'/*"

            ]
        }
    ]
}'
aws s3api put-bucket-cors --bucket "${bucket}" --cors-configuration file://cors.json --profile "${profile}"