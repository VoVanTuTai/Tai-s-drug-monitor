let baseUrl = `${location.protocol}//${location.host}`;

$("table").rtResponsiveTables();

// Add drug
$("#add_drug").submit(function(event){
    alert($("#name").val() + " sent successfully!");
});

// Update drug
$("#update_drug").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value'];
    });

    var request = {
        url: `${baseUrl}/api/drugs/${data.id}`,
        method: "PUT",
        data: data
    };

    $.ajax(request)
      .done(function(response){
          alert(data.name + " Updated Successfully!");
          window.location.href = "/manage";
      })
      .fail(function(xhr, status, error){
          alert("Update failed: " + xhr.responseText);
      });
});

// Delete drug
if(window.location.pathname == "/manage"){
    $ondelete = $("table tbody td a.delete");
    $ondelete.click(function(){
        let id = $(this).attr("data-id");

        let request = {
            url: `${baseUrl}/api/drugs/${id}`,
            method: "DELETE"
        };

        if(confirm("Do you really want to delete this drug?")){
            $.ajax(request).done(function(response){
                alert("Drug deleted Successfully!");
                location.reload();
            });
        }
    });
}

// Purchase drug
if(window.location.pathname == "/purchase"){
    $("#drug_days").submit(function(event){
        event.preventDefault();
        $("#purchase_table").show();
        let days = +$("#days").val();
        let drugId = $("#drug_id").val();

        $.ajax({
            url: `${baseUrl}/api/purchase`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ id: drugId, quantity: days }),
            success: function(response) {
                alert("Drugs for " + days + " days purchased!");
                location.reload();
            },
            error: function(err) {
                alert("Error: " + err.responseJSON.error);
            }
        });
    });
}
