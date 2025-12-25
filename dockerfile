FROM node:24-alpine

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./

RUN npm install

# copy source code
COPY . .

# build the app
RUN npm run build

# expose the port
EXPOSE 5000 

CMD ["npm", "run", "start"]