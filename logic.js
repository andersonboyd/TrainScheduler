var firebaseConfig = {
  apiKey: "AIzaSyDqGErsRRG15I3aB_CqbkfGdGikZW0AiGI",
  authDomain: "trainscheduler-a2b86.firebaseapp.com",
  databaseURL: "https://trainscheduler-a2b86.firebaseio.com",
  projectId: "trainscheduler-a2b86",
  storageBucket: "trainscheduler-a2b86.appspot.com",
  messagingSenderId: "866300391516",
  appId: "1:866300391516:web:81cd7c34eb443d5e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var trainName;
var trainDest;
var trainTime;
var trainFreq;
var minutesAway;
var nextArrival;

database.ref().on("value", function(snapshot){
  var sv = snapshot.val();
  if(snapshot.child("trainName").exists() && snapshot.child("trainDest").exists()){
    trainName = sv.trainName;
    trainDest = sv.trainDest;
    trainTime = sv.trainTime;
    trainFreq = sv.trainFreq;
    console.log(trainName, trainDest);
  }else{
    console.log(trainName, trainDest);
  }
}, function(errorObject){
  console.log("Read failed: "+errorObject.code);
});

$("#add-train").on("click", function(){
  trainName = $("#train-name").val();
  trainDest = $("#train-dest").val();
  trainTime = $("#train-time").val();
  trainFreq = $("#train-freq").val();
  var newTrain = {
    name: trainName,
    dest: trainDest,
    time: trainTime,
    freq: trainFreq
  }

  database.ref().push(newTrain);
  console.log(newTrain);

  $("#train-name").val("");
  $("#train-dest").val("");
  $("#train-time").val("");
  $("#train-freq").val("");
});

database.ref().on("child_added", function(childSnapshot){
  var csv = childSnapshot.val();
  console.log(csv.name, csv.dest, csv.time, csv.freq);
  var newName = csv.name;
  var newDest = csv.dest;
  var newTime = csv.time;
  var newFreq = csv.freq;

  var newTimeConverted = moment(newTime).subtract(1, "years");
  console.log(newTimeConverted);

  var currentTime = moment();
  var currentTimeFormatted = moment(currentTime).format("hh:mm");
  console.log("CURRENT TIME: "+ currentTimeFormatted);

  var diffTime = moment(currentTimeFormatted).diff(moment(newTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: "+diffTime);

  var remainder = diffTime % newFreq;
  console.log(remainder);

  minutesAway = newFreq - remainder;
  console.log(minutesAway);

  nextArrival = moment(currentTimeFormatted).add(minutesAway, "minutes");
  console.log(nextArrival);

  $("#train-table > tbody").append(
    $("<tr>").append(
      $("<td>").text(newName),
      $("<td>").text(newDest),
      $("<td>").text(newFreq),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    )
  );
});

