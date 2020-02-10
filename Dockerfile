FROM node:lts

# Create app directory
WORKDIR /app

ADD . /app
RUN npm install
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 5055

CMD ["node","dist/server.js"]
