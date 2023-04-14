@echo off

rem Change to the docker directory and start the containers
cd docker
start /B docker-compose up --build

rem Wait for the containers to start up
timeout /t 10 /nobreak >nul

rem Change to the dao api directory and start nodemon and create the database
cd ../src/dao/api
start /B node createBD.cjs
start /B nodemon api.cjs

rem Change to the dev planme directory and start the development server
cd ../../../dev/planme
start npm run vite