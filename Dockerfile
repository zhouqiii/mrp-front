# Build stage
# FROM harbor.devcenter.gushen.sieiot.com/library/node:20.18.0 AS build
FROM tsa.xcmg.com/library/node:20.18.0 AS build

COPY package*.json /src/
RUN npm cache clean --force
RUN cd /src && npm i

COPY . /src
RUN cd /src && npm run build

# Nginx stage
FROM harbor.devcenter.gushen.sieiot.com/library/nginx-120:1-55

USER 0
#子应用需要指定目录，例如COPY --from=build /src/dist/ /tmp/src/micro/schedule
COPY --from=build /src/dist/ /tmp/src/
RUN chown -R 1001:0 /tmp/src
USER 1001
COPY docker_nginx.conf /etc/nginx/nginx.conf

# Let the assemble script to install the dependencies
RUN /usr/libexec/s2i/assemble

# Run script uses standard ways to run the application
#CMD cd /tmp/src && bash ./public-path.sh && /usr/libexec/s2i/run
CMD /usr/libexec/s2i/run
