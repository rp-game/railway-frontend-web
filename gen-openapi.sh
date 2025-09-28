# Generate openapi.json:                                                                                                              
curl -s http://localhost:3400/api/v1/docs-json | jq . > openapi.json

