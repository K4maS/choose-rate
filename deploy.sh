#!/usr/bin/env sh
npm run build
# Остановить публикацию при ошибках
set -e

# Переход в котолог сборки
cd dist

# Инициация репозитория и загрузка кода в gitHub
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/K4maS/choose-rate.git master:gh-pages

cd -
