install: 
	npm install

install-deps:
	npm ci

run:
	npx src/bin/gendiff.js --format json __fixtures__/before.json  __fixtures__/after.json
test:
	npx -n --experimental-vm-modules jest

watch:
	npx -n --experimental-vm-modules jest --watchAll

publish:
	npm publish --dry-run

lint:
	npx eslint .
