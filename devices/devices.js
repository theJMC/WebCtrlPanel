// Parse the devices.json file to add devices to the device list

//console.log(window.location.href.split("/")[2])

var url = "//" + window.location.href.split("/")[2] + ":1337" ;
var devicesArr;

// Get All Connected Devices
const getDevices = async () => {
  return new Promise((resolve) => {
    $.getJSON(url + "/api", (data) => {
      //console.log("Got JSON")
      //console.log("getDevices -> getJSON => " + JSON.stringify(data))
      devicesArr = data;
      resolve("Success");
    });
  });
};

// Test JSON Load method
function testJSON() {
  $.getJSON(url, function (data) {
    console.log(JSON.stringify(data));
    for (var key in data) {
      for (var key1 in data[key]) console.log(key1 + " -> " + data[key][key1]);
    }
  });
}

// Load All Devices into the webpage
function loadDevices() {
  //console.log("Initialised")
  var p = getDevices();
  p.then(() => {
    //console.log("Devices list FINAL => " + JSON.stringify(devicesArr))
    for (var key in devicesArr) {
      // main steup
      console.log("Key: " + key);
      var tRow = document.createElement("tr");
      var tName = document.createElement("td");
      tName.innerHTML =
        "<h1 class='display-6'>" + devicesArr[key]["name"] + "</h1>";
      var tCtrl = document.createElement("td");
      tCtrl.setAttribute("class", "align-middle");

      // switch Control Type 
      if (devicesArr[key]["ctrl_type"] == "switch") {
        var btnGroup = document.createElement("div");
        //btnGroup.setAttribute("class", "btn-group  btn-block");
        btnGroup.setAttribute("role", "group");
        var onBtn = document.createElement("a");
        onBtn.setAttribute("class", "btn btn-lg btn-primary btn-block");
        onBtn.setAttribute("onclick", "device(" + key + ", true);");
        onBtn.innerText = "On";
        var offBtn = document.createElement("a");
        offBtn.setAttribute("class", "btn btn-lg btn-primary btn-block");
        offBtn.setAttribute("onclick", "device(" + key + ", false);");
        offBtn.innerText = "Off";
        // Link Children
        btnGroup.appendChild(onBtn);
        btnGroup.appendChild(offBtn);
        tCtrl.appendChild(btnGroup);
        tRow.appendChild(tName);
        tRow.appendChild(tCtrl);
        document.getElementById("devices").appendChild(tRow);

        // toggle Control Type
      } else if (devicesArr[key]["ctrl_type"] == "toggle") {
        var btnGroup = document.createElement("div");
        //btnGroup.setAttribute("class", "btn-group  btn-block");
        btnGroup.setAttribute("role", "group");
        var toggleBtn = document.createElement("a");
        toggleBtn.setAttribute("class", "btn btn-lg btn-primary btn-block");
        toggleBtn.setAttribute("onclick", "device(" + key + ", true);");
        toggleBtn.innerText = "Toggle";
        // Link Children
        btnGroup.appendChild(toggleBtn);
        tCtrl.appendChild(btnGroup);
        tRow.appendChild(tName);
        tRow.appendChild(tCtrl);
        document.getElementById("devices").appendChild(tRow);
      } else {
        console.log(
          "Unsupported Control Method for " + devicesArr[key]["name"]
        );
      }
    }
  });
}

// Devices
function device(id, bool){
  if (devicesArr[id]["ctrl_type"] == "switch"){
    if (bool){
      $.ajax({
        url: url + "/device",
        type: "POST",
        contentType: "application/json",
        data: '{"id": "' + id + '", "state": ' + bool + "}" ,
        success: (result) => {
          $.toast({
          heading: 'Turned On ' + devicesArr[id]["name"],
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
    } else {
      $.ajax({
        url: url + "/device",
        type: "POST",
        contentType: "application/json",
        data: '{"id": "' + id + '", "state": ' + bool + "}" ,
        success: (result) => {
          $.toast({
          heading: 'Turned off ' + devicesArr[id]["name"],
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
          console.log("An Error Occured => " + error)
        }
      })
    }
  
  } else if ("toggle") {
    $.ajax({
      url: url + "/device",
      type: "POST",
      contentType: "application/json",
      data: '{"id": "' + id + '", "state": ' + bool + "}" ,
      success: (result) => {
        $.toast({
        heading: 'Toggled ' + devicesArr[id]["name"],
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
        console.log("An Error Occured => " + error)
      }
    })
  }
} 




// On Page Ready
$(document).ready(loadDevices());
