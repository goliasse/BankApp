
$(document).ready(function (){
	// Load Account Summary by default
	$("#account-summary").load("includes/account-summary.html");
	// Account Summary and Budget Tabs Click //
	$('.tabs li').click(function(){
		$('.tabs li').removeClass('active');
		$(this).addClass('active');		
		var $contentTab = $(this).attr("data-tab-content")
		$("#"+$contentTab).load("includes/"+$contentTab+".html")
		$("#"+$contentTab).removeClass('hide');
		$('.tabs li').each(function(){
			var $contentTab = $(this).attr("data-tab-content")
			$("#"+$contentTab).hide()
		})
		$("#"+$contentTab).show()
		$('.icon-back').addClass('hide');
		$('#receipt, #upload').addClass('hide');
	});
	
	$(document).on("click",".acc-joint", function () {
        $('.wf-logo, .tabs, #account-summary, #receipt, #upload').addClass("hide");
		$("#jointcc").load("includes/jointcc.html")
        $('.txtJointCC, .icon-back, #jointcc').removeClass("hide");
		window.scrollTo(0,0);
    });
	// Back button click
    $('.icon-back').click(function () {
		var $actContentTab = $(".tabs li.active").attr("data-tab-content")
		$("#"+$actContentTab).load("includes/"+$actContentTab+".html")
		$("#"+$actContentTab).removeClass("hide");
		$("#"+$actContentTab).show();
        $('.wf-logo, .tabs').removeClass("hide");
        $('.txtJointCC, .icon-back, #jointcc, #upload, #receipt').addClass("hide");
    });
	// Click on single transaction 
	$(document).on("click","#jointcc .transactions li:eq(1)", function () {
		$("#receipt").load("includes/receipt.html")
        $('.wf-logo, .tabs, #receipt').removeClass("hide");
        $('.txtJointCC, #jointcc, #upload').addClass("hide");
        $('.acc-summary').addClass('active');
        $('.budget').removeClass('active');
    });
	// Next Button Click after Photo Captured
    $(document).on("click",".receipt_upload_success",function(){
		$(".upload-receipt .msg").show();
		$('#budget').addClass('active');
		$('#budget').removeClass('hide');
		window.scrollTo(0,0);
		$('#receipt, #upload').addClass('hide');
		$(".upload-receipt .msg").fadeOut(3000);
    });
});
       
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    document.addEventListener("deviceready",onDeviceReady,false);

    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
    // Called when a photo is successfully retrieved
    function onPhotoDataSuccess(imageData) {
		var receiptImage = document.getElementById('receipt_image');
		receiptImage.style.display = 'block';
		receiptImage.src = "data:image/jpeg;base64," + imageData;	
    }

    function onPhotoURISuccess(imageURI) {
      var largeImage = document.getElementById('largeImage');
      largeImage.style.display = 'block';
      largeImage.src = imageURI;
    }

    function capturePhoto() {
		$("#upload").load("includes/upload-receipt.html")
		$('#upload').removeClass('hide');
		$('#budget').addClass('hide');
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    function onFail(message) {
      //alert('Failed because: ' + message);
    }