FROM cloudflare/cloudflared:latest AS cloudflared
# Install dotenv to load environment variables from a file
RUN apk add --no-cache nodejs npm
RUN npm install -g dotenv-cli

# Add any additional setup specific to the cloudflared image, if needed
COPY .env .env
CMD ["dotenv", "-e", ".env", "tunnel", "--no-autoupdate", "run", "--token", "${CDN_TOKEN}"]

FROM maven:3.8.4-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.2-jdk-slim
COPY --from=build /target/to-do-app-0.0.1-SNAPSHOT.jar to-do-app.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "to-do-app.jar" ]
