#!/usr/bin/env bash
# Despliega la última versión de la rama main en el VPS.
# Uso: sudo bash deploy.sh
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$REPO_DIR/portfolio_Pablo"
DEPLOY_DIR="/var/www/html"
BRANCH="main"

echo "==> Actualizando código desde origin/$BRANCH"
cd "$REPO_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
# --ff-only falla si hay commits locales divergentes, en lugar de mezclarlos en silencio
git pull --ff-only origin "$BRANCH"

echo "==> Instalando dependencias"
cd "$APP_DIR"
npm ci

echo "==> Compilando la aplicación"
npm run build

echo "==> Copiando dist/ a $DEPLOY_DIR"
# --delete elimina de DEPLOY_DIR los ficheros que ya no existen en dist/
rsync -a --delete "$APP_DIR/dist/" "$DEPLOY_DIR/"

echo "==> Despliegue completado: $(git -C "$REPO_DIR" rev-parse --short HEAD)"
