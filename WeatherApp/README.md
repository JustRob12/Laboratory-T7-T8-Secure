# Weather App

A React Native weather application with a secure backend deployment.

## Project Structure
```
WeatherApp/
├── App.js              # React Native frontend
├── backend/            # Node.js backend service
│   ├── server.js
│   ├── Dockerfile
│   └── .env
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js
- React Native CLI
- Docker
- OpenWeatherMap API key

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the React Native app:
   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with your OpenWeatherMap API key:
   ```
   PORT=3000
   OPENWEATHER_API_KEY=your_api_key_here
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### Docker Setup
1. Build the Docker image:
   ```bash
   cd backend
   docker build -t weather-app-backend .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env weather-app-backend
   ```

## AWS Deployment (ECS)

1. Create an Amazon ECR repository
2. Push the Docker image to ECR
3. Create an ECS cluster using Fargate
4. Store the OpenWeatherMap API key in AWS Secrets Manager
5. Configure security groups to allow traffic only on port 3000
6. Deploy the container using ECS task definitions

## Security Features

- Environment variables for sensitive data
- Helmet.js for security headers
- CORS configuration
- Non-root user in Docker
- AWS Secrets Manager for API key
- Restricted security group access 