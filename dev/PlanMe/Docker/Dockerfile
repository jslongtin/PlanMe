FROM node:14-alpine
FROM postgres:latest

# Set environment variables
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD AAAaaa111
ENV POSTGRES_DB synthese

# Copy SQL scripts to the Docker container
COPY docker-entrypoint-initdb.d/init.sql /docker-entrypoint-initdb.d/

# Install any dependencies
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils

# Expose PostgreSQL port
EXPOSE 5432
