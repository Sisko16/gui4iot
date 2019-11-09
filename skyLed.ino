/*
   Said Chaida
   Sunday,June 28, 2015
 */

#define LED 13
#define BAUDE_RATE 9600
#define DELAY 1000

#define LedIsOn digitalRead(LED) > 0 
#define LedOn   digitalWrite(LED,HIGH);
#define LedOff  digitalWrite(LED,LOW); 

String command = "off";

void setup() {
   
  Serial.begin(BAUDE_RATE);
  pinMode(LED, OUTPUT);
}

void loop() {
  
  while(Serial.available() == 0){ }
  
  command = Serial.readString();
  
  if (command == "off"){
     LedOff;
  } 
  
  if (command == "on"){
     LedOn;
  }
   
  delay(1000);        
}



