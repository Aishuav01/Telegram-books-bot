var request = require('request');
var TelegramBot = require('node-telegram-bot-api');
var token = '875786550:AAGyK9N_BcADS5kBXQW13dA4x2m4H5FRONc';

var bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if((msg.text.toLowerCase()) == 'hello' || (msg.text.toLowerCase()) == 'hi' || (msg.text.toLowerCase()) == 'hey'  )
    {
    bot.sendMessage(chatId, 'Hello '+ msg.chat.first_name  );
      
    bot.sendMessage(chatId, 'I am your Book Bot . Choose the category of book you  want and enter the category' );
    bot.sendMessage(chatId,'So , hit me up ! ' );
    try{
    request('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=Sns0aupN71GAHMuxH87V4qj8qdAEEqL8' , function(err, response, body) {
        if(err)
        {
             bot.sendMessage(msg.chat.id,'Sorry');
        }
        else
        {
        for(var i=0;i<=30;i++)
        {
          bot.sendMessage(msg.chat.id,   JSON.parse(body).results[i].list_name   );
          
        }
        // console.log(JSON.parse(body));    
        
        }
    })}
    catch(e)
    {
        bot.sendMessage(msg.chat.id,'Sorry');
    }


    }
    else if((msg.text.toLowerCase()) == 'thank you' || (msg.text.toLowerCase()) == 'thanks' || (msg.text.toLowerCase()) == 'ty')
    {
        bot.sendMessage(chatId, 'Anytime!');  
    }
    else if((msg.text.toLowerCase()) == 'bye')
    {
        bot.sendMessage(chatId, 'See you later,bye.'); 
    }
    
   
    else 
    {   
        
        request('https://api.nytimes.com/svc/books/v3/lists/current/'+msg.text.toLowerCase() +'.json?api-key=Sns0aupN71GAHMuxH87V4qj8qdAEEqL8' , function(err, response, body) {
                    if(err)
                    {
                     bot.sendMessage(msg.chat.id,'Sorry');
        
                    }
                    else
                    {
                        bot.sendMessage(msg.chat.id,  'Titles of this category');     
                     len = JSON.parse(body).results.books.length; 
                     for(var i=0;i<len;i++){
                        bot.sendMessage(msg.chat.id, JSON.parse(body).results.books[i].title);
                        
                     }
                     bot.on('message', (msg) => {
                        const chatId = msg.chat.id;
                        len = JSON.parse(body).results.books.length;
                        var cat = msg.text;
                        for(i=0;i<len;i++)
                        {
                           if(cat.toUpperCase() == JSON.parse(body).results.books[i].title )
                           {
                            bot.sendMessage(msg.chat.id,'Rank :' + JSON.parse(body).results.books[i].rank);
                            bot.sendMessage(msg.chat.id,'Title :' + JSON.parse(body).results.books[i].title);
                            bot.sendMessage(msg.chat.id,'Author :' + JSON.parse(body).results.books[i].author);
                            bot.sendMessage(msg.chat.id,'Description : ' + JSON.parse(body).results.books[i].description);
                            bot.sendMessage(msg.chat.id,'Buy at : ' + JSON.parse(body).results.books[i].amazon_product_url);
                           }
                        }
                    })
                    }
                    })
        
        

                    //How to change the URL
                    //how to stop the process
                    // try catch
               

            }

            
        }
        
           
          
        
    
  );

  

    