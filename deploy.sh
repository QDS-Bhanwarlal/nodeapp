#! /bin/bash

npm install -g serverless
serverless deploy --package $CODEBUILD_SRC_DIR/target/stg
