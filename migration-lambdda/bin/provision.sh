#!/bin/bash
set -o errexit
pushd "$(cd "$(dirname "$0")" ; pwd -P )/.." > /dev/null

sed -i 's/\r$//' ../.env

source ../.env

aws cloudformation deploy \
  --template-file cloudformation/lambda-s3.yaml \
  --stack-name "${AWS_NAMESPACE}-migration-lambda-s3" \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-fail-on-empty-changeset \
  --parameter-overrides \
    AwsNamespace="${AWS_NAMESPACE}" \
  --profile "${AWS_PROFILE}"
