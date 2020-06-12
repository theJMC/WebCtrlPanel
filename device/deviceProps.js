
var APIurl = "//" + window.location.href.split("/")[2] + ":420" ;
var devicesArr;

function loadProps(){
  $.getJSON(APIurl + "/api", (data) => {
    var devicesArr = data;

    let url = new URL(window.location);
    let param = url.searchParams.get("d");
    document.getElementById("name").innerHTML = devicesArr[param]["name"];
    document.getElementById("type").innerHTML = "Type: " + String(devicesArr[param]["type"]).charAt(0).toUpperCase() + String(devicesArr[param]["type"]).slice(1)
    document.getElementById("brand").innerHTML = "Brand: " + String(devicesArr[param]["ctrl"]["brand"]).charAt(0).toUpperCase() + String(devicesArr[param]["ctrl"]["brand"]).slice(1);
    console
    if (devicesArr[param]["type"] == "light") {
      var colourPicker = document.createElement("tr")
      colourPicker.innerHTML = '<tr id="colorPickerRow"><td><label for="colourPicker" class="h1">Colour Picker: </label><br><input type="color" style="width: 100%; height: 25px;" id="colourPicker" value="#0000ff"><button class="btn btn-primary btn-lg btn-block" onclick="colourChange();"> Set </button></td></tr>';
      document.getElementById("table").appendChild(colourPicker)
    }
  });
}

// On Page Ready
$(document).ready(loadProps());

function colourChange () {
  $.getJSON(APIurl + "/api", (data) => {
    var devicesArr = data;
    let url = new URL(window.location);
    let param = url.searchParams.get("d");

    var HEX = document.getElementById("colourPicker").value;

    console.log(HEX)

    if (devicesArr[param]["ctrl"]["brand"] == "hue"){

      $.ajax({
        url: APIurl + "/colour",
        beforeSend: function(request) {
          request.setRequestHeader("Access-Control-Allow-Headers", "*");
        },
        type: "POST",
        contentType: "application/json",
        data: {
          "id": param,
          "hex": HEX
        },
        crossDomain: true,
        success: (result) => {
          $.toast({
          heading: 'Changed ' + devicesArr[param]["name"] + "'s colour to " + HEX,
          showHideTransition: 'slide',
          position : 'top-right',
          bgColor: "#3c763d",
          loader: false
          })
          console.log("Sent Request")
        },
        error: (error) => {
          $.toast({
            heading: "An Error Occured - See Console for details",
            showHideTransition: 'slide',
            position : 'top-right',
            icon: "error",
            loader: false
            })
          console.log("An Error Occured")
        }
      })
    }
  })
}
