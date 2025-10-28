# React Login Demo with SonarQube Integration

A simple React login screen with comprehensive unit tests and SonarQube code quality analysis, configured for Azure Pipelines.

## Features

- ✅ React-based login form with validation
- ✅ Email and password validation
- ✅ Comprehensive unit tests (80%+ coverage)
- ✅ SonarQube integration for code quality analysis
- ✅ Azure Pipelines configuration
- ✅ Jest testing framework

## Project Structure

```
SQ-test/
├── src/
│   ├── Login.jsx           # Main login component
│   ├── Login.css           # Login styles
│   ├── Login.test.jsx      # Login unit tests
│   ├── App.jsx             # Root app component
│   ├── App.test.jsx        # App unit tests
│   └── index.js            # Entry point
├── public/
│   └── index.html          # HTML template
├── __mocks__/
│   └── styleMock.js        # CSS mock for Jest
├── package.json            # Dependencies and scripts
├── jest.setup.js           # Jest configuration
├── .babelrc                # Babel configuration
├── sonar-project.properties # SonarQube config
├── sonar-scanner.js        # SonarQube scanner script
└── azure-pipelines.yml     # Azure CI/CD pipeline
```

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- SonarQube server (cloud or self-hosted)
- Azure DevOps account (for CI/CD)

## Installation

1. **Install dependencies:**

```bash
npm install
```

## Running Tests

### Run all tests:

```bash
npm test
```

### Run tests with coverage:

```bash
npm run test:coverage
```

The test coverage report will be generated in the `coverage/` directory.

## Code Coverage Threshold

The project is configured to enforce **80% code coverage** across:
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

If coverage falls below these thresholds, the tests will fail.

## SonarQube Setup

### Local SonarQube Analysis

1. **Ensure SonarQube server is running** (default: http://localhost:9000)

2. **Set environment variables:**

```bash
export SONAR_HOST_URL=http://localhost:9000
export SONAR_TOKEN=your_sonar_token
export SONAR_PROJECT_KEY=react-login-demo
```

3. **Run tests with coverage:**

```bash
npm run test:coverage
```

4. **Run SonarQube analysis:**

```bash
npm run sonar
```

### Azure DevOps + SonarQube Integration

#### Step 1: Set up SonarQube Service Connection

1. Go to **Azure DevOps** → Your Project → **Project Settings**
2. Under **Pipelines**, click **Service connections**
3. Click **New service connection** → Select **SonarQube**
4. Fill in:
   - **Connection name:** `SonarQube-Connection`
   - **Server URL:** Your SonarQube server URL
   - **Token:** Your SonarQube token
5. Click **Save**

#### Step 2: Create Variable Group

1. Go to **Pipelines** → **Library**
2. Click **+ Variable group**
3. Name it: `sonarqube-vars`
4. Add variable:
   - **Name:** `SONAR_TOKEN`
   - **Value:** Your SonarQube token
   - Check **"Keep this value secret"**
5. Click **Save**

#### Step 3: Generate SonarQube Token

1. Log into your SonarQube server
2. Go to **My Account** → **Security** → **Generate Tokens**
3. Enter a name (e.g., "Azure DevOps")
4. Click **Generate**
5. Copy the token (you won't see it again!)

#### Step 4: Create a Project in SonarQube

1. In SonarQube, click **Create Project**
2. Choose **Manually**
3. **Project key:** `react-login-demo`
4. **Display name:** `React Login Demo`
5. Click **Set Up**

#### Step 5: Configure Azure Pipeline

1. Push your code to Azure Repos (or connect GitHub/Bitbucket)
2. Go to **Pipelines** → **Create Pipeline**
3. Select your repository
4. Choose **Existing Azure Pipelines YAML file**
5. Select `azure-pipelines.yml`
6. Click **Run**

## Azure Pipeline Overview

The pipeline performs the following steps:

1. **Install Node.js** (v18.x)
2. **Install dependencies** (`npm install`)
3. **Run tests with coverage** (`npm run test:coverage`)
4. **Publish test results** to Azure DevOps
5. **Publish code coverage** to Azure DevOps
6. **Prepare SonarQube analysis**
7. **Run SonarQube analysis**
8. **Publish Quality Gate results**

## Quality Gates

SonarQube will check your code against the following default criteria:

- **Coverage:** 80% minimum
- **Duplications:** < 3%
- **Maintainability Rating:** A
- **Reliability Rating:** A
- **Security Rating:** A

The pipeline will **fail** if the Quality Gate is not passed.

## Login Component Features

### Validation Rules:

- **Email:**
  - Required field
  - Must be valid email format
  
- **Password:**
  - Required field
  - Minimum 6 characters

### UI Features:

- Real-time error clearing on input
- Error highlighting with red borders
- Success screen after login
- Logout functionality to reset form

## Test Coverage

The test suite includes **25+ test cases** covering:

- Component rendering
- Input value changes
- Form validation (empty, invalid format, length)
- Error message display
- Error clearing behavior
- Successful form submission
- Success screen rendering
- Logout functionality
- Edge cases (whitespace, special characters)

## Troubleshooting

### Issue: SonarQube analysis fails

**Solution:** Ensure:
- Coverage report exists: `coverage/lcov.info`
- SonarQube token is valid
- Project key matches in all configs

### Issue: Tests fail with coverage below 80%

**Solution:** Add more test cases or adjust threshold in `package.json`

### Issue: Azure Pipeline can't find SonarQube connection

**Solution:** Verify service connection name matches `SonarQube-Connection` in `azure-pipelines.yml`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SONAR_HOST_URL` | SonarQube server URL | Yes |
| `SONAR_TOKEN` | SonarQube authentication token | Yes |
| `SONAR_PROJECT_KEY` | Unique project identifier | Yes |

## Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run sonar` | Run SonarQube analysis |

## License

MIT

## Author

Created for SonarQube integration demonstration

---

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Run tests: `npm run test:coverage`
3. ✅ Set up SonarQube server
4. ✅ Configure Azure DevOps pipeline
5. ✅ Push code and watch the pipeline run!

For questions or issues, please check the troubleshooting section above.
