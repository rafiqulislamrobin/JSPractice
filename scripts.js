const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotes =[];

//Get Random Quote
function randomQuote(){
  loading();
 const quote = quotes[Math.floor(Math.random() *quotes.length)];
 console.log(quote);
      if(!quote.author)
      {
        quoteAuthor.textContent ='unknown'
      }
      else
      {
        quoteAuthor.textContent =quote.author;
      }
      if(quote.text.length>80)
      {
        quoteText.classList.add('long-quote-text');
      }
      else
      {
        quoteText.classList.remove('long-quote');
      }
 quoteText.textContent =quote.text;
 hideLoading();
}

//tweet quote
function tweetQuote() {
  const tweetUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(tweetUrl, '_blank');
}

//Event listner
newQuoteBtn.addEventListener('click', randomQuote);
twitterBtn.addEventListener('click', tweetQuote);

//Get Quotes from Api
async function GetQuotes()
{
  loading();
  const ApiUrl = 'https://type.fit/api/quotes';
  try{
  const response = await fetch(ApiUrl);
   quotes = await response.json();
   randomQuote();
  }
  catch(error)
  {
      console.log(error);
      GetQuotes();
  }
}

//load on
function ShowLoading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

//load off
function hideLoading() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//On load
GetQuotes();