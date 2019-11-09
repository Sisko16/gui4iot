/*** 
 * Author: Said Chaida 
 * Date: Oct 24 
 * ===
 * Sends on/off commands to the serial port
 * which turns the led attached to the Arduino on and off.
***/

function led()
{
    var fs          = require("fs");
    var serialPort  = require("serialport")

    const usbPort = "ttyACM0";
    const port    = new serialPort('/dev/' + usbPort );

    this.switchLed = function (value) {

       const ledValue = (value) ? "on" : "off";
       port.write(ledValue,  function(error) { return error});
       port.on   ('error',   function(error) { return error});
       return false;
    }
}

module.exports = led ;
