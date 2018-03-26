
Welcome to the Alcatel-Lucent Enterprise OV2500 REST API node.
This node allows to perform REST API calls to the Alcatel-Lucent Enterprise OmniVista 2500 Network Manager

**Install**

`$ npm install --save ale-ov2500-node`

**Usage**

 

```
let OV = require('ale-ov2500-node');

let ov = new OV.OV("10.78.70.245");

ov.login({login: {username: "admin", password: "switch"}})
    .then(result => {
        console.log("OV login successful");
        ov.getDevices().then((result)=> {
            console.log("Retrieved %d devices from OV", result.length)
        }).catch(err=>{console.log("Error retrieving devices from OV", err)});
    }).catch(err => {
    console.log("Could not connect to OV");
});

```

**Supported methods**

```
**getDevices()**
Retrieve the list of devices in OV2500
```
```
**getNotifications([ipaddress])**
Retrieve list of notifications (traps) for device with IP Address in list  [<ipaddress>]
```
```
**getMacAddresses([ipaddresses])**
Retrieve list of MAC addresses for device with IP Address in list [<ipaddresses>]
```
```
**getWlanClientList()** v0.1.2
Retrieve list of connected WLAN Devices
```
```
**about()** v0.1.2
Provide version information of OV2500
```