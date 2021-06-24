pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
          echo 'Building...'
      }
    }
    
    stage('Test') {
      when {
        expression {
          BRANCH_NAME == 'main' || BRANCH_NAME == 'master' 
        }
      }
      
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
}
