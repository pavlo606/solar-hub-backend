#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('Provide domain name');
  process.exit(1);
}

const Name = name.charAt(0).toUpperCase() + name.slice(1);

const files = [
  {
    template: 'module.ts.tpl',
    output: `${name}.module.ts`,
  },
  {
    template: 'service.ts.tpl',
    output: `${name}.service.ts`,
  },
  {
    template: 'controller.ts.tpl',
    output: `${name}.controller.ts`,
  },
  {
    template: 'repository.ts.tpl',
    output: `${name}.repository.ts`,
  },
  {
    template: 'dto/create.dto.ts.tpl',
    output: `dto/create-${name}.dto.ts`,
  },
  {
    template: 'dto/update.dto.ts.tpl',
    output: `dto/update-${name}.dto.ts`,
  },
  {
    template: 'dto/query.dto.ts.tpl',
    output: `dto/query-${name}.dto.ts`,
  },
];

const targetDir = path.join('src/modules', name);
fs.mkdirSync(targetDir, { recursive: true });
const dtoDir = path.join(targetDir, 'dto');
fs.mkdirSync(dtoDir, { recursive: true });

files.forEach(({ template, output }) => {
  const tpl = fs.readFileSync(`domainGenerator/templates/domain/${template}`, 'utf8');
  const content = tpl
    .replace(/{{name}}/g, name)
    .replace(/{{Name}}/g, Name);

  fs.writeFileSync(path.join(targetDir, output), content);
});

console.log(`Domain "${name}" generated`);