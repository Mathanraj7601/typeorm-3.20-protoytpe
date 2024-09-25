#!/bin/bash
set -o errexit
pushd "$(cd "$(dirname "$0")" ; pwd -P )/.." > /dev/null

sed -i 's/\r$//' ../.env

source ../.env

aws cloudformation package \
  --template-file cloudformation/lambda.yaml \
  --s3-bucket "${AWS_NAMESPACE}-migration-lambda-s3" \
  --output-template-file cloudformation/lambda-packaged.yaml \
  --profile "${AWS_PROFILE}"

aws cloudformation deploy \
  --template-file cloudformation/lambda-packaged.yaml \
  --stack-name "${AWS_NAMESPACE}-migration-lambda" \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-fail-on-empty-changeset \
  --parameter-overrides \
    LambdaFunctionName="${AWS_NAMESPACE}-migration-lambda" \
    NetworkStack=${NETWORK_STACK_NAME} \
    DatabaseStack=${DATABASE_STACK_NAME} \
    MysqlDB=${MYSQL_DB_NAME} \
    MysqlUser=${MYSQL_USER_NAME} \
    MysqlPassword=${MYSQL_PASSWORD} \
  --profile "${AWS_PROFILE}"

rm cloudformation/lambda-packaged.yaml