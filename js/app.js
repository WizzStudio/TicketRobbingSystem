requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		app: '../app' // relative URL based on baseUrl
	}
});

// entry files
requirejs(['app/main']);
