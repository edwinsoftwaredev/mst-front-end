FROM nginx:stable-alpine
COPY ./dist/Plugtify/ /var/www/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
