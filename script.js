const owl = document.getElementById('owl');
const letterOwl = document.getElementById('owl-with-letter');
const letterClosed = document.getElementById('closed-letter');
const letterOpen = document.getElementById('open-letter');
const img = Array.from(document.querySelectorAll('img'));

let clickTarget = null;

const dialogues = [
{text: 'Willkommen, Homer. Klicke auf den Bildschirm um das Spiel zu starten.',
    style: 'cursive'},
{text: '"Gäääähn ..."'},
{text: 'Nach einer langen Woche in der Pathologie bist du ganz erschöpft.'},
{text: '"Endlich Urlaub," murmelst du.'},
{text: 'Du schaust auf dein Handy - es kann nicht mehr lange dauern, bis dein Junggesellen-Sohn heimkommt und dich belagert.'},
{text: 'Und die Großeltern besucht ihr heute auch noch ...'},
{text: '"Ich sollte mich noch etwas ausruhen..."'},
{text: 'Du entscheidest, dir einen Kaffee aufzubrühen und deine Gedanken schweifen zu lassen.'},
{text: 'Es ist Muttertag und du hast noch nichts von deiner Tochter gehört. Du fragst dich, ob sie dich vergessen hat.'},
{text: '"Typisch", denkst du. "Die braucht mich auch nicht mehr."'},
{text: 'Du bist etwas enttäuscht. Hoffentlich geht es ihr gut...'},
{text: 'Du seufzt und schlürfst deinen Kaffee. Plötzlich hörst du ein Klopfen am Fenster.'},
{text: '"Na sowas," wunderst du dich und schaust nach.'},
{text: 'Du siehst ... nichts.'},
{text: '"Seltsam ..." Du drehst dich weg.'},
{text: 'Es klopft erneut.'},
{text: 'Du spürst Genervtheit in dir aufwallen. Mit den Jahren bist du leicht reizbar geworden - auch wenn du es nicht gerne zugibst.'},
{text: 'Stöhnend öffnest du das Fenster und spähst hinaus.'},
{text: 'Was??!!'},
{text: 'Ein Schatten stößt in den Raum.'},
{text: '"Ah!" Du erschrickst und weichst zurück.'},
{text: 'Dein Herz pocht dir bis zum Hals.',
    action: () => { owlAppears(); }},
{text: 'Auf einem der Stühle sitzt eine Eule mit neugierigem Blick. Sie trägt etwas im Schnabel.'},
{text: '"Was machst du denn hier?" fragst du engeistert und denkst an deinen Kater Rudolf.'},
{text: 'Die Eule starrt zurück. Dein Blick fällt auf das Objekt in ihrem Schnabel.'},
{text: '"Ein Brief?" wunderst du dich.'},
{text: 'Versuche den Brief entgegenzunehmen.',
    style: 'cursive', 
    action: () => { clickTarget = letterOwl }},
{text: 'Die Eule überlässt dir den Brief widerwillig.'},
{text: 'Du untersuchst den Umschlag, doch findest keinen Absender.'},
{text: '"Was guckst du denn so blöd?" krächzt plötzlich eine Stimme.',
    action: () => { nakedOwlAppears(); }},
{text: 'Du reißt den Kopf hoch. Die Eule starrt dich an und öffnet den Schnabel.'},
{text: '"Planschkuh," schiebt sie hinterher.'},
{text: '"Fette Eule," schießt du zurück.'},
{text: 'Für einen Moment herrscht betroffenes Schweigen.'},
{text: '"Entschuldigung," sagst du schließlich. "Du bist gar nicht fett."'},
{text: '"Du schon," sagt die Eule. "Und langsam. Mach endlich den Brief auf."'},
{text: '"Er hat keinen Absender," bemerkst du unsicher.'},
{text: 'Die Eule schnaubt. "Von wem soll er schon sein?"'},
{text: 'Du richtest den Blick wieder auf den Brief.',
    action: () => { closedLetterAppears(); }},
{text: 'Öffne den Brief.',
    style: 'cursive',
    action: () => { clickTarget = letterClosed }},
{text: 'Du überfliegst die erste Zeile. "Lieber Homer, ..."'},
{text: 'Ein Lächeln stielt sich auf dein Gesicht. Die Eule schnaubt genervt.'},
{text: 'Ziehe den Brief ganz heraus um ihn zu lesen.',
    style: 'cursive',
    action: () => { clickTarget = letterOpen }},
{text: 'Du lässt den Brief andächtig sinken und denkst an das einfallslose Geschenk deines Erstgeborenen.'},
{text: 'Du sinnierst darüber, wie sehr du deine Tochter bevorzugst. Sie soll das ganze Erbe haben, entscheidest du.',
    action: () => { nakedOwlAppears(); }},
{text: '"Weißt du - sie hat erst freitags herausgefunden, dass heute Muttertag ist," petzt die Eule. "Die Senioren haben\'s verraten."'},
{text: 'Du seufzst verliebt. "Das macht sie nur bemerkenswerter."'},
{text: 'Die Eule fährt fort: "Und zu faul passende Töne herauszusuchen und einzufügen war sie auch!"'},
{text: 'Du rümpfst die Nase. Bis jetzt hattest du die Abwesenheit jeglicher Hintergrundtöne gar nicht vermisst.'},
{text: 'Die Eule lacht eulig und breitet ihre Flügel aus.'},
{text: 'Sie ist genauso schnell weg wie sie gekommen ist.',
    action: () => { emptyDisplay();}},
{text: '"Zipfelhuber!" schreist du ihr hinterher und kicherst.'},
{text: 'Ist es nicht wundervoll, wenigstens ein hochbegabtes Nachkommen zu haben?'},
{text: 'Plötzlich hörst du unheilvolle Schritte auf der Treppe.'},
{text: '"Ey, Mudder."'},
{text: 'Dein ungelenker Sohn rollt in den Raum.'},
{text: '"Ich hab\' jetzt dann mal Hunger."'},
{text: 'Ende.',
    style: 'cursive'}
];

let currentIndex = 0;
const dialogueText = document.getElementById('dialogue-text');
const dialogueBox = document.getElementById('dialogue-box');
let isTyping = false;

//Typewriter Function
function typeWriter(text, speed = 30, callback) {
    let i = 0;
    dialogueText.textContent = "";
    isTyping = true;
    
    function type() {
        if (i < text.length) {
            dialogueText.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            isTyping = false;
            if(callback) callback();
        }
    }
    type();
}

function showNextDialogue() {
    if (isTyping || currentIndex >= dialogues.length || clickTarget) return;

    const entry = dialogues[currentIndex];
    
    dialogueText.textContent = ""; 
    
    if (entry.style === "cursive") {
        dialogueText.classList.add("cursive");  // Add cursive class
    } else {
        dialogueText.classList.remove("cursive");  // Remove cursive class if not needed
    }
    
    typeWriter(entry.text, 30, () => {
        if (entry.action) entry.action();
        currentIndex++;
        isTyping = false;
    });
}


//click handler
function handleClick(targetElement, nextImg = null) {
  return () => {
    if (clickTarget !== targetElement) return;

    if (nextImg) updateImg(nextImg);
    clickTarget = null;
    showNextDialogue();
  };
}


dialogueBox.addEventListener('click', showNextDialogue);

function updateImg(visibleImg, addClass = 'visible') {
    img.forEach(image => {
        if (image === visibleImg) {
            image.style.display = 'block';
            void image.offsetWidth; // trigger reflow for animation
            image.classList.add('visible');
        } else {
            image.style.display = 'none';
            image.classList.remove('visible');
        }
    });
}



//Show first dialogue on load
window.onload = () => {
    showNextDialogue();
}


//general functions
function owlAppears() {
    updateImg(letterOwl);
}

function nakedOwlAppears() {
    updateImg(owl);
}

function closedLetterAppears() {
    updateImg(letterClosed);
}

function emptyDisplay() {
    updateImg('');
}

letterOwl.addEventListener('click', handleClick(letterOwl, letterClosed));
letterClosed.addEventListener('click', handleClick(letterClosed, letterOpen));

// instert full letter

const fullLetterModal = document.getElementById('full-letter-modal');
const closeLetterButton = document.getElementById('close-letter-button');

letterOpen.addEventListener('click', () => {
    if (clickTarget !== letterOpen) return;
    fullLetterModal.classList.remove('hidden');
    dialogueBox.style.display = 'none';
    clickTarget = null;
    showNextDialogue();
});

// Close button hides the modal
closeLetterButton.addEventListener('click', () => {
    fullLetterModal.classList.add('hidden');
    dialogueBox.style.display = 'block';
});

