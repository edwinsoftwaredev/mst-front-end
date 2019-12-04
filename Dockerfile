FROM nginx:stable-alpine
RUN mkdir -p ./dist/Plugtify/.well-known
RUN mkdir -p ./dist/Plugtify/.well-known/acme-challenge
COPY ./dist/Plugtify/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
