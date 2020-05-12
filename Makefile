install: 
	npm install

install-deps:
	npm ci

# run:
# 	npx src/bin/gendiff.js __fixtures__/before.json __fixtures__/after.json

# run:
# 	npx src/bin/gendiff.js __fixtures__/before.yml __fixtures__/after.yml

run:
	npx src/bin/gendiff.js __fixtures__/before.ini __fixtures__/after.ini

test:
	npx -n --experimental-vm-modules jest

watch:
	npx -n --experimental-vm-modules jest --watchAll

publish:
	npm publish --dry-run

lint:
	npx eslint .
