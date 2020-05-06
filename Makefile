install: 
	npm install

install-deps:
	npm ci

run:
	npx babel-node src/bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .
