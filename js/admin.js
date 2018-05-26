requirejs.config({
	baseUrl: '/js/lib',
	paths: {
		app: '../admin/main', // relative URL based on baseUrl
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'DP': {
			deps: ['jquery','bootstrap']
		},
		'DP_CN': {
			deps: ['jquery','bootstrap','DP']
		}
	}
});

// entry files
// window.onload = () => {
	requirejs(['../admin/main']);
// }