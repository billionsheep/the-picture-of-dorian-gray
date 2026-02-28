@echo off
echo ============================================
echo   The Picture of Dorian Gray
echo   Interactive Point-and-Click Game
echo ============================================
echo.
echo Starting local server...
echo.

REM 尝试用 Python 启动
where python >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Opening game in browser...
    start http://localhost:8000
    cd /d "%~dp0dist"
    python -m http.server 8000
    goto :end
)

REM 尝试用 Python3 启动
where python3 >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Opening game in browser...
    start http://localhost:8000
    cd /d "%~dp0dist"
    python3 -m http.server 8000
    goto :end
)

REM 尝试用 Node.js 启动
where npx >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo Opening game in browser...
    start http://localhost:3000
    cd /d "%~dp0dist"
    npx -y serve . -p 3000
    goto :end
)

echo ERROR: Neither Python nor Node.js found on this machine.
echo.
echo Please install one of:
echo   - Python: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo.
pause

:end
