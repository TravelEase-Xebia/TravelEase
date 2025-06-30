pipeline {
    agent any
    tools{
        nodejs 'nodejs23'
    }
    environment{
        SCANNER_HOME=tool 'sonar-scanner'
        ECR_REGISTERY='794038217891.dkr.ecr.ap-south-1.amazonaws.com'
        ECR_REPO = 'travelease/frontend'
        AWS_CREDENTIALS_ID = 'aws-cred'
        AWS_REGION = 'ap-south-1'
    }

    stages {
        stage('Clean Workspace'){
            steps{
                cleanWs()
            }
        }
        stage('Git Checkout dev-prod') {
            steps {
                dir('dev-prod') {
                    git branch: 'dev-prod', credentialsId: 'travel', url: 'https://github.com/TravelEase-Xebia/TravelEase.git'
                }
            }
        }
        stage('Git Checkout main') {
            steps {
                dir('main') {
                    git branch: 'main', credentialsId: 'travel', url: 'https://github.com/TravelEase-Xebia/TravelEase.git'
                }
            }
        }

        stage('Updating dev production branch') {
            steps {
                sh 'mkdir -p ./TravelEase/frontend'
                sh 'rsync -av --exclude=".git" --exclude="Jenkinsfile" --exclude="README.*" ./dev-prod/ ./main/'
            }
        }
        stage('push code to main production branch') {
            steps {
                dir('main') {
            withCredentials([usernamePassword(credentialsId: 'travel', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                sh '''
                    git config user.name "$GIT_USER"
                    git config user.email "$GIT_USER@users.noreply.github.com"
                    
                    git add .
                    git commit -m "CI: Updated into main production branch" || echo "No changes to commit"
                    git push https://$GIT_USER:$GIT_TOKEN@github.com/TravelEase-Xebia/TravelEase.git HEAD:main
                '''
            }
        }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
