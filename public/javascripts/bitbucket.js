window.onload = function(){
    var getRepoButton = document.getElementById('getRepo');
    getRepoButton.onclick = function(){
        var getRepoName = document.getElementById('repoName').value;  
        console.log(getRepoName);
        if(getRepoName){
            window.location = `/bitbucket/get/${getRepoName}`;
        }
        else{
            alert("Enter Repo Name");
        }
        
    }
    // var createRepoButton = document.getElementById('createRepo');
    //     createRepoButton.onclick = function(){
    //         var getRepoName2 = document.getElementById('repoName2').value;  
    //         console.log(getRepoName2);
    //          if(getRepoName2){
    //             confirmRes = confirm("Do you want to continue");
    //             if(confirmRes == true){
    //                 window.location = `http://localhost:3000/bitbucket/create/${getRepoName2}`;
    //              }
    //          }
    //          else{
    //              alert("Enter Repo Name");
    //          }          
    //     }

    // var toggle = document.getElementById('toggle2');
    // toggle.onclick = function(){
    //     var div1 = document.getElementById('selectDiv');
    //     if(div1.display == "none"){
    //         div1.display == "block"
    //     }
    //     else{
    //         div1.display == "none"
    //     }
    //     console.log("Toggle Working")
    // }

   }
var homeButton = document.getElementById('homeButton');
homeButton.onclick = function(){
location.href = "/bitbucket/";
}