$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyAXNKOhODoiYeacIQvr8ITuDDBY1MRImyM",
        authDomain: "train-scheduler-41e2e.firebaseapp.com",
        databaseURL: "https://train-scheduler-41e2e.firebaseio.com",
        projectId: "train-scheduler-41e2e",
        storageBucket: "train-scheduler-41e2e.appspot.com",
        messagingSenderId: "130452459380"
    };
    firebase.initializeApp(config);

    var trainData = firebase.database();

    $("#addTrain").on("click", function (event) {
        
        event.preventDefault();

        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = $("#firstTrainInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        }

        trainData.ref().push(newTrain);

        alert("Train Added!");

    })

    trainData.ref().on("child_added", function (snapshot) {
        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var firstTrain = snapshot.val().firstTrain;

        var startTimeConverted= moment(firstTrain,"hh:mm").subtract(5,"years");

        var remainder = moment().diff(moment(startTimeConverted), "minutes") % frequency;
        var minutes = frequency - remainder;
        var arrival = moment().add(minutes, "minutes").format("HH:mm");

        console.log(remainder);
        console.log(minutes);
        console.log(arrival);

        $("#body").append(
            "<tr><td>" + name + 
            "</td><td>" + destination + 
            "</td><td>" + frequency + 
            "</td><td>" + arrival + 
            "</td><td>" + minutes + "</td></tr>");

    })
})
