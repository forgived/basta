const cfonts = require('cfonts')
const sound  = require('sound-play')
const path   = require('path')

function gettingLetters(numOfLetters) {
   let result           = ''
   let characters       = 'abcdefghijklmnopqrstuvwxyz'
   let charactersLength = characters.length
   for (let i = 0; i < numOfLetters; i++)
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
   return result
}

let fontConfig = {font: 'block',
	align: 'center',            
	colors: ['system'],         
	background: 'transparent',  
	letterSpacing: 1,           
	lineHeight: 1,              
	space: true,                
	maxLength: '0',             
	gradient: false,            
	independentGradient: false, 
	transitionGradient: false,  
	env: 'node'     	
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function beSet() {
	let contador = 1;
	
	for (let i  = 0; i < 3; i++) {
		await sleep(1000)
		cfonts.say('' + contador, fontConfig)
		contador ++
	}
}

async function launchLetter() {
	cfonts.say('...', fontConfig)
	await sleep(1000)
	cfonts.say(`-------------> ${gettingLetters(1)} <-------------`, fontConfig)
	await sleep(1000)
}

async function countDown() {
	let cronometro = 1
	let seconds = 70
	for (let i  = 0; i < seconds; i++) {
		await sleep(1000)
		cfonts.say(`${cronometro}`, fontConfig)
		cronometro ++
	}
}

async function enough() {
	sound.play(path.join(__dirname, '/sound/finish.mp3')).catch(err => console.log(err))
	cfonts.say('BASTA!!!!!!!', fontConfig)
}

async function startGame() {
	await beSet()
	await launchLetter()
	await countDown()
	await enough()
}

startGame()