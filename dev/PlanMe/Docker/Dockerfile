FROM node:14-alpine

# Install PostgreSQL client
RUN apk update && \
    apk add --no-cache postgresql-client

# Set environment variables
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD AAAaaa111
ENV POSTGRES_DB synthese
ENV PORT 3001

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY ./server.cjs /usr/src/app/
COPY ./package*.json ./
COPY ./vite.config.js ./

# Expose API server port
EXPOSE $PORT

# Start API server
CMD ["npm", "start"]
