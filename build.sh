cd portal/;
npm run build;
cd ../node/;
npm run build;
mkdir -p dist/public;
cp -r ../portal/dist/. dist/public/;
