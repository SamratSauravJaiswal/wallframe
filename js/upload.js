// Start upload preview image
var cool;
var showPic;
var i = 1;

$(".gambar").attr("src", "https://user.gadjian.com/static/images/personnel_boy.png");
var $uploadCrop,
	tempFilename,
	rawImg,
	imageId;
function readFile(input)
{
	if (input.files && input.files[ 0 ]) {
		var reader = new FileReader();
		reader.onload = function (e)
		{
			$('.upload-demo').addClass('ready');
			$('#cropImagePop').modal('show');
			rawImg = e.target.result;
		}
		reader.readAsDataURL(input.files[ 0 ]);
	}
	else {
		swal("Sorry - you're browser doesn't support the FileReader API");
	}
}

// crop viewport
$uploadCrop = $('#upload-demo').croppie({
	viewport: {
		width: 250,
		height: 250,
	},
	enforceBoundary: false,
	enableExif: true
});
$('#cropImagePop').on('shown.bs.modal', function ()
{

	$uploadCrop.croppie('bind', {
		url: rawImg
	}).then(function ()
	{
		console.log('jQuery bind complete');
	});
});

$('.item-img').on('change', function ()
{
	imageId = $(this).data('id'); tempFilename = $(this).val();

	$('#cancelCropBtn').data('id', imageId); readFile(this);
});
$('#cropImageBtn').on('click', function (ev)
{
	$uploadCrop.croppie('result', {
		type: 'base64',
		format: 'jpeg',
		size: { width: 320, height: 320 }
	}).then(function (resp)
	{
		$('#imgOutputs').attr('src', resp);
		localStorage.setItem(i, resp);
		showPic = localStorage.getItem(i);
		// console.log(showPic);
		$('#parent').append(`  
								 <img src= ${showPic } class="active-frame" />
								 <a class="remove-image" href="#" style="display: inline;">&#215;</a>		
                                `);

		i++;
		$('#cropImagePop').modal('hide');


	});
	cool = $('#imgOutputs');
	list = cool[ 0 ];


});
// End upload preview image
// add and remove .active
$('body').on('click', '.dropdown', function ()
{

	var self = $(this);

	if (self.hasClass('active')) {
		$('.dropdown').removeClass('active');
		return false;
	}

	$('.dropdown').removeClass('active');

	self.toggleClass('active');
	hide = false;
});










































//list previwe crop pic


				// function handleFileSelect() {

				// 	var files =  cool; // FileList object
				// 	// console.log(typeof(files));

				// 	  // Loop through the FileList and render image files as thumbnails.


				// 		var reader = new FileReader();

				// 		// Closure to capture the file information.
				// 		reader.onload = (function(theFile) {
				// 		  return function(e) {
				// 			// Render thumbnail.
				// 			var span = document.createElement('span');
				// 			span.innerHTML = ['<img class="thumb" src="', e.target.result,
				// 							  '" title="', escape(theFile.name), '"/>'].join('');

				// 			document.getElementById('list').insertBefore(span, null);
				// 			localStorage.setItem('img', e.target.result);
				// 		  };
				// 		})(files);

				// 		// Read in the image file as a data URL.
				// 		reader.readAsDataURL(files);

				// 	}

				// 	document.getElementById('file').addEventListener('change', handleFileSelect, false);


				// 	if(localStorage.img) { 

				// 		   var span = document.createElement('span');
				// 			span.innerHTML += ['<img class="thumb" src="', localStorage.img,
				// 							  '" title="test"/>'].join('');

				// 			document.getElementById('list').insertBefore(span, null);

				// 	  }