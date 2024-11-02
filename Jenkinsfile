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
                            bat "rd /s /q node_modules" // En caso de que haya un `node_modules` roto
                            // Instala dependencias y construye el frontend
                            bat "npm install"
                            bat "npm install axios"
                            bat "npm install bootstrap"
                            bat "npm install react-router-dom"
                            bat "npm install @mui/material @emotion/react @emotion/styled"
                            bat "npm install @mui/icons-material"
                            bat "npm run build"  // Vite genera la carpeta 'dist' con la build
                        }
                    }
                }
        stage("Build and Push Docker Image"){
            steps{
                dir("monolitico"){
                    script{
                         withDockerRegistry(credentialsId: 'docker-credentials' ){
                            // Construye y publica la imagen Docker
                            bat "docker build -t motihc/proyecto_prestabanco:latest ."
                            bat "docker push motihc/proyecto_prestabanco:latest"
                        }
                    }
                }
                dir("frontend-prestabanco"){
                    script{
                         withDockerRegistry(credentialsId: 'docker-credentials' ){
                            // Construye y publica la imagen Docker
                            bat "docker build -t motihc/proyecto_prestabancofront:latest ."
                            bat "docker push motihc/proyecto_prestabancofront:latest"
                        }
                    }
                }
            }
        }
    }
}