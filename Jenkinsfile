pipeline {
  agent any
  tools { nodejs 'node26' }
  options { timestamps(); disableConcurrentBuilds() }

  stages {
    stage('AI Gate') {
      steps {
        // Placeholder: replaced by Context Builder + five agents in the next phase
        echo 'AI gate: placeholder, always passes'
      }
    }
    stage('Install') {
      steps { sh 'npm ci' }
    }
    stage('Lint') {
      steps { sh 'npm run lint' }
    }
    stage('Build') {
      steps { sh 'npm run build --workspaces --if-present' }
    }
    stage('Test') {
      steps { sh 'npm test || true' }
    }
    stage('SonarQube') {
      when { expression { return false } } // enable in Step 8
      steps {
        withSonarQubeEnv('sonarqube') {
          sh 'npx sonar-scanner'
        }
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}