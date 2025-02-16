cd ~/articles-project
npm run build:prod

rm -rf ~/../var/www/articles-project/html
mv ~/articles-project/build ~/../var/www/articles-project/html