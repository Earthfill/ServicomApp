module.exports = {
	"env": {
		"node": true,
		"commonjs": true,
		"es2021": true,
		"jest/globals": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"plugins": [
		"react", "jest"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"eqeqeq": "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": [
			"error", "always"
		],
		"arrow-spacing": [
			"error", { "before": true, "after": true }
		],
		"no-console": 0,
		"react/prop-types": 0,
		"react/react-in-jsx-scope": "off"
	},
	"settings": {
    "react": {
      "version": "detect"
    }
	}
}
