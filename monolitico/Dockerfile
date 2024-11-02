FROM openjdk:19
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} monolitico-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/monolitico-0.0.1-SNAPSHOT.jar"]