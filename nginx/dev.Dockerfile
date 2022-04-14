FROM nginx

RUN mkdir -p /var/log/nginx

COPY config/dev.conf /etc/nginx/conf.d/default.conf
