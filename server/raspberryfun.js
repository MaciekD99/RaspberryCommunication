
function servo(){
const Gpio = require('pigpio').Gpio;

const motor = new Gpio(10, {mode: Gpio.OUTPUT});


return new Promise((resolve) => { 
  var servoInterval = setInterval(runServo, 1000);
  let pulseWidth = 1000;
let increment = 100;
function runServo(){
motor.servoWrite(pulseWidth);

  pulseWidth += increment;
  if (pulseWidth >= 2000) {
    increment = -100;
  } else if (pulseWidth <= 1000) {
    increment = 100;
  }
}
setTimeout(() => {
  clearInterval(servoInterval);
  resolve()
}, 20000)
})


}


function blinkGreen(){
  var Gpio = require('onoff').Gpio; 
  var LED = new Gpio(17, 'out'); 
  return new Promise((resolve) => { 
    var blinkInterval = setInterval(blinkLED, 250); 
function blinkLED() { 
  if (LED.readSync() === 0) { 
    LED.writeSync(1); 
    
  } else {
    LED.writeSync(0); 
  }
}
setTimeout(() => {
clearInterval(blinkInterval); 
  LED.writeSync(0); 
  LED.unexport(); 
  resolve()
},5000)
  }) 
}
function blinkRed(){
  var Gpio = require('onoff').Gpio; 
  var LED = new Gpio(4, 'out'); 
  return new Promise((resolve) => { 
    var blinkInterval = setInterval(blinkLED, 250); 
function blinkLED() { 
  if (LED.readSync() === 0) { 
    LED.writeSync(1); 
    
  } else {
    LED.writeSync(0); 
  }
}
setTimeout(() => {
clearInterval(blinkInterval); 
  LED.writeSync(0); 
  LED.unexport(); 
  resolve()
},5000)
  })
}
function blinkYellow(){
  var Gpio = require('onoff').Gpio; 
  var LED = new Gpio(27, 'out'); 
  return new Promise((resolve) => { 
    var blinkInterval = setInterval(blinkLED, 250); 
function blinkLED() { 
  if (LED.readSync() === 0) { 
    LED.writeSync(1); 
    
  } else {
    LED.writeSync(0); 
  }
}
setTimeout(() => {
clearInterval(blinkInterval); 
  LED.writeSync(0); 
  LED.unexport(); 
  resolve()
},5000)
  }) 
}

function tryRed(){
  var Gpio = require('onoff').Gpio; 
  var LED = new Gpio(4, 'out'); 
  return new Promise((resolve) => {
    setTimeout(()=> {
      if (LED.readSync() === 0) { 
    LED.writeSync(1);   }
  
    },10)
  resolve()})
}
function endBlinkRed() {
  var Gpio = require('onoff').Gpio; 
  var LED = new Gpio(4, 'out');
  return new Promise((resolve) => {
    setTimeout(()=> {
      
    LED.writeSync(0); 
    LED.unexport(); 
      resolve()
},3000)})
}
function tryGreen(){
  var Gpio = require('onoff').Gpio; 
  var LED = new Gpio(17, 'out'); 
  return new Promise((resolve) => {
    setTimeout(()=> {
      if (LED.readSync() === 0) { 
    LED.writeSync(1);   }
  
    },10)
  resolve()})}
function endBlinkGreen() {
  var Gpio = require('onoff').Gpio; 
  var LED = new Gpio(17, 'out');
  return new Promise((resolve) => {
    setTimeout(()=> {
      
    LED.writeSync(0); 
    LED.unexport(); 
    resolve()
},3000)
  })}
  function tryYellow(){
  var Gpio = require('onoff').Gpio; 
  var LED = new Gpio(27, 'out'); 
  return new Promise((resolve) => {
    setTimeout(()=> {
      if (LED.readSync() === 0) { 
    LED.writeSync(1);   }
  
    },10)
  resolve()})}
function endBlinkYellow() {
  var Gpio = require('onoff').Gpio; 
  var LED = new Gpio(27, 'out');
  return new Promise((resolve) => {
    setTimeout(()=> {
      
    LED.writeSync(0); 
    LED.unexport(); 
    resolve()
},3000)
  })}

  function flowingLeds(){
    var Gpio = require('onoff').Gpio; 
var LED04 = new Gpio(4, 'out'), 
  LED17 = new Gpio(17, 'out'),
  LED27 = new Gpio(27, 'out');
  var leds = [LED04, LED17, LED27];
  var indexCount = 0; 
dir = "up"; 
return new Promise((resolve) => {
  var flowInterval = setInterval(flowingLeds, 300); 
    function flowingLeds() { 
  leds.forEach(function(currentValue) { 
    currentValue.writeSync(0); 
  });
  if (indexCount == 0) dir = "up"; 
  if (indexCount >= leds.length) dir = "down"; 
  if (dir == "down") indexCount--; 
  leds[indexCount].writeSync(1); 
  if (dir == "up") indexCount++ 
};
  setTimeout(() => {
  clearInterval(flowInterval); 
  leds.forEach(function(currentValue) {
    currentValue.writeSync(0); 
    currentValue.unexport(); 
    resolve()
  });
},5000)
}) }

async function oneByOne() {
  await tryRed();
  await endBlinkRed();
  await tryGreen();
  await endBlinkGreen();
  await tryYellow();
  await endBlinkYellow();
  await flowingLeds();
  await blinkRed();
  await blinkGreen();
  await blinkYellow();
  await servo();
}
// function tryRed(){
//   var Gpio = require('onoff').Gpio; 
//   var LED = new Gpio(4, 'out'); 
//   if (LED.readSync() === 0) { 
//     LED.writeSync(1);   
//   }


// }
// function endBlinkRed() {
//   var Gpio = require('onoff').Gpio; 
//   var LED = new Gpio(4, 'out');
//   LED.writeSync(0); 
//   LED.unexport(); 
// }




// function blinkGreen(){
//   var Gpio = require('onoff').Gpio; 
//   var LED = new Gpio(17, 'out'); 
//   var blinkInterval = setInterval(blinkLED, 250); 
// function blinkLED() { 
//   if (LED.readSync() === 0) { 
//     LED.writeSync(1); 
    
//   } else {
//     LED.writeSync(0); 
//   }
// }
//   function endBlink() { 
//   clearInterval(blinkInterval); 
//   LED.writeSync(0); 
//   LED.unexport(); 
// }
// setTimeout(endBlink, 5000); 
// }
// function tryGreen(){
//   var Gpio = require('onoff').Gpio; 
//   var LED = new Gpio(17, 'out'); 
//   if (LED.readSync() === 0) { 
//     LED.writeSync(1); 
//   }
// }
//  function endBlinkGreen() { 
//   var Gpio = require('onoff').Gpio; 
//   var LED = new Gpio(17, 'out'); 
//   LED.writeSync(0); 
//   LED.unexport(); 
//  }


// function blinkYellow(){
//   var Gpio = require('onoff').Gpio; 
//   var LED = new Gpio(27, 'out'); 
//   var blinkInterval = setInterval(blinkLED, 250); 
// function blinkLED() { 
//   if (LED.readSync() === 0) { 
//     LED.writeSync(1); 
    
//   } else {
//     LED.writeSync(0); 
//   }
// }
//   function endBlink() { 
//   clearInterval(blinkInterval); 
//   LED.writeSync(0); 
//   LED.unexport(); 
// }
// setTimeout(endBlink, 5000); 
// }
// function tryYellow(){
//   var Gpio = require('onoff').Gpio; 
//   var LED = new Gpio(27, 'out'); 
//   if (LED.readSync() === 0) { 
//     LED.writeSync(1); 
//   }
// }
// function endBlinkYellow() { 
//   var Gpio = require('onoff').Gpio; 
//   var LED = new Gpio(27, 'out'); 
//   LED.writeSync(0); 
//   LED.unexport();
// }



//  flowing leds //
// function flowingLeds(){
//     var Gpio = require('onoff').Gpio; 
// var LED04 = new Gpio(4, 'out'), 
//   LED17 = new Gpio(17, 'out'),
//   LED27 = new Gpio(27, 'out');
//   var leds = [LED04, LED17, LED27];
//   var indexCount = 0; 
// dir = "up"; 

// var flowInterval = setInterval(flowingLeds, 300); 

// function flowingLeds() { 
//   leds.forEach(function(currentValue) { 
//     currentValue.writeSync(0); 
//   });
//   if (indexCount == 0) dir = "up"; 
//   if (indexCount >= leds.length) dir = "down"; 
//   if (dir == "down") indexCount--; 
//   leds[indexCount].writeSync(1); 
//   if (dir == "up") indexCount++ 
// };

// function unexportOnClose() {
//   clearInterval(flowInterval); 
//   leds.forEach(function(currentValue) {
//     currentValue.writeSync(0); 
//     currentValue.unexport(); 
//   });
// };
// process.on('SIGINT', unexportOnClose);

//   function endBlink() { 
//  clearInterval(flowInterval); 
//   leds.forEach(function(currentValue) { 
//     currentValue.writeSync(0); 
//     currentValue.unexport(); 
//   });
// }
// setTimeout(endBlink, 5000); 
// }


                                /// Czujnik ///
function sensor(){
    var Gpio = require('pigpio').Gpio,
  trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
  echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});


var MICROSECDONDS_PER_CM = 1e6/34321;

trigger.digitalWrite(0); 

function measureDistance(callback) {
  var startTick;

  function alertHandler(level, tick) {
    var endTick,
      diff;

    if (level == 1) {
      startTick = tick;
    } else {
      endTick = tick;
      diff = (endTick >> 0) - (startTick >> 0); 
      callback(diff / 2 / MICROSECDONDS_PER_CM);
      echo.removeListener('alert', alertHandler);
    }
  }

  echo.on('alert', alertHandler);

  trigger.trigger(10, 1); 
}
const end = setInterval(function () {
  measureDistance(function (distance) {
    console.log(distance + 'cm');
  });
}, 1000);
setTimeout(() => {
  clearInterval(end);
}, 20000)

}

// function servo(){
// const Gpio = require('pigpio').Gpio;

// const motor = new Gpio(10, {mode: Gpio.OUTPUT});

// let pulseWidth = 1000;
// let increment = 100;

// const end = setInterval(() => {
//   motor.servoWrite(pulseWidth);

//   pulseWidth += increment;
//   if (pulseWidth >= 2000) {
//     increment = -100;
//   } else if (pulseWidth <= 1000) {
//     increment = 100;
//   }
  
//   console.log('start')
// }, 1000);

// setTimeout(() => {
//   clearInterval(end);
// }, 20000)

// }


module.exports = {oneByOne, endBlinkRed,blinkRed,blinkGreen,tryGreen,endBlinkGreen,tryRed, blinkYellow,tryYellow,endBlinkYellow,servo,sensor, flowingLeds };