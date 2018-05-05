FROM node:alpine
WORKDIR /web

ARG GMAPS_API_KEY
ARG CCAPI_URL

COPY . /web
RUN yarn
RUN yarn run build

FROM nginx:alpine
COPY --from=0 /web/build/. /usr/share/nginx/html
