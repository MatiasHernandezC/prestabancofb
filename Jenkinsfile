pipeline{
    agent any
    tools{
        maven "maven"

    }
    stages{
        stage("Build JAR File"){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/MatiasHernandezC/prestabanco.git']])
                dir("monolitico"){
                    bat "mvn clean install"
                }
            }
        }
        stage("Test"){
            steps{
                dir("monolitico"){
                    bat "mvn test"
                }
            }
        }
        stage("Build Frontend") {
            steps {
                dir("frontend-prestabanco") {
                    // Elimina `node_modules` e instala dependencias
                    bat "rd /s /q node_modules" // En caso de que haya un `node_modules` roto
                    bat "npm ci"
                    bat "npm run build"  // Construye el frontend con Vite
                }
            }
        }
        stage("Build and Push Docker Image"){
            steps{
                dir("monolitico"){
                    script{
                         withDockerRegistry(credentialsId: 'docker-credentials' ){
                            // Copia la build del frontend al directorio de backend para incluirla en la imagen Docker
                            bat "xcopy /E /I frontend-prestabanco\\dist monolitico\\src\\main\\resources\\static"
                            // Construye y publica la imagen Docker
                            bat "docker build -t motihc/proyecto_prestabanco:latest ."
                            bat "docker push motihc/proyecto_prestabanco:latest"
                        }
                    }
                }
            }
        }
    }
}