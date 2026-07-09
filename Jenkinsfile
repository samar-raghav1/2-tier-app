pipeline{
  agent any
  stages{
    stage('checkout'){
        steps{
            echo 'Checking out the code'
            git url: 'https://github.com/samar-raghav1/2-tier-app.git', branch: 'main'
            echo "code checking completed"
        }
    }

    stage('build'){
        steps{
            echo 'Building the code'
            bat 'docker build -t 2-tier-app ./'
            echo "code building completed"
        }
    }
    stage('push code to docker hub'){
        steps{
            withCredentials([usernamePassword(
            credentialsId: 'jenkins-docker-connection',
             usernameVariable: 'DOCKER_USER',
              passwordVariable: 'DOCKER_PASS')]) {
            echo 'Pushing the code to docker hub'
             bat """
              echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
            """
            bat 'docker tag 2-tier-app:latest ${DOCKER_USER}/2-tier-app:latest'
            bat 'docker push ${DOCKER_USER}/2-tier-app:latest'
            echo "code pushed to docker hub"
              }
        }
    }
    stage('deploy'){
        steps{
            sshagent(['ec2-ssh-key']) {
            withAWS(region: 'us-east-2', credentials: 'aws-jenkins-connection') {
            bat '''
                ssh -o StrictHostKeyChecking=no ubuntu@18.191.111.178 "
                cd /home/ubuntu/2-tier-app &&
                git pull origin main &&
                docker pull samarraghav001/2-tier-app:latest &&
                docker-compose down &&
                docker-compose up -d --build
                "
                '''
            }
        }
        }
    }


    
    
  }
}
