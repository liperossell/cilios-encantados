FROM node:alpine AS build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli \
    && npm install \
    && ng build --configuration production

FROM nginx:alpine

COPY --from=build /usr/src/app/dist/cilios-encantados/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
