var url = "//" + window.location.href.split("/")[2] + ":420" ;
var scenes

// Get All Quick Actions
const getScenes = async () => {
    return new Promise((resolve) => {
      $.getJSON(url + "/scenes", (data) => {
        scenes = data;
        resolve("Success");
      });
    });
  };

function loadScenes() {
  var p = getScenes();
  p.then(() => {
    for (var key in scenes) {
      // main steup
      console.log("Key: " + key);
      var tRow = document.createElement("tr");
      var tName = document.createElement("td");
      tName.innerHTML =
        "<h1 class='display-6'>" + scenes[key]["name"] + "</h1>";
      var tCtrl = document.createElement("td");
      tCtrl.setAttribute("class", "align-middle");

      // Switch for method
      if (scenes[key]["type"] == "scene"){
        var btnGroup = document.createElement("div");
        //btnGroup.setAttribute("class", "btn-group  btn-block");
        btnGroup.setAttribute("role", "group");
        var setBtn = document.createElement("a");
        setBtn.setAttribute("class", "btn btn-lg btn-primary btn-block");
        setBtn.setAttribute("onclick", "sceneAction(" + key + ", true);");
        setBtn.innerText = "Set";
        // Link Children
        btnGroup.appendChild(setBtn);
        tCtrl.appendChild(btnGroup);
        tRow.appendChild(tName);
        tRow.appendChild(tCtrl);
        document.getElementById("scenes").appendChild(tRow);
      } else {
        console.log(
          "Unsupported Control Method for " + scenes[key]["name"]
        );
      }
    }
  })
}

function sceneAction(id) {
  $.ajax({
    url: url + "/scene",
    type: "POST",
    contentType: "application/json",
    data: '{"id": "' + id + '"}',
    success: (result) => {
      $.toast({
      heading: 'Set ' + scenes[id]["name"] + " in " + scenes[id]["room"]["name"],
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
$(document).ready(loadScenes());
