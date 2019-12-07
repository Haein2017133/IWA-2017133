
$(function() {

	'use strict';
	window.addEventListener('load', function() {
		
	  // Fetch all the forms we want to apply custom Bootstrap validation styles to
	  var forms = document.getElementsByClassName('needs-validation');
	  // Loop over them and prevent submission
	  var validation = Array.prototype.filter.call(forms, function(form) {
		form.addEventListener('submit', function(event) {
		  console.log("validation ");
		  if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		  }
		  form.classList.add('was-validated');
		}, false);
	  });
	}, false);
 
  
    //hang on event of form with id=myform
    $("#bookAdd").submit(function(e) {
console.log("hey");
        //prevent Default functionality
        e.preventDefault();

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

    });

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

function select_row()
{
    

	$("#bookListTable tbody tr[id]").click(function ()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
	
		var entree = $(this).attr("id") - 1;
        delete_row( entree);
        console.log("entree", entree);

	})
};

function delete_row(ent)
{
    $("#delete").click(function ()
	{
		$.ajax(
		{
			url: '/book/delete',
			type: 'POST',
			data:
			{
				
				entree: ent
			},
			cache: false,
			success: setTimeout(draw_table,1000)
		})
	})
};

$(document).ready(function ()
{
	draw_table();
});