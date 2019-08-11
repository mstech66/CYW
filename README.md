# Crack Your Way
> A trivia game with a little twist of QR codes and complexity :satisfied:<br />
> [Click Here to See the Demo](http://cyw-srpec.herokuapp.com)
## Rules:
- There should be minimum 3 players and maximum 4 players in the game.
- Only one will play the quiz and one from the team would scan the qr codes from any QR code app. (for eg. CamScanner worked greatly in my testings)
- Solve 20 questions as fast as you can and you'll be the winner
## What I used?
- [Heroku](www.heroku.com) (for hosting purposes)
- [mLab](https://mlab.com/) (for the database)
- [QRExplore](https://qrexplore.com/) (for generating QR codes in bulk)
- Special thanks to DavidLibeau and Fontspace for fonts: [HACKED](http://www.fontspace.com/davidlibeau/hacked)
- Of course my brain to generate remaining falsified random QR codes
## QR sheets
- Our department had 2 floors with 12 rooms each so I used 10 QR codes per room ultimately resulting in 240 QR codesfrom which user only plays for 20 correct QR codes :grin:. Making it most complicated trivia game of all time in a techfest :smiling_imp:
- Here's one sheet, you can create as many as u want. I've created just 24 sheets (AV001 is the name of the classroom)
![QR Sheet - AV001](https://i.imgur.com/d2pUNlG.jpg)
## Bugs
- The QR code scanner which is based on JavaScript that I've used in the app is not working properly in some devices.
- mLab doesn't respond after the user's correct counter reaches above 5.
- You get the correct random generated code for each qr code, but they may belong to the same place sometimes. So, you have to sort'em out by yourself.
- And of course you have to generate random wrong codes which shouldn't match the correct codes. Which is just an app away from doing it, but I got myself busy in Project Work. But I'll update it later.
