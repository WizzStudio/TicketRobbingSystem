requirejs.config({
	baseUrl: '/js/lib',
	paths: {
		app: '../admin' // relative URL based on baseUrl
	}
});

// entry files
window.onload = () => {
	requirejs(['../admin/main']);
}