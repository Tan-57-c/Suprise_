const scene = document.getElementById("scene");
const backBtn = document.getElementById("backBtn");
const bubbles = document.getElementById("bubbles");
const particles = document.getElementById("particles");
const paintLayer = document.getElementById("paintLayer");
const confetti = document.getElementById("confetti");
const postCredits = document.getElementById("postCredits");

let currentScene = "intro";
let history = [];
let sequenceId = 0;

let bubbleFadeStarted = false;
let finalReached = false;

/* =========================
   HELPERS
========================= */

function wait(ms, id = sequenceId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(id === sequenceId);
    }, ms);
  });
}

function cancelSequence() {
  sequenceId++;
}

function render(html) {
  scene.innerHTML = html;

  scene.classList.remove("sceneIn");

  void scene.offsetWidth;

  scene.classList.add("sceneIn");
}

function setScene(name, { push = true } = {}) {

  if (push && currentScene !== name) {
    history.push(currentScene);
  }

  currentScene = name;

  backBtn.classList.toggle(
    "visible",
    !["intro", "final"].includes(name)
  );
}

function resetBody() {
  document.body.className = "";
}

/* =========================
   BUBBLES
========================= */

function createBubbleWorld() {

  for (let i = 0; i < 18; i++) {

    const b = document.createElement("div");

    b.className = "bubble";

    const size = 25 + Math.random() * 65;

    b.style.setProperty(
      "--size",
      `${size}px`
    );

    b.style.setProperty(
      "--x",
      `${Math.random() * 96}%`
    );

    b.style.setProperty(
      "--y",
      `${Math.random() * 92}%`
    );

    /*
      CONTROLLED movement.
      Kept intentionally subtle.
    */

    b.style.setProperty(
      "--mx",
      `${-20 + Math.random() * 40}px`
    );

    b.style.setProperty(
      "--my",
      `${-20 + Math.random() * 40}px`
    );

    b.style.setProperty(
      "--time",
      `${9 + Math.random() * 7}s`
    );

    bubbles.appendChild(b);
  }
}

function createParticles() {

  for (let i = 0; i < 32; i++) {

    const p = document.createElement("div");

    p.className = "particle";

    p.style.left =
      `${Math.random() * 100}%`;

    p.style.top =
      `${Math.random() * 100}%`;

    p.style.setProperty(
      "--mx",
      `${-30 + Math.random() * 60}px`
    );

    p.style.setProperty(
      "--my",
      `${-40 + Math.random() * 80}px`
    );

    p.style.setProperty(
      "--time",
      `${5 + Math.random() * 8}s`
    );

    particles.appendChild(p);
  }
}

function fadeBubbles() {

  if (bubbleFadeStarted) return;

  bubbleFadeStarted = true;

  bubbles.style.opacity = "0";
}

function restoreBubbles() {

  bubbleFadeStarted = false;

  bubbles.style.opacity = "1";
}

/* =========================
   INTRO
========================= */

function intro() {

  cancelSequence();

  resetBody();

  history = [];

  finalReached = false;

  postCredits.classList.remove("show");

  setScene("intro", { push: false });

  render(`
    <p class="short">yo</p>
  `);

  setTimeout(() => {

    if (currentScene !== "intro") return;

    render(`
      <p class="short">I have a question.</p>
    `);

    setTimeout(() => {

      if (currentScene === "intro") {
        q1();
      }

    }, 2200);

  }, 1800);
}

/* =========================
   Q1
========================= */

function q1() {

  cancelSequence();

  resetBody();

  restoreBubbles();

  setScene("q1");

  render(`
    <div class="glass">

      <p class="question">
        Are you actually Trisha?
      </p>

      <div class="options">

        <button
          class="option"
          onclick="selectAnswer(this,q1Answer,'yes')"
        >
          👀 Yes
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q1Answer,'obvious')"
        >
          🙄 Obviously
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q1Answer,'no')"
        >
          🕵️ No
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q1Answer,'who')"
        >
          🤨 Who's asking?
        </button>

      </div>

    </div>
  `);
}

function q1Answer(a) {

  const replies = {

    yes:
      `Hmm. Suspiciously confident.`,

    obvious:
      `That's exactly what a fake Trisha would say.`,

    no:
      `interesting.<br><br>Then why are you on this website? 🤨`,

    who:
      `Nice try.<br><br>I'm not falling for that.`
  };

  showResponse(
    replies[a],
    q2Intro,
    "continue"
  );
}

/* =========================
   Q2 INTRO
========================= */

async function q2Intro() {

  cancelSequence();

  const id = sequenceId;

  setScene("q2intro");

  render(`
    <p class="line">
      I guess we'll have to verify.
    </p>
  `);

  if (!await wait(2100,id)) return;

  render(`
    <p class="line">
      First test.
    </p>
  `);

  if (!await wait(1500,id)) return;

  render(`
    <p class="line">
      You have 3 seconds.
    </p>
  `);

  if (!await wait(1200,id)) return;

  for (let i = 3; i >= 1; i--) {

    render(`
      <div class="countdown">
        ${i}
      </div>
    `);

    if (!await wait(800,id)) return;
  }

  render(`
    <p class="line">
      Time's up.
    </p>
  `);

  if (!await wait(1300,id)) return;

  render(`
    <p class="line">
      You didn't do anything.
      <br><br>
      Hmm. You failed the test already huh.
    </p>
  `);

  if (!await wait(2200,id)) return;

  render(`
    <p class="line">
      Aight. We'll try again.
    </p>
  `);

  if (!await wait(1700,id)) return;

  q2();
}

/* =========================
   Q2
========================= */

function q2() {

  cancelSequence();

  setScene("q2");

  render(`
    <div class="glass">

      <p class="question">
        Which one of these is objectively
        <br>
        the most trustworthy?
      </p>

      <div class="options">

        <button
          class="option"
          onclick="selectAnswer(this,q2Answer,'cat')"
        >
          🐈 A cat
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q2Answer,'me')"
        >
          🫵 Me
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q2Answer,'dude')"
        >
          🚶 Some random dude on the street
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q2Answer,'robbins')"
        >
          📚 Robbins
        </button>

      </div>

    </div>
  `);
}

function q2Answer(a) {

  const replies = {

    cat:
      `Hmm, now im 99.99% sure ur Trisha`,

    me:
      `Is this Trisha's body double???`,

    dude:
      `0 survival instincts, this seems like Trisha`,

    robbins:
      `Aren't u using Ramdas rn 🤨<br><br>Anyway, study well for tmr`
  };

  showResponse(
    replies[a],
    afterQ2,
    "continue"
  );
}

async function afterQ2() {

  cancelSequence();

  const id = sequenceId;

  setScene("q2end");

  render(`
    <p class="line">
      Okay...
    </p>
  `);

  if (!await wait(1900,id)) return;

  render(`
    <p class="line">
      That tells me absolutely nothing.
    </p>
  `);

  if (!await wait(2100,id)) return;

  q3();
}

/* =========================
   Q3
========================= */

function q3() {

  cancelSequence();

  setScene("q3");

  render(`
    <div class="glass">

      <p class="question">
        You've got an entire afternoon free.
        <br>
        No responsibilities.
        <br>
        No one bothering you.
        <br><br>
        What happens?
      </p>

      <div class="options">

        <button
          class="option"
          onclick="selectAnswer(this,q3Answer,'paint')"
        >
          🎨 You paint
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q3Answer,'instrument')"
        >
          🎸 Pick up an instrument and disappear for 3 hours
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q3Answer,'cat')"
        >
          🐈 See a cat and your entire schedule is cancelled
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q3Answer,'nothing')"
        >
          🛋️ Do absolutely nothing
        </button>

      </div>

    </div>
  `);
}

function q3Answer(a) {

  const replies = {

    paint:
      `Wasn't someone saying<br>it takes too much time`,

    instrument:
      `Hmm... 3hrs???<br>That's too long u'll start painting`,

    cat:
      `Yuppp this is Trisha 99.999%`,

    nothing:
      `Where is ur schedule at 😑`
  };

  showResponse(
    replies[a],
    q4,
    "continue"
  );
}

/* =========================
   Q4
========================= */

function q4() {

  cancelSequence();

  setScene("q4");

  render(`
    <div class="glass">

      <p class="question">
        You wake up tomorrow and there's
        a mysterious box outside your door.
      </p>

      <p class="line small">
        You have absolutely no idea what's inside.
      </p>

      <p class="question">
        What do you do?
      </p>

      <div class="options">

        <button
          class="option"
          onclick="selectAnswer(this,q4Answer,'open')"
        >
          📦 Open it immediately
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q4Answer,'stare')"
        >
          👁️ Stare at it for 10 minutes
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q4Answer,'leave')"
        >
          🚪 Leave it there
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q4Answer,'paint')"
        >
          🎨 Start painting the box
        </button>

      </div>

    </div>
  `);
}

function q4Answer(a) {

  if (a === "open") {

    showResponse(
      `0 survival instincts, it's a slime bomb 🤣`,
      q5,
      "continue"
    );

    return;
  }

  if (a === "stare") {

    showResponse(
      `10 mins?? u could've composed a song by now`,
      q5,
      "continue"
    );

    return;
  }

  if (a === "paint") {

    showResponse(
      `I mean makes complete sense`,
      q5,
      "continue"
    );

    return;
  }

  leaveBoxSequence();
}

async function leaveBoxSequence() {

  cancelSequence();

  const id = sequenceId;

  setScene("q4leave");

  render(`
    <div class="response">
      Hmm... good choice.
    </div>
  `);

  if (!await wait(1500,id)) return;

  render(`
    <div class="response">
      Hmm... good choice.
      <br><br>
      What if there is a cat in the box?
    </div>
  `);

  if (!await wait(1800,id)) return;

  render(`
    <div class="response">

      Hmm... good choice.
      <br><br>

      What if there is a cat in the box?
      <br><br>

      u gotta open it ryt?
      <br><br>

      <button
        class="continue"
        onclick="openBox()"
      >
        🐈 OPEN THE BOX
      </button>

    </div>
  `);
}

function openBox() {

  showResponse(
    `loll it was a slime bomb 🤣`,
    q5,
    "continue"
  );
}

/* =========================
   Q5
========================= */

function q5() {

  cancelSequence();

  setScene("q5");

  render(`
    <div class="glass">

      <p class="line">
        Right.
      </p>

      <p class="line">
        I think we need to test your
        decision-making skills.
      </p>

      <p class="question small">
        This is where things get serious.
      </p>

      <div class="options">

        <button
          class="option"
          onclick="selectAnswer(this,q5Answer,'got')"
        >
          😎 I got this
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q5Answer,'no')"
        >
          🫠 Absolutely not
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q5Answer,'catch')"
        >
          🤨 What's the catch?
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q5Answer,'hint')"
        >
          🥲 Can I have a hint?
        </button>

      </div>

    </div>
  `);
}

function q5Answer(a) {

  const replies = {

    got:
      `That's a lot of confidence.<br><br>I wouldn't get comfortable.`,

    no:
      `Finally.<br><br>Someone honest.`,

    catch:
      `There is no catch.<br><br>...yet.`,

    hint:
      `No.<br><br>Next question.`
  };

  showResponse(
    replies[a],
    q6,
    "alright"
  );
}

/* =========================
   Q6
========================= */

async function q6() {

  cancelSequence();

  const id = sequenceId;

  setScene("q6");

  document.body.className = "dark";

  render(`
    <p class="line">
      Trisha.
    </p>
  `);

  if (!await wait(2200,id)) return;

  render(`
    <p class="line">
      This is important.
    </p>
  `);

  if (!await wait(2300,id)) return;

  render(`
    <p class="line">
      Whatever you do...
    </p>
  `);

  if (!await wait(2300,id)) return;

  render(`
    <p class="question">
      DO NOT PRESS THE BUTTON.
    </p>

    <div class="dangerWrap">

      <button
        class="danger"
        onclick="pressedButton()"
      >
        DO NOT PRESS
      </button>

    </div>
  `);
}

async function pressedButton() {

  cancelSequence();

  const id = sequenceId;

  document.body.classList.add("shake");

  if (!await wait(750,id)) return;

  document.body.classList.remove("shake");

  render(`
    <p class="short">
      ...
    </p>
  `);

  if (!await wait(1500,id)) return;

  render(`
    <p class="line">
      You had ONE job.
    </p>
  `);

  if (!await wait(2000,id)) return;

  render(`
    <p class="line">
      I think we need to reconsider
      <br>
      your eligibility.
    </p>

    <button
      class="continue"
      onclick="notMe()"
    >
      I swear it wasn't me
    </button>
  `);
}

async function notMe() {

  cancelSequence();

  const id = sequenceId;

  render(`
    <p class="line">
      Sure.
    </p>
  `);

  if (!await wait(1900,id)) return;

  render(`
    <p class="line">
      And I'm Jim from The Office 🏀❌
    </p>
  `);

  if (!await wait(2400,id)) return;

  resetBody();

  q7();
}

/* =====================================================
   Q7
   FIXED:
   INTRO SLIDES FIRST.
   THEN ACTUAL QUESTION.
===================================================== */

async function q7() {

  cancelSequence();

  const id = sequenceId;

  setScene("q7intro");

  render(`
    <p class="line">
      ...okay.
    </p>
  `);

  if (!await wait(1900,id)) return;

  render(`
    <p class="line">
      You're surprisingly difficult to eliminate.
    </p>
  `);

  if (!await wait(2200,id)) return;

  render(`
    <p class="line">
      Maybe I've been testing the wrong thing.
    </p>
  `);

  if (!await wait(2300,id)) return;

  q7Question();
}

/* ACTUAL Q7 QUESTION */

function q7Question() {

  cancelSequence();

  setScene("q7");

  render(`
    <div class="glass">

      <p class="question">
        What's one thing you want right now?
      </p>

      <div class="options">

        <button
          class="option"
          onclick="q7Answer('canvas')"
        >
          🎨 A blank canvas
        </button>

        <button
          class="option"
          onclick="q7Answer('uke')"
        >
          🎸 Another uke
        </button>

        <button
          class="option"
          onclick="q7Answer('cats')"
        >
          🐈 A room full of cats
        </button>

        <button
          class="option"
          onclick="q7Answer('couch')"
        >
          🛋️ A couch, snacks, and absolutely nothing to do
        </button>

      </div>

    </div>
  `);
}

async function q7Answer(choice) {

  cancelSequence();

  const id = sequenceId;

  document
    .querySelectorAll(".option")
    .forEach(button => {
      button.disabled = true;
      button.classList.add("locked");
    });

  render(`
    <p class="line">
      Yeah...
    </p>
  `);

  if (!await wait(1900,id)) return;

  render(`
    <p class="line">
      I think I'm starting to understand.
    </p>
  `);

  if (!await wait(2300,id)) return;

  fadeBubbles();

  render(`
    <p class="line">
      This website is getting suspiciously specific.
    </p>
  `);

  if (!await wait(2300,id)) return;

  q8();
}

/* =========================
   Q8
========================= */

function q8() {

  cancelSequence();

  setScene("q8");

  render(`
    <div class="glass">

      <p class="question">
        One last thing.
        <br><br>
        How do you respond when someone
        tries to ragebait you?
      </p>

      <div class="options">

        <button
          class="option"
          onclick="selectAnswer(this,q8Answer,'a')"
        >
          😌 Ragebait? Huh? I'm immune to it
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q8Answer,'b')"
        >
          🧘 Calmly explain why they're wrong
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q8Answer,'c')"
        >
          🤣 Fall for it immediately
        </button>

        <button
          class="option"
          onclick="selectAnswer(this,q8Answer,'d')"
        >
          👊 Start punching
        </button>

      </div>

    </div>
  `);
}

function q8Answer(a) {

  const replies = {

    a:
      `That's wt Trisha thinks 🤣`,

    b:
      `Calm n u nahh`,

    c:
      `Hmm ur 99.9999% Trisha`,

    d:
      `Ouchh, be careful`
  };

  showResponse(
    replies[a],
    romanticTransition,
    "continue"
  );
}

/* =========================
   ROMANTIC TRANSITION
========================= */

async function romanticTransition() {

  cancelSequence();

  const id = sequenceId;

  setScene("romantic");

  const lines = [

    [`Okay...`,2200],

    [`I think I've figured it out.`,2600],

    [`You know...`,1900],

    [`I could've just sent you a "happy birthday" text.`,2700],

    [`But that felt a little boring.`,2300],

    [`So I made this instead.`,2500],

    [`Because...<br>well, you're kinda worth the extra effort.`,3000],

    [`Don't let that get to your head though.`,2400],

    [`Anyway...`,1800],

    [`I think there's one thing left to figure out.`,2400]
  ];

  for (const [text,ms] of lines) {

    render(`
      <p class="line">
        ${text}
      </p>
    `);

    if (!await wait(ms,id)) return;
  }

  paintSequence();
}

/* =========================
   PAINT
========================= */

async function paintSequence() {

  cancelSequence();

  const id = sequenceId;

  setScene("paint");

  paintLayer.style.opacity = "1";

  paintLayer.innerHTML = `

    <div class="paint blob one"></div>
    <div class="paint blob two"></div>
    <div class="paint blob three"></div>
    <div class="paint blob four"></div>

    <div class="paint brush one"></div>
    <div class="paint brush two"></div>
    <div class="paint brush three"></div>

    <div class="paint drip one"></div>
    <div class="paint drip two"></div>
    <div class="paint drip three"></div>

    <div class="paint splash one"></div>
    <div class="paint splash two"></div>
    <div class="paint splash three"></div>
  `;

  render(`
    <p class="short">
      Wait.
    </p>
  `);

  if (!await wait(1900,id)) return;

  paintLayer
    .querySelector(".blob.one")
    .classList.add("show");

  render(`
    <p class="line">
      ...what?
    </p>
  `);

  if (!await wait(1700,id)) return;

  paintLayer
    .querySelector(".brush.one")
    .classList.add("show");

  render(`
    <p class="line">
      Why is there paint on my screen?
    </p>
  `);

  if (!await wait(1800,id)) return;

  paintLayer
    .querySelector(".brush.two")
    .classList.add("show");

  paintLayer
    .querySelector(".splash.one")
    .classList.add("show");

  if (!await wait(1300,id)) return;

  paintLayer
    .querySelector(".blob.two")
    .classList.add("show");

  render(`
    <p class="line">
      Uhh...
    </p>
  `);

  if (!await wait(1500,id)) return;

  paintLayer
    .querySelector(".brush.three")
    .classList.add("show");

  paintLayer
    .querySelector(".blob.three")
    .classList.add("show");

  paintLayer
    .querySelector(".splash.two")
    .classList.add("show");

  render(`
    <p class="line">
      who put paint all over my screen?
    </p>
  `);

  if (!await wait(1700,id)) return;

  paintLayer
    .querySelector(".drip.one")
    .classList.add("show");

  if (!await wait(400,id)) return;

  paintLayer
    .querySelector(".drip.two")
    .classList.add("show");

  if (!await wait(400,id)) return;

  paintLayer
    .querySelector(".drip.three")
    .classList.add("show");

  if (!await wait(700,id)) return;

  paintLayer
    .querySelector(".blob.four")
    .classList.add("show");

  paintLayer
    .querySelector(".splash.three")
    .classList.add("show");

  render(`
    <p class="line">
      okay this is getting ridiculous
    </p>
  `);

  if (!await wait(2300,id)) return;

  showPicasso();
}

/* =========================
   PICASSO (small cameo, bottom-right corner)
========================= */

async function showPicasso() {

  cancelSequence();

  const id = sequenceId;

  const pic = document.createElement("div");

  pic.className = "picasso";

  pic.innerHTML = `
    <div class="picassoArt">
      <img
        src="assets/Pablo.jpg"
        alt="Pablo Picasso"
      >
    </div>
  `;

  document.body.appendChild(pic);

  if (!await wait(350,id)) return;

  pic.classList.add("show");

  render(`
    <p class="line">
      Ohh hey Picasso sup
    </p>
  `);

  if (!await wait(2600,id)) return;

  pic.classList.add("leave");

  if (!await wait(1100,id)) return;

  pic.remove();

  render(`
    <p class="short">
      oh well.
    </p>
  `);

  if (!await wait(3000,id)) return;

  paintLayer.style.opacity = "0";

  if (!await wait(1800,id)) return;

  paintLayer.innerHTML = "";

  finalSetup();
}

/* =========================
   FINAL SETUP
========================= */

async function finalSetup() {

  cancelSequence();

  const id = sequenceId;

  setScene("finalSetup");

  restoreBubbles();

  render(`
    <div class="glass">
      <p class="line">
        Well...
      </p>
    </div>
  `);

  if (!await wait(1800,id)) return;

  render(`
    <div class="glass">
      <p class="line">
        I heard today is the birthday
        of a great painter I know of.
      </p>
    </div>
  `);

  if (!await wait(3000,id)) return;

  render(`
    <div class="glass">
      <p class="line">
        I think even you know this person..
      </p>
    </div>
  `);

  if (!await wait(3000,id)) return;

  render(`
    <div class="glass">
      <p class="line">
        I've got a feeling you know
        exactly who I mean.
      </p>
    </div>
  `);

  if (!await wait(3000,id)) return;

  render(`
    <button
      class="continue"
      onclick="picassoReveal()"
    >
      Who? 👀
    </button>
  `);
}

/* =====================================================
   PICASSO REVEAL (the big birthday image)
   FIX: uses its own .birthdayPicasso class so it's
   centered on screen and z-indexed above the text,
   instead of inheriting the small bottom-right-corner
   .picasso position. Built via JS + appended to body,
   same reliable pattern as showPicasso(), instead of
   an inline <img> inside render() (which was getting
   wiped out mid-animation by later render() calls).
===================================================== */

async function picassoReveal() {

  cancelSequence();

  const id = sequenceId;

  setScene("picassoReveal");

  render(`
    <h1 class="finalTitle">
      PABLO PICASSO 🎨
    </h1>
  `);

  const birthdayPic = document.createElement("div");

  birthdayPic.className = "picasso birthdayPicasso";

  birthdayPic.innerHTML = `
    <div class="picassoArt">
      <img
        src="assets/pablo bond 1.jpeg"
        alt="Pablo Picasso"
        onerror="console.error('Image failed to load — check filename/case/path in assets folder')"
      >
    </div>
  `;

  document.body.appendChild(birthdayPic);

  await wait(500,id);

  if (id !== sequenceId) {
    birthdayPic.remove();
    return;
  }

  birthdayPic.classList.add("show");

  if (!await wait(4200,id)) {
    birthdayPic.remove();
    return;
  }

  birthdayPic.remove();

  render(`
    <p class="line">
      Wait...
    </p>
  `);

  if (!await wait(2600,id)) return;

  render(`
    <p class="line">
      His birthday isn't today.
    </p>
  `);

  if (!await wait(2600,id)) return;

  render(`
    <p class="line">
      Nvm.
    </p>
  `);

  if (!await wait(2100,id)) return;

  render(`
    <p class="line">
      Guess whose is, though?
    </p>
  `);

  if (!await wait(3400,id)) return;

  birthdayFinal();
}

/* =========================
   BIRTHDAY FINAL
========================= */

function birthdayFinal() {

  cancelSequence();

  setScene(
    "final",
    { push: false }
  );

  document.body.className = "final";

  finalReached = true;

  render(`
    <div class="finalWrap">

      <h1 class="finalTitle">
        🎂 HAPPY BIRTHDAY, TRISHA! 🎂
      </h1>

      <div class="finalText">

        <div>
          To a pretty damn cool painter I know.
        </div>

        <br>

        <div>
          Happy birthday :) ❤️
        </div>

        <div class="italic">
          hope this year gives you plenty of reasons to smile
        </div>

      </div>

    </div>
  `);

  launchConfetti();

  setTimeout(() => {
    postCredits.classList.add("show");
  },4200);
}

/* =========================
   INTERACTION
========================= */

function selectAnswer(
  button,
  callback,
  value
) {

  const group =
    button.closest(".options");

  if (
    group.classList.contains("locked")
  ) {
    return;
  }

  group.classList.add("locked");

  button.classList.add("selected");

  setTimeout(() => {

    callback(value);

  },700);
}

function showResponse(
  text,
  next,
  label
) {

  cancelSequence();

  render(`
    <div class="response">
      ${text}
    </div>

    <button
      class="continue"
      id="responseContinue"
    >
      ${label}
    </button>
  `);

  document
    .getElementById("responseContinue")
    .onclick = () => {
      next();
    };
}

/* =========================
   CONFETTI
========================= */

function launchConfetti() {

  confetti.innerHTML = "";

  for (let i = 0; i < 190; i++) {

    const c =
      document.createElement("div");

    c.className = "confetti";

    c.style.left =
      `${Math.random() * 100}%`;

    c.style.setProperty(
      "--duration",
      `${3 + Math.random() * 4}s`
    );

    c.style.setProperty(
      "--delay",
      `${Math.random() * 1.3}s`
    );

    c.style.setProperty(
      "--sway",
      `${-140 + Math.random() * 280}px`
    );

    c.style.setProperty(
      "--h",
      Math.floor(Math.random() * 360)
    );

    confetti.appendChild(c);
  }
}

/* =====================================================
   BACK BUTTON
===================================================== */

function goToPrevious() {

  cancelSequence();

  document.body.classList.remove("shake");

  postCredits.classList.remove("show");

  const prev = history.pop();

  if (!prev) return;

  if (prev === "intro") {
    intro();
    return;
  }

  if (prev === "q1") {
    q1();
    return;
  }

  if (prev === "q2") {
    q2();
    return;
  }

  if (prev === "q3") {
    q3();
    return;
  }

  if (prev === "q4") {
    q4();
    return;
  }

  if (prev === "q5") {
    q5();
    return;
  }

  if (prev === "q6") {
    q6();
    return;
  }

  if (prev === "q7") {
    q7Question();
    return;
  }

  if (prev === "q7intro") {
    q7();
    return;
  }

  if (prev === "q8") {
    q8();
    return;
  }

  if (prev === "romantic") {
    romanticTransition();
    return;
  }

  if (prev === "paint") {
    paintSequence();
    return;
  }

  if (prev === "finalSetup") {
    finalSetup();
    return;
  }

  if (prev === "picassoReveal") {
    picassoReveal();
    return;
  }

  if (prev === "final") {
    birthdayFinal();
    return;
  }

  if (prev === "postcredits") {
    birthdayFinal();
    return;
  }
}

backBtn.onclick = goToPrevious;

/* =====================================================
   POST CREDITS
   NORMAL PAGE-BY-PAGE SEQUENCE
===================================================== */

async function startPostCredits() {

  cancelSequence();

  const id = sequenceId;

  postCredits.classList.remove("show");

  document.body.className = "postcredits";

  setScene("postcredits");

  render(`
    <p class="postCreditText">
      okay...
    </p>
  `);

  if (!await wait(2400,id)) return;

  render(`
    <p class="postCreditText">
      before you go.
    </p>
  `);

  if (!await wait(2800,id)) return;

  render(`
    <p class="postCreditText">
      I hope this is the most confusing
      gift you've ever received 🫨🤣🤣🤣
    </p>
  `);

  if (!await wait(4200,id)) return;

  render(`
    <p class="postCreditText">
      because honestly...
      I don't even know what this was anymore 😭
    </p>
  `);

  if (!await wait(4200,id)) return;

  render(`
    <p class="postCreditText">
      bye 👋
    </p>
  `);
}

postCredits.onclick = startPostCredits;

/* =========================
   START
========================= */

createBubbleWorld();

createParticles();

intro();