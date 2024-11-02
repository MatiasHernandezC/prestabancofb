pipeline{
    agent any
    tools{
        maven "maven"

    }
    stages{
        stage("Build JAR File"){
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/MatiasHernandezC/prestabanco.git']])
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
        stage("Build and Push Docker Image"){
            steps{
                dir("monolitico"){
                    script{
                         withDockerRegistry(credentialsId: 'docker-credentials'){
                            bat "docker build -t motihc/proyecto_prestabanco:latest ."
                            bat "docker push motihc/proyecto_prestabanco:latest"
                        }
                    }
                }
            }
        }
    }
}