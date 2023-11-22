FROM node:current-alpine
WORKDIR /
COPY . .
RUN npm install
ENV NODE_ENV=production
CMD ["node", "server.js"]
EXPOSE 3000