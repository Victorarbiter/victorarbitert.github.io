// fungsi js untuk memblock back button dalam browser agar hanaya bisa diakses dari back yang disediakan
window.history.forward(); 
function noBack() { 
    window.history.forward();
    runPrompt = false; 
} 

// Wait for device API libraries to load
    //
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    // device APIs are available
    //
    function onDeviceReady() {
        // Register the event listener
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    // Handle the back button
    //
    function onBackKeyDown() {
    }