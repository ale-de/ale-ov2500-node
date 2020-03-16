const request = require('request');
var diff = require('deep-diff').diff;
const moment = require('moment-timezone');
const Rx = require('rxjs');

class OV {

    constructor(ip) {
        this.token = '';
        this.cookie = '';
        this.ip = ip;
        this.info = "";
        this.mode = "";
        this.url = 'https://' + this.ip;
    }

    get headers() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Ov-App-Version': '4.2.2.R01',
            'Cookie': this.cookie
        }
    }

    login(data) {
        return new Promise((resolve, reject) => {
            request.post({
                url: this.url + '/api/login',
                headers: this.headers,
                rejectUnauthorized: false,
                body: JSON.stringify({
                    userName: data.login.username,
                    password: data.login.password,
                }),
            }, (err, response, body) => {
                if (err) {
                    this.token = "";
                    return reject(err);
                }
                this.token = body.accessToken || "";
                this.cookie = response.headers['set-cookie'];
                this.about().then((info) => {
                    this.info = info;
                    //console.log(info);
                    let x = info.productName;
                    if (x.indexOf("Cirrus") !== -1) {
                        this.mode = "CIRRUS"
                    } else {
                        this.mode = "OV"
                    }
                    resolve(info);
                })
            });

        });
    }

    about() {
        return new Promise((resolve, reject) => {
            request.get({
                url: this.url + '/api/about',
                headers: this.headers,
                rejectUnauthorized: false,
            }, (err, response, body) => {
                if (err) return reject(err);
                try {
                    let result = JSON.parse(body);
                    let aboutInfo = result;
                    resolve(aboutInfo);
                } catch (err) {
                    reject("JSON Error")
                }
            });
        })
    }

    getDevices() {
        // devices?fieldSetName=discovery
        return new Promise((resolve, reject) => {
            request.get({
                url: this.url + '/api/devices?fieldSetName=discovery',
                headers: this.headers,
                rejectUnauthorized: false,
            }, (err, response, body) => {
                if (err) return reject(err);
                try {
                    let result = this.result2JSON(body)[0];
                    let devices = result.response;
                    resolve(devices);
                } catch (err) {
                    reject("JSON Error")
                }
            });
        })
    }

    getWlanClientList(mode) {
        switch (mode) {
            case "OV":
                return new Promise((resolve, reject) => {
                    request.post({
                        url: this.url + '/api/wma/onlineClient/getOnlineClientList',
                        headers: this.headers,
                        body: JSON.stringify(new OV_WlanClientList()),
                        rejectUnauthorized: false,
                    }, (err, response, body) => {
                        if (err) return reject(err);
                        try {
                            let result = this.result2JSON(body)[0];
                            let clients = result.data;
                            resolve(clients);
                        } catch (err) {
                            reject("JSON Error")
                        }
                    });
                });
            case "CIRRUS":
                return new Promise((resolve, reject) => {
                    request.get({
                        url: this.url + '/api/wma/onlineClient/getOnlineClientList',
                        headers: this.headers,
                        rejectUnauthorized: false,
                    }, (err, response, body) => {
                        if (err) return reject(err);
                        try {
                            let result = this.result2JSON(body)[0];
                            let clients = result.data;
                            resolve(clients);
                        } catch (err) {
                            reject("JSON Error")
                        }
                    });
                });
        }
    }

    //api/wma/wips/APlist/interfer
    getWlanAPIntrusionList() {
        return new Promise((resolve, reject) => {
            request.get({
                url: this.url + '/api/wma/wips/APlist/interfer',
                headers: this.headers,
                rejectUnauthorized: false,
            }, (err, response, body) => {
                if (err) return reject(err);
                try {
                    let result = this.result2JSON(body)[0];
                    let clients = result.data;
                    resolve(clients);
                } catch (err) {
                    reject("JSON Error")
                }
            });
        });
    }

    //api/ham/radius/authRecord/getAuthRecordList
    getAuthRecordList() {
        return new Promise((resolve, reject) => {
            request.get({
                url: this.url + '/api/ham/radius/authRecord/getAuthRecordList',
                headers: this.headers,
                rejectUnauthorized: false,
            }, (err, response, body) => {
                if (err) return reject(err);
                try {
                    let result = this.result2JSON(body)[0];
                    let clients = result.data;
                    resolve(clients);
                } catch (err) {
                    reject("JSON Error")
                }
            });
        });
    }

    //post api/ham/userAccount/addUser
    addAccount(usr,pwd,profile,policy) {
        return new Promise((resolve, reject) => {
            request.post({
                url: this.url + '/api/ham/userAccount/addUser',
                headers: this.headers,
                body: JSON.stringify(new OV_AddUser(usr,pwd,profile,policy)),
                rejectUnauthorized: false,
            }, (err, response, body) => {
                if (err) return reject(err);
                try {
                    let result = this.result2JSON(body)[0];
                    let accts = result.response;
                    resolve(accts);
                } catch (err) {
                    reject("JSON Error")
                }
            });
        });
    }

    //get api/ham/userAccount/getAllAccountList
    getAllAccountList() {
        return new Promise((resolve, reject) => {
            request.get({
                url: this.url + '/api/ham/userAccount/getAllAccountList',
                headers: this.headers,
                rejectUnauthorized: false,
            }, (err, response, body) => {
                if (err) return reject(err);
                try {
                    let result = this.result2JSON(body)[0];
                    let clients = result.data;
                    resolve(clients);
                } catch (err) {
                    reject("JSON Error")
                }
            });
        });
    }

    //get api/ag/uatemplate/AccessRoleProfile
    getAllAccessRoleProfileList() {
        return new Promise((resolve, reject) => {
            request.get({
                url: this.url + '/api/ag/uatemplate/AccessRoleProfile',
                headers: this.headers,
                rejectUnauthorized: false,
            }, (err, response, body) => {
                if (err) return reject(err);
                try {
                    let result = this.result2JSON(body)[0];
                    let clients = result.response;
                    resolve(clients);
                } catch (err) {
                    reject("JSON Error")
                }
            });
        });
    }

    //post api/ag/uatemplate/assign/AccessRoleProfile
    /*
    UnifiedProfileAssignRequestObject	{…}
        deviceRequests	{…}
            0	{…}
                configInfo	{…}
                    locationPolicy	<Inline Policy>
                    mappingType	Vlan
                    periodPolicy	<Inline Policy>
                    vlanNumber	24
                    deviceId	5ab501e2e4b02de9afc32211
                    deviceType	AP_GROUP
        documentIds	{…}
            0	5aba0c13e4b0f9907d47ea57
     */

    // post api/ag/deviceconfig/vlan/devices
    getDeviceConfig(vlan) {
        return new Promise((resolve, reject) => {
            request.post({
                url: this.url + '/api/ag/deviceconfig/vlan/devices',
                headers: this.headers,
                body: JSON.stringify(new OV_DeviceConfig(vlan)),
                rejectUnauthorized: false,
            }, (err, response, body) => {
                if (err) return reject(err);
                try {
                    let result = this.result2JSON(body)[0];
                    let devices = result.response;
                    resolve(devices);
                } catch (err) {
                    reject("JSON Error")
                }
            });
        });
    }


    getNotifications(ip) {
        return new Promise((resolve, reject) => {
            request.post({
                url: this.url + '/api/notifications/alarms',
                headers: this.headers,
                body: JSON.stringify(new OV_Notifications(ip, 100)),
                rejectUnauthorized: false,
            }, (err, response, body) => {
                if (err) return reject(err);
                try {
                    let result = this.result2JSON(body)[0];
                    let traps = result.response.trapData;
                    resolve(traps);
                } catch (err) {
                    reject("JSON Error")
                }
            });
        });
    }

    getNotificationsWithRetry(ip) {
        return Rx.from(new Promise((resolve, reject) => {
                request.post({
                    url: this.url + '/api/notifications/alarms',
                    headers: this.headers,
                    body: JSON.stringify(new OV_Notifications(ip, 100)),
                    rejectUnauthorized: false,
                }, (err, response, body) => {
                    if (err) return reject(err);
                    try {
                        let result = this.result2JSON(body)[0];
                        let traps = result.response.trapData;
                        if (traps.length === 0) {
                            return reject("No notifications");
                        }
                        if (traps.length > 1) traps.sort((a, b) => {
                            return a.instanceId - b.instanceId
                        });
                        resolve(traps);
                    } catch (err) {
                        return reject("JSON Error")
                    }
                });
            })
        ).retry(3);
    }

    getMacAddresses(ip) {
        return new Promise((resolve, reject) => {
            let ipList = "";
            ip.forEach((addr, idx) => {
                ipList = ipList + addr + (idx !== ip.length - 1 ? "," : "")
            });
            request.post({
                url: this.url + '/api/locator/browse',
                headers: this.headers,
                body: [ipList],
                rejectUnauthorized: false,
            }, (err, response, body) => {
                if (err) return reject(err);
                let result = this.result2JSON(body);
                let entries_f = result.filter((entry, idx) => {
                    return (entry.type === "LocatorFwdResponseObject");
                });
                let macs = [];
                entries_f.forEach(entry => {
                    entry.response.ovResponseObject.forEach(port => {
                        macs.push(port);
                    });
                });
                resolve(macs);
            });
        });
    }


    result2JSON(body) {
        let x = body.split("}{");
        if (x.length < 2) return [JSON.parse(body)];
        x.forEach((bdy, idx) => {
            switch (idx) {
                case 0:
                    x[idx] = JSON.parse(bdy + '}');
                    break;
                case x.length - 1:
                    x[idx] = JSON.parse('{' + bdy);
                    break;
                default:
                    x[idx] = JSON.parse('{' + bdy + '}');
            }
        });
        return x;
    }
}

module.exports = {
    OV: OV
};

class OV_Notifications {
    constructor(ip, num) {
        this.ack = 'FALSE';
        this.apGroups = null;
        this.count = num;
        this.filterBy = 'IP';
        this.ips = ip;
        this.mapIds = null;
        this.name = null;
        this.request = null;
        this.sessionKey = 0;
        this.severities = null;
        this.timeRange = null;
        this.type = 'GetTrapDataRequestObject';
        this.uniqueRequestId = 0;
    }
}

class OV_WlanClientList {
    constructor() {
        this.filterBy = "all";
        this.filterContent = "";
        this.startMac = "";
    }
}
class OV_DeviceConfig {
    constructor(vlan) {
        this.AGRequestObject = {
            objectType: 'AccessRoleProfile',
            others: {
                deviceType: "AP_GROUP",
                vlanNumber: vlan
            }
        }
    }
}
class OV_AddUser {
    constructor(usr, pwd, profile, policy) {
        this.accessRoleProfile = profile;
        this.password = pwd;
        this.policyList = policy;
        this.repeat = pwd;
        this.username = usr;
    }
}
