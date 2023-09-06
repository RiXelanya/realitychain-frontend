FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm start build
RUN npm install -g serve
CMD ["serve", "-s" ,"build"]
EXPOSE 3000