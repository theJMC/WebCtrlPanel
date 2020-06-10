// Parse the devices.json file to add devices to the device list

//console.log(window.location.href.split("/")[2])

var url = "//" + window.location.href.split("/")[2] + ":420" ;
var actions

// Get All Quick Actions
const getActions = async () => {
  return new Promise((resolve) => {
    $.getJSON(url + "/quick", (data) => {
      actions = data;
      resolve("Success");
    });
  });
};

// Load All Quick Actions into webpage
function loadActions() {
  var p = getActions();
  p.then(() => {
    for (var key in actions) {
      // main steup
      console.log("Key: " + key);
      var tRow = document.createElement("tr");
      var tName = document.createElement("td");
      tName.innerHTML =
        "<h1 class='display-6'>" + actions[key]["name"] + "</h1>";
      var tCtrl = document.createElement("td");
      tCtrl.setAttribute("class", "align-middle");

      // Switch for method
      if (actions[key]["type"] == "room"){
        var btnGroup = document.createElement("div");
        //btnGroup.setAttribute("class", "btn-group  btn-block");
        btnGroup.setAttribute("role", "group");
        var onBtn = document.createElement("a");
        onBtn.setAttribute("class", "btn btn-lg btn-primary btn-block");
        onBtn.setAttribute("onclick", "roomAction(" + key + ", true);");
        onBtn.innerText = "On";
        var offBtn = document.createElement("a");
        offBtn.setAttribute("class", "btn btn-lg btn-primary btn-block");
        offBtn.setAttribute("onclick", "roomAction(" + key + ", false);");
        offBtn.innerText = "Off";
        // Link Children
        btnGroup.appendChild(onBtn);
        btnGroup.appendChild(offBtn);
        tCtrl.appendChild(btnGroup);
        tRow.appendChild(tName);
        tRow.appendChild(tCtrl);
        document.getElementById("devices").appendChild(tRow);

      } else if (actions[key]["type"] == "plug"){
        var btnGroup = document.createElement("div");
        //btnGroup.setAttribute("class", "btn-group  btn-block");
        btnGroup.setAttribute("role", "group");
        var toggleBtn = document.createElement("a");
        toggleBtn.setAttribute("class", "btn btn-lg btn-primary btn-block");
        toggleBtn.setAttribute("onclick", "plugAction(" + key + ", true);");
        toggleBtn.innerText = "Toggle";
        // Link Children
        btnGroup.appendChild(toggleBtn);
        tCtrl.appendChild(btnGroup);
        tRow.appendChild(tName);
        tRow.appendChild(tCtrl);
        document.getElementById("devices").appendChild(tRow);
        
      } else if (actions[key]["type"] == "wol-pc") {
        var btnGroup = document.createElement("div");
        btnGroup.setAttribute("role", "group");
        var onBtn = document.createElement("a");
        onBtn.setAttribute("class", "btn btn-lg btn-primary btn-block");
        onBtn.setAttribute("onclick", "wolAction();")
        onBtn.innerText = "On";
        btnGroup.appendChild(onBtn);
        tCtrl.appendChild(btnGroup);
        tRow.appendChild(tName);
        tRow.appendChild(tCtrl);
        document.getElementById("devices").appendChild(tRow);

      } else {
        console.log(
          "Unsupported Control Method for " + actions[key]["name"]
        );
      }
    }
  })
}

// Actions
function roomAction(id, bool) {
  if (bool) {
    $.ajax({
      url: url + "/action",
      type: "POST",
      contentType: "application/json",
      data: '{"id": "' + id + '", "state": true}',
      success: (result) => {
        $.toast({
        heading: 'Turned On ' + actions[id]["name"],
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
      url: url + "/action",
      type: "POST",
      contentType: "application/json",
      data: '{"id": "' + id + '", "state": false}',
      success: (result) => {
        $.toast({
        heading: 'Turned Off ' + actions[id]["name"],
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
}

function plugAction(id){
  $.ajax({
    url: url + "/action",
    type: "POST",
    contentType: "application/json",
    data: '{"id": "' + id + '"}',
    success: (result) => {
      $.toast({
      heading: 'Turned On ' + actions[id]["name"],
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

function wolAction(){
  $.ajax({
    url: url + "/wol",
    type: "get",
    success: (result) => {
      $.toast({
      heading: 'Turned On ' + actions[id]["name"],
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

// On Page Ready
$(document).ready(loadActions());
