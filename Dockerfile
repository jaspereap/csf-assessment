FROM node:21 AS ng-builder

WORKDIR /ngapp

RUN npm i -g @angular/cli

COPY ecommerce/client/package*.json .
COPY ecommerce/client/angular.json .
COPY ecommerce/client/tsconfig.* .
COPY ecommerce/client/src src

# Run ng build only when npm ci is success
RUN npm ci && ng build

# /ngapp/dist/frontend/browser/*


## Build springboot app
FROM maven:3-eclipse-temurin-21 AS sb-builder

## Create directory /sbapp
## cd /sbapp
WORKDIR /sbapp
COPY ecommerce/mvnw .
COPY ecommerce/mvnw.cmd .
COPY ecommerce/pom.xml .
COPY ecommerce/.mvn .mvn
COPY ecommerce/src src

COPY --from=ng-builder /ngapp/dist/client-side/browser src/main/resources/static

RUN mvn package -Dmaven.test.skip-true

FROM openjdk:21-jdk-bullseye

WORKDIR /app
COPY --from=sb-builder /sbapp/target/ecommerce-0.0.1-SNAPSHOT.jar app.jar
ENV PORT=8080
EXPOSE ${PORT}

ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar