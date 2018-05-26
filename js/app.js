requirejs.config({
	baseUrl: '/js/lib',
	paths: {
		app: '../app' // relative URL based on baseUrl
	}
});

// entry files
// window.onload = () => {
	requirejs(['app/main']);
// }
