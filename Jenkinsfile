pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-playwright-test"
        REPORT_DIR = "playwright-report"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    // Gunakan catchError supaya tidak menghentikan pipeline
                    catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                        sh "mkdir -p ${REPORT_DIR}"

                        sh """
                        docker run --rm -u root \
                            -v \$(pwd)/${REPORT_DIR}:/app/${REPORT_DIR} \
                            ${IMAGE_NAME}
                        """
                    }
                }
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML([
                    reportDir: "${REPORT_DIR}",
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: true
                ])
            }
        }
    }

    post {
        always {
            echo "Cleaning up..."
            sh "docker rmi ${IMAGE_NAME} || true"
        }
    }
}
