/* modal layer */
define((require) => {
	const swal = require('sweetalert')


	return {
		showHello: () => {
			swal({
				title: "Are you sure?",
				text: "Are you sure that you want to leave this page?",
				icon: "warning",
				dangerMode: true,
			})
				.then(willDelete => {
					if (willDelete) {
						swal("Deleted!", "Your imaginary file has been deleted!", "success");
					}
				});
		},
		showSuccess: (title, text) => {
			swal(title, text, 'success')
		},
		showError: (title, text) => {
			swal(title, text, 'error')
		},
		showSuccessMessage: (text) => {
			swal({
				icon: 'success',
				buttons:false,
				timer: 2000,
				text: text,
			});
		},
		showErrorMessage: (text) => {
			swal({
				icon: 'error',
				buttons:false,
				timer: 2000,
				text: text,
			});
		}
	}
});