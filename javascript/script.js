var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cextracts&generator=search&pilimit=max&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrnamespace=0&gsrlimit=10&gsrsearch=';
const pageIDurl = 'https://en.wikipedia.org/?curid=';
const lookFor = document.querySelector('input[type=text]');
const cb = '&callback=JSON_CALLBACK'
var xmlhttp = new XMLHttpRequest();
function moveOnBitch(){
      lookFor.classList.add("afterFocus");
      $('.centralbox').css("padding-top", "70px");
    }
function moveOutBitch(){
  $('.centralbox').css("padding-top", "220px")
  lookFor.classList.remove("afterFocus");
}

function createBlock(semiIndex, semiTitle, semiEx) {
      document.querySelector('#centralID2').innerHTML +=
        ' <div class="generatedBlocks"><h1><a href="https://en.wikipedia.org/?curid=' + semiIndex +'">' + semiTitle + '</h1></a><p class="generatedContent">' + semiEx + '</p></div>'
    }

function wikiSearchTool(event){
  event.preventDefault();
  var req = new XMLHttpRequest();
  // Feature detection for CORS
    if ('withCredentials' in req) {
        req.open('GET', url + lookFor.value, true);
        // Just like regular ol' XHR
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status >= 200 && req.status < 400) {
                  var arr = Object.keys(this.query.pages).map(key => this.query.pages[key]);
                  console.log(arr[1].extract);
                  document.querySelector('#centralID2').innerHTML = '';
                  arr.forEach(function(a){
                    createBlock(a.pageid, a.title, a.extract);
                    console.log(a.title);
                  }
                )} else {
                    console.log('error');
                  };
            };
          };
          req.send();
    };
};
 function init() {
        document.querySelector('.sendButton').addEventListener('click', wikiSearchTool)
        lookFor.addEventListener('focus', moveOnBitch)
        lookFor.addEventListener('focusout', function(){
          if(document.querySelector('#searchCont').value==''){
            moveOutBitch();
          }
        })
        document.querySelector('form').addEventListener('submit', wikiSearchTool)
      }
init();
