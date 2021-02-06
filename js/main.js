(() => {
  'use strict';

  const firebaseConfig = {
   apiKey: "AIzaSyBr97Y2cF_SXi_NMe2ZqiTvgjCvCaAzypg",
   authDomain: "myfirebasechatapp-5b2b1.firebaseapp.com",
   projectId: "myfirebasechatapp-5b2b1",
   storageBucket: "myfirebasechatapp-5b2b1.appspot.com",
   messagingSenderId: "105026776417",
   appId: "1:105026776417:web:fd009792fa6f31c61c2920",
   measurementId: "G-F52P19QS60"
  };

  try {
  firebase.initializeApp(firebaseConfig);
  } catch(e) {
  console.log(e);
  }
  //databeseと接続
  var db = firebase.firestore();
  var storage = firebase.storage();


    var imgRef = storage.ref("IMG_1721_Original.JPG");
    imgRef.getDownloadURL().then((url) => {
      document.querySelector("#msg").textContent = url;
      var xhr = new XMLHttpRequest();
      xhr.onload = (event)=> {
        var blob = xhr.response;
        let im = document.querySelector("#img");
        im.src = URL.createObjectURL(blob);
      };
      xhr.open("GET", "url");
      xhr.send();
    }).catch(function(error) {
      console.log(error);
    });


  // $("#img-sample").

  // ログイン-----------------------------------------
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      console.log("auth user", user);
      document.querySelector("#msg").textContent = '"' + user.email + '"" logged!';
    }
  });

  //login
  $("#login").on("click", function() {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("Hello");
        console.log("sign in successfully.");
      }).catch((error) => {
        console.log(error.massege);
        document.querySelector("#msg").textContent = "fail to login...";
      });
  })
  
  //logout
  $("#logout").on("click", function() {
    firebase.auth().signOut();
    document.querySelector("#msg").textContent = "no login...";
  })

  function touroku() {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    console.log(email, password);

    // // 会員登録----------------------------
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  }



  //リアルタイム投稿-----------------------
  let coll = db.collection("people");

  coll.onSnapshot((querySnapshot) => {
    let result = "";
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      let data = doc.data();
      result += "<div class='col col-sm-6'>" + data.title + "[" + data.content + ":" + data.goal * "]</div>";
    });
  });



  //新規投稿----------------------------
  const iframePost = document.getElementById('iframe_post');

  $("#submit_post").on("click", function() {
    let tle = iframePost.contentWindow.document.querySelector("#title");
    let cnt = iframePost.contentWindow.document.querySelector("#content");
    let gl = iframePost.contentWindow.document.querySelector("#goal");
    console.log(iframePost);
    db.collection("people").add({
      title: tle.value,
      content: cnt.value,
      goal: gl.value
    })
    .then(() => {
      tle.value = "";
      cnt.value = "";
      gl.value = "";
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  })

})();
  
  