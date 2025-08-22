FROM mcr.microsoft.com/playwright:v1.55.0-noble

# Set working directory
WORKDIR /app

# Copy package.json + package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy test source code
COPY tests/ ./tests

# Environment variables untuk folder hasil test
ENV PLAYWRIGHT_REPORT=/app/playwright-report
ENV PLAYWRIGHT_RESULTS=/app/test-results

# Default command: run tests + generate report
CMD ["npx", "playwright", "test", "--reporter=html", "--output", "/app/test-results", "--reporter", "line"]
