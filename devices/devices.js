// Parse the devices.json file to add devices to the device list

var url = "devices.json";

function getDevices(){
    $.getJSON(url, function(data) {
        console.log("Got JSON")
        console.log(JSON.stringify(data))
        return data;
        });
}

function testJSON() {
    $.getJSON(url, function(data) {
        console.log(JSON.stringify(data));
        for (var key in data) {
            for (var key1 in data[key])
            console.log(key1 + " -> " + data[key][key1]);
        }
    });
}

function loadDevices() {
    console.log("Initialised")
    var devices = getDevices();
    console.log("Devices list " + JSON.stringify(devices))
    for (var key in devices){
        console.log("Key: " + key)
        var tRow = document.createElement("tr");
        var tName = document.createElement("td");
        tName.innerHTML = "<h1 class='display-4'>" + devices[key]["name"] + "</h1>";
        var tCtrl = document.createElement("td");
        tCtrl.setAttribute("class", "align-middle");
        if (devices[key]["ctrl_type"] == "switch"){
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
            tRow.appendChild(tRow);
            document.getElementById("devices").appendChild(tRow);
        } else {
            console.log("Unsupported Control Method for " + devices[key]["name"])
        }

    }
}