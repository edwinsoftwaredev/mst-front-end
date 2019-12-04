FROM nginx:stable-alpine
RUN mkdir ./dist/Plugtify/.well-known/acme-challenge/
COPY ./dist/Plugtify/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
