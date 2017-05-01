function getParameterByName(name, url) { "use strict";
  if (!url){
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results){
    return null;
  }
  if (!results[2]){
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function updateFields(index){ "use strict";
  var status = JSON.parse($("#data").val());
  var i = Number(index);
  $("#contractNumber").html(status.contract[i]);
  $("#address").html(status.address[i]);
  var advance = '$' + status.advance[i].toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  $("#advance").html(advance);
  
  $("#image_agent").removeClass("check_on check_off").addClass(status.image_agent[i]);
  $("#image_broker").removeClass("check_on check_off").addClass(status.image_broker[i]);
  $("#image_title").removeClass("check_on check_off").addClass(status.image_title[i]);
  $("#image_funded").removeClass("check_on check_off").addClass(status.image_funded[i]);
  
  if (status.dts_agent[i] === ""){
    $("#description_agent").html("We require your digital signature via Docusign<sup>&reg;</sup>");
  }else{
    $("#description_agent").html("You signed on:<br>" + status.dts_agent[i]);
  }
  
  if (status.dts_broker[i] === ""){
    $("#description_broker").html("Your broker must approve your portion of the advance");
  }else{
    $("#description_broker").html("Your Broker signed on:<br>" +status.dts_broker[i]);
  }

  if (status.dts_title[i] === ""){
    $("#description_title").html("We will confirm your transaction with the closing company");
  }else{
    $("#description_title").html("Verification received on:<br>" + status.dts_title[i]);
  }

  if (status.dts_funded[i] === ""){
    $("#description_funded").html("We wire funds within one hour of approval during business hours");
  }else{
    $("#description_funded").html("Funded on:<br>" + status.dts_funded[i]);
  }

  //$("#description_agent").removeClass("is-hidden").addClass(status.description_agent[i]);
  //$("#description_broker").removeClass("is-hidden").addClass(status.description_broker[i]);
  //$("#description_title").removeClass("is-hidden").addClass(status.description_title[i]);
  //$("#description_funded").removeClass("is-hidden").addClass(status.description_funded[i]);

}

function initPage(){ "use strict";
  var status = JSON.parse($("#data").val());
  $("#firstName").html(status.firstName);

  if (status.error === ''){ //no error
    switch(status.count) {
      case 0:
        $("#noticeMessage").fadeIn("fast");
        $("#selectProperty").fadeOut("fast");
        $("#emptyImage").fadeIn("fast");
        $("#statusInformation").fadeOut("fast");
        break;
      case 1:
        $("#noticeMessage").fadeOut("fast");
        $("#selectProperty").fadeOut("fast");
        $("#emptyImage").fadeOut("fast");
        $("#statusInformation").fadeIn("fast");
        updateFields(0);
        break;
      default:
        for (var i=0; i < status.address.length; i++){
          $("#prop").append("<option value='"+i+"'>" + status.address[i] + "</option>");
        }
        $("#noticeMessage").fadeOut("fast");
        $("#selectProperty").fadeIn("fast");
        $("#emptyImage").fadeIn("fast");
        $("#statusInformation").fadeOut("fast");
    }
  }

}

$(document).ready(function(){ "use strict";

  $.ajax({
    url: '/bin/ajax/advance_status.a4p', //need this data file to host example
    type: "POST",
    data: {
      'id' : getParameterByName('id')
      },
    dataType : 'text',
    success: function(data) {
      var status = JSON.parse(data);
      if (status.error === ''){ //no error
        $("#data").val(data);
        initPage();
      }
    }
  });

  $("#prop").change(function () {
		var index = $("#prop").val(); 
    if (index === "-1") {
      $("#selectProperty").fadeIn("fast");
      $("#emptyImage").fadeIn("fast");
      $("#statusInformation").fadeOut("fast");
    }else{
      //$("#selectProperty").fadeOut("fast");
      $("#emptyImage").fadeOut("fast");
      $("#statusInformation").fadeIn("fast");
      updateFields(index);
    }

	});

});