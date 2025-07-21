import path from 'path';
import fs from 'fs';
import yaml from 'yaml';

const openapiPath = path.join(__dirname, './api/todo/todo.openapi.yml');
const openapiDoc = yaml.parse(fs.readFileSync(openapiPath, 'utf8'));

export default openapiDoc;
