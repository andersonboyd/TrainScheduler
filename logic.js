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
    console.log(trainName, trainDest);
  }else{
    console.log(trainName, trainDest);
  }
}, function(errorObject){
  console.log("Read failed: "+errorObject.code);
});

$("#add-train").on("click", function(){
  trainName = $("#train-name").val().trim();
  trainDest = $("#train-dest").val().trim();
  trainTime = $("#train-time").val();
  trainFreq = $("#train-freq").val();
  database.ref().push({
    trainName: trainName,
    trainDest: trainDest,
    trainTime: trainTime,
    trainFreq: trainFreq
  })
  console.log(trainName, trainDest, trainTime, trainFreq);
});

database.ref().on("child_added", function(childSnapshot){
  var csv = childSnapshot.val();
  console.log(csv.trainName, csv.trainDest, csv.trainTime, csv.trainFreq);
});

