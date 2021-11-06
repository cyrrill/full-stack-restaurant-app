FROM node:14
WORKDIR /app
COPY package.json .
RUN npm ci --prefer-offline --no-audit
COPY . .
EXPOSE 8080
CMD npm start