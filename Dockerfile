FROM nginx:stable-alpine
COPY ./dist/Plugtify/ /usr/share/nginx/html/
