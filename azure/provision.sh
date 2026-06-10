#!/bin/bash

# ==========================================================
# CalcPilot Azure Resource Provisioning Script
# ==========================================================

# Variables - Customize these as needed
RESOURCE_GROUP="CalcPilotRG"
LOCATION="centralindia" # Good location for Indian consumers
APP_SERVICE_PLAN="calcpilot-plan"
FRONTEND_WEB_APP="calcpilot-web"
BACKEND_WEB_APP="calcpilot-api"
DB_SERVER="calcpilot-postgres"
DB_NAME="calcpilot"
DB_USER="calcpilotadmin"
DB_PASSWORD="YourSecurePassword123!" # Change in production!

echo "Starting Azure CLI Resource Provisioning for CalcPilot..."

# 1. Create Resource Group
echo "Creating Resource Group: $RESOURCE_GROUP..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# 2. Create Shared Linux App Service Plan
echo "Creating App Service Plan: $APP_SERVICE_PLAN..."
az appservice plan create \
    --name $APP_SERVICE_PLAN \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --sku B1 \
    --is-linux

# 3. Create Web App for Next.js Frontend
echo "Creating Frontend Web App: $FRONTEND_WEB_APP..."
az webapp create \
    --name $FRONTEND_WEB_APP \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_SERVICE_PLAN \
    --runtime "NODE:20-lts"

# 4. Create Web App for NestJS Backend REST API
echo "Creating Backend Web App: $BACKEND_WEB_APP..."
az webapp create \
    --name $BACKEND_WEB_APP \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_SERVICE_PLAN \
    --runtime "NODE:20-lts"

# 5. Create Azure Database for PostgreSQL (Flexible Server)
echo "Creating PostgreSQL Flexible Server: $DB_SERVER..."
az postgres flexible-server create \
    --resource-group $RESOURCE_GROUP \
    --name $DB_SERVER \
    --location $LOCATION \
    --admin-user $DB_USER \
    --admin-password $DB_PASSWORD \
    --sku-name Standard_B1ms \
    --tier Burstable \
    --database-name $DB_NAME \
    --yes

# Configure Connection String for the Backend App
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_SERVER.postgres.database.azure.com:5432/$DB_NAME?sslmode=require"

echo "Setting environment variables on Backend App Service..."
az webapp config appsettings set \
    --name $BACKEND_WEB_APP \
    --resource-group $RESOURCE_GROUP \
    --settings DATABASE_URL="$DATABASE_URL" PORT=8080 NODE_ENV=production

echo "=========================================================="
echo "Azure CLI Resource Provisioning completed successfully!"
echo "Please retrieve the publish profiles from the Azure Portal"
echo "and add them as Secrets in your GitHub repository:"
echo "1. AZURE_WEBAPP_FRONTEND_PUBLISH_PROFILE"
echo "2. AZURE_WEBAPP_BACKEND_PUBLISH_PROFILE"
echo "=========================================================="
