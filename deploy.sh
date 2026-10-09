#!/usr/bin/env bash
# Despliega la última versión de la rama main en el VPS.
# Uso: bash deploy.sh   (no usar sudo: git, npm y la clave SSH son de tu usuario;
#      sudo solo se pide para copiar a DEPLOY_DIR)
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
sudo rsync -a --delete "$APP_DIR/dist/" "$DEPLOY_DIR/"

echo "==> Despliegue completado: $(git -C "$REPO_DIR" rev-parse --short HEAD)"
