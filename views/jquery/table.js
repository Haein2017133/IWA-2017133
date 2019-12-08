
$(function() {

	'use strict';
	// window.addEventListener('load', function() {
		
	//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
	//   var forms = document.getElementsByClassName('needs-validation');
	//   // Loop over them and prevent submission
	//   var validation = Array.prototype.filter.call(forms, function(form) {
	// 	form.addEventListener('submit', function(event) {
	// 	  console.log("validation ");
	// 	  if (form.checkValidity() === false) {
	// 		event.preventDefault();
	// 		event.stopPropagation();
	// 	  }
	// 	  form.classList.add('was-validated');
	// 	}, false);
	//   });
	// }, false);
 
  //real creation ***
    //hang on event of form with id=myform
    $("#bookAdd").submit(function(e) {
console.log("testing bookAdd");
        //prevent Default functionalityjkl;
		e.preventDefault();
		var form = document.getElementById('bookAdd');
		
		  if (form.checkValidity() === false) {
			event.stopPropagation();
			form.classList.add('was-validated');

		  } else {
			//get the action-url of the form
			var actionurl = e.currentTarget.action;

			//do your own request an handle the results
			$.ajax({
					url: actionurl,
					type: 'post',
					dataType: 'application/json',
					data: $("#bookAdd").serialize(),
					success: setTimeout(draw_table, 1000)
			});
		  }
    });

	$("#bookEdit").submit(function(e) {
		console.log("testing bookEdit");
		//prevent Default functionalityjkl;
		e.preventDefault();
		var form = document.getElementById('bookEdit');
		
			if (form.checkValidity() === false) {
				event.stopPropagation();
				form.classList.add('was-validated');

			} else {
				var editGenre = document.getElementById('editGenre');
				var editIsbn = document.getElementById('editIsbn');
				var editAuthor = document.getElementById('editAuthor');
				var editTitle = document.getElementById('editTitle');
				var editPublisher = document.getElementById('editPublisher');
				var editPublishedyear = document.getElementById('editPublishedyear');
				var editPrice = document.getElementById('editPrice');

				console.log("editGenre", editGenre.options[editGenre.selectedIndex].value);
				console.log("editIsbn", editIsbn.value);
				console.log("editAuthor", editAuthor.value);
				console.log("editTitle", editTitle.value);
				console.log("editPublisher", editPublisher.value);
				console.log("editPublishedyear", editPublishedyear.value);
				console.log("editPrice", editPrice.value);
				
				//get the action-url of the form
				var actionurl = '/book/update'
				console.log("testing server for update", $("#bookAdd").serialize());
				//do your own request an handle the results
				$.ajax({
						url: actionurl,
						type: 'post',
						dataType: 'application/json',
						data: {
							"selectedIndex" : editNumber, 
							"entree": { 
								"sec_genre": editGenre.options[editGenre.selectedIndex].value,
								"isbn": editIsbn.value,
								"author": editAuthor.value,
								"title": editTitle.value,
								"publisher": editPublisher.value,
								"publishedyear": editPublishedyear.value,
								"price": editPrice.value
							}
						},
						success: setTimeout(draw_table, 1000)
				});
			}
	});

	$("#bookDelete").click(function(e) {
	//	console.log(deletedArray.sort(function(a, b){return a-b}));
		$.ajax({
			url: '/book/delete',
			type: 'post',
			dataType: 'application/json',
			data: {
				"entree": deletedArray.sort(function(a, b){return a-b})
			},
			success: setTimeout(draw_table, 1000)
		});

		deletedArray = [];
	});
	//search
});

function draw_table()
{
	$("#results").empty();
	$.getJSONuncached = function (url)
	{
		return $.ajax(
		{
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#results").append(html);
				select_row();
			}
		});
	};
	$.getJSONuncached("/get/html")
};

// function bookDelete() {
//     var bookIdArray = [2, 3, 4, 5, 6];
//     postAjax("/book/delete", {selectedBooks : bookIdArray});
		var deletedArray = [];
		var editNumber;

function select_row()
{
	$("#bookListTable tbody tr[id] input").click(function ()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
        console.log("this value", this);
	
		var entree = $(this.parentNode.parentNode).attr("id") - 1;
       
		console.log("selectedEntree", entree);
		editNumber = entree;
		console.log("edited number", editNumber);
		
		if(deletedArray.includes(entree)) {
			var index = deletedArray.indexOf(entree);
			if (index > -1) {
				deletedArray.splice(index, 1);
			}	

		} else { 
			deletedArray.push(entree);
		}
		

	})
};



$(document).ready(function ()
{
	draw_table();
});

$(document).ready(function() {
	$("searchBt").click(function () {
	 $("#searchID").keyup(function() {
		 var k = $(obj.search);
		 $("#bookListTable> tbody > tr").hide();
	var temp = $("#bookListTable > tbody > tr > td:nth-child(8n+4):contains('" + k + "')");

		 $(temp).parent().show();
 
	  })
	 })
})