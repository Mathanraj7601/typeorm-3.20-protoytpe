 #!/bin/bash
npm run tsc
cp package.json ./dist
cd dist || exit
npm install --production
rm package.json package-lock.json