@echo off
title Beit Al-Fann Live
cd /d "%~dp0"

echo.
echo   Beit Al-Fann Live - starting the pitch build
echo   -------------------------------------------
echo.

if not exist "node_modules\" (
  echo   Installing dependencies, this runs once...
  call npm install || goto :failed
)

if not exist ".next\BUILD_ID" (
  echo   Building...
  call npm run build || goto :failed
)

echo   Starting on http://localhost:3000
echo   Leave this window open. Press Ctrl+C to stop.
echo.

start "" http://localhost:3000
call npm start
goto :eof

:failed
echo.
echo   Something went wrong. Scroll up for the error.
pause
