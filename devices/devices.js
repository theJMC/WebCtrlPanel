// Parse the devices.json file to add devices to the device list

var url = "devices.json";
var devicesArr;

// Get All Connected Devices
const getDevices = async () => {
    return new Promise((resolve) => {
        $.getJSON(url, data => {
            //console.log("Got JSON")
            //console.log("getDevices -> getJSON => " + JSON.stringify(data))
            devicesArr = data;
            resolve("Success")
        });
    })
}

// Test JSON Load method
function testJSON() {
    $.getJSON(url, function(data) {
        console.log(JSON.stringify(data));
        for (var key in data) {
            for (var key1 in data[key])
            console.log(key1 + " -> " + data[key][key1]);
        }
    });
}

// Load All Devices into the webpage
function loadDevices() {
    //console.log("Initialised")
    var p = getDevices();
    p.then(() =>{
        //console.log("Devices list FINAL => " + JSON.stringify(devicesArr))
        for (var key in devicesArr){
            console.log("Key: " + key)
            var tRow = document.createElement("tr");
            var tName = document.createElement("td");
            tName.innerHTML = "<h1 class='display-6'>" + devicesArr[key]["name"] + "</h1>";
            var tCtrl = document.createElement("td");
            tCtrl.setAttribute("class", "align-middle");
            if (devicesArr[key]["ctrl_type"] == "switch"){
                var btnGroup = document.createElement("div");
                btnGroup.setAttribute("class", "btn-group");
                btnGroup.setAttribute("role", "group");
                var onBtn = document.createElement("a");
                onBtn.setAttribute("class", "btn btn-lg btn-primary");
                onBtn.setAttribute("onclick", "device(" + key + ", true);");
                onBtn.innerText = "On";
                var offBtn = document.createElement("a");
                offBtn.setAttribute("class", "btn btn-lg btn-primary");
                offBtn.setAttribute("onclick", "device(" + key + ", false);");
                offBtn.innerText = "Off";
                // Link Children
                btnGroup.appendChild(onBtn);
                btnGroup.appendChild(offBtn);
                tCtrl.appendChild(btnGroup);
                tRow.appendChild(tName);
                tRow.appendChild(tCtrl);
                document.getElementById("devices").appendChild(tRow);
            } else {
                console.log("Unsupported Control Method for " + devicesArr[key]["name"])
            }
        }
    })
    
}

// On Page Ready
$(document).ready(loadDevices())