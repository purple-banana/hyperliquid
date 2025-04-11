#!/bin/bash
find src -type f -name "*.ts" -exec sed -i '' 's/from "\([^"]*\)\.ts"/from "\1"/g' {} + 