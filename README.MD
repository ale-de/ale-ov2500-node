
Welcome to the Alcatel-Lucent Enterprise OV2500 REST API node.
This node allows to perform REST API calls to the Alcatel-Lucent Enterprise OmniVista 2500 Network Manager and its cloud variant OV Cirrus (http://www.ovcirrus.com/).

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
                ov.getWlanClientList("CIRRUS").then((result) => {
                    console.log("Retrieved %d wlan clients from OV", result.length)
                }).catch(err => {
                    console.log("Error retrieving wlan clients from OV", err)
                });
                ov.getDevices().then((result) => {
                    console.log("Retrieved %d devices from OV", result.length)
                }).catch(err => {
                    console.log("Error retrieving devices from OV", err)
                });
                ov.getNotifications(["10.78.70.241"]).then((result) => {
                    console.log("Retrieved %d notifications from OV", result.length)
                }).catch(err => {
                    console.log("Error retrieving notifications from OV", err)
                });
                ov.getMacAddresses(["10.78.70.241"]).then((result) => {
                    console.log("Retrieved %d macaddresses from OV", result.length)
                }).catch(err => {
                    console.log("Error retrieving macaddresses from OV", err)
                });
                ov.getWlanAPIntrusionList().then((result) => {
                    console.log("Retrieved %d intrusive APs from OV", result.length)
                }).catch(err => {
                    console.log("Error retrieving intrusive APs from OV", err)
                });
                ov.getAuthRecordList().then((result) => {
                    console.log("Retrieved %d auth records from OV", result.length)
                }).catch(err => {
                    console.log("Error retrieving Auth records from OV", err)
                });
                ov.getAllAccountList().then((result) => {
                    console.log("Retrieved %d account records from OV", result.length)
                }).catch(err => {
                    console.log("Error retrieving account records from OV", err)
                });
                ov.getAllAccessRoleProfileList().then((result) => {
                    console.log("Retrieved %d Access role profiles from OV", result.length)
                }).catch(err => {
                    console.log("Error retrieving Access Role profiles from OV", err)
                });
                ov.getDeviceConfig(24).then((result) => {
                    console.log("Retrieved %d vlan devices from OV", result.length)
                }).catch(err => {
                    console.log("Error retrieving vlan devices from OV", err)
                });
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
```
**getWlanAPIntrusionList()** v0.1.3
Retrieve list of WLAN Access Points from OV2500 that are intrusive
```
```
**getAuthRecordList()** v0.1.4
Retrieve list of UPAM Authentication records from OV2500 that are intrusive
```
```
**addAccount(usr,pwd,profile,policy)** v0.1.5
Add account to OV2500 UPAM Account list
```
```
**getAllAccountList()** v0.1.5
Retrieve all accounts from OV2500 UPAM Account list
```
```
**getAllAccessRoleProfileList()** v0.1.5
Retrieve all Access Role profiles from OV2500 templates
```
```
**getDeviceConfig(vlan)** v0.1.5
Retrieve all devices from OV2500 assigned to specific vlan
```
