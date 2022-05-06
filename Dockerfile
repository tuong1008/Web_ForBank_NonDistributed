# syntax=docker/dockerfile:1
FROM maven:3.6.3-jdk-8 AS build
WORKDIR /app
COPY . .
RUN mvn package

FROM tomcat
COPY --from=build /app/target/*.war /usr/local/tomcat/webapps 