// Start upload preview image
var cool;
var showPic;
var saveImg = [];
var i = 1;

$('.gambar').attr('src', 'https://user.gadjian.com/static/images/personnel_boy.png');
var $uploadCrop, tempFilename, rawImg, imageId;
function readFile(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$('.upload-demo').addClass('ready');
			$('#cropImagePop').modal('show');
			rawImg = e.target.result;
		};
		reader.readAsDataURL(input.files[0]);
	} else {
		swal("Sorry - you're browser doesn't support the FileReader API");
	}
}

// crop viewport
$uploadCrop = $('#upload-demo').croppie({
	viewport: {
		width: 250,
		height: 250
	},
	enforceBoundary: false,
	enableExif: true
});
$('#cropImagePop').on('shown.bs.modal', function() {
	$uploadCrop
		.croppie('bind', {
			url: rawImg
		})
		.then(function() {
			console.log('jQuery bind complete');
		});
});

$('.item-img').on('change', function() {
	imageId = $(this).data('id');
	tempFilename = $(this).val();

	$('#cancelCropBtn').data('id', imageId);
	readFile(this);
});
$('#cropImageBtn').on('click', function(ev) {
	$uploadCrop
		.croppie('result', {
			type: 'base64',
			format: 'jpeg',
			size: { width: 320, height: 320 }
		})
		.then(function(resp) {
			$('#imgOutputs').attr('src', resp);
			localStorage.setItem(i, resp);
			showPic = localStorage.getItem(i);
			saveImg.push(showPic);
			console.log('saveImg-->', saveImg);
			$('#parent').append(`  
								 <img src= ${showPic} class="active-frame" />
								 <a class="remove-image" href="#" style="display: inline;">&#215;</a>		
                                `);

			i++;
			$('#cropImagePop').modal('hide');
		});
	cool = $('#imgOutputs');
	list = cool[0];
});
// End upload preview image
// add and remove .active
$('body').on('click', '.dropdown', function() {
	var self = $(this);

	if (self.hasClass('active')) {
		$('.dropdown').removeClass('active');
		return false;
	}

	$('.dropdown').removeClass('active');

	self.toggleClass('active');
	hide = false;
});
