#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('Provide domain name');
  process.exit(1);
}

const Name = name
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

const camelName = Name.charAt(0).toLowerCase() + Name.slice(1);

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

if (fs.existsSync(targetDir)) {
  console.error(`This domain already exists in ${targetDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });
const dtoDir = path.join(targetDir, 'dto');
fs.mkdirSync(dtoDir, { recursive: true });

console.log(`\nGenerating "${name}" domain...\n`);

files.forEach(({ template, output }, i) => {
  console.log(
    ` - generating ${output} ${(((i + 1) * 100) / files.length).toFixed(0)}%`,
  );
  const tpl = fs.readFileSync(
    `domainGenerator/templates/domain/${template}`,
    'utf8',
  );
  const content = tpl
    .replace(/{{name}}/g, name)
    .replace(/{{Name}}/g, Name)
    .replace(/{{camelName}}/g, camelName);

  fs.writeFileSync(path.join(targetDir, output), content);
});

console.log(`\nDomain "${name}" generated`);
