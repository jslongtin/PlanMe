@REM ********************************************
@REM Fichier: run-script.bat
@REM Contexte: Script automatisant le demarage de l'application
@REM Auteurs: Jessika Longtin et Finnegan Simpson
@REM ********************************************


@REM ref : https://chat.openai.com/
@echo off

rem Change to the docker directory and start the containers
cd docker
start /B docker-compose up --build --detach

rem Wait for the containers to start up
:check_containers
timeout /t 5 /nobreak >nul
docker ps | findstr PlanMe
if %errorlevel% neq 0 goto check_containers

rem Change to the dao api directory and start nodemon and create the database
cd ../src/dao/api
start /B node createBD.cjs
start /B nodemon api.cjs

rem Change to the dev planme directory and start the development server
cd ../../../dev/planme
start npm run vite
@REM open  -a "Google Chrome" http:localhost:3000