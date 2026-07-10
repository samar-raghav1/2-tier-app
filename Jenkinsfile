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
            sh 'docker build -t 2-tier-app ./'
            echo "code building completed"
        }
    }
    stage('push code to docker hub'){
        steps{
            withCredentials([usernamePassword(
            credentialsId: 'docker-jen-conn',
             usernameVariable: 'DOCKER_USER',
              passwordVariable: 'DOCKER_PASS')]) {
            echo 'Pushing the code to docker hub'
             sh """
              echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
            """
            sh 'docker tag 2-tier-app:latest ${DOCKER_USER}/2-tier-app:latest'
            sh 'docker push ${DOCKER_USER}/2-tier-app:latest'
            echo "code pushed to docker hub"
              }
        }
    }
  stage('Deploy to AWS EC2') {
    steps {
        sshagent(['ec2-ssh-key']) {
            withAWS(region: 'us-east-1', credentials: 'aws-jen-conn') {
                withCredentials([usernamePassword(credentialsId: 'docker-jen-conn', 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@54.221.67.121 "
                        cd /home/ubuntu/2-tier-app &&
                        git pull origin main &&
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin &&
                        docker pull samarraghav1/2-tier-app:latest &&
                        docker compose down &&
                        docker compose up  --build
                    "
                    '''
                }
            }
        }
    }
}


  }
}
