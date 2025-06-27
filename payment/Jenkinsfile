pipeline {
    agent any
    tools{
        nodejs 'nodejs23'
    }
    environment{
        SCANNER_HOME=tool 'sonar-scanner'
        ECR_REGISTERY='794038217891.dkr.ecr.ap-south-1.amazonaws.com'
        ECR_REPO = 'travelease/payment'
        AWS_CREDENTIALS_ID = 'aws-cred'
        AWS_REGION = 'ap-south-1'
    }

    stages {
        stage('Git Checkout') {
            steps {
                dir('payment') {
                    git branch: 'payment', credentialsId: 'bhavesh', url: 'https://github.com/TravelEase-Xebia/TravelEase.git'
                }
            }
        }
        stage('Unit Test') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Trivy FS Scan') {
            steps {
                sh 'trivy fs --format table -o fs-payment.html .'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    dir('payment') {
                        sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=TravelEase-payment -Dsonar.projectKey=TravelEase-payment \
                              -Dsonar.sources=.
                           '''
                    }
                }
            }
        }
        stage('Build Image') {
            steps {
                dir('payment') {
                  sh "docker build -t ${ECR_REGISTERY}/${ECR_REPO}:latest ."
                }
                
            }
        }
        stage('Trivy Image Scan') {
            steps {
                sh 'trivy image --format table -o image-payment.html ${ECR_REGISTERY}/${ECR_REPO}:latest'
            }
        }
        stage('Login ECR') {
            steps {
                withCredentials([[
                  $class: 'AmazonWebServicesCredentialsBinding',
                  credentialsId: 'aws-cred'
                    ]]) {
                  sh '''
                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin 794038217891.dkr.ecr.ap-south-1.amazonaws.com
                  '''
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script{
                    sh "docker push ${ECR_REGISTERY}/${ECR_REPO}:latest"
                }
            }
        }
        stage('pulling main production branch') {
            steps {
                dir('TravelEase') {
                    git branch: 'main', credentialsId: 'bhavesh', url: 'https://github.com/TravelEase-Xebia/TravelEase.git'
                }
            }
        }
        stage('Updating main production branch') {
            steps {
                sh 'mkdir -p ./TravelEase/payment'
                sh 'rsync -av --exclude=".git" ./payment/ ./TravelEase/payment/'
            }
        }
        stage('push code to main production branch') {
            steps {
                dir('TravelEase') {
            withCredentials([usernamePassword(credentialsId: 'bhavesh', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                sh '''
                    git config user.name "$GIT_USER"
                    git config user.email "$GIT_USER@users.noreply.github.com"

                    git add .
                    git commit -m "CI: Updated payment into main production branch" || echo "No changes to commit"
                    git push https://$GIT_USER:$GIT_TOKEN@github.com/TravelEase-Xebia/TravelEase.git HEAD:main
                '''
            }
        }
            }
        }
    }
}
