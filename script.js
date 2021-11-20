
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
    button.disabled = !button.disabled;
  }
 
  var apikey = config.apiKey;
function tellME(joke) {

    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
        key: apikey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
  }


  // Get jokes from Joke API
  async function getJokes(){
    let joke = '';
      try{
        const jokesUrl ='https://v2.jokeapi.dev/joke/Dark,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist'
        const response = await fetch(jokesUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
          } else {
            joke = data.joke;
          }
          tellME(joke);
          toggleButton();
      }
      catch(error){
          console.log(error);
      }
  }
  button.addEventListener('click', getJokes);
  audioElement.addEventListener('ended', toggleButton);