pipeline {
    agent {
        label 'dev-deploy'
    }
    tools {
        nodejs 'nodejs23'
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        ECR_REPO = 'travelease'
        AWS_CREDENTIALS_ID = 'aws-cred'
        AWS_CREDENTIALS_ID2 = 'bhavesh-cred'
        AWS_REGION = 'ap-south-1'
        
    }

    stages {
        stage('Removing old Containers') {
            steps {
                dir('TravelEase') {
                    sh "docker compose down"
                }
            }
        }

        stage('Removing old Images') {
            steps {
                sh '''
                    echo "Stopping and removing all containers..."
                    docker ps -aq | xargs -r docker stop
                    docker ps -aq | xargs -r docker rm

                    echo "Removing all Docker images..."
                    docker images -aq | xargs -r docker rmi -f
                '''
            }
        }


        stage('Git Checkout') {
            steps {
                dir('TravelEase') {
                    git branch: 'dev-prod', credentialsId: 'travel', url: 'https://github.com/TravelEase-Xebia/TravelEase.git'
                }
            }
        }

                stage('Uploading Snyk AI Reports') {
                    steps { 
                        withCredentials([
                            [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'bhavesh-aws']
                        ]) {
                    dir('booking') {
                        sh """
                            aws s3 cp snyk-booking.txt s3://travel-ease-booking-b-snyk/
                        """
                    }
                    dir('login') {
                        sh """
                            aws s3 cp snyk-login.txt s3://travel-ease-snyk-login-report-b/
                        """
                    }
                     dir('frontend') {
                        sh """
                            aws s3 cp snyk-frontend.txt s3://travel-ease-snyk-frontend-report-b/
                        """
                    }
                }
            }
        }

        stage('Starting Services') {
            steps {
                dir('TravelEase') {
                    sh "docker compose up --build -d"
                }
            }
        }

                stage('Zap Scan') {
            steps {
                withCredentials([
                            [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'bhavesh-aws']
                        ]) {
                script {
                    sh ''' 
                    docker run --rm --user 0 -v $WORKSPACE:/zap/wrk \
                    ghcr.io/zaproxy/zaproxy:stable zap-full-scan.py \
                    -t https://dev.bhaveshdevops.in \
                    -r zap-report.html \
                    -I -j
                    '''
                    sh 'ls -al'

                    archiveArtifacts artifacts: 'zap-report.html', allowEmptyArchive: false
                    sh '''
                    aws s3 cp zap-report.html s3://travelease-zap-report/
                    '''
                }
            }
        }
    }

    }
}
