pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
          echo 'Building...'
          sh "npm install -g yarn"
          sh "yarn install"
      }
    }
    
    stage('Test') {
      when {
        expression {
          env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master' 
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
