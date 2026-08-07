pipeline{
  agent any

   triggers {
        githubPush()   
    }

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
            credentialsId: 'jenkins-docker',
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
  

  }
}
