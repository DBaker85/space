FROM node:lts
RUN npm install pm2 -g
# Create app directory
WORKDIR /app
ADD . /app
RUN npm install
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production
EXPOSE 5055
# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
CMD ["node", "dist/server.js"]

