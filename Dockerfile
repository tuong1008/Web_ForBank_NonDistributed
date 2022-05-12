# syntax=docker/dockerfile:1
FROM maven:3.6.3-jdk-8 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -Dmaven.repo.local=dependencies dependency:go-offline

COPY src/ /app/src/
RUN mvn -Dmaven.repo.local=dependencies package
RUN mvn -Dmaven.repo.local=dependencies -o package

FROM tomcat:8.0.35-jre8
COPY --from=build /app/target/*.war /usr/local/tomcat/webapps/
EXPOSE 8080
CMD ["catalina.sh", "run"]