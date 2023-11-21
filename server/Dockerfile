FROM maven:3.8.4-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.2-jdk-slim
COPY --from=build /target/to-do-app-0.0.1-SNAPSHOT.jar to-do-app.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "to-do-app.jar" ]