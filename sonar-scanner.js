const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: process.env.SONAR_HOST_URL || 'http://localhost:9000',
    token: process.env.SONAR_TOKEN,
    options: {
      'sonar.projectKey': process.env.SONAR_PROJECT_KEY || 'react-login-demo',
      'sonar.projectName': 'React Login Demo',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.test.inclusions': '**/*.test.jsx,**/*.test.js',
      'sonar.exclusions': '**/*.test.jsx,**/*.test.js,src/index.js',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.coverage.exclusions': '**/*.test.jsx,**/*.test.js,src/index.js'
    }
  },
  () => {
    console.log('SonarQube analysis complete');
  }
);
