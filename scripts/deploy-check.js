#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Pre-Deployment Checklist\n');
console.log('============================\n');

const checks = [];

// Check .env exists
if (fs.existsSync('.env')) {
  checks.push({ name: '.env file exists', status: '✅' });
} else {
  checks.push({ name: '.env file exists', status: '❌', fix: 'Copy .env.example to .env' });
}

// Check required files
const requiredFiles = [
  'server/index.js',
  'server/schema.sql',
  'client/package.json',
  'package.json',
  'Procfile',
  'render.yaml'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    checks.push({ name: `${file} exists`, status: '✅' });
  } else {
    checks.push({ name: `${file} exists`, status: '❌', fix: 'File missing!' });
  }
});

// Check package.json scripts
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (pkg.scripts.start) {
  checks.push({ name: 'start script defined', status: '✅' });
} else {
  checks.push({ name: 'start script defined', status: '❌', fix: 'Add "start": "node server/index.js"' });
}

if (pkg.scripts.build) {
  checks.push({ name: 'build script defined', status: '✅' });
} else {
  checks.push({ name: 'build script defined', status: '❌', fix: 'Add build script' });
}

// Check Node version
if (pkg.engines && pkg.engines.node) {
  checks.push({ name: 'Node.js version specified', status: '✅' });
} else {
  checks.push({ name: 'Node.js version specified', status: '⚠️', fix: 'Add engines.node to package.json' });
}

// Print results
checks.forEach(check => {
  console.log(`${check.status} ${check.name}`);
  if (check.fix) {
    console.log(`   → Fix: ${check.fix}`);
  }
});

console.log('\n============================\n');

const failed = checks.filter(c => c.status === '❌').length;
const warnings = checks.filter(c => c.status === '⚠️').length;

if (failed > 0) {
  console.log(`❌ ${failed} critical issue(s) found. Fix before deploying.`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`⚠️  ${warnings} warning(s). Deployment may work but review recommended.`);
} else {
  console.log('✅ All checks passed! Ready to deploy.');
  console.log('\n📖 See WEBSITE_DEPLOYMENT.md for deployment instructions.');
}

console.log('');
