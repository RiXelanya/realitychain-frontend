FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s" ,"build"]
EXPOSE 3000