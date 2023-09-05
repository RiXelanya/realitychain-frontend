FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install --force
CMD ["yarn", "start"]
EXPOSE 3000