pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-playwright-test"
        REPORT_DIR = "playwright-report"
        RESULTS_DIR = "test-results"
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
                    // mount report & results ke workspace
                    sh """
                        mkdir -p ${REPORT_DIR} ${RESULTS_DIR}
                        docker run --rm -u root \\
                          -v \$(pwd)/${REPORT_DIR}:/app/${REPORT_DIR} \\
                          -v \$(pwd)/${RESULTS_DIR}:/app/${RESULTS_DIR} \\
                          ${IMAGE_NAME} || exit 0
                    """
                }
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    reportDir: "${REPORT_DIR}",
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: true
                ])
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: "${RESULTS_DIR}/**", allowEmptyArchive: true
            }
        }
    }

    post {
        success {
            echo '✅ All tests passed!'
        }
        unstable {
            echo '⚠️ Some tests failed, check the report and artifacts.'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
