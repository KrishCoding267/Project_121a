Webcam.set
({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) 
    {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/BmTc-a1aB/model.json',modelLoaded);

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function modelLoaded()
{
    console.log('Model Loaded!');
}


function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "good")
        {
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "amazing")
        {
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        if(results[0].label == "victory")
        {
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
        if(results[0].label == "pointing")
        {
            document.getElementById("update_gesture").innerHTML = "&#128073;";
        }
        if(results[0].label == "crossed fingers")
        {
            document.getElementById("update_gesture").innerHTML = "&#9994;";
        }
        if(results[0].label == "horns")
        {
            document.getElementById("update_gesture").innerHTML = "&#129304;";
        }
        if(results[0].label == "bad")
        {
            document.getElementById("update_gesture").innerHTML = "&#128078;";
        }
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "My first prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}