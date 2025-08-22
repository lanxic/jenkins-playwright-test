FROM mcr.microsoft.com/playwright:v1.47.0-jammy

WORKDIR /app

# copy package.json dulu
COPY package*.json ./
RUN npm install

# copy semua source termasuk tests/
COPY . .

# install browser + deps
RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test", "--reporter=html"]
