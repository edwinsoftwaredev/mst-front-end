FROM nginx:stable-alpine
COPY ./dist/Plugtify/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
