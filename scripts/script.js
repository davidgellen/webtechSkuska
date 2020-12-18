function setCookie(cname,cvalue,exdays) {
    document.cookie = cname + "=" + cvalue + ";path=/";
    console.log(document.cookie);
  }

  function increaseCounterInCookies(newvalue){
    document.cookie = "visitCounter=" + newvalue + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    var counter=getCookie("visitCounter");
    if (counter != "") {
        counter = parseInt(counter) + 1;
        increaseCounterInCookies(counter);
        console.log("tu su cookies");
        console.log(counter);
    } else {
       counter = 1;
       console.log("tu nie su cookies");
       alert("Táto stránka používa cookies.");
       if (counter != "" && counter != null) {
         setCookie("visitCounter", counter, 30);
       }
       console.log("uz by mali byt");
    }
    document.getElementById("visitCounter").innerText = counter;
  }

  document.onload = checkCookie();
