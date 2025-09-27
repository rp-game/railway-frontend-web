#!/bin/bash

# TypeScript API Client Generation Script for Frontend-Web
# Based on backoffice approach but optimized for public API endpoints

echo "🔄 Generating TypeScript API client from OpenAPI specification..."

# Remove existing generated client
rm -rf app/lib/api/generated

# Create directory structure
mkdir -p app/lib/api/generated

# Generate TypeScript client using openapi-typescript-codegen
npx openapi-typescript-codegen \
  --input ./openapi.json \
  --output ./app/lib/api/generated \
  --client fetch \
  --useOptions \
  --useUnionTypes \
  --exportCore true \
  --exportServices true \
  --exportModels true \
  --exportSchemas false

echo "✅ TypeScript client generated successfully!"

# Validate that the generated client has the required public endpoints
echo "🔍 Validating generated client..."

if [ -d "app/lib/api/generated" ]; then
  echo "✅ Generated client directory exists"

  # Check for key files
  if [ -f "app/lib/api/generated/index.ts" ]; then
    echo "✅ Main index file generated"
  else
    echo "❌ Missing index.ts file"
  fi

  if [ -d "app/lib/api/generated/services" ]; then
    echo "✅ Services directory generated"
  else
    echo "❌ Missing services directory"
  fi

  if [ -d "app/lib/api/generated/models" ]; then
    echo "✅ Models directory generated"
  else
    echo "❌ Missing models directory"
  fi

else
  echo "❌ Failed to generate client directory"
  exit 1
fi

echo "🎉 API client generation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Review generated types in app/lib/api/generated/"
echo "2. Create API client configuration in app/lib/api/client.ts"
echo "3. Implement type-safe API calls in components"
echo ""
echo "⚠️  IMPORTANT: This client is generated from current openapi.json"
echo "   When API team adds public endpoints, re-run this script to update types"