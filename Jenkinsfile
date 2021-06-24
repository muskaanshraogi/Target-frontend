pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
          echo 'Building...'
      }
    }
    
    stage('Test') {
      steps {
          echo 'Testing...'
      }
    }
    
    stage('Deploy') {
      steps {
          echo 'Deploying...'
      }
    }
  }
  
  post {
      always {
        echo 'Done'
      }
      
    success {
      echo 'Success'
    }
    
    failure {
      echo "Failure"
    }
}
