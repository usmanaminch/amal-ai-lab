document.addEventListener("DOMContentLoaded", () => {
  const subjects = {
    math: "Math",
    reading: "Reading",
    writing: "Writing",
    science: "Science",
    social: "Social Studies",
    vocab: "Vocabulary",
    study: "Study Skills"
  };

  const desc = {
    math: "Number strength, ratios, percents, equations, and problem solving.",
    reading: "Comprehension, inference, evidence, and author's purpose.",
    writing: "Grammar, clear sentences, claims, transitions, and evidence.",
    science: "Variables, experiments, data, systems, and scientific reasoning.",
    social: "Maps, timelines, sources, civics, geography, and history.",
    vocab: "Context clues, word meaning, roots, synonyms, and academic words.",
    study: "Planning, focus, retrieval practice, notes, and learning habits."
  };

  const $ = (id) => document.getElementById(id);

  function label(grade) {
    const suffix = grade === 1 ? "st" : grade === 2 ? "nd" : grade === 3 ? "rd" : "th";
    return grade + suffix;
  }

  function band(grade) {
    if (grade <= 2) return "early";
    if (grade <= 5) return "elementary";
    if (grade <= 8) return "middle";
    return "high";
  }

  const questionBank = {
    early: {
      math: [
        { q: "What is 8 + 7?", choices: ["13", "14", "15", "16"], answer: "15", explain: "8 + 7 = 15." },
        { q: "What is 20 - 6?", choices: ["12", "13", "14", "15"], answer: "14", explain: "20 - 6 = 14." },
        { q: "Which number is greatest?", choices: ["32", "23", "13", "22"], answer: "32", explain: "32 is bigger than the others." },
        { q: "What is 5 + 9?", choices: ["12", "13", "14", "15"], answer: "14", explain: "5 + 9 = 14." },
        { q: "What number comes after 49?", choices: ["48", "50", "51", "59"], answer: "50", explain: "Counting forward from 49 gives 50." },
        { q: "How many sides does a triangle have?", choices: ["2", "3", "4", "5"], answer: "3", explain: "A triangle has 3 sides." },
        { q: "What is 10 + 10?", choices: ["15", "18", "20", "22"], answer: "20", explain: "10 + 10 = 20." },
        { q: "Which is an even number?", choices: ["7", "9", "12", "15"], answer: "12", explain: "Even numbers can be split into two equal groups." }
      ],
      reading: [
        { q: "A cat hides during thunder. How does it probably feel?", choices: ["Scared", "Hungry", "Sleepy", "Excited"], answer: "Scared", explain: "Hiding during thunder is a clue." },
        { q: "What is a character?", choices: ["A person or animal in a story", "A page number", "A math answer", "A book cover"], answer: "A person or animal in a story", explain: "Characters are who the story is about." },
        { q: "Where a story happens is called the...", choices: ["setting", "title", "answer", "number"], answer: "setting", explain: "Setting means where and when the story happens." },
        { q: "If a story is mostly about a dog finding its way home, what is the main idea?", choices: ["A dog goes home", "The sky is blue", "A chair is old", "The book is red"], answer: "A dog goes home", explain: "The main idea is what the story is mostly about." },
        { q: "Which word is a feeling?", choices: ["happy", "table", "pencil", "window"], answer: "happy", explain: "Happy is an emotion." },
        { q: "If the text says, 'Sam shivered,' what might Sam feel?", choices: ["cold", "tall", "round", "blue"], answer: "cold", explain: "Shivering can be a clue for feeling cold." }
      ],
      writing: [
        { q: "Which starts with a capital letter?", choices: ["The dog runs.", "the dog runs.", "dog runs.", "runs dog."], answer: "The dog runs.", explain: "Sentences start with capitals." },
        { q: "Which has correct punctuation?", choices: ["I like apples.", "I like apples", "i like apples", "I like apples,"], answer: "I like apples.", explain: "A statement ends with a period." },
        { q: "Which is a complete sentence?", choices: ["The bird sings.", "Bird the.", "Sings blue.", "The."], answer: "The bird sings.", explain: "It tells who and what happens." },
        { q: "Which word should be capitalized?", choices: ["monday", "chair", "small", "jump"], answer: "monday", explain: "Days of the week are capitalized." },
        { q: "Which sentence asks a question?", choices: ["Where is my book?", "I see a book.", "The book is blue.", "My book is here."], answer: "Where is my book?", explain: "A question asks something and uses a question mark." },
        { q: "Which sentence is neatest?", choices: ["I can read.", "i can read", "Can read I.", "Read can."], answer: "I can read.", explain: "It has a capital letter and period." }
      ],
      science: [
        { q: "Which is a living thing?", choices: ["Plant", "Rock", "Chair", "Pencil"], answer: "Plant", explain: "Plants grow and need water/sunlight." },
        { q: "What do plants need?", choices: ["Water and sunlight", "Shoes", "TV", "A backpack"], answer: "Water and sunlight", explain: "Plants need water and sunlight." },
        { q: "Which sense uses your ears?", choices: ["hearing", "smell", "taste", "touch"], answer: "hearing", explain: "Ears help us hear." },
        { q: "Which is usually a solid?", choices: ["rock", "air", "steam", "rain"], answer: "rock", explain: "A rock keeps its shape." },
        { q: "What do we call baby frogs?", choices: ["tadpoles", "kittens", "puppies", "calves"], answer: "tadpoles", explain: "Baby frogs are tadpoles." },
        { q: "Which animal has feathers?", choices: ["bird", "fish", "snake", "frog"], answer: "bird", explain: "Birds have feathers." }
      ],
      social: [
        { q: "What does a map show?", choices: ["Places", "Only songs", "Only animals", "Only math"], answer: "Places", explain: "Maps show where places are." },
        { q: "What is a community?", choices: ["People living or working together", "Only one toy", "A number", "A cloud"], answer: "People living or working together", explain: "A community is a group in a place." },
        { q: "Who helps keep people safe?", choices: ["firefighters", "pillows", "clouds", "crayons"], answer: "firefighters", explain: "Firefighters help in emergencies." },
        { q: "Which is a rule at school?", choices: ["Raise your hand", "Run everywhere", "Hide homework", "Throw books"], answer: "Raise your hand", explain: "Rules help everyone learn safely." },
        { q: "What does a calendar show?", choices: ["days and dates", "only animals", "only snacks", "only clouds"], answer: "days and dates", explain: "Calendars organize days and dates." },
        { q: "Which is a place in a neighborhood?", choices: ["library", "moon", "ocean planet", "rainbow"], answer: "library", explain: "A library can be part of a neighborhood." }
      ],
      vocab: [
        { q: "Which word means big?", choices: ["Large", "Tiny", "Cold", "Soft"], answer: "Large", explain: "Large means big." },
        { q: "Which word means fast?", choices: ["Quick", "Slow", "Sad", "Round"], answer: "Quick", explain: "Quick means fast." },
        { q: "Which word means small?", choices: ["tiny", "giant", "huge", "wide"], answer: "tiny", explain: "Tiny means very small." },
        { q: "Which word means not happy?", choices: ["sad", "joyful", "glad", "cheerful"], answer: "sad", explain: "Sad means not happy." },
        { q: "Which word means jump?", choices: ["leap", "sleep", "sit", "draw"], answer: "leap", explain: "Leap means jump." },
        { q: "Which word means quiet?", choices: ["silent", "noisy", "loud", "wild"], answer: "silent", explain: "Silent means quiet." }
      ],
      study: [
        { q: "What helps you remember schoolwork?", choices: ["Practice a little", "Never try", "Hide your book", "Skip class"], answer: "Practice a little", explain: "Small practice helps memory." },
        { q: "What should you do if confused?", choices: ["Ask for help", "Give up", "Rip paper", "Guess forever"], answer: "Ask for help", explain: "Asking for help is smart." },
        { q: "Where should homework go?", choices: ["A safe folder or backpack", "The trash", "Under the bed", "Outside"], answer: "A safe folder or backpack", explain: "Keeping work organized helps you find it." },
        { q: "What helps you focus?", choices: ["A quiet space", "Loud TV", "Many distractions", "Running away"], answer: "A quiet space", explain: "A quiet space makes focusing easier." },
        { q: "What should you do before a test?", choices: ["Review and sleep", "Stay up all night", "Skip studying", "Forget breakfast"], answer: "Review and sleep", explain: "Rest and review help your brain." },
        { q: "What is a good learning habit?", choices: ["Try again after mistakes", "Never retry", "Hide mistakes", "Quit quickly"], answer: "Try again after mistakes", explain: "Mistakes can help you learn." }
      ]
    },

    elementary: {
      math: [
        { q: "What is 7 × 8?", choices: ["54", "56", "58", "64"], answer: "56", explain: "7 groups of 8 equals 56." },
        { q: "Which fraction is equal to 1/2?", choices: ["2/4", "1/3", "3/8", "2/5"], answer: "2/4", explain: "2/4 simplifies to 1/2." },
        { q: "A book costs $12. You buy 3. What is the total?", choices: ["$24", "$30", "$36", "$42"], answer: "$36", explain: "12 × 3 = 36." },
        { q: "What is 3/4 of 20?", choices: ["10", "12", "15", "18"], answer: "15", explain: "One fourth of 20 is 5, so three fourths is 15." },
        { q: "What is 144 ÷ 12?", choices: ["10", "11", "12", "14"], answer: "12", explain: "12 × 12 = 144." },
        { q: "Round 367 to the nearest hundred.", choices: ["300", "360", "370", "400"], answer: "400", explain: "367 is closer to 400 than 300." },
        { q: "A rectangle is 9 by 4. What is its area?", choices: ["13", "26", "36", "40"], answer: "36", explain: "Area = length × width = 9 × 4." },
        { q: "What is 2.5 + 1.75?", choices: ["3.25", "4.25", "4.75", "5.25"], answer: "4.25", explain: "2.50 + 1.75 = 4.25." }
      ],
      reading: [
        { q: "A passage mostly explains how bees help flowers. What is the main idea?", choices: ["Bees help flowers grow", "Bees are yellow", "Flowers are outside", "Honey is sweet"], answer: "Bees help flowers grow", explain: "The main idea is the biggest point." },
        { q: "Which is text evidence?", choices: ["A quote from the passage", "A random guess", "A feeling only", "A drawing"], answer: "A quote from the passage", explain: "Evidence comes from the text." },
        { q: "If a character keeps practicing piano, what trait do they show?", choices: ["determination", "laziness", "forgetfulness", "anger"], answer: "determination", explain: "Practicing again and again shows determination." },
        { q: "What is a summary?", choices: ["A short version of the main points", "Every sentence copied", "Only the title", "A random opinion"], answer: "A short version of the main points", explain: "A summary gives the key ideas briefly." },
        { q: "What is the setting?", choices: ["Where and when a story happens", "The problem", "The lesson", "The author's name"], answer: "Where and when a story happens", explain: "Setting means place and time." },
        { q: "Which question asks for an inference?", choices: ["Why might the character be nervous?", "What color is the shirt?", "What is the title?", "How many pages?"], answer: "Why might the character be nervous?", explain: "Inference questions ask you to use clues." }
      ],
      writing: [
        { q: "Which sentence is clearest?", choices: ["The dog ran fast across the yard.", "Dog yard fast ran the.", "The fast was yard dog.", "Ran dog the yard."], answer: "The dog ran fast across the yard.", explain: "It has a clear subject and action." },
        { q: "A paragraph usually needs what?", choices: ["A topic idea and details", "Only emojis", "No main point", "Random sentences"], answer: "A topic idea and details", explain: "A paragraph needs a main idea and details." },
        { q: "Which transition shows sequence?", choices: ["Next", "Because", "However", "Although"], answer: "Next", explain: "Next shows order." },
        { q: "Which sentence has correct comma use?", choices: ["After lunch, we played outside.", "After lunch we, played outside.", "After, lunch we played outside.", "After lunch we played, outside."], answer: "After lunch, we played outside.", explain: "The intro phrase takes a comma." },
        { q: "Which is a strong detail?", choices: ["The red kite dipped below the clouds.", "It was nice.", "Stuff happened.", "It was a thing."], answer: "The red kite dipped below the clouds.", explain: "It gives a clear image." },
        { q: "What does revising mean?", choices: ["Improving ideas and wording", "Throwing the paper away", "Never rereading", "Only changing font"], answer: "Improving ideas and wording", explain: "Revising improves writing." }
      ],
      science: [
        { q: "What does data mean in science?", choices: ["Observations and measurements", "A random opinion", "The title", "A guess only"], answer: "Observations and measurements", explain: "Data is collected information." },
        { q: "A science conclusion should use what?", choices: ["Evidence from data", "Only feelings", "No measurements", "A joke"], answer: "Evidence from data", explain: "Conclusions need evidence." },
        { q: "What is a hypothesis?", choices: ["A testable prediction", "A final answer always", "A drawing", "A measurement tool"], answer: "A testable prediction", explain: "A hypothesis can be tested." },
        { q: "What force pulls things toward Earth?", choices: ["gravity", "friction", "magnetism", "sound"], answer: "gravity", explain: "Gravity pulls objects toward Earth." },
        { q: "Which state of matter keeps its own shape?", choices: ["solid", "liquid", "gas", "steam"], answer: "solid", explain: "Solids keep their shape." },
        { q: "What is evaporation?", choices: ["Liquid changing to gas", "Gas changing to liquid", "Solid breaking", "Rock forming"], answer: "Liquid changing to gas", explain: "Evaporation turns liquid into gas." }
      ],
      social: [
        { q: "What does a timeline show?", choices: ["Events in order", "Only places", "Weather only", "Feelings"], answer: "Events in order", explain: "Timelines organize events by time." },
        { q: "What does a map legend explain?", choices: ["Symbols on a map", "The author's mood", "A math equation", "The chapter title"], answer: "Symbols on a map", explain: "Legends explain map symbols." },
        { q: "What is a citizen?", choices: ["A member of a community or country", "A type of weather", "A math symbol", "A plant"], answer: "A member of a community or country", explain: "Citizens belong to a community/country." },
        { q: "What is a continent?", choices: ["A large landmass", "A small street", "A law", "A river only"], answer: "A large landmass", explain: "Continents are huge land areas." },
        { q: "What is a natural resource?", choices: ["Something from nature people use", "A video game", "A made-up map", "A school rule"], answer: "Something from nature people use", explain: "Water, trees, and minerals are examples." },
        { q: "Why do historians use sources?", choices: ["To learn about the past", "To avoid evidence", "To make maps colorful", "To skip reading"], answer: "To learn about the past", explain: "Sources give information about history." }
      ],
      vocab: [
        { q: "The room was frigid, so I grabbed a sweater. What does frigid mean?", choices: ["Very cold", "Very loud", "Very bright", "Very messy"], answer: "Very cold", explain: "The sweater clue points to cold." },
        { q: "Which is a synonym for happy?", choices: ["Joyful", "Angry", "Tired", "Tiny"], answer: "Joyful", explain: "A synonym has a similar meaning." },
        { q: "The trail was narrow. What does narrow mean?", choices: ["not wide", "very loud", "very sweet", "very heavy"], answer: "not wide", explain: "A narrow trail is not wide." },
        { q: "Which word means to look carefully?", choices: ["observe", "ignore", "drop", "forget"], answer: "observe", explain: "Observe means watch carefully." },
        { q: "Which is an antonym for ancient?", choices: ["modern", "old", "past", "early"], answer: "modern", explain: "Modern means new/current, the opposite of ancient." },
        { q: "What does eager mean?", choices: ["excited and ready", "sleepy", "angry", "hidden"], answer: "excited and ready", explain: "Eager means excited to do something." }
      ],
      study: [
        { q: "Best first step for a big assignment?", choices: ["Break it into smaller tasks", "Wait until the last minute", "Ignore it", "Guess randomly"], answer: "Break it into smaller tasks", explain: "Small tasks make big work easier." },
        { q: "What should you do if stuck?", choices: ["Ask for a hint and try again", "Quit forever", "Pretend you know it", "Delete the project"], answer: "Ask for a hint and try again", explain: "Hints and retrying help you learn." },
        { q: "Why use a checklist?", choices: ["To track what is done", "To make work disappear", "To avoid planning", "To forget tasks"], answer: "To track what is done", explain: "Checklists help you stay organized." },
        { q: "What is a good study break?", choices: ["Short and timed", "Three hours forever", "Never returning", "Only scrolling"], answer: "Short and timed", explain: "Short breaks can help focus without losing the task." },
        { q: "What helps you remember vocabulary?", choices: ["Use the word in a sentence", "Never say it", "Hide it", "Erase it"], answer: "Use the word in a sentence", explain: "Using words helps memory." },
        { q: "What should you do the night before school?", choices: ["Pack materials and sleep", "Lose your backpack", "Stay up all night", "Ignore homework"], answer: "Pack materials and sleep", explain: "Preparation and rest help you do well." }
      ]
    },

    middle: {
      math: [
        { q: "What is 25% of 80?", choices: ["10", "20", "25", "40"], answer: "20", explain: "25% is one fourth. One fourth of 80 is 20." },
        { q: "Solve: x + 9 = 21", choices: ["10", "11", "12", "13"], answer: "12", explain: "Subtract 9 from both sides. 21 - 9 = 12." },
        { q: "Which ratio is equal to 2:3?", choices: ["4:6", "5:6", "6:7", "2:5"], answer: "4:6", explain: "2:3 multiplied by 2 gives 4:6." },
        { q: "Solve: 3x = 24", choices: ["6", "7", "8", "9"], answer: "8", explain: "Divide both sides by 3." },
        { q: "What is -4 + 9?", choices: ["-13", "-5", "5", "13"], answer: "5", explain: "Move 9 spaces right from -4." },
        { q: "A $40 jacket is 30% off. What is the discount?", choices: ["$8", "$10", "$12", "$16"], answer: "$12", explain: "30% of 40 is 0.30 × 40 = 12." },
        { q: "Simplify: 4(2x + 3)", choices: ["8x + 12", "6x + 7", "8x + 3", "2x + 12"], answer: "8x + 12", explain: "Distribute 4 to both terms." },
        { q: "What is the area of a triangle with base 10 and height 6?", choices: ["16", "30", "60", "100"], answer: "30", explain: "Area = base × height ÷ 2 = 10 × 6 ÷ 2." },
        { q: "Solve: x/4 = 9", choices: ["13", "32", "36", "45"], answer: "36", explain: "Multiply both sides by 4." },
        { q: "What is 0.6 as a fraction in simplest form?", choices: ["3/5", "6/100", "1/6", "2/3"], answer: "3/5", explain: "0.6 = 6/10 = 3/5." }
      ],
      reading: [
        { q: "What is theme?", choices: ["A deeper message or lesson", "Only the setting", "The number of pages", "A character's name"], answer: "A deeper message or lesson", explain: "Theme is the bigger message." },
        { q: "What does author's tone mean?", choices: ["The author's attitude", "The story length", "The cover art", "The font size"], answer: "The author's attitude", explain: "Tone is attitude." },
        { q: "A character smiles after losing and says, 'I'm fine.' What can you infer?", choices: ["They may be hiding disappointment", "They won", "They hate sports", "They never played"], answer: "They may be hiding disappointment", explain: "The contrast suggests hidden feelings." },
        { q: "What is central idea in nonfiction?", choices: ["The main point of the text", "The author's name", "The smallest detail", "The glossary"], answer: "The main point of the text", explain: "Central idea is the major point." },
        { q: "Why cite evidence?", choices: ["To support your answer", "To make writing longer only", "To avoid explaining", "To copy randomly"], answer: "To support your answer", explain: "Evidence proves or supports your idea." },
        { q: "What is point of view?", choices: ["Who tells the story", "Where the book was printed", "The cover color", "A chapter title"], answer: "Who tells the story", explain: "Point of view is the narrator's position." },
        { q: "What does compare mean?", choices: ["Tell how things are alike", "Tell only endings", "Ignore details", "Name the author"], answer: "Tell how things are alike", explain: "Compare means similarities." },
        { q: "What does contrast mean?", choices: ["Tell how things are different", "Make a list of pages", "Use only quotes", "Summarize the cover"], answer: "Tell how things are different", explain: "Contrast means differences." }
      ],
      writing: [
        { q: "Which is the strongest claim?", choices: ["Schools should protect recess because movement helps learning.", "Recess is a thing.", "I like recess.", "Some people go outside."], answer: "Schools should protect recess because movement helps learning.", explain: "It makes an argument and gives a reason." },
        { q: "Which transition shows contrast?", choices: ["However", "Also", "For example", "First"], answer: "However", explain: "However signals contrast." },
        { q: "Which word is most specific?", choices: ["sprinted", "went", "thing", "stuff"], answer: "sprinted", explain: "Sprinted is more specific than went." },
        { q: "What is a counterclaim?", choices: ["An opposing argument", "A title", "A comma rule", "A random fact"], answer: "An opposing argument", explain: "A counterclaim is the other side's point." },
        { q: "Which sentence uses evidence?", choices: ["The article says students remember more after practice.", "I just think so.", "It is good.", "Everyone knows."], answer: "The article says students remember more after practice.", explain: "It points to information from a source." },
        { q: "What does revise mean?", choices: ["Improve ideas and wording", "Only check spelling", "Delete everything", "Make font bigger"], answer: "Improve ideas and wording", explain: "Revision improves meaning and clarity." },
        { q: "Which sentence is more formal?", choices: ["The results suggest the plan was effective.", "It worked kinda good.", "This was super cool.", "Stuff happened."], answer: "The results suggest the plan was effective.", explain: "Formal writing avoids slang and vague words." },
        { q: "What should a conclusion do?", choices: ["Wrap up the main idea", "Introduce random new evidence", "Start a new topic", "Only say bye"], answer: "Wrap up the main idea", explain: "Conclusions close the writing." }
      ],
      science: [
        { q: "What is the variable you change called?", choices: ["Independent variable", "Dependent variable", "Conclusion", "Graph"], answer: "Independent variable", explain: "Independent variable is changed by the scientist." },
        { q: "What is the dependent variable?", choices: ["What you measure", "What you keep the same", "The title", "The hypothesis only"], answer: "What you measure", explain: "The dependent variable is the measured result." },
        { q: "Why repeat trials?", choices: ["To make results more reliable", "To waste time", "To change every variable", "To avoid data"], answer: "To make results more reliable", explain: "Repeating reduces random error." },
        { q: "What is a control variable?", choices: ["Something kept the same", "The result", "The conclusion", "The graph title"], answer: "Something kept the same", explain: "Controls help make the test fair." },
        { q: "Which is evidence?", choices: ["Measured data", "A random guess", "A feeling", "A decoration"], answer: "Measured data", explain: "Evidence is based on observations/data." },
        { q: "What does a food web show?", choices: ["Energy relationships", "Only weather", "Only rocks", "Only planets"], answer: "Energy relationships", explain: "Food webs show who eats what and energy flow." },
        { q: "What is density?", choices: ["Mass per volume", "Speed per hour", "Heat only", "Length only"], answer: "Mass per volume", explain: "Density compares mass and volume." },
        { q: "What does conservation of matter mean?", choices: ["Matter is not created or destroyed in a closed system", "Matter disappears", "Matter only becomes heat", "Matter cannot change form"], answer: "Matter is not created or destroyed in a closed system", explain: "Atoms are rearranged, not lost." }
      ],
      social: [
        { q: "What is a primary source?", choices: ["A source from the time/event", "A textbook summary", "A random website", "A prediction"], answer: "A source from the time/event", explain: "Primary sources come directly from the event/time." },
        { q: "Why compare multiple sources?", choices: ["To check reliability and perspective", "To make reading longer", "To avoid evidence", "To copy faster"], answer: "To check reliability and perspective", explain: "Sources can disagree or have bias." },
        { q: "What is bias?", choices: ["A one-sided perspective", "A map symbol", "A type of weather", "A timeline"], answer: "A one-sided perspective", explain: "Bias can make information unfair or slanted." },
        { q: "What does latitude measure?", choices: ["Distance north or south of the equator", "Distance from the moon", "Depth of an ocean", "Height of a building"], answer: "Distance north or south of the equator", explain: "Latitude lines run east-west and measure north/south." },
        { q: "What is a civilization?", choices: ["A complex society with cities and systems", "A single tree", "A weather event", "A math formula"], answer: "A complex society with cities and systems", explain: "Civilizations have organization, cities, culture, and institutions." },
        { q: "What is cause and effect in history?", choices: ["Why something happened and what happened after", "Only dates", "Only maps", "A list of names"], answer: "Why something happened and what happened after", explain: "Cause explains why; effect explains result." },
        { q: "What is civic responsibility?", choices: ["Duties people have in a community", "A mountain range", "A type of trade", "A river"], answer: "Duties people have in a community", explain: "Civic responsibilities help communities work." },
        { q: "Why are artifacts useful?", choices: ["They give clues about the past", "They predict weather", "They solve equations", "They erase history"], answer: "They give clues about the past", explain: "Artifacts are objects from the past that historians study." }
      ],
      vocab: [
        { q: "The solution was temporary; it would not last long. What does temporary mean?", choices: ["Not permanent", "Very loud", "Carefully hidden", "Extremely old"], answer: "Not permanent", explain: "The clue says it would not last long." },
        { q: "What does analyze mean?", choices: ["Examine closely", "Ignore", "Decorate", "Memorize blindly"], answer: "Examine closely", explain: "Analyze means study carefully." },
        { q: "What are context clues?", choices: ["Hints around a word", "Only the dictionary", "The page number", "The book cover"], answer: "Hints around a word", explain: "Nearby words can help you figure out meaning." },
        { q: "What does significant mean?", choices: ["Important", "Tiny", "Accidental", "Invisible"], answer: "Important", explain: "Significant means important or meaningful." },
        { q: "What does contrast mean?", choices: ["Show differences", "Show only dates", "Repeat exactly", "Make louder"], answer: "Show differences", explain: "Contrast means tell how things differ." },
        { q: "What does infer mean?", choices: ["Use clues to figure something out", "Copy a sentence", "Ignore evidence", "Draw a cover"], answer: "Use clues to figure something out", explain: "Inference uses clues and background knowledge." },
        { q: "What does precise mean?", choices: ["Exact and clear", "Messy", "Ancient", "Noisy"], answer: "Exact and clear", explain: "Precise means exact." },
        { q: "What does justify mean?", choices: ["Support with reasons", "Hide", "Guess randomly", "Erase"], answer: "Support with reasons", explain: "Justify means explain why with support." }
      ],
      study: [
        { q: "What helps most when studying?", choices: ["Practice retrieval", "Only rereading once", "Never sleeping", "Skipping notes"], answer: "Practice retrieval", explain: "Trying to remember strengthens learning." },
        { q: "Why use a planner?", choices: ["To track tasks and deadlines", "To avoid all work", "To decorate only", "To forget homework"], answer: "To track tasks and deadlines", explain: "A planner organizes work." },
        { q: "What is spaced practice?", choices: ["Studying over several days", "Cramming once", "Never reviewing", "Studying only after the test"], answer: "Studying over several days", explain: "Spacing out practice helps memory." },
        { q: "What should you do after a wrong answer?", choices: ["Read the explanation and retry", "Ignore it", "Get mad and stop", "Delete the question"], answer: "Read the explanation and retry", explain: "Mistakes are useful when you learn from them." },
        { q: "What is active recall?", choices: ["Trying to remember without looking", "Highlighting everything", "Sleeping with a book", "Copying silently"], answer: "Trying to remember without looking", explain: "Active recall strengthens memory." },
        { q: "What makes notes useful?", choices: ["Short key ideas in your own words", "Every word copied", "Only doodles", "No headings"], answer: "Short key ideas in your own words", explain: "Your own words help understanding." },
        { q: "What is a good study goal?", choices: ["Specific and realistic", "Vague and impossible", "No plan", "Only 'study everything'"], answer: "Specific and realistic", explain: "Clear goals are easier to complete." },
        { q: "What is the best way to handle distractions?", choices: ["Remove or reduce them before starting", "Keep every notification on", "Study beside loud TV", "Switch tasks every minute"], answer: "Remove or reduce them before starting", explain: "Fewer distractions makes focus easier." }
      ]
    },

    high: {
      math: [
        { q: "What is the slope through (2, 5) and (6, 13)?", choices: ["1", "2", "3", "4"], answer: "2", explain: "Slope = (13 - 5) / (6 - 2) = 8/4 = 2." },
        { q: "Solve: 2x + 5 = 17", choices: ["4", "5", "6", "7"], answer: "6", explain: "Subtract 5, then divide by 2." },
        { q: "Expand (x + 3)(x + 2).", choices: ["x² + 5x + 6", "x² + 6", "x² + 3x + 2", "2x + 5"], answer: "x² + 5x + 6", explain: "FOIL gives x² + 2x + 3x + 6." },
        { q: "Factor x² + 7x + 12.", choices: ["(x+3)(x+4)", "(x+2)(x+6)", "(x+1)(x+12)", "(x-3)(x-4)"], answer: "(x+3)(x+4)", explain: "3 and 4 multiply to 12 and add to 7." },
        { q: "What is the y-intercept of y = 3x - 4?", choices: ["3", "-4", "4", "-3"], answer: "-4", explain: "The y-intercept is b in y = mx + b." },
        { q: "Solve: x² = 49.", choices: ["7 only", "-7 only", "±7", "49"], answer: "±7", explain: "Both 7 and -7 square to 49." },
        { q: "What is 2⁴?", choices: ["6", "8", "12", "16"], answer: "16", explain: "2 × 2 × 2 × 2 = 16." },
        { q: "Simplify: 3x + 2x - 5.", choices: ["5x - 5", "6x - 5", "x - 5", "5x + 5"], answer: "5x - 5", explain: "Combine like terms: 3x + 2x = 5x." }
      ],
      reading: [
        { q: "Which best describes rhetorical purpose?", choices: ["Why the author wrote the text", "How many paragraphs it has", "The exact page count", "The character list"], answer: "Why the author wrote the text", explain: "Rhetorical purpose is the author's goal." },
        { q: "Loaded words meant to influence feelings may signal what?", choices: ["Bias", "Setting", "Rhyme", "Plot twist"], answer: "Bias", explain: "Loaded language can signal bias." },
        { q: "What is an author's claim?", choices: ["The argument they want to prove", "The font size", "The first page", "The glossary"], answer: "The argument they want to prove", explain: "A claim is a position or argument." },
        { q: "What does synthesize mean?", choices: ["Combine ideas from multiple sources", "Ignore sources", "Copy one sentence", "Read only the title"], answer: "Combine ideas from multiple sources", explain: "Synthesis combines ideas." },
        { q: "What is irony?", choices: ["A contrast between expectation and reality", "A simple fact", "A map", "A paragraph summary"], answer: "A contrast between expectation and reality", explain: "Irony involves an unexpected contrast." },
        { q: "Which is a valid inference?", choices: ["One supported by evidence", "A random guess", "A copied title", "A personal favorite"], answer: "One supported by evidence", explain: "Inferences need evidence." },
        { q: "What is author's craft?", choices: ["Techniques an author uses", "The price of a book", "Only punctuation", "The number of chapters"], answer: "Techniques an author uses", explain: "Craft includes diction, structure, imagery, tone, and more." },
        { q: "What does evaluate a source mean?", choices: ["Judge credibility and usefulness", "Count its pages", "Like the cover", "Skip the author"], answer: "Judge credibility and usefulness", explain: "Evaluation checks whether a source is trustworthy and relevant." }
      ],
      writing: [
        { q: "What makes a thesis strong?", choices: ["It is specific and arguable", "It is vague", "It is only a question", "It lists random facts"], answer: "It is specific and arguable", explain: "A thesis should give a focused argument." },
        { q: "What is evidence for in an essay?", choices: ["To support the claim", "To decorate the page", "To replace reasoning", "To avoid explaining"], answer: "To support the claim", explain: "Evidence supports claims." },
        { q: "What is commentary?", choices: ["Explanation of how evidence supports a claim", "A random quote", "Only a title", "The bibliography"], answer: "Explanation of how evidence supports a claim", explain: "Commentary connects evidence to your argument." },
        { q: "Which is the most academic tone?", choices: ["The evidence suggests a pattern.", "This is totally crazy.", "Stuff is weird.", "I dunno."], answer: "The evidence suggests a pattern.", explain: "Academic tone is clear and formal." },
        { q: "What is a transition's job?", choices: ["Connect ideas", "Replace evidence", "Hide the thesis", "End every paragraph"], answer: "Connect ideas", explain: "Transitions guide readers between ideas." },
        { q: "What does concision mean?", choices: ["Using fewer words clearly", "Writing as much as possible", "Avoiding verbs", "Only using long words"], answer: "Using fewer words clearly", explain: "Concision means clear and brief." },
        { q: "What is a counterargument?", choices: ["An opposing viewpoint", "A grammar error", "A title", "A source citation only"], answer: "An opposing viewpoint", explain: "Counterarguments address the other side." },
        { q: "What is plagiarism?", choices: ["Using someone else's work without credit", "Revising your draft", "Citing a source", "Brainstorming"], answer: "Using someone else's work without credit", explain: "Credit must be given for others' words or ideas." }
      ],
      science: [
        { q: "What does genotype mean?", choices: ["An organism's allele combination", "Physical appearance only", "A food chain", "A lab tool"], answer: "An organism's allele combination", explain: "Genotype is genetic makeup." },
        { q: "Correlation does not always prove what?", choices: ["Causation", "A pattern", "A relationship", "A graph"], answer: "Causation", explain: "Things can move together without one causing the other." },
        { q: "What is homeostasis?", choices: ["Maintaining stable internal conditions", "Rapid evolution", "A type of graph", "Breaking molecules only"], answer: "Maintaining stable internal conditions", explain: "Homeostasis keeps internal conditions balanced." },
        { q: "What does acceleration measure?", choices: ["Change in velocity over time", "Distance only", "Mass only", "Temperature only"], answer: "Change in velocity over time", explain: "Acceleration is how quickly velocity changes." },
        { q: "What is a control group?", choices: ["A comparison group not receiving the treatment", "The graph title", "The final result", "A hypothesis"], answer: "A comparison group not receiving the treatment", explain: "Control groups help show what changed." },
        { q: "What does pH measure?", choices: ["Acidity/basicity", "Speed", "Mass", "Genetic code"], answer: "Acidity/basicity", explain: "pH measures how acidic or basic a solution is." },
        { q: "What is cellular respiration mainly for?", choices: ["Releasing energy from food", "Making sound", "Producing rocks", "Measuring distance"], answer: "Releasing energy from food", explain: "Cells release energy from glucose." },
        { q: "What is Newton's first law about?", choices: ["Inertia", "Electric charge", "Density", "Cell division"], answer: "Inertia", explain: "Objects resist changes in motion." }
      ],
      social: [
        { q: "What is federalism?", choices: ["Power shared between national and state governments", "Rule by one king", "A trade route", "A court document"], answer: "Power shared between national and state governments", explain: "Federalism divides power across levels." },
        { q: "What is opportunity cost?", choices: ["The next best choice you give up", "The total money you have", "A free item", "A tax form"], answer: "The next best choice you give up", explain: "Opportunity cost is what you give up when choosing." },
        { q: "What is separation of powers?", choices: ["Dividing government power among branches", "A type of map", "A market price", "A treaty only"], answer: "Dividing government power among branches", explain: "It prevents one branch from having all power." },
        { q: "What is inflation?", choices: ["General rise in prices", "Lower population", "A new law", "A court case"], answer: "General rise in prices", explain: "Inflation means money buys less than before." },
        { q: "What is historical context?", choices: ["The conditions around an event", "Only the date", "Only the author", "A random opinion"], answer: "The conditions around an event", explain: "Context helps explain why events happened." },
        { q: "What is a secondary source?", choices: ["An interpretation or summary after the event", "A diary from the event", "A photograph from the scene", "A government document from the time"], answer: "An interpretation or summary after the event", explain: "Secondary sources analyze or summarize primary sources/events." },
        { q: "What is supply and demand about?", choices: ["How availability and desire affect price", "Only voting", "Only geography", "A type of source"], answer: "How availability and desire affect price", explain: "Supply and demand shape prices." },
        { q: "What does precedent mean in law/history?", choices: ["An earlier example that guides later decisions", "A weather event", "A graph line", "A tax only"], answer: "An earlier example that guides later decisions", explain: "Precedents influence future choices." }
      ],
      vocab: [
        { q: "What does mitigate mean?", choices: ["Make less severe", "Make louder", "Hide completely", "Repeat exactly"], answer: "Make less severe", explain: "Mitigate means reduce seriousness." },
        { q: "What does ambiguous mean?", choices: ["Having more than one possible meaning", "Very obvious", "Incorrectly spelled", "Always emotional"], answer: "Having more than one possible meaning", explain: "Ambiguous means unclear or open to more than one meaning." },
        { q: "What does substantiate mean?", choices: ["Support with evidence", "Make smaller", "Speak quietly", "Remove details"], answer: "Support with evidence", explain: "Substantiate means prove or support." },
        { q: "What does coherent mean?", choices: ["Clear and logical", "Broken apart", "Very old", "Unrelated"], answer: "Clear and logical", explain: "Coherent writing makes sense." },
        { q: "What does prevalent mean?", choices: ["Common or widespread", "Rare", "Hidden", "Incorrect"], answer: "Common or widespread", explain: "Prevalent means widespread." },
        { q: "What does inferential mean?", choices: ["Based on reasoning from evidence", "Copied exactly", "Only emotional", "Random"], answer: "Based on reasoning from evidence", explain: "Inferential thinking uses clues and reasoning." },
        { q: "What does nuanced mean?", choices: ["Showing subtle differences", "Very simple", "Completely wrong", "Only loud"], answer: "Showing subtle differences", explain: "Nuanced means not overly simple." },
        { q: "What does scrutinize mean?", choices: ["Examine very carefully", "Ignore", "Decorate", "Repeat"], answer: "Examine very carefully", explain: "Scrutinize means inspect closely." }
      ],
      study: [
        { q: "Which strategy is best for long-term learning?", choices: ["Spaced practice", "Cramming once", "Highlighting everything", "Never testing yourself"], answer: "Spaced practice", explain: "Spaced practice spreads learning over time." },
        { q: "What is metacognition?", choices: ["Thinking about your own thinking", "Memorizing blindly", "Avoiding feedback", "Writing faster only"], answer: "Thinking about your own thinking", explain: "Metacognition means noticing how you learn." },
        { q: "What is interleaving?", choices: ["Mixing related problem types", "Doing only one easy thing", "Skipping review", "Reading without thinking"], answer: "Mixing related problem types", explain: "Interleaving helps you choose the right strategy." },
        { q: "What makes feedback useful?", choices: ["It tells what to improve", "It only says good job", "It hides mistakes", "It avoids details"], answer: "It tells what to improve", explain: "Useful feedback guides improvement." },
        { q: "Why do practice tests help?", choices: ["They strengthen retrieval and reveal gaps", "They replace learning entirely", "They make sleep unnecessary", "They only create grades"], answer: "They strengthen retrieval and reveal gaps", explain: "Practice tests show what you know and need." },
        { q: "What is prioritization?", choices: ["Choosing what matters most first", "Doing everything randomly", "Ignoring deadlines", "Only decorating notes"], answer: "Choosing what matters most first", explain: "Prioritization helps manage time." },
        { q: "What is a SMART goal?", choices: ["Specific, measurable, achievable, relevant, time-bound", "Small, messy, angry, random, tired", "Only a dream", "A goal with no plan"], answer: "Specific, measurable, achievable, relevant, time-bound", explain: "SMART goals are clear and trackable." },
        { q: "What is cognitive load?", choices: ["How much mental effort something uses", "A backpack weight only", "A test grade", "A type of graph"], answer: "How much mental effort something uses", explain: "Reducing cognitive load can make learning easier." }
      ]
    }
  };
  const WORKOUT_REPS = 10;

  const gradeQuestionBank = {
    "1": {
        "math": [
            {
                "q": "1st grade math: What is 4 + 3?",
                "choices": [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                "answer": "7",
                "explain": "4 + 3 = 7."
            },
            {
                "q": "1st grade math: What is 9 - 2?",
                "choices": [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                "answer": "7",
                "explain": "9 - 2 = 7."
            },
            {
                "q": "1st grade math: Which number is greater?",
                "choices": [
                    "12",
                    "8",
                    "10",
                    "9"
                ],
                "answer": "12",
                "explain": "12 is the greatest number."
            },
            {
                "q": "1st grade math: Count by twos: 2, 4, 6, __",
                "choices": [
                    "7",
                    "8",
                    "9",
                    "10"
                ],
                "answer": "8",
                "explain": "Counting by twos gives 8."
            },
            {
                "q": "1st grade math: How many sides does a square have?",
                "choices": [
                    "3",
                    "4",
                    "5",
                    "6"
                ],
                "answer": "4",
                "explain": "A square has 4 sides."
            },
            {
                "q": "1st grade math: What is 10 + 0?",
                "choices": [
                    "0",
                    "9",
                    "10",
                    "11"
                ],
                "answer": "10",
                "explain": "Adding zero keeps the number the same."
            },
            {
                "q": "1st grade math: Which number comes before 15?",
                "choices": [
                    "13",
                    "14",
                    "16",
                    "17"
                ],
                "answer": "14",
                "explain": "14 comes before 15."
            },
            {
                "q": "1st grade math: What is 5 + 5?",
                "choices": [
                    "8",
                    "9",
                    "10",
                    "11"
                ],
                "answer": "10",
                "explain": "5 + 5 = 10."
            },
            {
                "q": "1st grade math: Which is an even number?",
                "choices": [
                    "3",
                    "5",
                    "8",
                    "9"
                ],
                "answer": "8",
                "explain": "8 can be split into two equal groups."
            },
            {
                "q": "1st grade math: What is 7 - 4?",
                "choices": [
                    "2",
                    "3",
                    "4",
                    "5"
                ],
                "answer": "3",
                "explain": "7 - 4 = 3."
            }
        ],
        "reading": [
            {
                "q": "1st grade reading: A dog barks at the mail truck. How does the dog probably feel?",
                "choices": [
                    "excited",
                    "sleepy",
                    "cold",
                    "lost"
                ],
                "answer": "excited",
                "explain": "Barking at something can show excitement."
            },
            {
                "q": "1st grade reading: What is a character?",
                "choices": [
                    "a person or animal in a story",
                    "a math sign",
                    "a map",
                    "a snack"
                ],
                "answer": "a person or animal in a story",
                "explain": "Characters are who the story is about."
            },
            {
                "q": "1st grade reading: Where a story happens is the...",
                "choices": [
                    "setting",
                    "title",
                    "answer",
                    "cover"
                ],
                "answer": "setting",
                "explain": "Setting means where and when."
            },
            {
                "q": "1st grade reading: What is the main idea of a story about a bird learning to fly?",
                "choices": [
                    "A bird learns to fly",
                    "A pencil is red",
                    "A chair is big",
                    "Rain falls"
                ],
                "answer": "A bird learns to fly",
                "explain": "Main idea is what the story is mostly about."
            },
            {
                "q": "1st grade reading: Which word is a feeling?",
                "choices": [
                    "happy",
                    "table",
                    "window",
                    "pencil"
                ],
                "answer": "happy",
                "explain": "Happy is a feeling."
            },
            {
                "q": "1st grade reading: If Sam shivered, he might feel...",
                "choices": [
                    "cold",
                    "round",
                    "blue",
                    "loud"
                ],
                "answer": "cold",
                "explain": "Shivering is a clue."
            },
            {
                "q": "1st grade reading: The title of a book usually tells...",
                "choices": [
                    "what the book may be about",
                    "the answer to every question",
                    "how tall you are",
                    "the time"
                ],
                "answer": "what the book may be about",
                "explain": "Titles give a clue."
            },
            {
                "q": "1st grade reading: A picture in a story can help you...",
                "choices": [
                    "understand the story",
                    "skip all words",
                    "change the ending",
                    "count money"
                ],
                "answer": "understand the story",
                "explain": "Pictures give clues."
            },
            {
                "q": "1st grade reading: If a character smiles, they may feel...",
                "choices": [
                    "happy",
                    "angry",
                    "lost",
                    "sleepy"
                ],
                "answer": "happy",
                "explain": "Smiling often shows happiness."
            },
            {
                "q": "1st grade reading: What do we call words people say in a story?",
                "choices": [
                    "dialogue",
                    "setting",
                    "cover",
                    "number"
                ],
                "answer": "dialogue",
                "explain": "Dialogue is spoken words."
            }
        ],
        "writing": [
            {
                "q": "1st grade writing: Which sentence starts correctly?",
                "choices": [
                    "The dog runs.",
                    "the dog runs.",
                    "dog runs.",
                    "Runs dog."
                ],
                "answer": "The dog runs.",
                "explain": "Sentences start with capital letters."
            },
            {
                "q": "1st grade writing: Which sentence ends correctly?",
                "choices": [
                    "I like apples.",
                    "I like apples",
                    "i like apples",
                    "I like apples,"
                ],
                "answer": "I like apples.",
                "explain": "A statement ends with a period."
            },
            {
                "q": "1st grade writing: Which is a complete sentence?",
                "choices": [
                    "The bird sings.",
                    "Bird the.",
                    "Sings blue.",
                    "The."
                ],
                "answer": "The bird sings.",
                "explain": "It has a subject and complete thought."
            },
            {
                "q": "1st grade writing: Which word should be capitalized?",
                "choices": [
                    "monday",
                    "chair",
                    "small",
                    "jump"
                ],
                "answer": "monday",
                "explain": "Days of the week are capitalized."
            },
            {
                "q": "1st grade writing: Which sentence asks a question?",
                "choices": [
                    "Where is my book?",
                    "I have a book.",
                    "The book is blue.",
                    "Read the book."
                ],
                "answer": "Where is my book?",
                "explain": "Questions end with question marks."
            },
            {
                "q": "1st grade writing: Which is a noun?",
                "choices": [
                    "dog",
                    "run",
                    "blue",
                    "quickly"
                ],
                "answer": "dog",
                "explain": "A noun names a person, place, or thing."
            },
            {
                "q": "1st grade writing: Which is a verb?",
                "choices": [
                    "jump",
                    "table",
                    "green",
                    "soft"
                ],
                "answer": "jump",
                "explain": "A verb is an action word."
            },
            {
                "q": "1st grade writing: Which word describes?",
                "choices": [
                    "bright",
                    "desk",
                    "run",
                    "school"
                ],
                "answer": "bright",
                "explain": "Adjectives describe nouns."
            },
            {
                "q": "1st grade writing: What should a story have?",
                "choices": [
                    "beginning, middle, and end",
                    "only one word",
                    "only numbers",
                    "no characters"
                ],
                "answer": "beginning, middle, and end",
                "explain": "Stories have a sequence."
            },
            {
                "q": "1st grade writing: Which sentence is clearer?",
                "choices": [
                    "The cat sat on the mat.",
                    "Cat mat sat the.",
                    "The on cat mat.",
                    "Sat cat the."
                ],
                "answer": "The cat sat on the mat.",
                "explain": "Clear sentences have words in order."
            }
        ],
        "science": [
            {
                "q": "1st grade science: Which is a living thing?",
                "choices": [
                    "plant",
                    "rock",
                    "chair",
                    "pencil"
                ],
                "answer": "plant",
                "explain": "Plants grow and need water."
            },
            {
                "q": "1st grade science: What do plants need?",
                "choices": [
                    "water and sunlight",
                    "plastic and metal",
                    "sandwiches only",
                    "books only"
                ],
                "answer": "water and sunlight",
                "explain": "Plants need water and sunlight."
            },
            {
                "q": "1st grade science: Which sense uses your eyes?",
                "choices": [
                    "sight",
                    "hearing",
                    "taste",
                    "touch"
                ],
                "answer": "sight",
                "explain": "Eyes are for seeing."
            },
            {
                "q": "1st grade science: What is weather?",
                "choices": [
                    "what the sky and air are like",
                    "a type of animal",
                    "a math rule",
                    "a story"
                ],
                "answer": "what the sky and air are like",
                "explain": "Weather describes air and sky conditions."
            },
            {
                "q": "1st grade science: Which object is a solid?",
                "choices": [
                    "ice cube",
                    "steam",
                    "air",
                    "rain mist"
                ],
                "answer": "ice cube",
                "explain": "Solids keep their shape."
            },
            {
                "q": "1st grade science: Which animal has feathers?",
                "choices": [
                    "bird",
                    "fish",
                    "frog",
                    "snake"
                ],
                "answer": "bird",
                "explain": "Birds have feathers."
            },
            {
                "q": "1st grade science: What gives Earth light during the day?",
                "choices": [
                    "Sun",
                    "Moon",
                    "clouds",
                    "rocks"
                ],
                "answer": "Sun",
                "explain": "The Sun gives daytime light."
            },
            {
                "q": "1st grade science: A magnet can pull some objects made of...",
                "choices": [
                    "metal",
                    "paper only",
                    "wood only",
                    "cloth"
                ],
                "answer": "metal",
                "explain": "Magnets attract certain metals."
            },
            {
                "q": "1st grade science: What happens when water freezes?",
                "choices": [
                    "It becomes ice",
                    "It becomes fire",
                    "It disappears",
                    "It becomes sand"
                ],
                "answer": "It becomes ice",
                "explain": "Frozen water is ice."
            },
            {
                "q": "1st grade science: Which is safe in science class?",
                "choices": [
                    "listen to directions",
                    "taste unknown liquids",
                    "run with tools",
                    "throw materials"
                ],
                "answer": "listen to directions",
                "explain": "Safety rules protect everyone."
            }
        ],
        "social": [
            {
                "q": "1st grade social studies: What is a community?",
                "choices": [
                    "a place where people live and work",
                    "a type of cloud",
                    "a math answer",
                    "a snack"
                ],
                "answer": "a place where people live and work",
                "explain": "Communities are groups of people in a place."
            },
            {
                "q": "1st grade social studies: What does a map help us do?",
                "choices": [
                    "find places",
                    "cook food",
                    "spell words",
                    "measure sound"
                ],
                "answer": "find places",
                "explain": "Maps show locations."
            },
            {
                "q": "1st grade social studies: Which is a rule at school?",
                "choices": [
                    "raise your hand to speak",
                    "run in halls always",
                    "hide books",
                    "throw pencils"
                ],
                "answer": "raise your hand to speak",
                "explain": "Rules help groups work safely."
            },
            {
                "q": "1st grade social studies: What is a citizen?",
                "choices": [
                    "a member of a community or country",
                    "a type of animal",
                    "a weather pattern",
                    "a number"
                ],
                "answer": "a member of a community or country",
                "explain": "Citizens belong to communities."
            },
            {
                "q": "1st grade social studies: What is a need?",
                "choices": [
                    "something people must have",
                    "a toy only",
                    "a game",
                    "a color"
                ],
                "answer": "something people must have",
                "explain": "Needs include food, water, and shelter."
            },
            {
                "q": "1st grade social studies: What is a want?",
                "choices": [
                    "something people would like to have",
                    "air to breathe",
                    "water to survive",
                    "safety only"
                ],
                "answer": "something people would like to have",
                "explain": "Wants are nice but not required."
            },
            {
                "q": "1st grade social studies: Who helps keep a community safe?",
                "choices": [
                    "firefighters and police officers",
                    "only singers",
                    "only pets",
                    "only stores"
                ],
                "answer": "firefighters and police officers",
                "explain": "Community helpers provide services."
            },
            {
                "q": "1st grade social studies: What does past mean?",
                "choices": [
                    "already happened",
                    "happening tomorrow",
                    "never happens",
                    "a map key"
                ],
                "answer": "already happened",
                "explain": "Past events already happened."
            },
            {
                "q": "1st grade social studies: What is a holiday?",
                "choices": [
                    "a special day people remember or celebrate",
                    "a math tool",
                    "a desk",
                    "a street sign"
                ],
                "answer": "a special day people remember or celebrate",
                "explain": "Holidays mark special events."
            },
            {
                "q": "1st grade social studies: Why do people vote?",
                "choices": [
                    "to make choices in a community",
                    "to measure rain",
                    "to draw maps",
                    "to cook meals"
                ],
                "answer": "to make choices in a community",
                "explain": "Voting helps groups decide."
            }
        ],
        "vocab": [
            {
                "q": "1st grade vocabulary: What does happy mean?",
                "choices": [
                    "feeling good",
                    "very cold",
                    "a kind of chair",
                    "a number"
                ],
                "answer": "feeling good",
                "explain": "Happy is a feeling."
            },
            {
                "q": "1st grade vocabulary: Which word means big?",
                "choices": [
                    "large",
                    "tiny",
                    "quiet",
                    "late"
                ],
                "answer": "large",
                "explain": "Large means big."
            },
            {
                "q": "1st grade vocabulary: What is the opposite of hot?",
                "choices": [
                    "cold",
                    "warm",
                    "sunny",
                    "bright"
                ],
                "answer": "cold",
                "explain": "Cold is the opposite of hot."
            },
            {
                "q": "1st grade vocabulary: What does quick mean?",
                "choices": [
                    "fast",
                    "slow",
                    "sad",
                    "round"
                ],
                "answer": "fast",
                "explain": "Quick means fast."
            },
            {
                "q": "1st grade vocabulary: Which word is a color?",
                "choices": [
                    "blue",
                    "jump",
                    "table",
                    "sing"
                ],
                "answer": "blue",
                "explain": "Blue is a color."
            },
            {
                "q": "1st grade vocabulary: What does begin mean?",
                "choices": [
                    "start",
                    "finish",
                    "sleep",
                    "hide"
                ],
                "answer": "start",
                "explain": "Begin means start."
            },
            {
                "q": "1st grade vocabulary: What does tiny mean?",
                "choices": [
                    "very small",
                    "very loud",
                    "very old",
                    "very bright"
                ],
                "answer": "very small",
                "explain": "Tiny means very small."
            },
            {
                "q": "1st grade vocabulary: Which word means look?",
                "choices": [
                    "see",
                    "run",
                    "eat",
                    "sit"
                ],
                "answer": "see",
                "explain": "See means look."
            },
            {
                "q": "1st grade vocabulary: What does kind mean?",
                "choices": [
                    "nice",
                    "angry",
                    "sharp",
                    "heavy"
                ],
                "answer": "nice",
                "explain": "Kind means nice or caring."
            },
            {
                "q": "1st grade vocabulary: What does finish mean?",
                "choices": [
                    "end",
                    "start",
                    "jump",
                    "ask"
                ],
                "answer": "end",
                "explain": "Finish means end."
            }
        ],
        "study": [
            {
                "q": "1st grade study skills: What helps you remember homework?",
                "choices": [
                    "write it down",
                    "hide it",
                    "forget it",
                    "throw it away"
                ],
                "answer": "write it down",
                "explain": "Writing things down helps memory."
            },
            {
                "q": "1st grade study skills: What should you do when the teacher gives directions?",
                "choices": [
                    "listen carefully",
                    "talk loudly",
                    "run away",
                    "close your book"
                ],
                "answer": "listen carefully",
                "explain": "Listening helps you understand."
            },
            {
                "q": "1st grade study skills: What is a good place to study?",
                "choices": [
                    "quiet spot",
                    "noisy TV room",
                    "middle of a game",
                    "messy floor only"
                ],
                "answer": "quiet spot",
                "explain": "Quiet helps focus."
            },
            {
                "q": "1st grade study skills: What should you do if you are stuck?",
                "choices": [
                    "ask for help",
                    "give up",
                    "hide the paper",
                    "cry only"
                ],
                "answer": "ask for help",
                "explain": "Asking for help is a learning strategy."
            },
            {
                "q": "1st grade study skills: Why put supplies away?",
                "choices": [
                    "so you can find them later",
                    "so they disappear",
                    "so homework is harder",
                    "so nobody can study"
                ],
                "answer": "so you can find them later",
                "explain": "Organization saves time."
            },
            {
                "q": "1st grade study skills: What is practice?",
                "choices": [
                    "doing something again to improve",
                    "never trying",
                    "watching only",
                    "sleeping during class"
                ],
                "answer": "doing something again to improve",
                "explain": "Practice builds skill."
            },
            {
                "q": "1st grade study skills: What should you do before turning in work?",
                "choices": [
                    "check it",
                    "rip it",
                    "hide it",
                    "ignore directions"
                ],
                "answer": "check it",
                "explain": "Checking catches mistakes."
            },
            {
                "q": "1st grade study skills: A short break can help you...",
                "choices": [
                    "reset focus",
                    "forget school forever",
                    "avoid everything",
                    "lose homework"
                ],
                "answer": "reset focus",
                "explain": "Breaks help your brain rest."
            },
            {
                "q": "1st grade study skills: What is a goal?",
                "choices": [
                    "something you are trying to do",
                    "a snack",
                    "a pencil",
                    "a map"
                ],
                "answer": "something you are trying to do",
                "explain": "Goals guide work."
            },
            {
                "q": "1st grade study skills: What helps you read better?",
                "choices": [
                    "practice reading",
                    "never open books",
                    "skip all words",
                    "only look at covers"
                ],
                "answer": "practice reading",
                "explain": "Reading practice builds skill."
            }
        ]
    },
    "2": {
        "math": [
            {
                "q": "2nd grade math: What is 18 + 7?",
                "choices": [
                    "23",
                    "24",
                    "25",
                    "26"
                ],
                "answer": "25",
                "explain": "18 + 7 = 25."
            },
            {
                "q": "2nd grade math: What is 35 - 9?",
                "choices": [
                    "24",
                    "25",
                    "26",
                    "27"
                ],
                "answer": "26",
                "explain": "35 - 9 = 26."
            },
            {
                "q": "2nd grade math: What is 4 × 3?",
                "choices": [
                    "7",
                    "10",
                    "12",
                    "16"
                ],
                "answer": "12",
                "explain": "4 groups of 3 equals 12."
            },
            {
                "q": "2nd grade math: What is half of 14?",
                "choices": [
                    "6",
                    "7",
                    "8",
                    "9"
                ],
                "answer": "7",
                "explain": "Half of 14 is 7."
            },
            {
                "q": "2nd grade math: Which number has 6 tens and 3 ones?",
                "choices": [
                    "36",
                    "63",
                    "603",
                    "306"
                ],
                "answer": "63",
                "explain": "6 tens and 3 ones makes 63."
            },
            {
                "q": "2nd grade math: What is 100 - 40?",
                "choices": [
                    "40",
                    "50",
                    "60",
                    "70"
                ],
                "answer": "60",
                "explain": "100 - 40 = 60."
            },
            {
                "q": "2nd grade math: What time is shown by the hour hand on 3 and minute hand on 12?",
                "choices": [
                    "2:00",
                    "3:00",
                    "3:30",
                    "12:03"
                ],
                "answer": "3:00",
                "explain": "Minute hand on 12 means exactly on the hour."
            },
            {
                "q": "2nd grade math: Which shape has 3 sides?",
                "choices": [
                    "circle",
                    "triangle",
                    "square",
                    "hexagon"
                ],
                "answer": "triangle",
                "explain": "A triangle has 3 sides."
            },
            {
                "q": "2nd grade math: What is 2 quarters worth?",
                "choices": [
                    "25 cents",
                    "50 cents",
                    "75 cents",
                    "100 cents"
                ],
                "answer": "50 cents",
                "explain": "Each quarter is 25 cents."
            },
            {
                "q": "2nd grade math: Count by fives: 5, 10, 15, __",
                "choices": [
                    "16",
                    "18",
                    "20",
                    "25"
                ],
                "answer": "20",
                "explain": "Counting by fives gives 20."
            }
        ],
        "reading": [
            {
                "q": "2nd grade reading: A girl plants a seed, waters it, and it grows. What happened first?",
                "choices": [
                    "She planted a seed",
                    "It grew tall",
                    "She picked fruit",
                    "It snowed"
                ],
                "answer": "She planted a seed",
                "explain": "First event is planting the seed."
            },
            {
                "q": "2nd grade reading: What is the problem in a story?",
                "choices": [
                    "what goes wrong",
                    "the page number",
                    "the author's name",
                    "the cover color"
                ],
                "answer": "what goes wrong",
                "explain": "A problem is what the character must solve."
            },
            {
                "q": "2nd grade reading: What is a solution?",
                "choices": [
                    "how the problem gets fixed",
                    "a new character",
                    "a title",
                    "a sentence mark"
                ],
                "answer": "how the problem gets fixed",
                "explain": "Solution fixes the problem."
            },
            {
                "q": "2nd grade reading: If a story says the sidewalk was wet after dark clouds, what likely happened?",
                "choices": [
                    "It rained",
                    "It was sunny",
                    "The sidewalk sang",
                    "The clouds disappeared"
                ],
                "answer": "It rained",
                "explain": "Wet sidewalk and dark clouds are clues."
            },
            {
                "q": "2nd grade reading: What is a fact?",
                "choices": [
                    "something that can be proven",
                    "a feeling only",
                    "a pretend idea",
                    "a question"
                ],
                "answer": "something that can be proven",
                "explain": "Facts can be checked."
            },
            {
                "q": "2nd grade reading: Which is an opinion?",
                "choices": [
                    "Chocolate is the best flavor",
                    "Plants need water",
                    "Dogs are animals",
                    "A week has 7 days"
                ],
                "answer": "Chocolate is the best flavor",
                "explain": "Best is a personal feeling."
            },
            {
                "q": "2nd grade reading: A table of contents helps readers...",
                "choices": [
                    "find sections",
                    "cook food",
                    "draw maps",
                    "solve subtraction"
                ],
                "answer": "find sections",
                "explain": "It lists where sections begin."
            },
            {
                "q": "2nd grade reading: What is the author's purpose in a funny story?",
                "choices": [
                    "entertain",
                    "measure",
                    "warn only",
                    "count"
                ],
                "answer": "entertain",
                "explain": "Funny stories entertain."
            },
            {
                "q": "2nd grade reading: What does compare mean?",
                "choices": [
                    "tell how things are alike",
                    "erase words",
                    "make noise",
                    "skip pages"
                ],
                "answer": "tell how things are alike",
                "explain": "Compare looks at similarities."
            },
            {
                "q": "2nd grade reading: What is a detail?",
                "choices": [
                    "a small piece of information",
                    "the whole book",
                    "the library",
                    "the cover only"
                ],
                "answer": "a small piece of information",
                "explain": "Details support main ideas."
            }
        ],
        "writing": [
            {
                "q": "2nd grade writing: Which sentence starts correctly?",
                "choices": [
                    "The dog runs.",
                    "the dog runs.",
                    "dog runs.",
                    "Runs dog."
                ],
                "answer": "The dog runs.",
                "explain": "Sentences start with capital letters."
            },
            {
                "q": "2nd grade writing: Which sentence ends correctly?",
                "choices": [
                    "I like apples.",
                    "I like apples",
                    "i like apples",
                    "I like apples,"
                ],
                "answer": "I like apples.",
                "explain": "A statement ends with a period."
            },
            {
                "q": "2nd grade writing: Which is a complete sentence?",
                "choices": [
                    "The bird sings.",
                    "Bird the.",
                    "Sings blue.",
                    "The."
                ],
                "answer": "The bird sings.",
                "explain": "It has a subject and complete thought."
            },
            {
                "q": "2nd grade writing: Which word should be capitalized?",
                "choices": [
                    "monday",
                    "chair",
                    "small",
                    "jump"
                ],
                "answer": "monday",
                "explain": "Days of the week are capitalized."
            },
            {
                "q": "2nd grade writing: Which sentence asks a question?",
                "choices": [
                    "Where is my book?",
                    "I have a book.",
                    "The book is blue.",
                    "Read the book."
                ],
                "answer": "Where is my book?",
                "explain": "Questions end with question marks."
            },
            {
                "q": "2nd grade writing: Which is a noun?",
                "choices": [
                    "dog",
                    "run",
                    "blue",
                    "quickly"
                ],
                "answer": "dog",
                "explain": "A noun names a person, place, or thing."
            },
            {
                "q": "2nd grade writing: Which is a verb?",
                "choices": [
                    "jump",
                    "table",
                    "green",
                    "soft"
                ],
                "answer": "jump",
                "explain": "A verb is an action word."
            },
            {
                "q": "2nd grade writing: Which word describes?",
                "choices": [
                    "bright",
                    "desk",
                    "run",
                    "school"
                ],
                "answer": "bright",
                "explain": "Adjectives describe nouns."
            },
            {
                "q": "2nd grade writing: What should a story have?",
                "choices": [
                    "beginning, middle, and end",
                    "only one word",
                    "only numbers",
                    "no characters"
                ],
                "answer": "beginning, middle, and end",
                "explain": "Stories have a sequence."
            },
            {
                "q": "2nd grade writing: Which sentence is clearer?",
                "choices": [
                    "The cat sat on the mat.",
                    "Cat mat sat the.",
                    "The on cat mat.",
                    "Sat cat the."
                ],
                "answer": "The cat sat on the mat.",
                "explain": "Clear sentences have words in order."
            }
        ],
        "science": [
            {
                "q": "2nd grade science: What is a habitat?",
                "choices": [
                    "where an animal lives",
                    "a math answer",
                    "a pencil case",
                    "a story title"
                ],
                "answer": "where an animal lives",
                "explain": "A habitat is an animal's home."
            },
            {
                "q": "2nd grade science: Which is a liquid?",
                "choices": [
                    "water",
                    "rock",
                    "chair",
                    "ice cube"
                ],
                "answer": "water",
                "explain": "Liquids flow."
            },
            {
                "q": "2nd grade science: What does a thermometer measure?",
                "choices": [
                    "temperature",
                    "length",
                    "weight",
                    "sound"
                ],
                "answer": "temperature",
                "explain": "Thermometers measure temperature."
            },
            {
                "q": "2nd grade science: Which is a source of light?",
                "choices": [
                    "lamp",
                    "book",
                    "desk",
                    "shoe"
                ],
                "answer": "lamp",
                "explain": "Lamps give light."
            },
            {
                "q": "2nd grade science: What is a life cycle?",
                "choices": [
                    "stages of growth",
                    "a weather map",
                    "a lunch menu",
                    "a number line"
                ],
                "answer": "stages of growth",
                "explain": "Life cycles show how living things grow and change."
            },
            {
                "q": "2nd grade science: What do animals need to survive?",
                "choices": [
                    "food, water, and shelter",
                    "only toys",
                    "only books",
                    "only rocks"
                ],
                "answer": "food, water, and shelter",
                "explain": "Animals need basic resources."
            },
            {
                "q": "2nd grade science: Which force pulls objects down?",
                "choices": [
                    "gravity",
                    "sunlight",
                    "sound",
                    "color"
                ],
                "answer": "gravity",
                "explain": "Gravity pulls objects toward Earth."
            },
            {
                "q": "2nd grade science: What is an observation?",
                "choices": [
                    "something you notice using senses",
                    "a guess with no clues",
                    "a test answer",
                    "a drawing only"
                ],
                "answer": "something you notice using senses",
                "explain": "Observations use senses."
            },
            {
                "q": "2nd grade science: Which material is transparent?",
                "choices": [
                    "clear glass",
                    "wood",
                    "brick",
                    "cardboard"
                ],
                "answer": "clear glass",
                "explain": "Transparent materials let light through."
            },
            {
                "q": "2nd grade science: Why do we sort objects in science?",
                "choices": [
                    "to group by properties",
                    "to make a mess",
                    "to avoid noticing",
                    "to hide data"
                ],
                "answer": "to group by properties",
                "explain": "Sorting helps compare properties."
            }
        ],
        "social": [
            {
                "q": "2nd grade social studies: What is a community?",
                "choices": [
                    "a place where people live and work",
                    "a type of cloud",
                    "a math answer",
                    "a snack"
                ],
                "answer": "a place where people live and work",
                "explain": "Communities are groups of people in a place."
            },
            {
                "q": "2nd grade social studies: What does a map help us do?",
                "choices": [
                    "find places",
                    "cook food",
                    "spell words",
                    "measure sound"
                ],
                "answer": "find places",
                "explain": "Maps show locations."
            },
            {
                "q": "2nd grade social studies: Which is a rule at school?",
                "choices": [
                    "raise your hand to speak",
                    "run in halls always",
                    "hide books",
                    "throw pencils"
                ],
                "answer": "raise your hand to speak",
                "explain": "Rules help groups work safely."
            },
            {
                "q": "2nd grade social studies: What is a citizen?",
                "choices": [
                    "a member of a community or country",
                    "a type of animal",
                    "a weather pattern",
                    "a number"
                ],
                "answer": "a member of a community or country",
                "explain": "Citizens belong to communities."
            },
            {
                "q": "2nd grade social studies: What is a need?",
                "choices": [
                    "something people must have",
                    "a toy only",
                    "a game",
                    "a color"
                ],
                "answer": "something people must have",
                "explain": "Needs include food, water, and shelter."
            },
            {
                "q": "2nd grade social studies: What is a want?",
                "choices": [
                    "something people would like to have",
                    "air to breathe",
                    "water to survive",
                    "safety only"
                ],
                "answer": "something people would like to have",
                "explain": "Wants are nice but not required."
            },
            {
                "q": "2nd grade social studies: Who helps keep a community safe?",
                "choices": [
                    "firefighters and police officers",
                    "only singers",
                    "only pets",
                    "only stores"
                ],
                "answer": "firefighters and police officers",
                "explain": "Community helpers provide services."
            },
            {
                "q": "2nd grade social studies: What does past mean?",
                "choices": [
                    "already happened",
                    "happening tomorrow",
                    "never happens",
                    "a map key"
                ],
                "answer": "already happened",
                "explain": "Past events already happened."
            },
            {
                "q": "2nd grade social studies: What is a holiday?",
                "choices": [
                    "a special day people remember or celebrate",
                    "a math tool",
                    "a desk",
                    "a street sign"
                ],
                "answer": "a special day people remember or celebrate",
                "explain": "Holidays mark special events."
            },
            {
                "q": "2nd grade social studies: Why do people vote?",
                "choices": [
                    "to make choices in a community",
                    "to measure rain",
                    "to draw maps",
                    "to cook meals"
                ],
                "answer": "to make choices in a community",
                "explain": "Voting helps groups decide."
            }
        ],
        "vocab": [
            {
                "q": "2nd grade vocabulary: What does happy mean?",
                "choices": [
                    "feeling good",
                    "very cold",
                    "a kind of chair",
                    "a number"
                ],
                "answer": "feeling good",
                "explain": "Happy is a feeling."
            },
            {
                "q": "2nd grade vocabulary: Which word means big?",
                "choices": [
                    "large",
                    "tiny",
                    "quiet",
                    "late"
                ],
                "answer": "large",
                "explain": "Large means big."
            },
            {
                "q": "2nd grade vocabulary: What is the opposite of hot?",
                "choices": [
                    "cold",
                    "warm",
                    "sunny",
                    "bright"
                ],
                "answer": "cold",
                "explain": "Cold is the opposite of hot."
            },
            {
                "q": "2nd grade vocabulary: What does quick mean?",
                "choices": [
                    "fast",
                    "slow",
                    "sad",
                    "round"
                ],
                "answer": "fast",
                "explain": "Quick means fast."
            },
            {
                "q": "2nd grade vocabulary: Which word is a color?",
                "choices": [
                    "blue",
                    "jump",
                    "table",
                    "sing"
                ],
                "answer": "blue",
                "explain": "Blue is a color."
            },
            {
                "q": "2nd grade vocabulary: What does begin mean?",
                "choices": [
                    "start",
                    "finish",
                    "sleep",
                    "hide"
                ],
                "answer": "start",
                "explain": "Begin means start."
            },
            {
                "q": "2nd grade vocabulary: What does tiny mean?",
                "choices": [
                    "very small",
                    "very loud",
                    "very old",
                    "very bright"
                ],
                "answer": "very small",
                "explain": "Tiny means very small."
            },
            {
                "q": "2nd grade vocabulary: Which word means look?",
                "choices": [
                    "see",
                    "run",
                    "eat",
                    "sit"
                ],
                "answer": "see",
                "explain": "See means look."
            },
            {
                "q": "2nd grade vocabulary: What does kind mean?",
                "choices": [
                    "nice",
                    "angry",
                    "sharp",
                    "heavy"
                ],
                "answer": "nice",
                "explain": "Kind means nice or caring."
            },
            {
                "q": "2nd grade vocabulary: What does finish mean?",
                "choices": [
                    "end",
                    "start",
                    "jump",
                    "ask"
                ],
                "answer": "end",
                "explain": "Finish means end."
            }
        ],
        "study": [
            {
                "q": "2nd grade study skills: What helps you remember homework?",
                "choices": [
                    "write it down",
                    "hide it",
                    "forget it",
                    "throw it away"
                ],
                "answer": "write it down",
                "explain": "Writing things down helps memory."
            },
            {
                "q": "2nd grade study skills: What should you do when the teacher gives directions?",
                "choices": [
                    "listen carefully",
                    "talk loudly",
                    "run away",
                    "close your book"
                ],
                "answer": "listen carefully",
                "explain": "Listening helps you understand."
            },
            {
                "q": "2nd grade study skills: What is a good place to study?",
                "choices": [
                    "quiet spot",
                    "noisy TV room",
                    "middle of a game",
                    "messy floor only"
                ],
                "answer": "quiet spot",
                "explain": "Quiet helps focus."
            },
            {
                "q": "2nd grade study skills: What should you do if you are stuck?",
                "choices": [
                    "ask for help",
                    "give up",
                    "hide the paper",
                    "cry only"
                ],
                "answer": "ask for help",
                "explain": "Asking for help is a learning strategy."
            },
            {
                "q": "2nd grade study skills: Why put supplies away?",
                "choices": [
                    "so you can find them later",
                    "so they disappear",
                    "so homework is harder",
                    "so nobody can study"
                ],
                "answer": "so you can find them later",
                "explain": "Organization saves time."
            },
            {
                "q": "2nd grade study skills: What is practice?",
                "choices": [
                    "doing something again to improve",
                    "never trying",
                    "watching only",
                    "sleeping during class"
                ],
                "answer": "doing something again to improve",
                "explain": "Practice builds skill."
            },
            {
                "q": "2nd grade study skills: What should you do before turning in work?",
                "choices": [
                    "check it",
                    "rip it",
                    "hide it",
                    "ignore directions"
                ],
                "answer": "check it",
                "explain": "Checking catches mistakes."
            },
            {
                "q": "2nd grade study skills: A short break can help you...",
                "choices": [
                    "reset focus",
                    "forget school forever",
                    "avoid everything",
                    "lose homework"
                ],
                "answer": "reset focus",
                "explain": "Breaks help your brain rest."
            },
            {
                "q": "2nd grade study skills: What is a goal?",
                "choices": [
                    "something you are trying to do",
                    "a snack",
                    "a pencil",
                    "a map"
                ],
                "answer": "something you are trying to do",
                "explain": "Goals guide work."
            },
            {
                "q": "2nd grade study skills: What helps you read better?",
                "choices": [
                    "practice reading",
                    "never open books",
                    "skip all words",
                    "only look at covers"
                ],
                "answer": "practice reading",
                "explain": "Reading practice builds skill."
            }
        ]
    },
    "3": {
        "math": [
            {
                "q": "3rd grade math: What is 7 × 6?",
                "choices": [
                    "36",
                    "40",
                    "42",
                    "48"
                ],
                "answer": "42",
                "explain": "7 × 6 = 42."
            },
            {
                "q": "3rd grade math: What is 56 ÷ 8?",
                "choices": [
                    "6",
                    "7",
                    "8",
                    "9"
                ],
                "answer": "7",
                "explain": "56 divided by 8 is 7."
            },
            {
                "q": "3rd grade math: Which fraction is equal to one half?",
                "choices": [
                    "1/3",
                    "2/4",
                    "3/5",
                    "4/6"
                ],
                "answer": "2/4",
                "explain": "2/4 simplifies to 1/2."
            },
            {
                "q": "3rd grade math: Round 347 to the nearest ten.",
                "choices": [
                    "300",
                    "340",
                    "350",
                    "400"
                ],
                "answer": "350",
                "explain": "347 is closer to 350 than 340."
            },
            {
                "q": "3rd grade math: What is the perimeter of a rectangle with sides 5 and 3?",
                "choices": [
                    "8",
                    "15",
                    "16",
                    "30"
                ],
                "answer": "16",
                "explain": "5 + 3 + 5 + 3 = 16."
            },
            {
                "q": "3rd grade math: What is 425 + 178?",
                "choices": [
                    "593",
                    "603",
                    "613",
                    "703"
                ],
                "answer": "603",
                "explain": "425 + 178 = 603."
            },
            {
                "q": "3rd grade math: What is 900 - 275?",
                "choices": [
                    "525",
                    "625",
                    "675",
                    "725"
                ],
                "answer": "625",
                "explain": "900 - 275 = 625."
            },
            {
                "q": "3rd grade math: Which has the greatest value?",
                "choices": [
                    "0.2",
                    "0.5",
                    "0.1",
                    "0.3"
                ],
                "answer": "0.5",
                "explain": "0.5 is the greatest decimal listed."
            },
            {
                "q": "3rd grade math: What is the area of a 4 by 6 rectangle?",
                "choices": [
                    "10",
                    "20",
                    "24",
                    "28"
                ],
                "answer": "24",
                "explain": "Area = 4 × 6 = 24."
            },
            {
                "q": "3rd grade math: How many minutes are in 2 hours?",
                "choices": [
                    "60",
                    "90",
                    "120",
                    "200"
                ],
                "answer": "120",
                "explain": "Each hour has 60 minutes."
            }
        ],
        "reading": [
            {
                "q": "3rd grade reading: What is the central idea of a passage?",
                "choices": [
                    "the main point",
                    "a tiny detail",
                    "the author's first name",
                    "the last word"
                ],
                "answer": "the main point",
                "explain": "Central idea means main point."
            },
            {
                "q": "3rd grade reading: What is an inference?",
                "choices": [
                    "a smart guess using clues",
                    "a copied sentence",
                    "a page number",
                    "a spelling rule"
                ],
                "answer": "a smart guess using clues",
                "explain": "Inference uses clues and what you know."
            },
            {
                "q": "3rd grade reading: Which is text evidence?",
                "choices": [
                    "a detail from the text",
                    "a random opinion",
                    "a drawing only",
                    "a guess with no clue"
                ],
                "answer": "a detail from the text",
                "explain": "Text evidence comes from the text."
            },
            {
                "q": "3rd grade reading: What is theme?",
                "choices": [
                    "a message or lesson",
                    "the cover color",
                    "a comma",
                    "the page count"
                ],
                "answer": "a message or lesson",
                "explain": "Theme is the message."
            },
            {
                "q": "3rd grade reading: Author's purpose can be to...",
                "choices": [
                    "inform, persuade, or entertain",
                    "add only pictures",
                    "make math harder",
                    "hide the topic"
                ],
                "answer": "inform, persuade, or entertain",
                "explain": "Authors write for different purposes."
            },
            {
                "q": "3rd grade reading: What is a summary?",
                "choices": [
                    "a short version with main ideas",
                    "every word copied",
                    "only one tiny detail",
                    "a title"
                ],
                "answer": "a short version with main ideas",
                "explain": "Summary includes main points."
            },
            {
                "q": "3rd grade reading: What is point of view?",
                "choices": [
                    "who tells the story",
                    "where the book was bought",
                    "how many pages",
                    "the font"
                ],
                "answer": "who tells the story",
                "explain": "Point of view is the narrator's position."
            },
            {
                "q": "3rd grade reading: What is cause and effect?",
                "choices": [
                    "why something happens and what happens after",
                    "two rhyming words",
                    "a book list",
                    "a map key"
                ],
                "answer": "why something happens and what happens after",
                "explain": "Cause leads to effect."
            },
            {
                "q": "3rd grade reading: What should readers do with unfamiliar words?",
                "choices": [
                    "use context clues",
                    "skip the whole page",
                    "always stop reading",
                    "guess without clues"
                ],
                "answer": "use context clues",
                "explain": "Context helps with meaning."
            },
            {
                "q": "3rd grade reading: Why compare two texts?",
                "choices": [
                    "to see similarities and differences",
                    "to count letters",
                    "to avoid evidence",
                    "to change the title"
                ],
                "answer": "to see similarities and differences",
                "explain": "Comparing builds understanding."
            }
        ],
        "writing": [
            {
                "q": "3rd grade writing: Which is a strong topic sentence?",
                "choices": [
                    "Recycling helps the environment in several ways.",
                    "Trash.",
                    "This paragraph exists.",
                    "I like things."
                ],
                "answer": "Recycling helps the environment in several ways.",
                "explain": "A topic sentence states the main idea."
            },
            {
                "q": "3rd grade writing: Which transition adds another idea?",
                "choices": [
                    "In addition",
                    "However",
                    "In conclusion",
                    "Although"
                ],
                "answer": "In addition",
                "explain": "In addition adds an idea."
            },
            {
                "q": "3rd grade writing: What is a claim?",
                "choices": [
                    "an opinion that can be supported",
                    "a comma",
                    "a random detail",
                    "a page number"
                ],
                "answer": "an opinion that can be supported",
                "explain": "Claims can be supported with reasons."
            },
            {
                "q": "3rd grade writing: Which sentence uses evidence?",
                "choices": [
                    "The text says the character practiced every day.",
                    "I just know it.",
                    "It is good.",
                    "Everybody thinks so."
                ],
                "answer": "The text says the character practiced every day.",
                "explain": "Evidence comes from details."
            },
            {
                "q": "3rd grade writing: What does a conclusion do?",
                "choices": [
                    "wraps up the main idea",
                    "starts a new unrelated topic",
                    "only adds jokes",
                    "removes evidence"
                ],
                "answer": "wraps up the main idea",
                "explain": "Conclusions finish the writing."
            },
            {
                "q": "3rd grade writing: Which sentence uses a comma correctly?",
                "choices": [
                    "After school, I went home.",
                    "After, school I went home.",
                    "After school I, went home.",
                    "After school I went, home."
                ],
                "answer": "After school, I went home.",
                "explain": "Introductory phrases often use a comma."
            },
            {
                "q": "3rd grade writing: Which word is more precise than 'good'?",
                "choices": [
                    "helpful",
                    "stuff",
                    "thing",
                    "very"
                ],
                "answer": "helpful",
                "explain": "Precise words improve writing."
            },
            {
                "q": "3rd grade writing: What is revision?",
                "choices": [
                    "making writing better",
                    "only changing color",
                    "deleting everything",
                    "turning it in"
                ],
                "answer": "making writing better",
                "explain": "Revision improves writing."
            },
            {
                "q": "3rd grade writing: What is a paragraph?",
                "choices": [
                    "a group of sentences about one idea",
                    "one random word",
                    "a math chart",
                    "a spelling test"
                ],
                "answer": "a group of sentences about one idea",
                "explain": "Paragraphs focus on an idea."
            },
            {
                "q": "3rd grade writing: Which sentence is respectful in a debate?",
                "choices": [
                    "I understand your point, but I disagree.",
                    "You are wrong and silly.",
                    "Nobody should listen.",
                    "That idea is dumb."
                ],
                "answer": "I understand your point, but I disagree.",
                "explain": "Respectful debate responds politely."
            }
        ],
        "science": [
            {
                "q": "3rd grade science: What is a variable in an experiment?",
                "choices": [
                    "something that can change",
                    "the title only",
                    "a drawing",
                    "a safety poster"
                ],
                "answer": "something that can change",
                "explain": "Variables can change in tests."
            },
            {
                "q": "3rd grade science: What is a hypothesis?",
                "choices": [
                    "a testable prediction",
                    "a random answer",
                    "a final grade",
                    "a map"
                ],
                "answer": "a testable prediction",
                "explain": "A hypothesis predicts what may happen."
            },
            {
                "q": "3rd grade science: Which is a physical change?",
                "choices": [
                    "ice melting",
                    "wood burning",
                    "metal rusting",
                    "bread baking"
                ],
                "answer": "ice melting",
                "explain": "Melting changes state, not the substance."
            },
            {
                "q": "3rd grade science: What do plants use for photosynthesis?",
                "choices": [
                    "sunlight, water, carbon dioxide",
                    "rocks and salt",
                    "plastic and metal",
                    "sound and sand"
                ],
                "answer": "sunlight, water, carbon dioxide",
                "explain": "Plants use these to make food."
            },
            {
                "q": "3rd grade science: What is the water cycle powered mainly by?",
                "choices": [
                    "the Sun",
                    "the Moon only",
                    "magnets",
                    "sound"
                ],
                "answer": "the Sun",
                "explain": "The Sun heats water and drives evaporation."
            },
            {
                "q": "3rd grade science: What is an ecosystem?",
                "choices": [
                    "living and nonliving things interacting",
                    "only one animal",
                    "a type of pencil",
                    "a math chart"
                ],
                "answer": "living and nonliving things interacting",
                "explain": "Ecosystems include organisms and environment."
            },
            {
                "q": "3rd grade science: Why use data tables?",
                "choices": [
                    "to organize results",
                    "to decorate pages",
                    "to hide answers",
                    "to skip tests"
                ],
                "answer": "to organize results",
                "explain": "Tables organize data."
            },
            {
                "q": "3rd grade science: What is erosion?",
                "choices": [
                    "movement of weathered material",
                    "making new sunlight",
                    "animal breathing",
                    "plant growth"
                ],
                "answer": "movement of weathered material",
                "explain": "Erosion moves sediments."
            },
            {
                "q": "3rd grade science: What is a conductor?",
                "choices": [
                    "material that lets heat or electricity move easily",
                    "material that always floats",
                    "a living thing",
                    "a weather tool"
                ],
                "answer": "material that lets heat or electricity move easily",
                "explain": "Conductors allow energy flow."
            },
            {
                "q": "3rd grade science: What should a science conclusion use?",
                "choices": [
                    "evidence from data",
                    "favorite opinion",
                    "longest sentence",
                    "first guess"
                ],
                "answer": "evidence from data",
                "explain": "Science conclusions rely on evidence."
            }
        ],
        "social": [
            {
                "q": "3rd grade social studies: What does latitude measure?",
                "choices": [
                    "distance north or south of the equator",
                    "distance east or west",
                    "height of a mountain",
                    "city size"
                ],
                "answer": "distance north or south of the equator",
                "explain": "Latitude measures north-south position."
            },
            {
                "q": "3rd grade social studies: What is a primary source?",
                "choices": [
                    "a source from the time or person involved",
                    "a later textbook only",
                    "a movie made years later",
                    "a summary only"
                ],
                "answer": "a source from the time or person involved",
                "explain": "Primary sources are direct."
            },
            {
                "q": "3rd grade social studies: What is a physical map?",
                "choices": [
                    "a map showing landforms and water",
                    "a map showing only laws",
                    "a map showing homework",
                    "a map showing opinions"
                ],
                "answer": "a map showing landforms and water",
                "explain": "Physical maps show natural features."
            },
            {
                "q": "3rd grade social studies: Why are timelines useful?",
                "choices": [
                    "they show events in order",
                    "they show only temperature",
                    "they replace evidence",
                    "they give opinions"
                ],
                "answer": "they show events in order",
                "explain": "Timelines organize time."
            },
            {
                "q": "3rd grade social studies: What is trade?",
                "choices": [
                    "exchanging goods or services",
                    "drawing flags",
                    "writing poems",
                    "measuring weather"
                ],
                "answer": "exchanging goods or services",
                "explain": "Trade is exchange."
            },
            {
                "q": "3rd grade social studies: What is culture?",
                "choices": [
                    "beliefs, customs, language, and traditions",
                    "only money",
                    "only maps",
                    "only laws"
                ],
                "answer": "beliefs, customs, language, and traditions",
                "explain": "Culture describes how groups live."
            },
            {
                "q": "3rd grade social studies: What is a region?",
                "choices": [
                    "an area with shared features",
                    "one desk",
                    "a spelling rule",
                    "a weather tool"
                ],
                "answer": "an area with shared features",
                "explain": "Regions share features."
            },
            {
                "q": "3rd grade social studies: What is a civic responsibility?",
                "choices": [
                    "following laws",
                    "breaking rules",
                    "ignoring community needs",
                    "hiding from school"
                ],
                "answer": "following laws",
                "explain": "Civic duties help the community."
            },
            {
                "q": "3rd grade social studies: Why compare sources?",
                "choices": [
                    "to check accuracy and viewpoints",
                    "to avoid reading",
                    "to pick the shortest",
                    "to ignore facts"
                ],
                "answer": "to check accuracy and viewpoints",
                "explain": "Comparing sources improves understanding."
            },
            {
                "q": "3rd grade social studies: What is a natural resource?",
                "choices": [
                    "something from nature people use",
                    "a video game",
                    "a classroom rule",
                    "a drawing"
                ],
                "answer": "something from nature people use",
                "explain": "Water, trees, and minerals are natural resources."
            }
        ],
        "vocab": [
            {
                "q": "3rd grade vocabulary: What does 'unclear' mean?",
                "choices": [
                    "not easy to understand",
                    "very funny",
                    "already finished",
                    "too bright"
                ],
                "answer": "not easy to understand",
                "explain": "Unclear means not clear."
            },
            {
                "q": "3rd grade vocabulary: What does prefix 'pre-' mean?",
                "choices": [
                    "before",
                    "after",
                    "against",
                    "again"
                ],
                "answer": "before",
                "explain": "Pre- means before."
            },
            {
                "q": "3rd grade vocabulary: Synonym for rapid?",
                "choices": [
                    "fast",
                    "quiet",
                    "late",
                    "tiny"
                ],
                "answer": "fast",
                "explain": "Rapid means fast."
            },
            {
                "q": "3rd grade vocabulary: Antonym for ancient?",
                "choices": [
                    "modern",
                    "old",
                    "historic",
                    "early"
                ],
                "answer": "modern",
                "explain": "Modern is opposite of ancient."
            },
            {
                "q": "3rd grade vocabulary: What does evidence mean?",
                "choices": [
                    "information that supports an idea",
                    "a random opinion",
                    "a pencil",
                    "a loud sound"
                ],
                "answer": "information that supports an idea",
                "explain": "Evidence supports claims."
            },
            {
                "q": "3rd grade vocabulary: Fragile means...",
                "choices": [
                    "easily broken",
                    "very heavy",
                    "brightly colored",
                    "hard to see"
                ],
                "answer": "easily broken",
                "explain": "Fragile things break easily."
            },
            {
                "q": "3rd grade vocabulary: Suffix '-less' means...",
                "choices": [
                    "without",
                    "full of",
                    "before",
                    "again"
                ],
                "answer": "without",
                "explain": "Less means without."
            },
            {
                "q": "3rd grade vocabulary: Examine means...",
                "choices": [
                    "look at closely",
                    "ignore",
                    "decorate",
                    "whisper"
                ],
                "answer": "look at closely",
                "explain": "Examine means inspect."
            },
            {
                "q": "3rd grade vocabulary: Predict means...",
                "choices": [
                    "say what may happen next",
                    "copy a paragraph",
                    "erase work",
                    "measure length"
                ],
                "answer": "say what may happen next",
                "explain": "Predict means use clues for the future."
            },
            {
                "q": "3rd grade vocabulary: Compare means...",
                "choices": [
                    "tell how things are alike and different",
                    "make something disappear",
                    "write only one fact",
                    "count backward"
                ],
                "answer": "tell how things are alike and different",
                "explain": "Compare means look at similarities and differences."
            }
        ],
        "study": [
            {
                "q": "3rd grade study skills: What is spaced practice?",
                "choices": [
                    "studying a little over several days",
                    "studying once for five hours",
                    "never reviewing",
                    "only reading title"
                ],
                "answer": "studying a little over several days",
                "explain": "Spaced practice spreads out learning."
            },
            {
                "q": "3rd grade study skills: What is retrieval practice?",
                "choices": [
                    "trying to remember without looking",
                    "copying answers only",
                    "highlighting every word",
                    "skipping hard parts"
                ],
                "answer": "trying to remember without looking",
                "explain": "Retrieval strengthens memory."
            },
            {
                "q": "3rd grade study skills: Why use a planner?",
                "choices": [
                    "track assignments and deadlines",
                    "make homework disappear",
                    "replace studying",
                    "decorate backpack"
                ],
                "answer": "track assignments and deadlines",
                "explain": "Planners organize work."
            },
            {
                "q": "3rd grade study skills: What should you do first with a big project?",
                "choices": [
                    "break it into smaller steps",
                    "wait until last night",
                    "throw away rubric",
                    "only pick colors"
                ],
                "answer": "break it into smaller steps",
                "explain": "Small steps make projects easier."
            },
            {
                "q": "3rd grade study skills: Which is a strong study habit?",
                "choices": [
                    "putting phone away while focusing",
                    "checking messages every minute",
                    "TV loud",
                    "starting after midnight"
                ],
                "answer": "putting phone away while focusing",
                "explain": "Removing distractions helps focus."
            },
            {
                "q": "3rd grade study skills: Why check mistakes after a quiz?",
                "choices": [
                    "to learn what to fix",
                    "to feel bad forever",
                    "to hide the quiz",
                    "to avoid practice"
                ],
                "answer": "to learn what to fix",
                "explain": "Mistakes show next steps."
            },
            {
                "q": "3rd grade study skills: Annotate means...",
                "choices": [
                    "write notes or marks while reading",
                    "memorize every page",
                    "skip paragraphs",
                    "only look at pictures"
                ],
                "answer": "write notes or marks while reading",
                "explain": "Annotations help thinking."
            },
            {
                "q": "3rd grade study skills: Good notes should...",
                "choices": [
                    "use key ideas in your own words",
                    "copy every word without thinking",
                    "be blank",
                    "only doodles"
                ],
                "answer": "use key ideas in your own words",
                "explain": "Your own words help understanding."
            },
            {
                "q": "3rd grade study skills: What is a brain break?",
                "choices": [
                    "a short rest to reset focus",
                    "quitting forever",
                    "watching videos all day",
                    "skipping work"
                ],
                "answer": "a short rest to reset focus",
                "explain": "Short breaks reset focus."
            },
            {
                "q": "3rd grade study skills: What should you do when stuck?",
                "choices": [
                    "try a strategy, check notes, or ask for help",
                    "give up immediately",
                    "erase the page",
                    "pretend done"
                ],
                "answer": "try a strategy, check notes, or ask for help",
                "explain": "Use strategies and help."
            }
        ]
    },
    "4": {
        "math": [
            {
                "q": "4th grade math: What is 3/8 + 2/8?",
                "choices": [
                    "5/8",
                    "5/16",
                    "1/8",
                    "6/8"
                ],
                "answer": "5/8",
                "explain": "Same denominators: add the numerators."
            },
            {
                "q": "4th grade math: What is 12 × 14?",
                "choices": [
                    "144",
                    "156",
                    "168",
                    "180"
                ],
                "answer": "168",
                "explain": "12 × 14 = 168."
            },
            {
                "q": "4th grade math: What is 84 ÷ 7?",
                "choices": [
                    "10",
                    "11",
                    "12",
                    "13"
                ],
                "answer": "12",
                "explain": "7 × 12 = 84."
            },
            {
                "q": "4th grade math: Which number is prime?",
                "choices": [
                    "9",
                    "15",
                    "17",
                    "21"
                ],
                "answer": "17",
                "explain": "17 has only two factors: 1 and 17."
            },
            {
                "q": "4th grade math: What is 0.75 as a fraction?",
                "choices": [
                    "1/4",
                    "1/2",
                    "3/4",
                    "4/5"
                ],
                "answer": "3/4",
                "explain": "0.75 equals 75/100, which is 3/4."
            },
            {
                "q": "4th grade math: A rectangle is 9 by 6. What is its area?",
                "choices": [
                    "15",
                    "30",
                    "54",
                    "60"
                ],
                "answer": "54",
                "explain": "Area = 9 × 6 = 54."
            },
            {
                "q": "4th grade math: What is 25% of 40?",
                "choices": [
                    "5",
                    "10",
                    "15",
                    "20"
                ],
                "answer": "10",
                "explain": "25% is one fourth; one fourth of 40 is 10."
            },
            {
                "q": "4th grade math: Which angle is a right angle?",
                "choices": [
                    "45°",
                    "60°",
                    "90°",
                    "180°"
                ],
                "answer": "90°",
                "explain": "A right angle is 90 degrees."
            },
            {
                "q": "4th grade math: What is 6,482 rounded to the nearest hundred?",
                "choices": [
                    "6,400",
                    "6,500",
                    "6,480",
                    "6,000"
                ],
                "answer": "6,500",
                "explain": "482 rounds up to 500."
            },
            {
                "q": "4th grade math: What is 2³?",
                "choices": [
                    "5",
                    "6",
                    "8",
                    "9"
                ],
                "answer": "8",
                "explain": "2³ means 2 × 2 × 2 = 8."
            }
        ],
        "reading": [
            {
                "q": "4th grade reading: What is the central idea of a passage?",
                "choices": [
                    "the main point",
                    "a tiny detail",
                    "the author's first name",
                    "the last word"
                ],
                "answer": "the main point",
                "explain": "Central idea means main point."
            },
            {
                "q": "4th grade reading: What is an inference?",
                "choices": [
                    "a smart guess using clues",
                    "a copied sentence",
                    "a page number",
                    "a spelling rule"
                ],
                "answer": "a smart guess using clues",
                "explain": "Inference uses clues and what you know."
            },
            {
                "q": "4th grade reading: Which is text evidence?",
                "choices": [
                    "a detail from the text",
                    "a random opinion",
                    "a drawing only",
                    "a guess with no clue"
                ],
                "answer": "a detail from the text",
                "explain": "Text evidence comes from the text."
            },
            {
                "q": "4th grade reading: What is theme?",
                "choices": [
                    "a message or lesson",
                    "the cover color",
                    "a comma",
                    "the page count"
                ],
                "answer": "a message or lesson",
                "explain": "Theme is the message."
            },
            {
                "q": "4th grade reading: Author's purpose can be to...",
                "choices": [
                    "inform, persuade, or entertain",
                    "add only pictures",
                    "make math harder",
                    "hide the topic"
                ],
                "answer": "inform, persuade, or entertain",
                "explain": "Authors write for different purposes."
            },
            {
                "q": "4th grade reading: What is a summary?",
                "choices": [
                    "a short version with main ideas",
                    "every word copied",
                    "only one tiny detail",
                    "a title"
                ],
                "answer": "a short version with main ideas",
                "explain": "Summary includes main points."
            },
            {
                "q": "4th grade reading: What is point of view?",
                "choices": [
                    "who tells the story",
                    "where the book was bought",
                    "how many pages",
                    "the font"
                ],
                "answer": "who tells the story",
                "explain": "Point of view is the narrator's position."
            },
            {
                "q": "4th grade reading: What is cause and effect?",
                "choices": [
                    "why something happens and what happens after",
                    "two rhyming words",
                    "a book list",
                    "a map key"
                ],
                "answer": "why something happens and what happens after",
                "explain": "Cause leads to effect."
            },
            {
                "q": "4th grade reading: What should readers do with unfamiliar words?",
                "choices": [
                    "use context clues",
                    "skip the whole page",
                    "always stop reading",
                    "guess without clues"
                ],
                "answer": "use context clues",
                "explain": "Context helps with meaning."
            },
            {
                "q": "4th grade reading: Why compare two texts?",
                "choices": [
                    "to see similarities and differences",
                    "to count letters",
                    "to avoid evidence",
                    "to change the title"
                ],
                "answer": "to see similarities and differences",
                "explain": "Comparing builds understanding."
            }
        ],
        "writing": [
            {
                "q": "4th grade writing: Which is a strong topic sentence?",
                "choices": [
                    "Recycling helps the environment in several ways.",
                    "Trash.",
                    "This paragraph exists.",
                    "I like things."
                ],
                "answer": "Recycling helps the environment in several ways.",
                "explain": "A topic sentence states the main idea."
            },
            {
                "q": "4th grade writing: Which transition adds another idea?",
                "choices": [
                    "In addition",
                    "However",
                    "In conclusion",
                    "Although"
                ],
                "answer": "In addition",
                "explain": "In addition adds an idea."
            },
            {
                "q": "4th grade writing: What is a claim?",
                "choices": [
                    "an opinion that can be supported",
                    "a comma",
                    "a random detail",
                    "a page number"
                ],
                "answer": "an opinion that can be supported",
                "explain": "Claims can be supported with reasons."
            },
            {
                "q": "4th grade writing: Which sentence uses evidence?",
                "choices": [
                    "The text says the character practiced every day.",
                    "I just know it.",
                    "It is good.",
                    "Everybody thinks so."
                ],
                "answer": "The text says the character practiced every day.",
                "explain": "Evidence comes from details."
            },
            {
                "q": "4th grade writing: What does a conclusion do?",
                "choices": [
                    "wraps up the main idea",
                    "starts a new unrelated topic",
                    "only adds jokes",
                    "removes evidence"
                ],
                "answer": "wraps up the main idea",
                "explain": "Conclusions finish the writing."
            },
            {
                "q": "4th grade writing: Which sentence uses a comma correctly?",
                "choices": [
                    "After school, I went home.",
                    "After, school I went home.",
                    "After school I, went home.",
                    "After school I went, home."
                ],
                "answer": "After school, I went home.",
                "explain": "Introductory phrases often use a comma."
            },
            {
                "q": "4th grade writing: Which word is more precise than 'good'?",
                "choices": [
                    "helpful",
                    "stuff",
                    "thing",
                    "very"
                ],
                "answer": "helpful",
                "explain": "Precise words improve writing."
            },
            {
                "q": "4th grade writing: What is revision?",
                "choices": [
                    "making writing better",
                    "only changing color",
                    "deleting everything",
                    "turning it in"
                ],
                "answer": "making writing better",
                "explain": "Revision improves writing."
            },
            {
                "q": "4th grade writing: What is a paragraph?",
                "choices": [
                    "a group of sentences about one idea",
                    "one random word",
                    "a math chart",
                    "a spelling test"
                ],
                "answer": "a group of sentences about one idea",
                "explain": "Paragraphs focus on an idea."
            },
            {
                "q": "4th grade writing: Which sentence is respectful in a debate?",
                "choices": [
                    "I understand your point, but I disagree.",
                    "You are wrong and silly.",
                    "Nobody should listen.",
                    "That idea is dumb."
                ],
                "answer": "I understand your point, but I disagree.",
                "explain": "Respectful debate responds politely."
            }
        ],
        "science": [
            {
                "q": "4th grade science: What is a variable in an experiment?",
                "choices": [
                    "something that can change",
                    "the title only",
                    "a drawing",
                    "a safety poster"
                ],
                "answer": "something that can change",
                "explain": "Variables can change in tests."
            },
            {
                "q": "4th grade science: What is a hypothesis?",
                "choices": [
                    "a testable prediction",
                    "a random answer",
                    "a final grade",
                    "a map"
                ],
                "answer": "a testable prediction",
                "explain": "A hypothesis predicts what may happen."
            },
            {
                "q": "4th grade science: Which is a physical change?",
                "choices": [
                    "ice melting",
                    "wood burning",
                    "metal rusting",
                    "bread baking"
                ],
                "answer": "ice melting",
                "explain": "Melting changes state, not the substance."
            },
            {
                "q": "4th grade science: What do plants use for photosynthesis?",
                "choices": [
                    "sunlight, water, carbon dioxide",
                    "rocks and salt",
                    "plastic and metal",
                    "sound and sand"
                ],
                "answer": "sunlight, water, carbon dioxide",
                "explain": "Plants use these to make food."
            },
            {
                "q": "4th grade science: What is the water cycle powered mainly by?",
                "choices": [
                    "the Sun",
                    "the Moon only",
                    "magnets",
                    "sound"
                ],
                "answer": "the Sun",
                "explain": "The Sun heats water and drives evaporation."
            },
            {
                "q": "4th grade science: What is an ecosystem?",
                "choices": [
                    "living and nonliving things interacting",
                    "only one animal",
                    "a type of pencil",
                    "a math chart"
                ],
                "answer": "living and nonliving things interacting",
                "explain": "Ecosystems include organisms and environment."
            },
            {
                "q": "4th grade science: Why use data tables?",
                "choices": [
                    "to organize results",
                    "to decorate pages",
                    "to hide answers",
                    "to skip tests"
                ],
                "answer": "to organize results",
                "explain": "Tables organize data."
            },
            {
                "q": "4th grade science: What is erosion?",
                "choices": [
                    "movement of weathered material",
                    "making new sunlight",
                    "animal breathing",
                    "plant growth"
                ],
                "answer": "movement of weathered material",
                "explain": "Erosion moves sediments."
            },
            {
                "q": "4th grade science: What is a conductor?",
                "choices": [
                    "material that lets heat or electricity move easily",
                    "material that always floats",
                    "a living thing",
                    "a weather tool"
                ],
                "answer": "material that lets heat or electricity move easily",
                "explain": "Conductors allow energy flow."
            },
            {
                "q": "4th grade science: What should a science conclusion use?",
                "choices": [
                    "evidence from data",
                    "favorite opinion",
                    "longest sentence",
                    "first guess"
                ],
                "answer": "evidence from data",
                "explain": "Science conclusions rely on evidence."
            }
        ],
        "social": [
            {
                "q": "4th grade social studies: What does latitude measure?",
                "choices": [
                    "distance north or south of the equator",
                    "distance east or west",
                    "height of a mountain",
                    "city size"
                ],
                "answer": "distance north or south of the equator",
                "explain": "Latitude measures north-south position."
            },
            {
                "q": "4th grade social studies: What is a primary source?",
                "choices": [
                    "a source from the time or person involved",
                    "a later textbook only",
                    "a movie made years later",
                    "a summary only"
                ],
                "answer": "a source from the time or person involved",
                "explain": "Primary sources are direct."
            },
            {
                "q": "4th grade social studies: What is a physical map?",
                "choices": [
                    "a map showing landforms and water",
                    "a map showing only laws",
                    "a map showing homework",
                    "a map showing opinions"
                ],
                "answer": "a map showing landforms and water",
                "explain": "Physical maps show natural features."
            },
            {
                "q": "4th grade social studies: Why are timelines useful?",
                "choices": [
                    "they show events in order",
                    "they show only temperature",
                    "they replace evidence",
                    "they give opinions"
                ],
                "answer": "they show events in order",
                "explain": "Timelines organize time."
            },
            {
                "q": "4th grade social studies: What is trade?",
                "choices": [
                    "exchanging goods or services",
                    "drawing flags",
                    "writing poems",
                    "measuring weather"
                ],
                "answer": "exchanging goods or services",
                "explain": "Trade is exchange."
            },
            {
                "q": "4th grade social studies: What is culture?",
                "choices": [
                    "beliefs, customs, language, and traditions",
                    "only money",
                    "only maps",
                    "only laws"
                ],
                "answer": "beliefs, customs, language, and traditions",
                "explain": "Culture describes how groups live."
            },
            {
                "q": "4th grade social studies: What is a region?",
                "choices": [
                    "an area with shared features",
                    "one desk",
                    "a spelling rule",
                    "a weather tool"
                ],
                "answer": "an area with shared features",
                "explain": "Regions share features."
            },
            {
                "q": "4th grade social studies: What is a civic responsibility?",
                "choices": [
                    "following laws",
                    "breaking rules",
                    "ignoring community needs",
                    "hiding from school"
                ],
                "answer": "following laws",
                "explain": "Civic duties help the community."
            },
            {
                "q": "4th grade social studies: Why compare sources?",
                "choices": [
                    "to check accuracy and viewpoints",
                    "to avoid reading",
                    "to pick the shortest",
                    "to ignore facts"
                ],
                "answer": "to check accuracy and viewpoints",
                "explain": "Comparing sources improves understanding."
            },
            {
                "q": "4th grade social studies: What is a natural resource?",
                "choices": [
                    "something from nature people use",
                    "a video game",
                    "a classroom rule",
                    "a drawing"
                ],
                "answer": "something from nature people use",
                "explain": "Water, trees, and minerals are natural resources."
            }
        ],
        "vocab": [
            {
                "q": "4th grade vocabulary: What does 'unclear' mean?",
                "choices": [
                    "not easy to understand",
                    "very funny",
                    "already finished",
                    "too bright"
                ],
                "answer": "not easy to understand",
                "explain": "Unclear means not clear."
            },
            {
                "q": "4th grade vocabulary: What does prefix 'pre-' mean?",
                "choices": [
                    "before",
                    "after",
                    "against",
                    "again"
                ],
                "answer": "before",
                "explain": "Pre- means before."
            },
            {
                "q": "4th grade vocabulary: Synonym for rapid?",
                "choices": [
                    "fast",
                    "quiet",
                    "late",
                    "tiny"
                ],
                "answer": "fast",
                "explain": "Rapid means fast."
            },
            {
                "q": "4th grade vocabulary: Antonym for ancient?",
                "choices": [
                    "modern",
                    "old",
                    "historic",
                    "early"
                ],
                "answer": "modern",
                "explain": "Modern is opposite of ancient."
            },
            {
                "q": "4th grade vocabulary: What does evidence mean?",
                "choices": [
                    "information that supports an idea",
                    "a random opinion",
                    "a pencil",
                    "a loud sound"
                ],
                "answer": "information that supports an idea",
                "explain": "Evidence supports claims."
            },
            {
                "q": "4th grade vocabulary: Fragile means...",
                "choices": [
                    "easily broken",
                    "very heavy",
                    "brightly colored",
                    "hard to see"
                ],
                "answer": "easily broken",
                "explain": "Fragile things break easily."
            },
            {
                "q": "4th grade vocabulary: Suffix '-less' means...",
                "choices": [
                    "without",
                    "full of",
                    "before",
                    "again"
                ],
                "answer": "without",
                "explain": "Less means without."
            },
            {
                "q": "4th grade vocabulary: Examine means...",
                "choices": [
                    "look at closely",
                    "ignore",
                    "decorate",
                    "whisper"
                ],
                "answer": "look at closely",
                "explain": "Examine means inspect."
            },
            {
                "q": "4th grade vocabulary: Predict means...",
                "choices": [
                    "say what may happen next",
                    "copy a paragraph",
                    "erase work",
                    "measure length"
                ],
                "answer": "say what may happen next",
                "explain": "Predict means use clues for the future."
            },
            {
                "q": "4th grade vocabulary: Compare means...",
                "choices": [
                    "tell how things are alike and different",
                    "make something disappear",
                    "write only one fact",
                    "count backward"
                ],
                "answer": "tell how things are alike and different",
                "explain": "Compare means look at similarities and differences."
            }
        ],
        "study": [
            {
                "q": "4th grade study skills: What is spaced practice?",
                "choices": [
                    "studying a little over several days",
                    "studying once for five hours",
                    "never reviewing",
                    "only reading title"
                ],
                "answer": "studying a little over several days",
                "explain": "Spaced practice spreads out learning."
            },
            {
                "q": "4th grade study skills: What is retrieval practice?",
                "choices": [
                    "trying to remember without looking",
                    "copying answers only",
                    "highlighting every word",
                    "skipping hard parts"
                ],
                "answer": "trying to remember without looking",
                "explain": "Retrieval strengthens memory."
            },
            {
                "q": "4th grade study skills: Why use a planner?",
                "choices": [
                    "track assignments and deadlines",
                    "make homework disappear",
                    "replace studying",
                    "decorate backpack"
                ],
                "answer": "track assignments and deadlines",
                "explain": "Planners organize work."
            },
            {
                "q": "4th grade study skills: What should you do first with a big project?",
                "choices": [
                    "break it into smaller steps",
                    "wait until last night",
                    "throw away rubric",
                    "only pick colors"
                ],
                "answer": "break it into smaller steps",
                "explain": "Small steps make projects easier."
            },
            {
                "q": "4th grade study skills: Which is a strong study habit?",
                "choices": [
                    "putting phone away while focusing",
                    "checking messages every minute",
                    "TV loud",
                    "starting after midnight"
                ],
                "answer": "putting phone away while focusing",
                "explain": "Removing distractions helps focus."
            },
            {
                "q": "4th grade study skills: Why check mistakes after a quiz?",
                "choices": [
                    "to learn what to fix",
                    "to feel bad forever",
                    "to hide the quiz",
                    "to avoid practice"
                ],
                "answer": "to learn what to fix",
                "explain": "Mistakes show next steps."
            },
            {
                "q": "4th grade study skills: Annotate means...",
                "choices": [
                    "write notes or marks while reading",
                    "memorize every page",
                    "skip paragraphs",
                    "only look at pictures"
                ],
                "answer": "write notes or marks while reading",
                "explain": "Annotations help thinking."
            },
            {
                "q": "4th grade study skills: Good notes should...",
                "choices": [
                    "use key ideas in your own words",
                    "copy every word without thinking",
                    "be blank",
                    "only doodles"
                ],
                "answer": "use key ideas in your own words",
                "explain": "Your own words help understanding."
            },
            {
                "q": "4th grade study skills: What is a brain break?",
                "choices": [
                    "a short rest to reset focus",
                    "quitting forever",
                    "watching videos all day",
                    "skipping work"
                ],
                "answer": "a short rest to reset focus",
                "explain": "Short breaks reset focus."
            },
            {
                "q": "4th grade study skills: What should you do when stuck?",
                "choices": [
                    "try a strategy, check notes, or ask for help",
                    "give up immediately",
                    "erase the page",
                    "pretend done"
                ],
                "answer": "try a strategy, check notes, or ask for help",
                "explain": "Use strategies and help."
            }
        ]
    },
    "5": {
        "math": [
            {
                "q": "5th grade math: What is 2/3 + 1/6?",
                "choices": [
                    "3/9",
                    "5/6",
                    "1/2",
                    "2/9"
                ],
                "answer": "5/6",
                "explain": "2/3 = 4/6, then 4/6 + 1/6 = 5/6."
            },
            {
                "q": "5th grade math: What is 4.7 + 3.58?",
                "choices": [
                    "7.18",
                    "8.18",
                    "8.28",
                    "9.28"
                ],
                "answer": "8.28",
                "explain": "Line up decimal points: 4.70 + 3.58 = 8.28."
            },
            {
                "q": "5th grade math: What is 15% of 200?",
                "choices": [
                    "15",
                    "20",
                    "30",
                    "40"
                ],
                "answer": "30",
                "explain": "10% is 20 and 5% is 10, so 15% is 30."
            },
            {
                "q": "5th grade math: What is the volume of a box 3 by 4 by 5?",
                "choices": [
                    "12",
                    "20",
                    "45",
                    "60"
                ],
                "answer": "60",
                "explain": "Volume = length × width × height = 3 × 4 × 5."
            },
            {
                "q": "5th grade math: Solve: x - 9 = 14",
                "choices": [
                    "5",
                    "14",
                    "23",
                    "25"
                ],
                "answer": "23",
                "explain": "Add 9 to both sides."
            },
            {
                "q": "5th grade math: What is 5² + 3²?",
                "choices": [
                    "16",
                    "25",
                    "34",
                    "64"
                ],
                "answer": "34",
                "explain": "25 + 9 = 34."
            },
            {
                "q": "5th grade math: Which fraction is greatest?",
                "choices": [
                    "1/2",
                    "2/3",
                    "3/8",
                    "4/10"
                ],
                "answer": "2/3",
                "explain": "2/3 is greater than the others."
            },
            {
                "q": "5th grade math: A line plot is best for showing...",
                "choices": [
                    "data along a number line",
                    "only paragraphs",
                    "map borders",
                    "spelling rules"
                ],
                "answer": "data along a number line",
                "explain": "Line plots show data values on a number line."
            },
            {
                "q": "5th grade math: What is 3.6 × 10?",
                "choices": [
                    "0.36",
                    "3.6",
                    "36",
                    "360"
                ],
                "answer": "36",
                "explain": "Multiplying by 10 moves the decimal one place right."
            },
            {
                "q": "5th grade math: What is 144 ÷ 12?",
                "choices": [
                    "10",
                    "11",
                    "12",
                    "13"
                ],
                "answer": "12",
                "explain": "12 × 12 = 144."
            }
        ],
        "reading": [
            {
                "q": "5th grade reading: What is the central idea of a passage?",
                "choices": [
                    "the main point",
                    "a tiny detail",
                    "the author's first name",
                    "the last word"
                ],
                "answer": "the main point",
                "explain": "Central idea means main point."
            },
            {
                "q": "5th grade reading: What is an inference?",
                "choices": [
                    "a smart guess using clues",
                    "a copied sentence",
                    "a page number",
                    "a spelling rule"
                ],
                "answer": "a smart guess using clues",
                "explain": "Inference uses clues and what you know."
            },
            {
                "q": "5th grade reading: Which is text evidence?",
                "choices": [
                    "a detail from the text",
                    "a random opinion",
                    "a drawing only",
                    "a guess with no clue"
                ],
                "answer": "a detail from the text",
                "explain": "Text evidence comes from the text."
            },
            {
                "q": "5th grade reading: What is theme?",
                "choices": [
                    "a message or lesson",
                    "the cover color",
                    "a comma",
                    "the page count"
                ],
                "answer": "a message or lesson",
                "explain": "Theme is the message."
            },
            {
                "q": "5th grade reading: Author's purpose can be to...",
                "choices": [
                    "inform, persuade, or entertain",
                    "add only pictures",
                    "make math harder",
                    "hide the topic"
                ],
                "answer": "inform, persuade, or entertain",
                "explain": "Authors write for different purposes."
            },
            {
                "q": "5th grade reading: What is a summary?",
                "choices": [
                    "a short version with main ideas",
                    "every word copied",
                    "only one tiny detail",
                    "a title"
                ],
                "answer": "a short version with main ideas",
                "explain": "Summary includes main points."
            },
            {
                "q": "5th grade reading: What is point of view?",
                "choices": [
                    "who tells the story",
                    "where the book was bought",
                    "how many pages",
                    "the font"
                ],
                "answer": "who tells the story",
                "explain": "Point of view is the narrator's position."
            },
            {
                "q": "5th grade reading: What is cause and effect?",
                "choices": [
                    "why something happens and what happens after",
                    "two rhyming words",
                    "a book list",
                    "a map key"
                ],
                "answer": "why something happens and what happens after",
                "explain": "Cause leads to effect."
            },
            {
                "q": "5th grade reading: What should readers do with unfamiliar words?",
                "choices": [
                    "use context clues",
                    "skip the whole page",
                    "always stop reading",
                    "guess without clues"
                ],
                "answer": "use context clues",
                "explain": "Context helps with meaning."
            },
            {
                "q": "5th grade reading: Why compare two texts?",
                "choices": [
                    "to see similarities and differences",
                    "to count letters",
                    "to avoid evidence",
                    "to change the title"
                ],
                "answer": "to see similarities and differences",
                "explain": "Comparing builds understanding."
            }
        ],
        "writing": [
            {
                "q": "5th grade writing: Which is a strong topic sentence?",
                "choices": [
                    "Recycling helps the environment in several ways.",
                    "Trash.",
                    "This paragraph exists.",
                    "I like things."
                ],
                "answer": "Recycling helps the environment in several ways.",
                "explain": "A topic sentence states the main idea."
            },
            {
                "q": "5th grade writing: Which transition adds another idea?",
                "choices": [
                    "In addition",
                    "However",
                    "In conclusion",
                    "Although"
                ],
                "answer": "In addition",
                "explain": "In addition adds an idea."
            },
            {
                "q": "5th grade writing: What is a claim?",
                "choices": [
                    "an opinion that can be supported",
                    "a comma",
                    "a random detail",
                    "a page number"
                ],
                "answer": "an opinion that can be supported",
                "explain": "Claims can be supported with reasons."
            },
            {
                "q": "5th grade writing: Which sentence uses evidence?",
                "choices": [
                    "The text says the character practiced every day.",
                    "I just know it.",
                    "It is good.",
                    "Everybody thinks so."
                ],
                "answer": "The text says the character practiced every day.",
                "explain": "Evidence comes from details."
            },
            {
                "q": "5th grade writing: What does a conclusion do?",
                "choices": [
                    "wraps up the main idea",
                    "starts a new unrelated topic",
                    "only adds jokes",
                    "removes evidence"
                ],
                "answer": "wraps up the main idea",
                "explain": "Conclusions finish the writing."
            },
            {
                "q": "5th grade writing: Which sentence uses a comma correctly?",
                "choices": [
                    "After school, I went home.",
                    "After, school I went home.",
                    "After school I, went home.",
                    "After school I went, home."
                ],
                "answer": "After school, I went home.",
                "explain": "Introductory phrases often use a comma."
            },
            {
                "q": "5th grade writing: Which word is more precise than 'good'?",
                "choices": [
                    "helpful",
                    "stuff",
                    "thing",
                    "very"
                ],
                "answer": "helpful",
                "explain": "Precise words improve writing."
            },
            {
                "q": "5th grade writing: What is revision?",
                "choices": [
                    "making writing better",
                    "only changing color",
                    "deleting everything",
                    "turning it in"
                ],
                "answer": "making writing better",
                "explain": "Revision improves writing."
            },
            {
                "q": "5th grade writing: What is a paragraph?",
                "choices": [
                    "a group of sentences about one idea",
                    "one random word",
                    "a math chart",
                    "a spelling test"
                ],
                "answer": "a group of sentences about one idea",
                "explain": "Paragraphs focus on an idea."
            },
            {
                "q": "5th grade writing: Which sentence is respectful in a debate?",
                "choices": [
                    "I understand your point, but I disagree.",
                    "You are wrong and silly.",
                    "Nobody should listen.",
                    "That idea is dumb."
                ],
                "answer": "I understand your point, but I disagree.",
                "explain": "Respectful debate responds politely."
            }
        ],
        "science": [
            {
                "q": "5th grade science: What is a variable in an experiment?",
                "choices": [
                    "something that can change",
                    "the title only",
                    "a drawing",
                    "a safety poster"
                ],
                "answer": "something that can change",
                "explain": "Variables can change in tests."
            },
            {
                "q": "5th grade science: What is a hypothesis?",
                "choices": [
                    "a testable prediction",
                    "a random answer",
                    "a final grade",
                    "a map"
                ],
                "answer": "a testable prediction",
                "explain": "A hypothesis predicts what may happen."
            },
            {
                "q": "5th grade science: Which is a physical change?",
                "choices": [
                    "ice melting",
                    "wood burning",
                    "metal rusting",
                    "bread baking"
                ],
                "answer": "ice melting",
                "explain": "Melting changes state, not the substance."
            },
            {
                "q": "5th grade science: What do plants use for photosynthesis?",
                "choices": [
                    "sunlight, water, carbon dioxide",
                    "rocks and salt",
                    "plastic and metal",
                    "sound and sand"
                ],
                "answer": "sunlight, water, carbon dioxide",
                "explain": "Plants use these to make food."
            },
            {
                "q": "5th grade science: What is the water cycle powered mainly by?",
                "choices": [
                    "the Sun",
                    "the Moon only",
                    "magnets",
                    "sound"
                ],
                "answer": "the Sun",
                "explain": "The Sun heats water and drives evaporation."
            },
            {
                "q": "5th grade science: What is an ecosystem?",
                "choices": [
                    "living and nonliving things interacting",
                    "only one animal",
                    "a type of pencil",
                    "a math chart"
                ],
                "answer": "living and nonliving things interacting",
                "explain": "Ecosystems include organisms and environment."
            },
            {
                "q": "5th grade science: Why use data tables?",
                "choices": [
                    "to organize results",
                    "to decorate pages",
                    "to hide answers",
                    "to skip tests"
                ],
                "answer": "to organize results",
                "explain": "Tables organize data."
            },
            {
                "q": "5th grade science: What is erosion?",
                "choices": [
                    "movement of weathered material",
                    "making new sunlight",
                    "animal breathing",
                    "plant growth"
                ],
                "answer": "movement of weathered material",
                "explain": "Erosion moves sediments."
            },
            {
                "q": "5th grade science: What is a conductor?",
                "choices": [
                    "material that lets heat or electricity move easily",
                    "material that always floats",
                    "a living thing",
                    "a weather tool"
                ],
                "answer": "material that lets heat or electricity move easily",
                "explain": "Conductors allow energy flow."
            },
            {
                "q": "5th grade science: What should a science conclusion use?",
                "choices": [
                    "evidence from data",
                    "favorite opinion",
                    "longest sentence",
                    "first guess"
                ],
                "answer": "evidence from data",
                "explain": "Science conclusions rely on evidence."
            }
        ],
        "social": [
            {
                "q": "5th grade social studies: What does latitude measure?",
                "choices": [
                    "distance north or south of the equator",
                    "distance east or west",
                    "height of a mountain",
                    "city size"
                ],
                "answer": "distance north or south of the equator",
                "explain": "Latitude measures north-south position."
            },
            {
                "q": "5th grade social studies: What is a primary source?",
                "choices": [
                    "a source from the time or person involved",
                    "a later textbook only",
                    "a movie made years later",
                    "a summary only"
                ],
                "answer": "a source from the time or person involved",
                "explain": "Primary sources are direct."
            },
            {
                "q": "5th grade social studies: What is a physical map?",
                "choices": [
                    "a map showing landforms and water",
                    "a map showing only laws",
                    "a map showing homework",
                    "a map showing opinions"
                ],
                "answer": "a map showing landforms and water",
                "explain": "Physical maps show natural features."
            },
            {
                "q": "5th grade social studies: Why are timelines useful?",
                "choices": [
                    "they show events in order",
                    "they show only temperature",
                    "they replace evidence",
                    "they give opinions"
                ],
                "answer": "they show events in order",
                "explain": "Timelines organize time."
            },
            {
                "q": "5th grade social studies: What is trade?",
                "choices": [
                    "exchanging goods or services",
                    "drawing flags",
                    "writing poems",
                    "measuring weather"
                ],
                "answer": "exchanging goods or services",
                "explain": "Trade is exchange."
            },
            {
                "q": "5th grade social studies: What is culture?",
                "choices": [
                    "beliefs, customs, language, and traditions",
                    "only money",
                    "only maps",
                    "only laws"
                ],
                "answer": "beliefs, customs, language, and traditions",
                "explain": "Culture describes how groups live."
            },
            {
                "q": "5th grade social studies: What is a region?",
                "choices": [
                    "an area with shared features",
                    "one desk",
                    "a spelling rule",
                    "a weather tool"
                ],
                "answer": "an area with shared features",
                "explain": "Regions share features."
            },
            {
                "q": "5th grade social studies: What is a civic responsibility?",
                "choices": [
                    "following laws",
                    "breaking rules",
                    "ignoring community needs",
                    "hiding from school"
                ],
                "answer": "following laws",
                "explain": "Civic duties help the community."
            },
            {
                "q": "5th grade social studies: Why compare sources?",
                "choices": [
                    "to check accuracy and viewpoints",
                    "to avoid reading",
                    "to pick the shortest",
                    "to ignore facts"
                ],
                "answer": "to check accuracy and viewpoints",
                "explain": "Comparing sources improves understanding."
            },
            {
                "q": "5th grade social studies: What is a natural resource?",
                "choices": [
                    "something from nature people use",
                    "a video game",
                    "a classroom rule",
                    "a drawing"
                ],
                "answer": "something from nature people use",
                "explain": "Water, trees, and minerals are natural resources."
            }
        ],
        "vocab": [
            {
                "q": "5th grade vocabulary: What does 'unclear' mean?",
                "choices": [
                    "not easy to understand",
                    "very funny",
                    "already finished",
                    "too bright"
                ],
                "answer": "not easy to understand",
                "explain": "Unclear means not clear."
            },
            {
                "q": "5th grade vocabulary: What does prefix 'pre-' mean?",
                "choices": [
                    "before",
                    "after",
                    "against",
                    "again"
                ],
                "answer": "before",
                "explain": "Pre- means before."
            },
            {
                "q": "5th grade vocabulary: Synonym for rapid?",
                "choices": [
                    "fast",
                    "quiet",
                    "late",
                    "tiny"
                ],
                "answer": "fast",
                "explain": "Rapid means fast."
            },
            {
                "q": "5th grade vocabulary: Antonym for ancient?",
                "choices": [
                    "modern",
                    "old",
                    "historic",
                    "early"
                ],
                "answer": "modern",
                "explain": "Modern is opposite of ancient."
            },
            {
                "q": "5th grade vocabulary: What does evidence mean?",
                "choices": [
                    "information that supports an idea",
                    "a random opinion",
                    "a pencil",
                    "a loud sound"
                ],
                "answer": "information that supports an idea",
                "explain": "Evidence supports claims."
            },
            {
                "q": "5th grade vocabulary: Fragile means...",
                "choices": [
                    "easily broken",
                    "very heavy",
                    "brightly colored",
                    "hard to see"
                ],
                "answer": "easily broken",
                "explain": "Fragile things break easily."
            },
            {
                "q": "5th grade vocabulary: Suffix '-less' means...",
                "choices": [
                    "without",
                    "full of",
                    "before",
                    "again"
                ],
                "answer": "without",
                "explain": "Less means without."
            },
            {
                "q": "5th grade vocabulary: Examine means...",
                "choices": [
                    "look at closely",
                    "ignore",
                    "decorate",
                    "whisper"
                ],
                "answer": "look at closely",
                "explain": "Examine means inspect."
            },
            {
                "q": "5th grade vocabulary: Predict means...",
                "choices": [
                    "say what may happen next",
                    "copy a paragraph",
                    "erase work",
                    "measure length"
                ],
                "answer": "say what may happen next",
                "explain": "Predict means use clues for the future."
            },
            {
                "q": "5th grade vocabulary: Compare means...",
                "choices": [
                    "tell how things are alike and different",
                    "make something disappear",
                    "write only one fact",
                    "count backward"
                ],
                "answer": "tell how things are alike and different",
                "explain": "Compare means look at similarities and differences."
            }
        ],
        "study": [
            {
                "q": "5th grade study skills: What is spaced practice?",
                "choices": [
                    "studying a little over several days",
                    "studying once for five hours",
                    "never reviewing",
                    "only reading title"
                ],
                "answer": "studying a little over several days",
                "explain": "Spaced practice spreads out learning."
            },
            {
                "q": "5th grade study skills: What is retrieval practice?",
                "choices": [
                    "trying to remember without looking",
                    "copying answers only",
                    "highlighting every word",
                    "skipping hard parts"
                ],
                "answer": "trying to remember without looking",
                "explain": "Retrieval strengthens memory."
            },
            {
                "q": "5th grade study skills: Why use a planner?",
                "choices": [
                    "track assignments and deadlines",
                    "make homework disappear",
                    "replace studying",
                    "decorate backpack"
                ],
                "answer": "track assignments and deadlines",
                "explain": "Planners organize work."
            },
            {
                "q": "5th grade study skills: What should you do first with a big project?",
                "choices": [
                    "break it into smaller steps",
                    "wait until last night",
                    "throw away rubric",
                    "only pick colors"
                ],
                "answer": "break it into smaller steps",
                "explain": "Small steps make projects easier."
            },
            {
                "q": "5th grade study skills: Which is a strong study habit?",
                "choices": [
                    "putting phone away while focusing",
                    "checking messages every minute",
                    "TV loud",
                    "starting after midnight"
                ],
                "answer": "putting phone away while focusing",
                "explain": "Removing distractions helps focus."
            },
            {
                "q": "5th grade study skills: Why check mistakes after a quiz?",
                "choices": [
                    "to learn what to fix",
                    "to feel bad forever",
                    "to hide the quiz",
                    "to avoid practice"
                ],
                "answer": "to learn what to fix",
                "explain": "Mistakes show next steps."
            },
            {
                "q": "5th grade study skills: Annotate means...",
                "choices": [
                    "write notes or marks while reading",
                    "memorize every page",
                    "skip paragraphs",
                    "only look at pictures"
                ],
                "answer": "write notes or marks while reading",
                "explain": "Annotations help thinking."
            },
            {
                "q": "5th grade study skills: Good notes should...",
                "choices": [
                    "use key ideas in your own words",
                    "copy every word without thinking",
                    "be blank",
                    "only doodles"
                ],
                "answer": "use key ideas in your own words",
                "explain": "Your own words help understanding."
            },
            {
                "q": "5th grade study skills: What is a brain break?",
                "choices": [
                    "a short rest to reset focus",
                    "quitting forever",
                    "watching videos all day",
                    "skipping work"
                ],
                "answer": "a short rest to reset focus",
                "explain": "Short breaks reset focus."
            },
            {
                "q": "5th grade study skills: What should you do when stuck?",
                "choices": [
                    "try a strategy, check notes, or ask for help",
                    "give up immediately",
                    "erase the page",
                    "pretend done"
                ],
                "answer": "try a strategy, check notes, or ask for help",
                "explain": "Use strategies and help."
            }
        ]
    },
    "6": {
        "math": [
            {
                "q": "6th grade math: What is 3/4 + 1/2?",
                "choices": [
                    "1/4",
                    "1",
                    "1 1/4",
                    "1 3/4"
                ],
                "answer": "1 1/4",
                "explain": "1/2 is 2/4, so 3/4 + 2/4 = 5/4."
            },
            {
                "q": "6th grade math: A ratio of red to blue marbles is 2:3. If there are 12 blue, how many red?",
                "choices": [
                    "6",
                    "8",
                    "10",
                    "18"
                ],
                "answer": "8",
                "explain": "3 parts is 12, so 1 part is 4; red is 2 parts."
            },
            {
                "q": "6th grade math: What is 25% of 80?",
                "choices": [
                    "10",
                    "15",
                    "20",
                    "25"
                ],
                "answer": "20",
                "explain": "25% is one fourth; one fourth of 80 is 20."
            },
            {
                "q": "6th grade math: Solve: x + 7 = 19",
                "choices": [
                    "10",
                    "11",
                    "12",
                    "13"
                ],
                "answer": "12",
                "explain": "Subtract 7 from both sides."
            },
            {
                "q": "6th grade math: What is the area of an 8 by 5 rectangle?",
                "choices": [
                    "13",
                    "26",
                    "40",
                    "80"
                ],
                "answer": "40",
                "explain": "Area = 8 × 5 = 40."
            },
            {
                "q": "6th grade math: What is the median of 3, 7, 8, 10, 12?",
                "choices": [
                    "7",
                    "8",
                    "10",
                    "12"
                ],
                "answer": "8",
                "explain": "The middle number is 8."
            },
            {
                "q": "6th grade math: 0.6 equals which fraction?",
                "choices": [
                    "1/6",
                    "3/5",
                    "6/100",
                    "2/3"
                ],
                "answer": "3/5",
                "explain": "0.6 = 6/10 = 3/5."
            },
            {
                "q": "6th grade math: What is 5²?",
                "choices": [
                    "10",
                    "20",
                    "25",
                    "50"
                ],
                "answer": "25",
                "explain": "5 × 5 = 25."
            },
            {
                "q": "6th grade math: Simplify 18/24.",
                "choices": [
                    "2/3",
                    "3/4",
                    "4/5",
                    "6/8"
                ],
                "answer": "3/4",
                "explain": "Divide top and bottom by 6."
            },
            {
                "q": "6th grade math: What is 4(3 + 2)?",
                "choices": [
                    "14",
                    "20",
                    "24",
                    "32"
                ],
                "answer": "20",
                "explain": "Parentheses first: 3 + 2 = 5."
            }
        ],
        "reading": [
            {
                "q": "6th grade reading: What is an author's claim?",
                "choices": [
                    "the position the author is trying to prove",
                    "a random detail",
                    "the title font",
                    "the page count"
                ],
                "answer": "the position the author is trying to prove",
                "explain": "Claim means main argument."
            },
            {
                "q": "6th grade reading: Strong evidence should be...",
                "choices": [
                    "relevant, specific, and credible",
                    "long but unrelated",
                    "funny but false",
                    "only an opinion"
                ],
                "answer": "relevant, specific, and credible",
                "explain": "Strong evidence supports the claim."
            },
            {
                "q": "6th grade reading: What is tone?",
                "choices": [
                    "the author's attitude",
                    "the number of chapters",
                    "the setting only",
                    "a glossary"
                ],
                "answer": "the author's attitude",
                "explain": "Tone shows attitude."
            },
            {
                "q": "6th grade reading: What is bias?",
                "choices": [
                    "a one-sided viewpoint",
                    "a character's name",
                    "a page number",
                    "a rhyme"
                ],
                "answer": "a one-sided viewpoint",
                "explain": "Bias can affect presentation."
            },
            {
                "q": "6th grade reading: What does it mean to evaluate an argument?",
                "choices": [
                    "judge how well it is supported",
                    "copy the first line",
                    "ignore evidence",
                    "count pages"
                ],
                "answer": "judge how well it is supported",
                "explain": "Evaluation checks reasoning and evidence."
            },
            {
                "q": "6th grade reading: What is figurative language?",
                "choices": [
                    "language not meant literally",
                    "a fact table",
                    "a chapter list",
                    "a citation"
                ],
                "answer": "language not meant literally",
                "explain": "Figurative language includes metaphors and similes."
            },
            {
                "q": "6th grade reading: What is a concession in an argument?",
                "choices": [
                    "admitting a fair point from the other side",
                    "giving up completely",
                    "insulting readers",
                    "changing the topic"
                ],
                "answer": "admitting a fair point from the other side",
                "explain": "A concession shows fairness."
            },
            {
                "q": "6th grade reading: Why analyze author's craft?",
                "choices": [
                    "to understand writer choices",
                    "to count punctuation only",
                    "to avoid reading",
                    "to find the cover artist"
                ],
                "answer": "to understand writer choices",
                "explain": "Craft is about structure, words, and style."
            },
            {
                "q": "6th grade reading: What is objective summary?",
                "choices": [
                    "a summary without personal opinion",
                    "a summary with only feelings",
                    "a copy of the whole text",
                    "a random title"
                ],
                "answer": "a summary without personal opinion",
                "explain": "Objective means not based on personal opinion."
            },
            {
                "q": "6th grade reading: What should you compare in two arguments?",
                "choices": [
                    "claims, evidence, and reasoning",
                    "only font size",
                    "only paragraph count",
                    "only pictures"
                ],
                "answer": "claims, evidence, and reasoning",
                "explain": "Those parts show argument strength."
            }
        ],
        "writing": [
            {
                "q": "6th grade writing: What is a counterclaim?",
                "choices": [
                    "the opposite side's argument",
                    "the title",
                    "a comma rule",
                    "a random detail"
                ],
                "answer": "the opposite side's argument",
                "explain": "Counterclaim means the other side."
            },
            {
                "q": "6th grade writing: Which transition introduces contrast?",
                "choices": [
                    "However",
                    "Also",
                    "For example",
                    "First"
                ],
                "answer": "However",
                "explain": "However shows contrast."
            },
            {
                "q": "6th grade writing: What should a rebuttal do?",
                "choices": [
                    "respond to the counterclaim with reasoning",
                    "attack the person",
                    "ignore the other side",
                    "repeat the title"
                ],
                "answer": "respond to the counterclaim with reasoning",
                "explain": "A rebuttal answers the other side."
            },
            {
                "q": "6th grade writing: Which is a strong thesis?",
                "choices": [
                    "Schools should have fair dress codes because they support focus and respect.",
                    "Dress codes are clothes.",
                    "This is an essay.",
                    "Some people have opinions."
                ],
                "answer": "Schools should have fair dress codes because they support focus and respect.",
                "explain": "A strong thesis has a clear claim and reasons."
            },
            {
                "q": "6th grade writing: What should you do after giving evidence?",
                "choices": [
                    "explain how it supports the claim",
                    "change the subject",
                    "end immediately",
                    "delete it"
                ],
                "answer": "explain how it supports the claim",
                "explain": "Evidence needs explanation."
            },
            {
                "q": "6th grade writing: Which sentence is most concise?",
                "choices": [
                    "Because it rained, the game was canceled.",
                    "Due to the fact that it rained, the game was canceled.",
                    "The game that was a game got canceled because of rain.",
                    "Rain rain made game no."
                ],
                "answer": "Because it rained, the game was canceled.",
                "explain": "Concise writing avoids extra words."
            },
            {
                "q": "6th grade writing: What does coherence mean?",
                "choices": [
                    "ideas connect clearly",
                    "font is colorful",
                    "essay is short",
                    "there is no evidence"
                ],
                "answer": "ideas connect clearly",
                "explain": "Coherent writing flows logically."
            },
            {
                "q": "6th grade writing: Which is active voice?",
                "choices": [
                    "The student wrote the article.",
                    "The article was written by the student.",
                    "The writing was done.",
                    "The article was being written."
                ],
                "answer": "The student wrote the article.",
                "explain": "Active voice has the subject do the action."
            },
            {
                "q": "6th grade writing: What is parallel structure?",
                "choices": [
                    "using the same pattern in a list",
                    "using random grammar",
                    "writing only questions",
                    "never using commas"
                ],
                "answer": "using the same pattern in a list",
                "explain": "Parallel structure makes lists smooth."
            },
            {
                "q": "6th grade writing: What is a formal tone?",
                "choices": [
                    "clear and respectful language",
                    "slang only",
                    "all jokes",
                    "angry insults"
                ],
                "answer": "clear and respectful language",
                "explain": "Formal tone is clear and appropriate."
            }
        ],
        "science": [
            {
                "q": "6th grade science: What is the independent variable?",
                "choices": [
                    "what you change on purpose",
                    "what you measure",
                    "what stays the same",
                    "the conclusion"
                ],
                "answer": "what you change on purpose",
                "explain": "Independent variables are changed by the experimenter."
            },
            {
                "q": "6th grade science: What does density equal?",
                "choices": [
                    "mass ÷ volume",
                    "volume ÷ mass",
                    "mass + volume",
                    "temperature × mass"
                ],
                "answer": "mass ÷ volume",
                "explain": "Density = mass/volume."
            },
            {
                "q": "6th grade science: What is Newton's first law about?",
                "choices": [
                    "inertia",
                    "photosynthesis",
                    "weathering",
                    "classification"
                ],
                "answer": "inertia",
                "explain": "Objects resist changes in motion."
            },
            {
                "q": "6th grade science: What is a producer in an ecosystem?",
                "choices": [
                    "organism that makes its own food",
                    "organism that eats only meat",
                    "a weather tool",
                    "a rock layer"
                ],
                "answer": "organism that makes its own food",
                "explain": "Producers make food using energy."
            },
            {
                "q": "6th grade science: What is evidence of a chemical reaction?",
                "choices": [
                    "gas bubbles forming unexpectedly",
                    "paper being folded",
                    "water being poured",
                    "clay shaped"
                ],
                "answer": "gas bubbles forming unexpectedly",
                "explain": "Gas can signal a new substance."
            },
            {
                "q": "6th grade science: What does CER stand for?",
                "choices": [
                    "Claim, Evidence, Reasoning",
                    "Color, Energy, Rock",
                    "Copy, Erase, Repeat",
                    "Cause, Effect, Result"
                ],
                "answer": "Claim, Evidence, Reasoning",
                "explain": "CER structures explanations."
            },
            {
                "q": "6th grade science: What is a model in science?",
                "choices": [
                    "a representation used to explain or test ideas",
                    "always the real thing",
                    "a decoration only",
                    "a guess with no data"
                ],
                "answer": "a representation used to explain or test ideas",
                "explain": "Models help understand complex systems."
            },
            {
                "q": "6th grade science: Why repeat trials?",
                "choices": [
                    "to make results more reliable",
                    "to waste time",
                    "to change every variable",
                    "to avoid data"
                ],
                "answer": "to make results more reliable",
                "explain": "Repeated trials check consistency."
            },
            {
                "q": "6th grade science: What causes seasons?",
                "choices": [
                    "Earth's tilted axis as it orbits the Sun",
                    "Earth getting much closer to the Sun",
                    "the Moon blocking cold",
                    "cloud color"
                ],
                "answer": "Earth's tilted axis as it orbits the Sun",
                "explain": "Tilt causes different sunlight angles."
            },
            {
                "q": "6th grade science: If net force is zero, motion will...",
                "choices": [
                    "stay the same",
                    "always speed up",
                    "always stop instantly",
                    "turn into light"
                ],
                "answer": "stay the same",
                "explain": "Zero net force means no acceleration."
            }
        ],
        "social": [
            {
                "q": "6th grade social studies: What are the three branches of U.S. government?",
                "choices": [
                    "legislative, executive, judicial",
                    "north, south, east",
                    "city, state, school",
                    "army, navy, air"
                ],
                "answer": "legislative, executive, judicial",
                "explain": "The branches make, enforce, and interpret laws."
            },
            {
                "q": "6th grade social studies: What is federalism?",
                "choices": [
                    "power shared by national and state governments",
                    "rule by one king",
                    "no government",
                    "only city laws"
                ],
                "answer": "power shared by national and state governments",
                "explain": "Federalism divides power."
            },
            {
                "q": "6th grade social studies: What is checks and balances?",
                "choices": [
                    "branches can limit each other",
                    "citizens check bank accounts",
                    "states balance maps",
                    "courts write every law"
                ],
                "answer": "branches can limit each other",
                "explain": "Checks and balances prevent too much power."
            },
            {
                "q": "6th grade social studies: What is a secondary source?",
                "choices": [
                    "an interpretation created after an event",
                    "a diary from the event",
                    "an original photo",
                    "a speech during the event"
                ],
                "answer": "an interpretation created after an event",
                "explain": "Secondary sources analyze later."
            },
            {
                "q": "6th grade social studies: Why notice bias in a source?",
                "choices": [
                    "it can affect presentation",
                    "it proves everything false",
                    "it makes maps bigger",
                    "it removes all facts"
                ],
                "answer": "it can affect presentation",
                "explain": "Bias shapes viewpoint."
            },
            {
                "q": "6th grade social studies: What is supply and demand?",
                "choices": [
                    "a concept that helps explain prices",
                    "a weather system",
                    "a voting rule",
                    "a map scale"
                ],
                "answer": "a concept that helps explain prices",
                "explain": "Supply and demand affect prices."
            },
            {
                "q": "6th grade social studies: What is the Bill of Rights?",
                "choices": [
                    "the first ten amendments protecting freedoms",
                    "a lunch menu",
                    "a map key",
                    "a tax form"
                ],
                "answer": "the first ten amendments protecting freedoms",
                "explain": "It protects important rights."
            },
            {
                "q": "6th grade social studies: What is migration?",
                "choices": [
                    "movement of people from one place to another",
                    "a court decision",
                    "a law book",
                    "a mountain range"
                ],
                "answer": "movement of people from one place to another",
                "explain": "Migration means people move."
            },
            {
                "q": "6th grade social studies: What is rule of law?",
                "choices": [
                    "everyone, including leaders, must follow law",
                    "leaders can do anything",
                    "laws apply only to students",
                    "courts are optional"
                ],
                "answer": "everyone, including leaders, must follow law",
                "explain": "Rule of law means law applies to all."
            },
            {
                "q": "6th grade social studies: What is civic participation?",
                "choices": [
                    "taking part in community or government life",
                    "avoiding all rules",
                    "only watching sports",
                    "memorizing a map"
                ],
                "answer": "taking part in community or government life",
                "explain": "Voting and volunteering are examples."
            }
        ],
        "vocab": [
            {
                "q": "6th grade vocabulary: Analyze means...",
                "choices": [
                    "break down and examine",
                    "guess randomly",
                    "copy exactly",
                    "make louder"
                ],
                "answer": "break down and examine",
                "explain": "Analyze means examine parts."
            },
            {
                "q": "6th grade vocabulary: The root 'bio' means...",
                "choices": [
                    "life",
                    "water",
                    "sound",
                    "earth"
                ],
                "answer": "life",
                "explain": "Bio means life."
            },
            {
                "q": "6th grade vocabulary: Significant means...",
                "choices": [
                    "important",
                    "tiny",
                    "silent",
                    "ordinary"
                ],
                "answer": "important",
                "explain": "Significant means important."
            },
            {
                "q": "6th grade vocabulary: Contrast means...",
                "choices": [
                    "show differences",
                    "show only similarities",
                    "hide evidence",
                    "repeat the title"
                ],
                "answer": "show differences",
                "explain": "Contrast means show differences."
            },
            {
                "q": "6th grade vocabulary: Reliable means...",
                "choices": [
                    "trustworthy",
                    "colorful",
                    "late",
                    "confusing"
                ],
                "answer": "trustworthy",
                "explain": "Reliable means trusted."
            },
            {
                "q": "6th grade vocabulary: Prefix 'inter-' means...",
                "choices": [
                    "between or among",
                    "before",
                    "not",
                    "again"
                ],
                "answer": "between or among",
                "explain": "Inter- means between or among."
            },
            {
                "q": "6th grade vocabulary: Antonym of expand?",
                "choices": [
                    "shrink",
                    "grow",
                    "increase",
                    "spread"
                ],
                "answer": "shrink",
                "explain": "Shrink is opposite of expand."
            },
            {
                "q": "6th grade vocabulary: Interpret means...",
                "choices": [
                    "explain the meaning",
                    "erase something",
                    "measure weight",
                    "choose randomly"
                ],
                "answer": "explain the meaning",
                "explain": "Interpret means explain."
            },
            {
                "q": "6th grade vocabulary: Objective means...",
                "choices": [
                    "fair and not taking sides",
                    "angry",
                    "careless",
                    "ancient"
                ],
                "answer": "fair and not taking sides",
                "explain": "Objective means fact-based and fair."
            },
            {
                "q": "6th grade vocabulary: Relevant means...",
                "choices": [
                    "connected to the topic",
                    "random",
                    "ancient",
                    "hidden"
                ],
                "answer": "connected to the topic",
                "explain": "Relevant means related."
            }
        ],
        "study": [
            {
                "q": "6th grade study skills: What is a SMART goal?",
                "choices": [
                    "specific, measurable, achievable, relevant, time-bound",
                    "simple, messy, angry, random, tiny",
                    "silent, major, artistic, rapid, temporary",
                    "school, math, art, reading, typing"
                ],
                "answer": "specific, measurable, achievable, relevant, time-bound",
                "explain": "SMART goals are clear and trackable."
            },
            {
                "q": "6th grade study skills: What is an error log?",
                "choices": [
                    "a list of mistakes and how to fix them",
                    "only perfect scores",
                    "a leaderboard",
                    "a snack list"
                ],
                "answer": "a list of mistakes and how to fix them",
                "explain": "Error logs help identify patterns."
            },
            {
                "q": "6th grade study skills: Prioritize means...",
                "choices": [
                    "choose what matters most first",
                    "do everything randomly",
                    "avoid hard tasks",
                    "only do shortest assignment"
                ],
                "answer": "choose what matters most first",
                "explain": "Prioritizing manages time."
            },
            {
                "q": "6th grade study skills: Which study plan is strongest?",
                "choices": [
                    "review notes, practice, then check mistakes",
                    "read once and hope",
                    "wait until deadline",
                    "study only easy parts"
                ],
                "answer": "review notes, practice, then check mistakes",
                "explain": "Practice plus feedback builds skill."
            },
            {
                "q": "6th grade study skills: Why use headings in notes?",
                "choices": [
                    "organize information by topic",
                    "make notes harder",
                    "replace studying",
                    "hide ideas"
                ],
                "answer": "organize information by topic",
                "explain": "Headings organize notes."
            },
            {
                "q": "6th grade study skills: What is active reading?",
                "choices": [
                    "asking questions and thinking while reading",
                    "staring at words only",
                    "reading with loud music",
                    "skipping confusing parts"
                ],
                "answer": "asking questions and thinking while reading",
                "explain": "Active reading means thinking."
            },
            {
                "q": "6th grade study skills: What is metacognition?",
                "choices": [
                    "thinking about your own thinking and learning",
                    "memorizing without understanding",
                    "drawing pictures only",
                    "reading faster"
                ],
                "answer": "thinking about your own thinking and learning",
                "explain": "Metacognition helps improve learning."
            },
            {
                "q": "6th grade study skills: What is self-assessment?",
                "choices": [
                    "checking your work against goals or criteria",
                    "giving any grade you want",
                    "never asking feedback",
                    "reading title only"
                ],
                "answer": "checking your work against goals or criteria",
                "explain": "Self-assessment checks progress."
            },
            {
                "q": "6th grade study skills: Why explain an idea to someone else?",
                "choices": [
                    "it reveals what you understand and what is fuzzy",
                    "it always wastes time",
                    "it replaces all practice",
                    "it makes notes useless"
                ],
                "answer": "it reveals what you understand and what is fuzzy",
                "explain": "Teaching checks understanding."
            },
            {
                "q": "6th grade study skills: What is interleaving?",
                "choices": [
                    "mixing related types of practice",
                    "studying one easy problem forever",
                    "never reviewing",
                    "copying notes in color only"
                ],
                "answer": "mixing related types of practice",
                "explain": "Interleaving helps choose strategies."
            }
        ]
    },
    "7": {
        "math": [
            {
                "q": "7th grade math: What is -6 + 14?",
                "choices": [
                    "-20",
                    "-8",
                    "8",
                    "20"
                ],
                "answer": "8",
                "explain": "Move right 14 from -6."
            },
            {
                "q": "7th grade math: A recipe uses 3 cups for 12 cookies. What is the unit rate?",
                "choices": [
                    "1 cup per cookie",
                    "1 cup per 4 cookies",
                    "4 cups per cookie",
                    "12 cups per 3 cookies"
                ],
                "answer": "1 cup per 4 cookies",
                "explain": "3:12 simplifies to 1:4."
            },
            {
                "q": "7th grade math: Solve: 2x + 3 = 11",
                "choices": [
                    "3",
                    "4",
                    "5",
                    "7"
                ],
                "answer": "4",
                "explain": "Subtract 3, then divide by 2."
            },
            {
                "q": "7th grade math: A $40 jacket is 25% off. What is the discount?",
                "choices": [
                    "$5",
                    "$10",
                    "$15",
                    "$20"
                ],
                "answer": "$10",
                "explain": "25% of 40 is 10."
            },
            {
                "q": "7th grade math: Probability of rolling an even number on a die?",
                "choices": [
                    "1/6",
                    "1/3",
                    "1/2",
                    "2/3"
                ],
                "answer": "1/2",
                "explain": "3 even numbers out of 6."
            },
            {
                "q": "7th grade math: Which is equivalent to 3(x + 4)?",
                "choices": [
                    "3x + 4",
                    "x + 12",
                    "3x + 12",
                    "7x"
                ],
                "answer": "3x + 12",
                "explain": "Distribute 3."
            },
            {
                "q": "7th grade math: 1 inch = 5 miles. How many miles is 3 inches?",
                "choices": [
                    "8",
                    "10",
                    "15",
                    "20"
                ],
                "answer": "15",
                "explain": "3 × 5 = 15."
            },
            {
                "q": "7th grade math: Mean of 6, 8, 10, 12?",
                "choices": [
                    "8",
                    "9",
                    "10",
                    "11"
                ],
                "answer": "9",
                "explain": "36 ÷ 4 = 9."
            },
            {
                "q": "7th grade math: What is 4.5 ÷ 0.5?",
                "choices": [
                    "2.25",
                    "4",
                    "8",
                    "9"
                ],
                "answer": "9",
                "explain": "There are 9 halves in 4.5."
            },
            {
                "q": "7th grade math: If y = 3x and x = 7, what is y?",
                "choices": [
                    "10",
                    "14",
                    "21",
                    "28"
                ],
                "answer": "21",
                "explain": "3 × 7 = 21."
            }
        ],
        "reading": [
            {
                "q": "7th grade reading: What is an author's claim?",
                "choices": [
                    "the position the author is trying to prove",
                    "a random detail",
                    "the title font",
                    "the page count"
                ],
                "answer": "the position the author is trying to prove",
                "explain": "Claim means main argument."
            },
            {
                "q": "7th grade reading: Strong evidence should be...",
                "choices": [
                    "relevant, specific, and credible",
                    "long but unrelated",
                    "funny but false",
                    "only an opinion"
                ],
                "answer": "relevant, specific, and credible",
                "explain": "Strong evidence supports the claim."
            },
            {
                "q": "7th grade reading: What is tone?",
                "choices": [
                    "the author's attitude",
                    "the number of chapters",
                    "the setting only",
                    "a glossary"
                ],
                "answer": "the author's attitude",
                "explain": "Tone shows attitude."
            },
            {
                "q": "7th grade reading: What is bias?",
                "choices": [
                    "a one-sided viewpoint",
                    "a character's name",
                    "a page number",
                    "a rhyme"
                ],
                "answer": "a one-sided viewpoint",
                "explain": "Bias can affect presentation."
            },
            {
                "q": "7th grade reading: What does it mean to evaluate an argument?",
                "choices": [
                    "judge how well it is supported",
                    "copy the first line",
                    "ignore evidence",
                    "count pages"
                ],
                "answer": "judge how well it is supported",
                "explain": "Evaluation checks reasoning and evidence."
            },
            {
                "q": "7th grade reading: What is figurative language?",
                "choices": [
                    "language not meant literally",
                    "a fact table",
                    "a chapter list",
                    "a citation"
                ],
                "answer": "language not meant literally",
                "explain": "Figurative language includes metaphors and similes."
            },
            {
                "q": "7th grade reading: What is a concession in an argument?",
                "choices": [
                    "admitting a fair point from the other side",
                    "giving up completely",
                    "insulting readers",
                    "changing the topic"
                ],
                "answer": "admitting a fair point from the other side",
                "explain": "A concession shows fairness."
            },
            {
                "q": "7th grade reading: Why analyze author's craft?",
                "choices": [
                    "to understand writer choices",
                    "to count punctuation only",
                    "to avoid reading",
                    "to find the cover artist"
                ],
                "answer": "to understand writer choices",
                "explain": "Craft is about structure, words, and style."
            },
            {
                "q": "7th grade reading: What is objective summary?",
                "choices": [
                    "a summary without personal opinion",
                    "a summary with only feelings",
                    "a copy of the whole text",
                    "a random title"
                ],
                "answer": "a summary without personal opinion",
                "explain": "Objective means not based on personal opinion."
            },
            {
                "q": "7th grade reading: What should you compare in two arguments?",
                "choices": [
                    "claims, evidence, and reasoning",
                    "only font size",
                    "only paragraph count",
                    "only pictures"
                ],
                "answer": "claims, evidence, and reasoning",
                "explain": "Those parts show argument strength."
            }
        ],
        "writing": [
            {
                "q": "7th grade writing: What is a counterclaim?",
                "choices": [
                    "the opposite side's argument",
                    "the title",
                    "a comma rule",
                    "a random detail"
                ],
                "answer": "the opposite side's argument",
                "explain": "Counterclaim means the other side."
            },
            {
                "q": "7th grade writing: Which transition introduces contrast?",
                "choices": [
                    "However",
                    "Also",
                    "For example",
                    "First"
                ],
                "answer": "However",
                "explain": "However shows contrast."
            },
            {
                "q": "7th grade writing: What should a rebuttal do?",
                "choices": [
                    "respond to the counterclaim with reasoning",
                    "attack the person",
                    "ignore the other side",
                    "repeat the title"
                ],
                "answer": "respond to the counterclaim with reasoning",
                "explain": "A rebuttal answers the other side."
            },
            {
                "q": "7th grade writing: Which is a strong thesis?",
                "choices": [
                    "Schools should have fair dress codes because they support focus and respect.",
                    "Dress codes are clothes.",
                    "This is an essay.",
                    "Some people have opinions."
                ],
                "answer": "Schools should have fair dress codes because they support focus and respect.",
                "explain": "A strong thesis has a clear claim and reasons."
            },
            {
                "q": "7th grade writing: What should you do after giving evidence?",
                "choices": [
                    "explain how it supports the claim",
                    "change the subject",
                    "end immediately",
                    "delete it"
                ],
                "answer": "explain how it supports the claim",
                "explain": "Evidence needs explanation."
            },
            {
                "q": "7th grade writing: Which sentence is most concise?",
                "choices": [
                    "Because it rained, the game was canceled.",
                    "Due to the fact that it rained, the game was canceled.",
                    "The game that was a game got canceled because of rain.",
                    "Rain rain made game no."
                ],
                "answer": "Because it rained, the game was canceled.",
                "explain": "Concise writing avoids extra words."
            },
            {
                "q": "7th grade writing: What does coherence mean?",
                "choices": [
                    "ideas connect clearly",
                    "font is colorful",
                    "essay is short",
                    "there is no evidence"
                ],
                "answer": "ideas connect clearly",
                "explain": "Coherent writing flows logically."
            },
            {
                "q": "7th grade writing: Which is active voice?",
                "choices": [
                    "The student wrote the article.",
                    "The article was written by the student.",
                    "The writing was done.",
                    "The article was being written."
                ],
                "answer": "The student wrote the article.",
                "explain": "Active voice has the subject do the action."
            },
            {
                "q": "7th grade writing: What is parallel structure?",
                "choices": [
                    "using the same pattern in a list",
                    "using random grammar",
                    "writing only questions",
                    "never using commas"
                ],
                "answer": "using the same pattern in a list",
                "explain": "Parallel structure makes lists smooth."
            },
            {
                "q": "7th grade writing: What is a formal tone?",
                "choices": [
                    "clear and respectful language",
                    "slang only",
                    "all jokes",
                    "angry insults"
                ],
                "answer": "clear and respectful language",
                "explain": "Formal tone is clear and appropriate."
            }
        ],
        "science": [
            {
                "q": "7th grade science: What is the independent variable?",
                "choices": [
                    "what you change on purpose",
                    "what you measure",
                    "what stays the same",
                    "the conclusion"
                ],
                "answer": "what you change on purpose",
                "explain": "Independent variables are changed by the experimenter."
            },
            {
                "q": "7th grade science: What does density equal?",
                "choices": [
                    "mass ÷ volume",
                    "volume ÷ mass",
                    "mass + volume",
                    "temperature × mass"
                ],
                "answer": "mass ÷ volume",
                "explain": "Density = mass/volume."
            },
            {
                "q": "7th grade science: What is Newton's first law about?",
                "choices": [
                    "inertia",
                    "photosynthesis",
                    "weathering",
                    "classification"
                ],
                "answer": "inertia",
                "explain": "Objects resist changes in motion."
            },
            {
                "q": "7th grade science: What is a producer in an ecosystem?",
                "choices": [
                    "organism that makes its own food",
                    "organism that eats only meat",
                    "a weather tool",
                    "a rock layer"
                ],
                "answer": "organism that makes its own food",
                "explain": "Producers make food using energy."
            },
            {
                "q": "7th grade science: What is evidence of a chemical reaction?",
                "choices": [
                    "gas bubbles forming unexpectedly",
                    "paper being folded",
                    "water being poured",
                    "clay shaped"
                ],
                "answer": "gas bubbles forming unexpectedly",
                "explain": "Gas can signal a new substance."
            },
            {
                "q": "7th grade science: What does CER stand for?",
                "choices": [
                    "Claim, Evidence, Reasoning",
                    "Color, Energy, Rock",
                    "Copy, Erase, Repeat",
                    "Cause, Effect, Result"
                ],
                "answer": "Claim, Evidence, Reasoning",
                "explain": "CER structures explanations."
            },
            {
                "q": "7th grade science: What is a model in science?",
                "choices": [
                    "a representation used to explain or test ideas",
                    "always the real thing",
                    "a decoration only",
                    "a guess with no data"
                ],
                "answer": "a representation used to explain or test ideas",
                "explain": "Models help understand complex systems."
            },
            {
                "q": "7th grade science: Why repeat trials?",
                "choices": [
                    "to make results more reliable",
                    "to waste time",
                    "to change every variable",
                    "to avoid data"
                ],
                "answer": "to make results more reliable",
                "explain": "Repeated trials check consistency."
            },
            {
                "q": "7th grade science: What causes seasons?",
                "choices": [
                    "Earth's tilted axis as it orbits the Sun",
                    "Earth getting much closer to the Sun",
                    "the Moon blocking cold",
                    "cloud color"
                ],
                "answer": "Earth's tilted axis as it orbits the Sun",
                "explain": "Tilt causes different sunlight angles."
            },
            {
                "q": "7th grade science: If net force is zero, motion will...",
                "choices": [
                    "stay the same",
                    "always speed up",
                    "always stop instantly",
                    "turn into light"
                ],
                "answer": "stay the same",
                "explain": "Zero net force means no acceleration."
            }
        ],
        "social": [
            {
                "q": "7th grade social studies: What are the three branches of U.S. government?",
                "choices": [
                    "legislative, executive, judicial",
                    "north, south, east",
                    "city, state, school",
                    "army, navy, air"
                ],
                "answer": "legislative, executive, judicial",
                "explain": "The branches make, enforce, and interpret laws."
            },
            {
                "q": "7th grade social studies: What is federalism?",
                "choices": [
                    "power shared by national and state governments",
                    "rule by one king",
                    "no government",
                    "only city laws"
                ],
                "answer": "power shared by national and state governments",
                "explain": "Federalism divides power."
            },
            {
                "q": "7th grade social studies: What is checks and balances?",
                "choices": [
                    "branches can limit each other",
                    "citizens check bank accounts",
                    "states balance maps",
                    "courts write every law"
                ],
                "answer": "branches can limit each other",
                "explain": "Checks and balances prevent too much power."
            },
            {
                "q": "7th grade social studies: What is a secondary source?",
                "choices": [
                    "an interpretation created after an event",
                    "a diary from the event",
                    "an original photo",
                    "a speech during the event"
                ],
                "answer": "an interpretation created after an event",
                "explain": "Secondary sources analyze later."
            },
            {
                "q": "7th grade social studies: Why notice bias in a source?",
                "choices": [
                    "it can affect presentation",
                    "it proves everything false",
                    "it makes maps bigger",
                    "it removes all facts"
                ],
                "answer": "it can affect presentation",
                "explain": "Bias shapes viewpoint."
            },
            {
                "q": "7th grade social studies: What is supply and demand?",
                "choices": [
                    "a concept that helps explain prices",
                    "a weather system",
                    "a voting rule",
                    "a map scale"
                ],
                "answer": "a concept that helps explain prices",
                "explain": "Supply and demand affect prices."
            },
            {
                "q": "7th grade social studies: What is the Bill of Rights?",
                "choices": [
                    "the first ten amendments protecting freedoms",
                    "a lunch menu",
                    "a map key",
                    "a tax form"
                ],
                "answer": "the first ten amendments protecting freedoms",
                "explain": "It protects important rights."
            },
            {
                "q": "7th grade social studies: What is migration?",
                "choices": [
                    "movement of people from one place to another",
                    "a court decision",
                    "a law book",
                    "a mountain range"
                ],
                "answer": "movement of people from one place to another",
                "explain": "Migration means people move."
            },
            {
                "q": "7th grade social studies: What is rule of law?",
                "choices": [
                    "everyone, including leaders, must follow law",
                    "leaders can do anything",
                    "laws apply only to students",
                    "courts are optional"
                ],
                "answer": "everyone, including leaders, must follow law",
                "explain": "Rule of law means law applies to all."
            },
            {
                "q": "7th grade social studies: What is civic participation?",
                "choices": [
                    "taking part in community or government life",
                    "avoiding all rules",
                    "only watching sports",
                    "memorizing a map"
                ],
                "answer": "taking part in community or government life",
                "explain": "Voting and volunteering are examples."
            }
        ],
        "vocab": [
            {
                "q": "7th grade vocabulary: Analyze means...",
                "choices": [
                    "break down and examine",
                    "guess randomly",
                    "copy exactly",
                    "make louder"
                ],
                "answer": "break down and examine",
                "explain": "Analyze means examine parts."
            },
            {
                "q": "7th grade vocabulary: The root 'bio' means...",
                "choices": [
                    "life",
                    "water",
                    "sound",
                    "earth"
                ],
                "answer": "life",
                "explain": "Bio means life."
            },
            {
                "q": "7th grade vocabulary: Significant means...",
                "choices": [
                    "important",
                    "tiny",
                    "silent",
                    "ordinary"
                ],
                "answer": "important",
                "explain": "Significant means important."
            },
            {
                "q": "7th grade vocabulary: Contrast means...",
                "choices": [
                    "show differences",
                    "show only similarities",
                    "hide evidence",
                    "repeat the title"
                ],
                "answer": "show differences",
                "explain": "Contrast means show differences."
            },
            {
                "q": "7th grade vocabulary: Reliable means...",
                "choices": [
                    "trustworthy",
                    "colorful",
                    "late",
                    "confusing"
                ],
                "answer": "trustworthy",
                "explain": "Reliable means trusted."
            },
            {
                "q": "7th grade vocabulary: Prefix 'inter-' means...",
                "choices": [
                    "between or among",
                    "before",
                    "not",
                    "again"
                ],
                "answer": "between or among",
                "explain": "Inter- means between or among."
            },
            {
                "q": "7th grade vocabulary: Antonym of expand?",
                "choices": [
                    "shrink",
                    "grow",
                    "increase",
                    "spread"
                ],
                "answer": "shrink",
                "explain": "Shrink is opposite of expand."
            },
            {
                "q": "7th grade vocabulary: Interpret means...",
                "choices": [
                    "explain the meaning",
                    "erase something",
                    "measure weight",
                    "choose randomly"
                ],
                "answer": "explain the meaning",
                "explain": "Interpret means explain."
            },
            {
                "q": "7th grade vocabulary: Objective means...",
                "choices": [
                    "fair and not taking sides",
                    "angry",
                    "careless",
                    "ancient"
                ],
                "answer": "fair and not taking sides",
                "explain": "Objective means fact-based and fair."
            },
            {
                "q": "7th grade vocabulary: Relevant means...",
                "choices": [
                    "connected to the topic",
                    "random",
                    "ancient",
                    "hidden"
                ],
                "answer": "connected to the topic",
                "explain": "Relevant means related."
            }
        ],
        "study": [
            {
                "q": "7th grade study skills: What is a SMART goal?",
                "choices": [
                    "specific, measurable, achievable, relevant, time-bound",
                    "simple, messy, angry, random, tiny",
                    "silent, major, artistic, rapid, temporary",
                    "school, math, art, reading, typing"
                ],
                "answer": "specific, measurable, achievable, relevant, time-bound",
                "explain": "SMART goals are clear and trackable."
            },
            {
                "q": "7th grade study skills: What is an error log?",
                "choices": [
                    "a list of mistakes and how to fix them",
                    "only perfect scores",
                    "a leaderboard",
                    "a snack list"
                ],
                "answer": "a list of mistakes and how to fix them",
                "explain": "Error logs help identify patterns."
            },
            {
                "q": "7th grade study skills: Prioritize means...",
                "choices": [
                    "choose what matters most first",
                    "do everything randomly",
                    "avoid hard tasks",
                    "only do shortest assignment"
                ],
                "answer": "choose what matters most first",
                "explain": "Prioritizing manages time."
            },
            {
                "q": "7th grade study skills: Which study plan is strongest?",
                "choices": [
                    "review notes, practice, then check mistakes",
                    "read once and hope",
                    "wait until deadline",
                    "study only easy parts"
                ],
                "answer": "review notes, practice, then check mistakes",
                "explain": "Practice plus feedback builds skill."
            },
            {
                "q": "7th grade study skills: Why use headings in notes?",
                "choices": [
                    "organize information by topic",
                    "make notes harder",
                    "replace studying",
                    "hide ideas"
                ],
                "answer": "organize information by topic",
                "explain": "Headings organize notes."
            },
            {
                "q": "7th grade study skills: What is active reading?",
                "choices": [
                    "asking questions and thinking while reading",
                    "staring at words only",
                    "reading with loud music",
                    "skipping confusing parts"
                ],
                "answer": "asking questions and thinking while reading",
                "explain": "Active reading means thinking."
            },
            {
                "q": "7th grade study skills: What is metacognition?",
                "choices": [
                    "thinking about your own thinking and learning",
                    "memorizing without understanding",
                    "drawing pictures only",
                    "reading faster"
                ],
                "answer": "thinking about your own thinking and learning",
                "explain": "Metacognition helps improve learning."
            },
            {
                "q": "7th grade study skills: What is self-assessment?",
                "choices": [
                    "checking your work against goals or criteria",
                    "giving any grade you want",
                    "never asking feedback",
                    "reading title only"
                ],
                "answer": "checking your work against goals or criteria",
                "explain": "Self-assessment checks progress."
            },
            {
                "q": "7th grade study skills: Why explain an idea to someone else?",
                "choices": [
                    "it reveals what you understand and what is fuzzy",
                    "it always wastes time",
                    "it replaces all practice",
                    "it makes notes useless"
                ],
                "answer": "it reveals what you understand and what is fuzzy",
                "explain": "Teaching checks understanding."
            },
            {
                "q": "7th grade study skills: What is interleaving?",
                "choices": [
                    "mixing related types of practice",
                    "studying one easy problem forever",
                    "never reviewing",
                    "copying notes in color only"
                ],
                "answer": "mixing related types of practice",
                "explain": "Interleaving helps choose strategies."
            }
        ]
    },
    "8": {
        "math": [
            {
                "q": "8th grade math: Slope with rise 6 and run 3?",
                "choices": [
                    "1/2",
                    "2",
                    "3",
                    "6"
                ],
                "answer": "2",
                "explain": "Slope = rise/run = 6/3."
            },
            {
                "q": "8th grade math: Legs 6 and 8 have hypotenuse...",
                "choices": [
                    "10",
                    "12",
                    "14",
                    "48"
                ],
                "answer": "10",
                "explain": "6² + 8² = 100, sqrt is 10."
            },
            {
                "q": "8th grade math: 3.2 × 10³ in standard form?",
                "choices": [
                    "32",
                    "320",
                    "3,200",
                    "32,000"
                ],
                "answer": "3,200",
                "explain": "Move decimal 3 places right."
            },
            {
                "q": "8th grade math: Solve: 3x - 5 = 16",
                "choices": [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                "answer": "7",
                "explain": "Add 5, divide by 3."
            },
            {
                "q": "8th grade math: y-intercept of y = 2x + 5?",
                "choices": [
                    "2",
                    "5",
                    "7",
                    "x"
                ],
                "answer": "5",
                "explain": "b is the y-intercept."
            },
            {
                "q": "8th grade math: A function means...",
                "choices": [
                    "Each x has exactly one y",
                    "One x has many y-values",
                    "No x-values are used",
                    "Only negative numbers are allowed"
                ],
                "answer": "Each x has exactly one y",
                "explain": "Each input has one output."
            },
            {
                "q": "8th grade math: Simplify 2³ × 2²",
                "choices": [
                    "2⁵",
                    "2⁶",
                    "4⁵",
                    "4⁶"
                ],
                "answer": "2⁵",
                "explain": "Add exponents."
            },
            {
                "q": "8th grade math: What is √49?",
                "choices": [
                    "6",
                    "7",
                    "8",
                    "9"
                ],
                "answer": "7",
                "explain": "7 × 7 = 49."
            },
            {
                "q": "8th grade math: x + y = 10 and x = 4. What is y?",
                "choices": [
                    "4",
                    "5",
                    "6",
                    "10"
                ],
                "answer": "6",
                "explain": "y = 6."
            },
            {
                "q": "8th grade math: Cylinder volume formula?",
                "choices": [
                    "πr²h",
                    "2πr",
                    "lw",
                    "bh"
                ],
                "answer": "πr²h",
                "explain": "Base area times height."
            }
        ],
        "reading": [
            {
                "q": "8th grade reading: What is an author's claim?",
                "choices": [
                    "the position the author is trying to prove",
                    "a random detail",
                    "the title font",
                    "the page count"
                ],
                "answer": "the position the author is trying to prove",
                "explain": "Claim means main argument."
            },
            {
                "q": "8th grade reading: Strong evidence should be...",
                "choices": [
                    "relevant, specific, and credible",
                    "long but unrelated",
                    "funny but false",
                    "only an opinion"
                ],
                "answer": "relevant, specific, and credible",
                "explain": "Strong evidence supports the claim."
            },
            {
                "q": "8th grade reading: What is tone?",
                "choices": [
                    "the author's attitude",
                    "the number of chapters",
                    "the setting only",
                    "a glossary"
                ],
                "answer": "the author's attitude",
                "explain": "Tone shows attitude."
            },
            {
                "q": "8th grade reading: What is bias?",
                "choices": [
                    "a one-sided viewpoint",
                    "a character's name",
                    "a page number",
                    "a rhyme"
                ],
                "answer": "a one-sided viewpoint",
                "explain": "Bias can affect presentation."
            },
            {
                "q": "8th grade reading: What does it mean to evaluate an argument?",
                "choices": [
                    "judge how well it is supported",
                    "copy the first line",
                    "ignore evidence",
                    "count pages"
                ],
                "answer": "judge how well it is supported",
                "explain": "Evaluation checks reasoning and evidence."
            },
            {
                "q": "8th grade reading: What is figurative language?",
                "choices": [
                    "language not meant literally",
                    "a fact table",
                    "a chapter list",
                    "a citation"
                ],
                "answer": "language not meant literally",
                "explain": "Figurative language includes metaphors and similes."
            },
            {
                "q": "8th grade reading: What is a concession in an argument?",
                "choices": [
                    "admitting a fair point from the other side",
                    "giving up completely",
                    "insulting readers",
                    "changing the topic"
                ],
                "answer": "admitting a fair point from the other side",
                "explain": "A concession shows fairness."
            },
            {
                "q": "8th grade reading: Why analyze author's craft?",
                "choices": [
                    "to understand writer choices",
                    "to count punctuation only",
                    "to avoid reading",
                    "to find the cover artist"
                ],
                "answer": "to understand writer choices",
                "explain": "Craft is about structure, words, and style."
            },
            {
                "q": "8th grade reading: What is objective summary?",
                "choices": [
                    "a summary without personal opinion",
                    "a summary with only feelings",
                    "a copy of the whole text",
                    "a random title"
                ],
                "answer": "a summary without personal opinion",
                "explain": "Objective means not based on personal opinion."
            },
            {
                "q": "8th grade reading: What should you compare in two arguments?",
                "choices": [
                    "claims, evidence, and reasoning",
                    "only font size",
                    "only paragraph count",
                    "only pictures"
                ],
                "answer": "claims, evidence, and reasoning",
                "explain": "Those parts show argument strength."
            }
        ],
        "writing": [
            {
                "q": "8th grade writing: What is a counterclaim?",
                "choices": [
                    "the opposite side's argument",
                    "the title",
                    "a comma rule",
                    "a random detail"
                ],
                "answer": "the opposite side's argument",
                "explain": "Counterclaim means the other side."
            },
            {
                "q": "8th grade writing: Which transition introduces contrast?",
                "choices": [
                    "However",
                    "Also",
                    "For example",
                    "First"
                ],
                "answer": "However",
                "explain": "However shows contrast."
            },
            {
                "q": "8th grade writing: What should a rebuttal do?",
                "choices": [
                    "respond to the counterclaim with reasoning",
                    "attack the person",
                    "ignore the other side",
                    "repeat the title"
                ],
                "answer": "respond to the counterclaim with reasoning",
                "explain": "A rebuttal answers the other side."
            },
            {
                "q": "8th grade writing: Which is a strong thesis?",
                "choices": [
                    "Schools should have fair dress codes because they support focus and respect.",
                    "Dress codes are clothes.",
                    "This is an essay.",
                    "Some people have opinions."
                ],
                "answer": "Schools should have fair dress codes because they support focus and respect.",
                "explain": "A strong thesis has a clear claim and reasons."
            },
            {
                "q": "8th grade writing: What should you do after giving evidence?",
                "choices": [
                    "explain how it supports the claim",
                    "change the subject",
                    "end immediately",
                    "delete it"
                ],
                "answer": "explain how it supports the claim",
                "explain": "Evidence needs explanation."
            },
            {
                "q": "8th grade writing: Which sentence is most concise?",
                "choices": [
                    "Because it rained, the game was canceled.",
                    "Due to the fact that it rained, the game was canceled.",
                    "The game that was a game got canceled because of rain.",
                    "Rain rain made game no."
                ],
                "answer": "Because it rained, the game was canceled.",
                "explain": "Concise writing avoids extra words."
            },
            {
                "q": "8th grade writing: What does coherence mean?",
                "choices": [
                    "ideas connect clearly",
                    "font is colorful",
                    "essay is short",
                    "there is no evidence"
                ],
                "answer": "ideas connect clearly",
                "explain": "Coherent writing flows logically."
            },
            {
                "q": "8th grade writing: Which is active voice?",
                "choices": [
                    "The student wrote the article.",
                    "The article was written by the student.",
                    "The writing was done.",
                    "The article was being written."
                ],
                "answer": "The student wrote the article.",
                "explain": "Active voice has the subject do the action."
            },
            {
                "q": "8th grade writing: What is parallel structure?",
                "choices": [
                    "using the same pattern in a list",
                    "using random grammar",
                    "writing only questions",
                    "never using commas"
                ],
                "answer": "using the same pattern in a list",
                "explain": "Parallel structure makes lists smooth."
            },
            {
                "q": "8th grade writing: What is a formal tone?",
                "choices": [
                    "clear and respectful language",
                    "slang only",
                    "all jokes",
                    "angry insults"
                ],
                "answer": "clear and respectful language",
                "explain": "Formal tone is clear and appropriate."
            }
        ],
        "science": [
            {
                "q": "8th grade science: What is the independent variable?",
                "choices": [
                    "what you change on purpose",
                    "what you measure",
                    "what stays the same",
                    "the conclusion"
                ],
                "answer": "what you change on purpose",
                "explain": "Independent variables are changed by the experimenter."
            },
            {
                "q": "8th grade science: What does density equal?",
                "choices": [
                    "mass ÷ volume",
                    "volume ÷ mass",
                    "mass + volume",
                    "temperature × mass"
                ],
                "answer": "mass ÷ volume",
                "explain": "Density = mass/volume."
            },
            {
                "q": "8th grade science: What is Newton's first law about?",
                "choices": [
                    "inertia",
                    "photosynthesis",
                    "weathering",
                    "classification"
                ],
                "answer": "inertia",
                "explain": "Objects resist changes in motion."
            },
            {
                "q": "8th grade science: What is a producer in an ecosystem?",
                "choices": [
                    "organism that makes its own food",
                    "organism that eats only meat",
                    "a weather tool",
                    "a rock layer"
                ],
                "answer": "organism that makes its own food",
                "explain": "Producers make food using energy."
            },
            {
                "q": "8th grade science: What is evidence of a chemical reaction?",
                "choices": [
                    "gas bubbles forming unexpectedly",
                    "paper being folded",
                    "water being poured",
                    "clay shaped"
                ],
                "answer": "gas bubbles forming unexpectedly",
                "explain": "Gas can signal a new substance."
            },
            {
                "q": "8th grade science: What does CER stand for?",
                "choices": [
                    "Claim, Evidence, Reasoning",
                    "Color, Energy, Rock",
                    "Copy, Erase, Repeat",
                    "Cause, Effect, Result"
                ],
                "answer": "Claim, Evidence, Reasoning",
                "explain": "CER structures explanations."
            },
            {
                "q": "8th grade science: What is a model in science?",
                "choices": [
                    "a representation used to explain or test ideas",
                    "always the real thing",
                    "a decoration only",
                    "a guess with no data"
                ],
                "answer": "a representation used to explain or test ideas",
                "explain": "Models help understand complex systems."
            },
            {
                "q": "8th grade science: Why repeat trials?",
                "choices": [
                    "to make results more reliable",
                    "to waste time",
                    "to change every variable",
                    "to avoid data"
                ],
                "answer": "to make results more reliable",
                "explain": "Repeated trials check consistency."
            },
            {
                "q": "8th grade science: What causes seasons?",
                "choices": [
                    "Earth's tilted axis as it orbits the Sun",
                    "Earth getting much closer to the Sun",
                    "the Moon blocking cold",
                    "cloud color"
                ],
                "answer": "Earth's tilted axis as it orbits the Sun",
                "explain": "Tilt causes different sunlight angles."
            },
            {
                "q": "8th grade science: If net force is zero, motion will...",
                "choices": [
                    "stay the same",
                    "always speed up",
                    "always stop instantly",
                    "turn into light"
                ],
                "answer": "stay the same",
                "explain": "Zero net force means no acceleration."
            }
        ],
        "social": [
            {
                "q": "8th grade social studies: What are the three branches of U.S. government?",
                "choices": [
                    "legislative, executive, judicial",
                    "north, south, east",
                    "city, state, school",
                    "army, navy, air"
                ],
                "answer": "legislative, executive, judicial",
                "explain": "The branches make, enforce, and interpret laws."
            },
            {
                "q": "8th grade social studies: What is federalism?",
                "choices": [
                    "power shared by national and state governments",
                    "rule by one king",
                    "no government",
                    "only city laws"
                ],
                "answer": "power shared by national and state governments",
                "explain": "Federalism divides power."
            },
            {
                "q": "8th grade social studies: What is checks and balances?",
                "choices": [
                    "branches can limit each other",
                    "citizens check bank accounts",
                    "states balance maps",
                    "courts write every law"
                ],
                "answer": "branches can limit each other",
                "explain": "Checks and balances prevent too much power."
            },
            {
                "q": "8th grade social studies: What is a secondary source?",
                "choices": [
                    "an interpretation created after an event",
                    "a diary from the event",
                    "an original photo",
                    "a speech during the event"
                ],
                "answer": "an interpretation created after an event",
                "explain": "Secondary sources analyze later."
            },
            {
                "q": "8th grade social studies: Why notice bias in a source?",
                "choices": [
                    "it can affect presentation",
                    "it proves everything false",
                    "it makes maps bigger",
                    "it removes all facts"
                ],
                "answer": "it can affect presentation",
                "explain": "Bias shapes viewpoint."
            },
            {
                "q": "8th grade social studies: What is supply and demand?",
                "choices": [
                    "a concept that helps explain prices",
                    "a weather system",
                    "a voting rule",
                    "a map scale"
                ],
                "answer": "a concept that helps explain prices",
                "explain": "Supply and demand affect prices."
            },
            {
                "q": "8th grade social studies: What is the Bill of Rights?",
                "choices": [
                    "the first ten amendments protecting freedoms",
                    "a lunch menu",
                    "a map key",
                    "a tax form"
                ],
                "answer": "the first ten amendments protecting freedoms",
                "explain": "It protects important rights."
            },
            {
                "q": "8th grade social studies: What is migration?",
                "choices": [
                    "movement of people from one place to another",
                    "a court decision",
                    "a law book",
                    "a mountain range"
                ],
                "answer": "movement of people from one place to another",
                "explain": "Migration means people move."
            },
            {
                "q": "8th grade social studies: What is rule of law?",
                "choices": [
                    "everyone, including leaders, must follow law",
                    "leaders can do anything",
                    "laws apply only to students",
                    "courts are optional"
                ],
                "answer": "everyone, including leaders, must follow law",
                "explain": "Rule of law means law applies to all."
            },
            {
                "q": "8th grade social studies: What is civic participation?",
                "choices": [
                    "taking part in community or government life",
                    "avoiding all rules",
                    "only watching sports",
                    "memorizing a map"
                ],
                "answer": "taking part in community or government life",
                "explain": "Voting and volunteering are examples."
            }
        ],
        "vocab": [
            {
                "q": "8th grade vocabulary: Analyze means...",
                "choices": [
                    "break down and examine",
                    "guess randomly",
                    "copy exactly",
                    "make louder"
                ],
                "answer": "break down and examine",
                "explain": "Analyze means examine parts."
            },
            {
                "q": "8th grade vocabulary: The root 'bio' means...",
                "choices": [
                    "life",
                    "water",
                    "sound",
                    "earth"
                ],
                "answer": "life",
                "explain": "Bio means life."
            },
            {
                "q": "8th grade vocabulary: Significant means...",
                "choices": [
                    "important",
                    "tiny",
                    "silent",
                    "ordinary"
                ],
                "answer": "important",
                "explain": "Significant means important."
            },
            {
                "q": "8th grade vocabulary: Contrast means...",
                "choices": [
                    "show differences",
                    "show only similarities",
                    "hide evidence",
                    "repeat the title"
                ],
                "answer": "show differences",
                "explain": "Contrast means show differences."
            },
            {
                "q": "8th grade vocabulary: Reliable means...",
                "choices": [
                    "trustworthy",
                    "colorful",
                    "late",
                    "confusing"
                ],
                "answer": "trustworthy",
                "explain": "Reliable means trusted."
            },
            {
                "q": "8th grade vocabulary: Prefix 'inter-' means...",
                "choices": [
                    "between or among",
                    "before",
                    "not",
                    "again"
                ],
                "answer": "between or among",
                "explain": "Inter- means between or among."
            },
            {
                "q": "8th grade vocabulary: Antonym of expand?",
                "choices": [
                    "shrink",
                    "grow",
                    "increase",
                    "spread"
                ],
                "answer": "shrink",
                "explain": "Shrink is opposite of expand."
            },
            {
                "q": "8th grade vocabulary: Interpret means...",
                "choices": [
                    "explain the meaning",
                    "erase something",
                    "measure weight",
                    "choose randomly"
                ],
                "answer": "explain the meaning",
                "explain": "Interpret means explain."
            },
            {
                "q": "8th grade vocabulary: Objective means...",
                "choices": [
                    "fair and not taking sides",
                    "angry",
                    "careless",
                    "ancient"
                ],
                "answer": "fair and not taking sides",
                "explain": "Objective means fact-based and fair."
            },
            {
                "q": "8th grade vocabulary: Relevant means...",
                "choices": [
                    "connected to the topic",
                    "random",
                    "ancient",
                    "hidden"
                ],
                "answer": "connected to the topic",
                "explain": "Relevant means related."
            }
        ],
        "study": [
            {
                "q": "8th grade study skills: What is a SMART goal?",
                "choices": [
                    "specific, measurable, achievable, relevant, time-bound",
                    "simple, messy, angry, random, tiny",
                    "silent, major, artistic, rapid, temporary",
                    "school, math, art, reading, typing"
                ],
                "answer": "specific, measurable, achievable, relevant, time-bound",
                "explain": "SMART goals are clear and trackable."
            },
            {
                "q": "8th grade study skills: What is an error log?",
                "choices": [
                    "a list of mistakes and how to fix them",
                    "only perfect scores",
                    "a leaderboard",
                    "a snack list"
                ],
                "answer": "a list of mistakes and how to fix them",
                "explain": "Error logs help identify patterns."
            },
            {
                "q": "8th grade study skills: Prioritize means...",
                "choices": [
                    "choose what matters most first",
                    "do everything randomly",
                    "avoid hard tasks",
                    "only do shortest assignment"
                ],
                "answer": "choose what matters most first",
                "explain": "Prioritizing manages time."
            },
            {
                "q": "8th grade study skills: Which study plan is strongest?",
                "choices": [
                    "review notes, practice, then check mistakes",
                    "read once and hope",
                    "wait until deadline",
                    "study only easy parts"
                ],
                "answer": "review notes, practice, then check mistakes",
                "explain": "Practice plus feedback builds skill."
            },
            {
                "q": "8th grade study skills: Why use headings in notes?",
                "choices": [
                    "organize information by topic",
                    "make notes harder",
                    "replace studying",
                    "hide ideas"
                ],
                "answer": "organize information by topic",
                "explain": "Headings organize notes."
            },
            {
                "q": "8th grade study skills: What is active reading?",
                "choices": [
                    "asking questions and thinking while reading",
                    "staring at words only",
                    "reading with loud music",
                    "skipping confusing parts"
                ],
                "answer": "asking questions and thinking while reading",
                "explain": "Active reading means thinking."
            },
            {
                "q": "8th grade study skills: What is metacognition?",
                "choices": [
                    "thinking about your own thinking and learning",
                    "memorizing without understanding",
                    "drawing pictures only",
                    "reading faster"
                ],
                "answer": "thinking about your own thinking and learning",
                "explain": "Metacognition helps improve learning."
            },
            {
                "q": "8th grade study skills: What is self-assessment?",
                "choices": [
                    "checking your work against goals or criteria",
                    "giving any grade you want",
                    "never asking feedback",
                    "reading title only"
                ],
                "answer": "checking your work against goals or criteria",
                "explain": "Self-assessment checks progress."
            },
            {
                "q": "8th grade study skills: Why explain an idea to someone else?",
                "choices": [
                    "it reveals what you understand and what is fuzzy",
                    "it always wastes time",
                    "it replaces all practice",
                    "it makes notes useless"
                ],
                "answer": "it reveals what you understand and what is fuzzy",
                "explain": "Teaching checks understanding."
            },
            {
                "q": "8th grade study skills: What is interleaving?",
                "choices": [
                    "mixing related types of practice",
                    "studying one easy problem forever",
                    "never reviewing",
                    "copying notes in color only"
                ],
                "answer": "mixing related types of practice",
                "explain": "Interleaving helps choose strategies."
            }
        ]
    },
    "9": {
        "math": [
            {
                "q": "9th grade math: Factor x² + 5x + 6.",
                "choices": [
                    "(x+2)(x+3)",
                    "(x+1)(x+6)",
                    "(x-2)(x-3)",
                    "x(x+6)"
                ],
                "answer": "(x+2)(x+3)",
                "explain": "2 and 3 multiply to 6 and add to 5."
            },
            {
                "q": "9th grade math: Solve 4x - 7 = 21.",
                "choices": [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                "answer": "7",
                "explain": "Add 7, then divide by 4."
            },
            {
                "q": "9th grade math: What is the slope of y = -3x + 8?",
                "choices": [
                    "-3",
                    "3",
                    "8",
                    "-8"
                ],
                "answer": "-3",
                "explain": "In y = mx + b, m is slope."
            },
            {
                "q": "9th grade math: Which is a linear function?",
                "choices": [
                    "y = 2x + 1",
                    "y = x²",
                    "y = 1/x",
                    "y = 2ˣ"
                ],
                "answer": "y = 2x + 1",
                "explain": "Linear functions have constant rate of change."
            },
            {
                "q": "9th grade math: Simplify (x³)(x⁴).",
                "choices": [
                    "x⁷",
                    "x¹²",
                    "2x⁷",
                    "x"
                ],
                "answer": "x⁷",
                "explain": "Add exponents with the same base."
            },
            {
                "q": "9th grade math: What is the vertex form of a quadratic?",
                "choices": [
                    "y=a(x-h)²+k",
                    "y=mx+b",
                    "a²+b²=c²",
                    "y=kx"
                ],
                "answer": "y=a(x-h)²+k",
                "explain": "Vertex form shows the vertex (h,k)."
            },
            {
                "q": "9th grade math: Solve: 2(x - 3) = 10.",
                "choices": [
                    "2",
                    "5",
                    "8",
                    "13"
                ],
                "answer": "8",
                "explain": "Divide by 2, then add 3."
            },
            {
                "q": "9th grade math: What is 15% of 240?",
                "choices": [
                    "24",
                    "30",
                    "36",
                    "48"
                ],
                "answer": "36",
                "explain": "10% is 24 and 5% is 12."
            },
            {
                "q": "9th grade math: Which pair is a solution to y = 2x - 1?",
                "choices": [
                    "(2,3)",
                    "(2,5)",
                    "(3,4)",
                    "(0,1)"
                ],
                "answer": "(2,3)",
                "explain": "2(2)-1=3."
            },
            {
                "q": "9th grade math: What is the domain of y = √x in basic real numbers?",
                "choices": [
                    "x ≥ 0",
                    "x < 0",
                    "all x except 0",
                    "all real numbers"
                ],
                "answer": "x ≥ 0",
                "explain": "Square roots need nonnegative inputs."
            }
        ],
        "reading": [
            {
                "q": "9th grade reading: What is rhetorical analysis?",
                "choices": [
                    "examining how a writer persuades an audience",
                    "counting pages only",
                    "summarizing without evidence",
                    "finding all nouns"
                ],
                "answer": "examining how a writer persuades an audience",
                "explain": "Rhetorical analysis studies persuasive choices."
            },
            {
                "q": "9th grade reading: Ethos appeals to...",
                "choices": [
                    "credibility",
                    "emotion only",
                    "logic only",
                    "font size"
                ],
                "answer": "credibility",
                "explain": "Ethos is about trust and authority."
            },
            {
                "q": "9th grade reading: Pathos appeals to...",
                "choices": [
                    "emotion",
                    "data only",
                    "grammar",
                    "chapter length"
                ],
                "answer": "emotion",
                "explain": "Pathos uses feelings."
            },
            {
                "q": "9th grade reading: Logos appeals to...",
                "choices": [
                    "logic and evidence",
                    "only feelings",
                    "speaker reputation only",
                    "cover design"
                ],
                "answer": "logic and evidence",
                "explain": "Logos uses reasoning."
            },
            {
                "q": "9th grade reading: What is synthesis?",
                "choices": [
                    "combining ideas from multiple sources",
                    "copying one source",
                    "ignoring sources",
                    "making a title"
                ],
                "answer": "combining ideas from multiple sources",
                "explain": "Synthesis connects multiple sources."
            },
            {
                "q": "9th grade reading: What is a nuanced claim?",
                "choices": [
                    "a claim that recognizes complexity",
                    "a simple yes/no only",
                    "a claim with no evidence",
                    "a copied sentence"
                ],
                "answer": "a claim that recognizes complexity",
                "explain": "Nuance shows complex thinking."
            },
            {
                "q": "9th grade reading: What should source evaluation consider?",
                "choices": [
                    "credibility, relevance, and bias",
                    "font color only",
                    "how short it is",
                    "whether you like it"
                ],
                "answer": "credibility, relevance, and bias",
                "explain": "Good source evaluation checks trust and fit."
            },
            {
                "q": "9th grade reading: What is subtext?",
                "choices": [
                    "meaning suggested beneath the literal words",
                    "the title page",
                    "a grammar error",
                    "the glossary"
                ],
                "answer": "meaning suggested beneath the literal words",
                "explain": "Subtext is implied meaning."
            },
            {
                "q": "9th grade reading: What is a motif?",
                "choices": [
                    "a repeated idea or image",
                    "a one-time typo",
                    "the author bio",
                    "a citation format"
                ],
                "answer": "a repeated idea or image",
                "explain": "Motifs repeat and support themes."
            },
            {
                "q": "9th grade reading: What does it mean to trace an argument?",
                "choices": [
                    "follow how claims and evidence develop",
                    "skip to the end",
                    "count letters",
                    "change the author's view"
                ],
                "answer": "follow how claims and evidence develop",
                "explain": "Tracing follows the structure of reasoning."
            }
        ],
        "writing": [
            {
                "q": "9th grade writing: What is a nuanced thesis?",
                "choices": [
                    "a claim that recognizes complexity",
                    "a claim with no evidence",
                    "a title only",
                    "a copied quote"
                ],
                "answer": "a claim that recognizes complexity",
                "explain": "Nuance shows complex thinking."
            },
            {
                "q": "9th grade writing: What is synthesis writing?",
                "choices": [
                    "combining ideas from multiple sources",
                    "copying one source only",
                    "ignoring sources",
                    "writing a list"
                ],
                "answer": "combining ideas from multiple sources",
                "explain": "Synthesis connects sources."
            },
            {
                "q": "9th grade writing: What does commentary do after evidence?",
                "choices": [
                    "explains why the evidence matters",
                    "adds random facts",
                    "repeats the quote only",
                    "changes the topic"
                ],
                "answer": "explains why the evidence matters",
                "explain": "Commentary connects evidence to the claim."
            },
            {
                "q": "9th grade writing: Which is the best academic tone?",
                "choices": [
                    "clear, precise, and respectful",
                    "angry and vague",
                    "slang-heavy only",
                    "all emojis"
                ],
                "answer": "clear, precise, and respectful",
                "explain": "Academic tone should be clear and respectful."
            },
            {
                "q": "9th grade writing: What is a line of reasoning?",
                "choices": [
                    "the logical path connecting claim, evidence, and explanation",
                    "a decorative line",
                    "a random opinion",
                    "a sentence fragment"
                ],
                "answer": "the logical path connecting claim, evidence, and explanation",
                "explain": "Line of reasoning shows how the argument works."
            },
            {
                "q": "9th grade writing: What is an effective concession?",
                "choices": [
                    "acknowledging a fair opposing point",
                    "giving up the whole argument",
                    "mocking the opponent",
                    "removing your thesis"
                ],
                "answer": "acknowledging a fair opposing point",
                "explain": "Concession shows fairness."
            },
            {
                "q": "9th grade writing: What does source integration mean?",
                "choices": [
                    "smoothly using evidence from sources",
                    "dropping quotes with no explanation",
                    "listing URLs only",
                    "avoiding evidence"
                ],
                "answer": "smoothly using evidence from sources",
                "explain": "Sources should be introduced and explained."
            },
            {
                "q": "9th grade writing: What is a revision priority?",
                "choices": [
                    "fixing weak reasoning before small wording issues",
                    "only changing font",
                    "ignoring structure",
                    "deleting the conclusion"
                ],
                "answer": "fixing weak reasoning before small wording issues",
                "explain": "Big ideas and organization matter first."
            },
            {
                "q": "9th grade writing: What is a rhetorical choice?",
                "choices": [
                    "a writing move used to affect the audience",
                    "a typo",
                    "a citation only",
                    "a grammar worksheet"
                ],
                "answer": "a writing move used to affect the audience",
                "explain": "Rhetorical choices shape meaning and persuasion."
            },
            {
                "q": "9th grade writing: What is concision?",
                "choices": [
                    "using the fewest words needed clearly",
                    "making sentences confusing",
                    "adding filler",
                    "writing without evidence"
                ],
                "answer": "using the fewest words needed clearly",
                "explain": "Concision removes unnecessary words."
            }
        ],
        "science": [
            {
                "q": "9th grade science: What does Newton's second law state?",
                "choices": [
                    "F = ma",
                    "E = mc only",
                    "density = volume/mass",
                    "pH = mass"
                ],
                "answer": "F = ma",
                "explain": "Force equals mass times acceleration."
            },
            {
                "q": "9th grade science: What is conservation of energy?",
                "choices": [
                    "energy changes form but total energy is conserved",
                    "energy always disappears",
                    "energy only exists in batteries",
                    "energy cannot move"
                ],
                "answer": "energy changes form but total energy is conserved",
                "explain": "Energy is conserved in closed systems."
            },
            {
                "q": "9th grade science: What is natural selection?",
                "choices": [
                    "helpful traits become more common through survival and reproduction",
                    "animals choose favorite traits",
                    "weather creates all traits instantly",
                    "rocks change animals"
                ],
                "answer": "helpful traits become more common through survival and reproduction",
                "explain": "Selection changes populations over time."
            },
            {
                "q": "9th grade science: What is homeostasis?",
                "choices": [
                    "maintaining stable internal conditions",
                    "changing species names",
                    "speeding up all reactions",
                    "erasing data"
                ],
                "answer": "maintaining stable internal conditions",
                "explain": "Organisms regulate internal conditions."
            },
            {
                "q": "9th grade science: What does pH measure?",
                "choices": [
                    "acidity or basicity",
                    "speed",
                    "mass",
                    "volume only"
                ],
                "answer": "acidity or basicity",
                "explain": "pH describes acid/base level."
            },
            {
                "q": "9th grade science: What is a covalent bond?",
                "choices": [
                    "atoms share electrons",
                    "atoms lose all protons",
                    "rocks stick together",
                    "cells divide"
                ],
                "answer": "atoms share electrons",
                "explain": "Covalent bonds share electrons."
            },
            {
                "q": "9th grade science: What is the role of DNA?",
                "choices": [
                    "stores genetic information",
                    "makes weather",
                    "measures force",
                    "forms all minerals"
                ],
                "answer": "stores genetic information",
                "explain": "DNA carries instructions."
            },
            {
                "q": "9th grade science: What is acceleration?",
                "choices": [
                    "change in velocity over time",
                    "mass divided by volume",
                    "stored energy only",
                    "distance only"
                ],
                "answer": "change in velocity over time",
                "explain": "Acceleration is velocity change per time."
            },
            {
                "q": "9th grade science: What is scientific peer review?",
                "choices": [
                    "experts evaluate research before publication",
                    "friends vote for favorite answer",
                    "students copy notes",
                    "data is hidden"
                ],
                "answer": "experts evaluate research before publication",
                "explain": "Peer review checks quality."
            },
            {
                "q": "9th grade science: What is a limitation of a model?",
                "choices": [
                    "it may simplify reality",
                    "it is always perfect",
                    "it replaces evidence",
                    "it never needs testing"
                ],
                "answer": "it may simplify reality",
                "explain": "Models are useful but not perfect."
            }
        ],
        "social": [
            {
                "q": "9th grade social studies: What is separation of powers?",
                "choices": [
                    "dividing government power among branches",
                    "ending all laws",
                    "making one ruler supreme",
                    "removing courts"
                ],
                "answer": "dividing government power among branches",
                "explain": "Power is divided to limit abuse."
            },
            {
                "q": "9th grade social studies: What is judicial review?",
                "choices": [
                    "court power to review laws or actions for constitutionality",
                    "counting votes only",
                    "writing taxes",
                    "making maps"
                ],
                "answer": "court power to review laws or actions for constitutionality",
                "explain": "Courts can review constitutionality."
            },
            {
                "q": "9th grade social studies: What is opportunity cost?",
                "choices": [
                    "the next-best option given up",
                    "free money",
                    "a map symbol",
                    "a type of election"
                ],
                "answer": "the next-best option given up",
                "explain": "Choices have tradeoffs."
            },
            {
                "q": "9th grade social studies: What is inflation?",
                "choices": [
                    "a general rise in prices over time",
                    "a river flooding",
                    "a new amendment",
                    "a larger map"
                ],
                "answer": "a general rise in prices over time",
                "explain": "Inflation means prices rise."
            },
            {
                "q": "9th grade social studies: What is globalization?",
                "choices": [
                    "growing connections among countries",
                    "a local classroom rule",
                    "only one country trading",
                    "ending communication"
                ],
                "answer": "growing connections among countries",
                "explain": "Globalization connects economies and cultures."
            },
            {
                "q": "9th grade social studies: What is a landmark court case?",
                "choices": [
                    "a case with important lasting impact",
                    "a case about buildings only",
                    "a short court note",
                    "a club election"
                ],
                "answer": "a case with important lasting impact",
                "explain": "Landmark cases shape law."
            },
            {
                "q": "9th grade social studies: What is civil disobedience?",
                "choices": [
                    "peacefully breaking a law to protest injustice",
                    "ignoring all rules for fun",
                    "voting twice",
                    "avoiding community issues"
                ],
                "answer": "peacefully breaking a law to protest injustice",
                "explain": "Civil disobedience is protest against unjust laws."
            },
            {
                "q": "9th grade social studies: Why corroborate sources?",
                "choices": [
                    "to check whether sources support the same facts",
                    "to use only one source",
                    "to delete evidence",
                    "to pick the prettiest page"
                ],
                "answer": "to check whether sources support the same facts",
                "explain": "Corroboration checks agreement."
            },
            {
                "q": "9th grade social studies: What is sovereignty?",
                "choices": [
                    "a government's authority to govern itself",
                    "a weather pattern",
                    "a type of tax only",
                    "a court building"
                ],
                "answer": "a government's authority to govern itself",
                "explain": "Sovereignty is governing authority."
            },
            {
                "q": "9th grade social studies: What is human-environment interaction?",
                "choices": [
                    "how people and places affect each other",
                    "only mountain names",
                    "only city borders",
                    "a spelling rule"
                ],
                "answer": "how people and places affect each other",
                "explain": "People shape environments and environments shape people."
            }
        ],
        "vocab": [
            {
                "q": "9th grade vocabulary: Evaluate means...",
                "choices": [
                    "judge value or quality",
                    "copy without thinking",
                    "make louder",
                    "draw only"
                ],
                "answer": "judge value or quality",
                "explain": "Evaluate means judge quality."
            },
            {
                "q": "9th grade vocabulary: Coherent means...",
                "choices": [
                    "clear and connected",
                    "messy and random",
                    "very old",
                    "extremely loud"
                ],
                "answer": "clear and connected",
                "explain": "Coherent ideas connect."
            },
            {
                "q": "9th grade vocabulary: Root 'cred' means...",
                "choices": [
                    "believe",
                    "water",
                    "write",
                    "move"
                ],
                "answer": "believe",
                "explain": "Cred relates to trust or belief."
            },
            {
                "q": "9th grade vocabulary: Synthesize means...",
                "choices": [
                    "combine parts into a whole",
                    "isolate",
                    "erase",
                    "delay"
                ],
                "answer": "combine parts into a whole",
                "explain": "Synthesize means combine ideas."
            },
            {
                "q": "9th grade vocabulary: Implicit means...",
                "choices": [
                    "suggested but not directly stated",
                    "written word for word",
                    "impossible",
                    "unrelated"
                ],
                "answer": "suggested but not directly stated",
                "explain": "Implicit means implied."
            },
            {
                "q": "9th grade vocabulary: Justify means...",
                "choices": [
                    "give reasons for",
                    "make smaller",
                    "repeat quietly",
                    "hide evidence"
                ],
                "answer": "give reasons for",
                "explain": "Justify means support."
            },
            {
                "q": "9th grade vocabulary: Assumption means...",
                "choices": [
                    "something accepted as true without full proof",
                    "a final grade",
                    "a direct quote",
                    "a map"
                ],
                "answer": "something accepted as true without full proof",
                "explain": "Assumptions need checking."
            },
            {
                "q": "9th grade vocabulary: Ambiguous means...",
                "choices": [
                    "having more than one possible meaning",
                    "very simple",
                    "completely proven",
                    "made of metal"
                ],
                "answer": "having more than one possible meaning",
                "explain": "Ambiguous means unclear in more than one way."
            },
            {
                "q": "9th grade vocabulary: Derive means...",
                "choices": [
                    "get or develop from a source",
                    "throw away",
                    "decorate",
                    "guess blindly"
                ],
                "answer": "get or develop from a source",
                "explain": "Derive means obtain from something."
            },
            {
                "q": "9th grade vocabulary: Nuance means...",
                "choices": [
                    "a subtle difference or complexity",
                    "a spelling error",
                    "a simple yes/no",
                    "a title"
                ],
                "answer": "a subtle difference or complexity",
                "explain": "Nuance adds complexity."
            }
        ],
        "study": [
            {
                "q": "9th grade study skills: What is deliberate practice?",
                "choices": [
                    "focused practice on specific weaknesses with feedback",
                    "doing easy work only",
                    "studying randomly",
                    "reviewing once"
                ],
                "answer": "focused practice on specific weaknesses with feedback",
                "explain": "Deliberate practice targets improvement."
            },
            {
                "q": "9th grade study skills: What is transfer of learning?",
                "choices": [
                    "using a skill in a new situation",
                    "moving a notebook",
                    "copying answers",
                    "forgetting after a test"
                ],
                "answer": "using a skill in a new situation",
                "explain": "Transfer applies learning elsewhere."
            },
            {
                "q": "9th grade study skills: What is cognitive load?",
                "choices": [
                    "mental effort used by a task",
                    "backpack weight only",
                    "a grade",
                    "a graph type"
                ],
                "answer": "mental effort used by a task",
                "explain": "Cognitive load is mental demand."
            },
            {
                "q": "9th grade study skills: What is a rubric used for?",
                "choices": [
                    "understanding expectations and grading criteria",
                    "decorating work",
                    "hiding mistakes",
                    "replacing evidence"
                ],
                "answer": "understanding expectations and grading criteria",
                "explain": "Rubrics show criteria."
            },
            {
                "q": "9th grade study skills: Why create a study schedule?",
                "choices": [
                    "to plan time and reduce last-minute stress",
                    "to avoid work",
                    "to make tasks disappear",
                    "to memorize dates only"
                ],
                "answer": "to plan time and reduce last-minute stress",
                "explain": "Schedules manage time."
            },
            {
                "q": "9th grade study skills: What is spaced retrieval?",
                "choices": [
                    "reviewing by recalling information over time",
                    "rereading once only",
                    "copying notes nonstop",
                    "highlighting everything"
                ],
                "answer": "reviewing by recalling information over time",
                "explain": "Spacing plus retrieval improves memory."
            },
            {
                "q": "9th grade study skills: What is a feedback loop?",
                "choices": [
                    "practice, feedback, adjustment, more practice",
                    "guess, ignore, repeat",
                    "copy, submit, forget",
                    "read, close, stop"
                ],
                "answer": "practice, feedback, adjustment, more practice",
                "explain": "Feedback loops improve performance."
            },
            {
                "q": "9th grade study skills: What should you do with a weak essay draft?",
                "choices": [
                    "revise claim, evidence, and reasoning first",
                    "only change font",
                    "delete all paragraphs",
                    "avoid feedback"
                ],
                "answer": "revise claim, evidence, and reasoning first",
                "explain": "Big ideas matter before small edits."
            },
            {
                "q": "9th grade study skills: What is time blocking?",
                "choices": [
                    "assigning specific time blocks to tasks",
                    "doing everything at once",
                    "waiting for motivation",
                    "never taking breaks"
                ],
                "answer": "assigning specific time blocks to tasks",
                "explain": "Time blocking protects focus."
            },
            {
                "q": "9th grade study skills: What is reflection in learning?",
                "choices": [
                    "thinking about what worked and what to improve",
                    "complaining only",
                    "forgetting feedback",
                    "counting pages"
                ],
                "answer": "thinking about what worked and what to improve",
                "explain": "Reflection guides next steps."
            }
        ]
    },
    "10": {
        "math": [
            {
                "q": "10th grade math: Use quadratic formula for x² - 5x + 6 = 0. Roots are...",
                "choices": [
                    "2 and 3",
                    "-2 and -3",
                    "1 and 6",
                    "0 and 6"
                ],
                "answer": "2 and 3",
                "explain": "It factors as (x-2)(x-3)."
            },
            {
                "q": "10th grade math: sin(30°) equals...",
                "choices": [
                    "1/2",
                    "√2/2",
                    "√3/2",
                    "1"
                ],
                "answer": "1/2",
                "explain": "sin 30° = 1/2."
            },
            {
                "q": "10th grade math: What is the distance between (0,0) and (3,4)?",
                "choices": [
                    "3",
                    "4",
                    "5",
                    "7"
                ],
                "answer": "5",
                "explain": "Use distance formula: sqrt(3²+4²)=5."
            },
            {
                "q": "10th grade math: If f(x)=2x², what is f(3)?",
                "choices": [
                    "6",
                    "12",
                    "18",
                    "36"
                ],
                "answer": "18",
                "explain": "2 × 3² = 18."
            },
            {
                "q": "10th grade math: Which expression is equivalent to √50?",
                "choices": [
                    "5√2",
                    "10√5",
                    "25√2",
                    "2√5"
                ],
                "answer": "5√2",
                "explain": "√50 = √25×2 = 5√2."
            },
            {
                "q": "10th grade math: What is the midpoint of (2,4) and (6,8)?",
                "choices": [
                    "(3,6)",
                    "(4,6)",
                    "(8,12)",
                    "(2,8)"
                ],
                "answer": "(4,6)",
                "explain": "Average the x-values and y-values."
            },
            {
                "q": "10th grade math: What is cos(60°)?",
                "choices": [
                    "1/2",
                    "√2/2",
                    "√3/2",
                    "1"
                ],
                "answer": "1/2",
                "explain": "cos 60° = 1/2."
            },
            {
                "q": "10th grade math: A line perpendicular to slope 2 has slope...",
                "choices": [
                    "2",
                    "-2",
                    "1/2",
                    "-1/2"
                ],
                "answer": "-1/2",
                "explain": "Perpendicular slopes are negative reciprocals."
            },
            {
                "q": "10th grade math: Which is exponential growth?",
                "choices": [
                    "y=3(2)^x",
                    "y=2x+3",
                    "y=x²",
                    "y=7"
                ],
                "answer": "y=3(2)^x",
                "explain": "The variable is in the exponent."
            },
            {
                "q": "10th grade math: What is log₁₀(100)?",
                "choices": [
                    "1",
                    "2",
                    "10",
                    "100"
                ],
                "answer": "2",
                "explain": "10² = 100."
            }
        ],
        "reading": [
            {
                "q": "10th grade reading: What is rhetorical analysis?",
                "choices": [
                    "examining how a writer persuades an audience",
                    "counting pages only",
                    "summarizing without evidence",
                    "finding all nouns"
                ],
                "answer": "examining how a writer persuades an audience",
                "explain": "Rhetorical analysis studies persuasive choices."
            },
            {
                "q": "10th grade reading: Ethos appeals to...",
                "choices": [
                    "credibility",
                    "emotion only",
                    "logic only",
                    "font size"
                ],
                "answer": "credibility",
                "explain": "Ethos is about trust and authority."
            },
            {
                "q": "10th grade reading: Pathos appeals to...",
                "choices": [
                    "emotion",
                    "data only",
                    "grammar",
                    "chapter length"
                ],
                "answer": "emotion",
                "explain": "Pathos uses feelings."
            },
            {
                "q": "10th grade reading: Logos appeals to...",
                "choices": [
                    "logic and evidence",
                    "only feelings",
                    "speaker reputation only",
                    "cover design"
                ],
                "answer": "logic and evidence",
                "explain": "Logos uses reasoning."
            },
            {
                "q": "10th grade reading: What is synthesis?",
                "choices": [
                    "combining ideas from multiple sources",
                    "copying one source",
                    "ignoring sources",
                    "making a title"
                ],
                "answer": "combining ideas from multiple sources",
                "explain": "Synthesis connects multiple sources."
            },
            {
                "q": "10th grade reading: What is a nuanced claim?",
                "choices": [
                    "a claim that recognizes complexity",
                    "a simple yes/no only",
                    "a claim with no evidence",
                    "a copied sentence"
                ],
                "answer": "a claim that recognizes complexity",
                "explain": "Nuance shows complex thinking."
            },
            {
                "q": "10th grade reading: What should source evaluation consider?",
                "choices": [
                    "credibility, relevance, and bias",
                    "font color only",
                    "how short it is",
                    "whether you like it"
                ],
                "answer": "credibility, relevance, and bias",
                "explain": "Good source evaluation checks trust and fit."
            },
            {
                "q": "10th grade reading: What is subtext?",
                "choices": [
                    "meaning suggested beneath the literal words",
                    "the title page",
                    "a grammar error",
                    "the glossary"
                ],
                "answer": "meaning suggested beneath the literal words",
                "explain": "Subtext is implied meaning."
            },
            {
                "q": "10th grade reading: What is a motif?",
                "choices": [
                    "a repeated idea or image",
                    "a one-time typo",
                    "the author bio",
                    "a citation format"
                ],
                "answer": "a repeated idea or image",
                "explain": "Motifs repeat and support themes."
            },
            {
                "q": "10th grade reading: What does it mean to trace an argument?",
                "choices": [
                    "follow how claims and evidence develop",
                    "skip to the end",
                    "count letters",
                    "change the author's view"
                ],
                "answer": "follow how claims and evidence develop",
                "explain": "Tracing follows the structure of reasoning."
            }
        ],
        "writing": [
            {
                "q": "10th grade writing: What is a nuanced thesis?",
                "choices": [
                    "a claim that recognizes complexity",
                    "a claim with no evidence",
                    "a title only",
                    "a copied quote"
                ],
                "answer": "a claim that recognizes complexity",
                "explain": "Nuance shows complex thinking."
            },
            {
                "q": "10th grade writing: What is synthesis writing?",
                "choices": [
                    "combining ideas from multiple sources",
                    "copying one source only",
                    "ignoring sources",
                    "writing a list"
                ],
                "answer": "combining ideas from multiple sources",
                "explain": "Synthesis connects sources."
            },
            {
                "q": "10th grade writing: What does commentary do after evidence?",
                "choices": [
                    "explains why the evidence matters",
                    "adds random facts",
                    "repeats the quote only",
                    "changes the topic"
                ],
                "answer": "explains why the evidence matters",
                "explain": "Commentary connects evidence to the claim."
            },
            {
                "q": "10th grade writing: Which is the best academic tone?",
                "choices": [
                    "clear, precise, and respectful",
                    "angry and vague",
                    "slang-heavy only",
                    "all emojis"
                ],
                "answer": "clear, precise, and respectful",
                "explain": "Academic tone should be clear and respectful."
            },
            {
                "q": "10th grade writing: What is a line of reasoning?",
                "choices": [
                    "the logical path connecting claim, evidence, and explanation",
                    "a decorative line",
                    "a random opinion",
                    "a sentence fragment"
                ],
                "answer": "the logical path connecting claim, evidence, and explanation",
                "explain": "Line of reasoning shows how the argument works."
            },
            {
                "q": "10th grade writing: What is an effective concession?",
                "choices": [
                    "acknowledging a fair opposing point",
                    "giving up the whole argument",
                    "mocking the opponent",
                    "removing your thesis"
                ],
                "answer": "acknowledging a fair opposing point",
                "explain": "Concession shows fairness."
            },
            {
                "q": "10th grade writing: What does source integration mean?",
                "choices": [
                    "smoothly using evidence from sources",
                    "dropping quotes with no explanation",
                    "listing URLs only",
                    "avoiding evidence"
                ],
                "answer": "smoothly using evidence from sources",
                "explain": "Sources should be introduced and explained."
            },
            {
                "q": "10th grade writing: What is a revision priority?",
                "choices": [
                    "fixing weak reasoning before small wording issues",
                    "only changing font",
                    "ignoring structure",
                    "deleting the conclusion"
                ],
                "answer": "fixing weak reasoning before small wording issues",
                "explain": "Big ideas and organization matter first."
            },
            {
                "q": "10th grade writing: What is a rhetorical choice?",
                "choices": [
                    "a writing move used to affect the audience",
                    "a typo",
                    "a citation only",
                    "a grammar worksheet"
                ],
                "answer": "a writing move used to affect the audience",
                "explain": "Rhetorical choices shape meaning and persuasion."
            },
            {
                "q": "10th grade writing: What is concision?",
                "choices": [
                    "using the fewest words needed clearly",
                    "making sentences confusing",
                    "adding filler",
                    "writing without evidence"
                ],
                "answer": "using the fewest words needed clearly",
                "explain": "Concision removes unnecessary words."
            }
        ],
        "science": [
            {
                "q": "10th grade science: What does Newton's second law state?",
                "choices": [
                    "F = ma",
                    "E = mc only",
                    "density = volume/mass",
                    "pH = mass"
                ],
                "answer": "F = ma",
                "explain": "Force equals mass times acceleration."
            },
            {
                "q": "10th grade science: What is conservation of energy?",
                "choices": [
                    "energy changes form but total energy is conserved",
                    "energy always disappears",
                    "energy only exists in batteries",
                    "energy cannot move"
                ],
                "answer": "energy changes form but total energy is conserved",
                "explain": "Energy is conserved in closed systems."
            },
            {
                "q": "10th grade science: What is natural selection?",
                "choices": [
                    "helpful traits become more common through survival and reproduction",
                    "animals choose favorite traits",
                    "weather creates all traits instantly",
                    "rocks change animals"
                ],
                "answer": "helpful traits become more common through survival and reproduction",
                "explain": "Selection changes populations over time."
            },
            {
                "q": "10th grade science: What is homeostasis?",
                "choices": [
                    "maintaining stable internal conditions",
                    "changing species names",
                    "speeding up all reactions",
                    "erasing data"
                ],
                "answer": "maintaining stable internal conditions",
                "explain": "Organisms regulate internal conditions."
            },
            {
                "q": "10th grade science: What does pH measure?",
                "choices": [
                    "acidity or basicity",
                    "speed",
                    "mass",
                    "volume only"
                ],
                "answer": "acidity or basicity",
                "explain": "pH describes acid/base level."
            },
            {
                "q": "10th grade science: What is a covalent bond?",
                "choices": [
                    "atoms share electrons",
                    "atoms lose all protons",
                    "rocks stick together",
                    "cells divide"
                ],
                "answer": "atoms share electrons",
                "explain": "Covalent bonds share electrons."
            },
            {
                "q": "10th grade science: What is the role of DNA?",
                "choices": [
                    "stores genetic information",
                    "makes weather",
                    "measures force",
                    "forms all minerals"
                ],
                "answer": "stores genetic information",
                "explain": "DNA carries instructions."
            },
            {
                "q": "10th grade science: What is acceleration?",
                "choices": [
                    "change in velocity over time",
                    "mass divided by volume",
                    "stored energy only",
                    "distance only"
                ],
                "answer": "change in velocity over time",
                "explain": "Acceleration is velocity change per time."
            },
            {
                "q": "10th grade science: What is scientific peer review?",
                "choices": [
                    "experts evaluate research before publication",
                    "friends vote for favorite answer",
                    "students copy notes",
                    "data is hidden"
                ],
                "answer": "experts evaluate research before publication",
                "explain": "Peer review checks quality."
            },
            {
                "q": "10th grade science: What is a limitation of a model?",
                "choices": [
                    "it may simplify reality",
                    "it is always perfect",
                    "it replaces evidence",
                    "it never needs testing"
                ],
                "answer": "it may simplify reality",
                "explain": "Models are useful but not perfect."
            }
        ],
        "social": [
            {
                "q": "10th grade social studies: What is separation of powers?",
                "choices": [
                    "dividing government power among branches",
                    "ending all laws",
                    "making one ruler supreme",
                    "removing courts"
                ],
                "answer": "dividing government power among branches",
                "explain": "Power is divided to limit abuse."
            },
            {
                "q": "10th grade social studies: What is judicial review?",
                "choices": [
                    "court power to review laws or actions for constitutionality",
                    "counting votes only",
                    "writing taxes",
                    "making maps"
                ],
                "answer": "court power to review laws or actions for constitutionality",
                "explain": "Courts can review constitutionality."
            },
            {
                "q": "10th grade social studies: What is opportunity cost?",
                "choices": [
                    "the next-best option given up",
                    "free money",
                    "a map symbol",
                    "a type of election"
                ],
                "answer": "the next-best option given up",
                "explain": "Choices have tradeoffs."
            },
            {
                "q": "10th grade social studies: What is inflation?",
                "choices": [
                    "a general rise in prices over time",
                    "a river flooding",
                    "a new amendment",
                    "a larger map"
                ],
                "answer": "a general rise in prices over time",
                "explain": "Inflation means prices rise."
            },
            {
                "q": "10th grade social studies: What is globalization?",
                "choices": [
                    "growing connections among countries",
                    "a local classroom rule",
                    "only one country trading",
                    "ending communication"
                ],
                "answer": "growing connections among countries",
                "explain": "Globalization connects economies and cultures."
            },
            {
                "q": "10th grade social studies: What is a landmark court case?",
                "choices": [
                    "a case with important lasting impact",
                    "a case about buildings only",
                    "a short court note",
                    "a club election"
                ],
                "answer": "a case with important lasting impact",
                "explain": "Landmark cases shape law."
            },
            {
                "q": "10th grade social studies: What is civil disobedience?",
                "choices": [
                    "peacefully breaking a law to protest injustice",
                    "ignoring all rules for fun",
                    "voting twice",
                    "avoiding community issues"
                ],
                "answer": "peacefully breaking a law to protest injustice",
                "explain": "Civil disobedience is protest against unjust laws."
            },
            {
                "q": "10th grade social studies: Why corroborate sources?",
                "choices": [
                    "to check whether sources support the same facts",
                    "to use only one source",
                    "to delete evidence",
                    "to pick the prettiest page"
                ],
                "answer": "to check whether sources support the same facts",
                "explain": "Corroboration checks agreement."
            },
            {
                "q": "10th grade social studies: What is sovereignty?",
                "choices": [
                    "a government's authority to govern itself",
                    "a weather pattern",
                    "a type of tax only",
                    "a court building"
                ],
                "answer": "a government's authority to govern itself",
                "explain": "Sovereignty is governing authority."
            },
            {
                "q": "10th grade social studies: What is human-environment interaction?",
                "choices": [
                    "how people and places affect each other",
                    "only mountain names",
                    "only city borders",
                    "a spelling rule"
                ],
                "answer": "how people and places affect each other",
                "explain": "People shape environments and environments shape people."
            }
        ],
        "vocab": [
            {
                "q": "10th grade vocabulary: Evaluate means...",
                "choices": [
                    "judge value or quality",
                    "copy without thinking",
                    "make louder",
                    "draw only"
                ],
                "answer": "judge value or quality",
                "explain": "Evaluate means judge quality."
            },
            {
                "q": "10th grade vocabulary: Coherent means...",
                "choices": [
                    "clear and connected",
                    "messy and random",
                    "very old",
                    "extremely loud"
                ],
                "answer": "clear and connected",
                "explain": "Coherent ideas connect."
            },
            {
                "q": "10th grade vocabulary: Root 'cred' means...",
                "choices": [
                    "believe",
                    "water",
                    "write",
                    "move"
                ],
                "answer": "believe",
                "explain": "Cred relates to trust or belief."
            },
            {
                "q": "10th grade vocabulary: Synthesize means...",
                "choices": [
                    "combine parts into a whole",
                    "isolate",
                    "erase",
                    "delay"
                ],
                "answer": "combine parts into a whole",
                "explain": "Synthesize means combine ideas."
            },
            {
                "q": "10th grade vocabulary: Implicit means...",
                "choices": [
                    "suggested but not directly stated",
                    "written word for word",
                    "impossible",
                    "unrelated"
                ],
                "answer": "suggested but not directly stated",
                "explain": "Implicit means implied."
            },
            {
                "q": "10th grade vocabulary: Justify means...",
                "choices": [
                    "give reasons for",
                    "make smaller",
                    "repeat quietly",
                    "hide evidence"
                ],
                "answer": "give reasons for",
                "explain": "Justify means support."
            },
            {
                "q": "10th grade vocabulary: Assumption means...",
                "choices": [
                    "something accepted as true without full proof",
                    "a final grade",
                    "a direct quote",
                    "a map"
                ],
                "answer": "something accepted as true without full proof",
                "explain": "Assumptions need checking."
            },
            {
                "q": "10th grade vocabulary: Ambiguous means...",
                "choices": [
                    "having more than one possible meaning",
                    "very simple",
                    "completely proven",
                    "made of metal"
                ],
                "answer": "having more than one possible meaning",
                "explain": "Ambiguous means unclear in more than one way."
            },
            {
                "q": "10th grade vocabulary: Derive means...",
                "choices": [
                    "get or develop from a source",
                    "throw away",
                    "decorate",
                    "guess blindly"
                ],
                "answer": "get or develop from a source",
                "explain": "Derive means obtain from something."
            },
            {
                "q": "10th grade vocabulary: Nuance means...",
                "choices": [
                    "a subtle difference or complexity",
                    "a spelling error",
                    "a simple yes/no",
                    "a title"
                ],
                "answer": "a subtle difference or complexity",
                "explain": "Nuance adds complexity."
            }
        ],
        "study": [
            {
                "q": "10th grade study skills: What is deliberate practice?",
                "choices": [
                    "focused practice on specific weaknesses with feedback",
                    "doing easy work only",
                    "studying randomly",
                    "reviewing once"
                ],
                "answer": "focused practice on specific weaknesses with feedback",
                "explain": "Deliberate practice targets improvement."
            },
            {
                "q": "10th grade study skills: What is transfer of learning?",
                "choices": [
                    "using a skill in a new situation",
                    "moving a notebook",
                    "copying answers",
                    "forgetting after a test"
                ],
                "answer": "using a skill in a new situation",
                "explain": "Transfer applies learning elsewhere."
            },
            {
                "q": "10th grade study skills: What is cognitive load?",
                "choices": [
                    "mental effort used by a task",
                    "backpack weight only",
                    "a grade",
                    "a graph type"
                ],
                "answer": "mental effort used by a task",
                "explain": "Cognitive load is mental demand."
            },
            {
                "q": "10th grade study skills: What is a rubric used for?",
                "choices": [
                    "understanding expectations and grading criteria",
                    "decorating work",
                    "hiding mistakes",
                    "replacing evidence"
                ],
                "answer": "understanding expectations and grading criteria",
                "explain": "Rubrics show criteria."
            },
            {
                "q": "10th grade study skills: Why create a study schedule?",
                "choices": [
                    "to plan time and reduce last-minute stress",
                    "to avoid work",
                    "to make tasks disappear",
                    "to memorize dates only"
                ],
                "answer": "to plan time and reduce last-minute stress",
                "explain": "Schedules manage time."
            },
            {
                "q": "10th grade study skills: What is spaced retrieval?",
                "choices": [
                    "reviewing by recalling information over time",
                    "rereading once only",
                    "copying notes nonstop",
                    "highlighting everything"
                ],
                "answer": "reviewing by recalling information over time",
                "explain": "Spacing plus retrieval improves memory."
            },
            {
                "q": "10th grade study skills: What is a feedback loop?",
                "choices": [
                    "practice, feedback, adjustment, more practice",
                    "guess, ignore, repeat",
                    "copy, submit, forget",
                    "read, close, stop"
                ],
                "answer": "practice, feedback, adjustment, more practice",
                "explain": "Feedback loops improve performance."
            },
            {
                "q": "10th grade study skills: What should you do with a weak essay draft?",
                "choices": [
                    "revise claim, evidence, and reasoning first",
                    "only change font",
                    "delete all paragraphs",
                    "avoid feedback"
                ],
                "answer": "revise claim, evidence, and reasoning first",
                "explain": "Big ideas matter before small edits."
            },
            {
                "q": "10th grade study skills: What is time blocking?",
                "choices": [
                    "assigning specific time blocks to tasks",
                    "doing everything at once",
                    "waiting for motivation",
                    "never taking breaks"
                ],
                "answer": "assigning specific time blocks to tasks",
                "explain": "Time blocking protects focus."
            },
            {
                "q": "10th grade study skills: What is reflection in learning?",
                "choices": [
                    "thinking about what worked and what to improve",
                    "complaining only",
                    "forgetting feedback",
                    "counting pages"
                ],
                "answer": "thinking about what worked and what to improve",
                "explain": "Reflection guides next steps."
            }
        ]
    },
    "11": {
        "math": [
            {
                "q": "11th grade math: What is the derivative of x²?",
                "choices": [
                    "x",
                    "2x",
                    "x³",
                    "2"
                ],
                "answer": "2x",
                "explain": "Power rule: d/dx x² = 2x."
            },
            {
                "q": "11th grade math: What is the inverse of f(x)=x+5?",
                "choices": [
                    "x-5",
                    "x+5",
                    "5x",
                    "x/5"
                ],
                "answer": "x-5",
                "explain": "Reverse adding 5 by subtracting 5."
            },
            {
                "q": "11th grade math: What is sin²θ + cos²θ?",
                "choices": [
                    "0",
                    "1",
                    "tanθ",
                    "2"
                ],
                "answer": "1",
                "explain": "This is the Pythagorean identity."
            },
            {
                "q": "11th grade math: Which sequence is arithmetic?",
                "choices": [
                    "3, 7, 11, 15",
                    "2, 4, 8, 16",
                    "1, 1, 2, 3",
                    "5, 10, 20, 40"
                ],
                "answer": "3, 7, 11, 15",
                "explain": "It adds 4 each time."
            },
            {
                "q": "11th grade math: What is the common ratio of 3, 6, 12, 24?",
                "choices": [
                    "2",
                    "3",
                    "4",
                    "6"
                ],
                "answer": "2",
                "explain": "Each term is multiplied by 2."
            },
            {
                "q": "11th grade math: Which is the unit circle point for 0°?",
                "choices": [
                    "(1,0)",
                    "(0,1)",
                    "(-1,0)",
                    "(0,-1)"
                ],
                "answer": "(1,0)",
                "explain": "At 0°, the point is (1,0)."
            },
            {
                "q": "11th grade math: What is the horizontal asymptote of y=1/x?",
                "choices": [
                    "x=0",
                    "y=0",
                    "y=1",
                    "x=1"
                ],
                "answer": "y=0",
                "explain": "As x grows, 1/x approaches 0."
            },
            {
                "q": "11th grade math: What is the composition f(g(x)) if f(x)=x+1 and g(x)=2x?",
                "choices": [
                    "2x+1",
                    "2x-1",
                    "x+2",
                    "2x²"
                ],
                "answer": "2x+1",
                "explain": "Put g(x) into f: 2x + 1."
            },
            {
                "q": "11th grade math: What is the radian measure of 180°?",
                "choices": [
                    "π/2",
                    "π",
                    "2π",
                    "3π"
                ],
                "answer": "π",
                "explain": "180° equals π radians."
            },
            {
                "q": "11th grade math: What is the average rate of change of f from x=1 to x=3 if f(1)=4 and f(3)=10?",
                "choices": [
                    "2",
                    "3",
                    "4",
                    "6"
                ],
                "answer": "3",
                "explain": "(10-4)/(3-1)=6/2=3."
            }
        ],
        "reading": [
            {
                "q": "11th grade reading: What is rhetorical analysis?",
                "choices": [
                    "examining how a writer persuades an audience",
                    "counting pages only",
                    "summarizing without evidence",
                    "finding all nouns"
                ],
                "answer": "examining how a writer persuades an audience",
                "explain": "Rhetorical analysis studies persuasive choices."
            },
            {
                "q": "11th grade reading: Ethos appeals to...",
                "choices": [
                    "credibility",
                    "emotion only",
                    "logic only",
                    "font size"
                ],
                "answer": "credibility",
                "explain": "Ethos is about trust and authority."
            },
            {
                "q": "11th grade reading: Pathos appeals to...",
                "choices": [
                    "emotion",
                    "data only",
                    "grammar",
                    "chapter length"
                ],
                "answer": "emotion",
                "explain": "Pathos uses feelings."
            },
            {
                "q": "11th grade reading: Logos appeals to...",
                "choices": [
                    "logic and evidence",
                    "only feelings",
                    "speaker reputation only",
                    "cover design"
                ],
                "answer": "logic and evidence",
                "explain": "Logos uses reasoning."
            },
            {
                "q": "11th grade reading: What is synthesis?",
                "choices": [
                    "combining ideas from multiple sources",
                    "copying one source",
                    "ignoring sources",
                    "making a title"
                ],
                "answer": "combining ideas from multiple sources",
                "explain": "Synthesis connects multiple sources."
            },
            {
                "q": "11th grade reading: What is a nuanced claim?",
                "choices": [
                    "a claim that recognizes complexity",
                    "a simple yes/no only",
                    "a claim with no evidence",
                    "a copied sentence"
                ],
                "answer": "a claim that recognizes complexity",
                "explain": "Nuance shows complex thinking."
            },
            {
                "q": "11th grade reading: What should source evaluation consider?",
                "choices": [
                    "credibility, relevance, and bias",
                    "font color only",
                    "how short it is",
                    "whether you like it"
                ],
                "answer": "credibility, relevance, and bias",
                "explain": "Good source evaluation checks trust and fit."
            },
            {
                "q": "11th grade reading: What is subtext?",
                "choices": [
                    "meaning suggested beneath the literal words",
                    "the title page",
                    "a grammar error",
                    "the glossary"
                ],
                "answer": "meaning suggested beneath the literal words",
                "explain": "Subtext is implied meaning."
            },
            {
                "q": "11th grade reading: What is a motif?",
                "choices": [
                    "a repeated idea or image",
                    "a one-time typo",
                    "the author bio",
                    "a citation format"
                ],
                "answer": "a repeated idea or image",
                "explain": "Motifs repeat and support themes."
            },
            {
                "q": "11th grade reading: What does it mean to trace an argument?",
                "choices": [
                    "follow how claims and evidence develop",
                    "skip to the end",
                    "count letters",
                    "change the author's view"
                ],
                "answer": "follow how claims and evidence develop",
                "explain": "Tracing follows the structure of reasoning."
            }
        ],
        "writing": [
            {
                "q": "11th grade writing: What is a nuanced thesis?",
                "choices": [
                    "a claim that recognizes complexity",
                    "a claim with no evidence",
                    "a title only",
                    "a copied quote"
                ],
                "answer": "a claim that recognizes complexity",
                "explain": "Nuance shows complex thinking."
            },
            {
                "q": "11th grade writing: What is synthesis writing?",
                "choices": [
                    "combining ideas from multiple sources",
                    "copying one source only",
                    "ignoring sources",
                    "writing a list"
                ],
                "answer": "combining ideas from multiple sources",
                "explain": "Synthesis connects sources."
            },
            {
                "q": "11th grade writing: What does commentary do after evidence?",
                "choices": [
                    "explains why the evidence matters",
                    "adds random facts",
                    "repeats the quote only",
                    "changes the topic"
                ],
                "answer": "explains why the evidence matters",
                "explain": "Commentary connects evidence to the claim."
            },
            {
                "q": "11th grade writing: Which is the best academic tone?",
                "choices": [
                    "clear, precise, and respectful",
                    "angry and vague",
                    "slang-heavy only",
                    "all emojis"
                ],
                "answer": "clear, precise, and respectful",
                "explain": "Academic tone should be clear and respectful."
            },
            {
                "q": "11th grade writing: What is a line of reasoning?",
                "choices": [
                    "the logical path connecting claim, evidence, and explanation",
                    "a decorative line",
                    "a random opinion",
                    "a sentence fragment"
                ],
                "answer": "the logical path connecting claim, evidence, and explanation",
                "explain": "Line of reasoning shows how the argument works."
            },
            {
                "q": "11th grade writing: What is an effective concession?",
                "choices": [
                    "acknowledging a fair opposing point",
                    "giving up the whole argument",
                    "mocking the opponent",
                    "removing your thesis"
                ],
                "answer": "acknowledging a fair opposing point",
                "explain": "Concession shows fairness."
            },
            {
                "q": "11th grade writing: What does source integration mean?",
                "choices": [
                    "smoothly using evidence from sources",
                    "dropping quotes with no explanation",
                    "listing URLs only",
                    "avoiding evidence"
                ],
                "answer": "smoothly using evidence from sources",
                "explain": "Sources should be introduced and explained."
            },
            {
                "q": "11th grade writing: What is a revision priority?",
                "choices": [
                    "fixing weak reasoning before small wording issues",
                    "only changing font",
                    "ignoring structure",
                    "deleting the conclusion"
                ],
                "answer": "fixing weak reasoning before small wording issues",
                "explain": "Big ideas and organization matter first."
            },
            {
                "q": "11th grade writing: What is a rhetorical choice?",
                "choices": [
                    "a writing move used to affect the audience",
                    "a typo",
                    "a citation only",
                    "a grammar worksheet"
                ],
                "answer": "a writing move used to affect the audience",
                "explain": "Rhetorical choices shape meaning and persuasion."
            },
            {
                "q": "11th grade writing: What is concision?",
                "choices": [
                    "using the fewest words needed clearly",
                    "making sentences confusing",
                    "adding filler",
                    "writing without evidence"
                ],
                "answer": "using the fewest words needed clearly",
                "explain": "Concision removes unnecessary words."
            }
        ],
        "science": [
            {
                "q": "11th grade science: What does Newton's second law state?",
                "choices": [
                    "F = ma",
                    "E = mc only",
                    "density = volume/mass",
                    "pH = mass"
                ],
                "answer": "F = ma",
                "explain": "Force equals mass times acceleration."
            },
            {
                "q": "11th grade science: What is conservation of energy?",
                "choices": [
                    "energy changes form but total energy is conserved",
                    "energy always disappears",
                    "energy only exists in batteries",
                    "energy cannot move"
                ],
                "answer": "energy changes form but total energy is conserved",
                "explain": "Energy is conserved in closed systems."
            },
            {
                "q": "11th grade science: What is natural selection?",
                "choices": [
                    "helpful traits become more common through survival and reproduction",
                    "animals choose favorite traits",
                    "weather creates all traits instantly",
                    "rocks change animals"
                ],
                "answer": "helpful traits become more common through survival and reproduction",
                "explain": "Selection changes populations over time."
            },
            {
                "q": "11th grade science: What is homeostasis?",
                "choices": [
                    "maintaining stable internal conditions",
                    "changing species names",
                    "speeding up all reactions",
                    "erasing data"
                ],
                "answer": "maintaining stable internal conditions",
                "explain": "Organisms regulate internal conditions."
            },
            {
                "q": "11th grade science: What does pH measure?",
                "choices": [
                    "acidity or basicity",
                    "speed",
                    "mass",
                    "volume only"
                ],
                "answer": "acidity or basicity",
                "explain": "pH describes acid/base level."
            },
            {
                "q": "11th grade science: What is a covalent bond?",
                "choices": [
                    "atoms share electrons",
                    "atoms lose all protons",
                    "rocks stick together",
                    "cells divide"
                ],
                "answer": "atoms share electrons",
                "explain": "Covalent bonds share electrons."
            },
            {
                "q": "11th grade science: What is the role of DNA?",
                "choices": [
                    "stores genetic information",
                    "makes weather",
                    "measures force",
                    "forms all minerals"
                ],
                "answer": "stores genetic information",
                "explain": "DNA carries instructions."
            },
            {
                "q": "11th grade science: What is acceleration?",
                "choices": [
                    "change in velocity over time",
                    "mass divided by volume",
                    "stored energy only",
                    "distance only"
                ],
                "answer": "change in velocity over time",
                "explain": "Acceleration is velocity change per time."
            },
            {
                "q": "11th grade science: What is scientific peer review?",
                "choices": [
                    "experts evaluate research before publication",
                    "friends vote for favorite answer",
                    "students copy notes",
                    "data is hidden"
                ],
                "answer": "experts evaluate research before publication",
                "explain": "Peer review checks quality."
            },
            {
                "q": "11th grade science: What is a limitation of a model?",
                "choices": [
                    "it may simplify reality",
                    "it is always perfect",
                    "it replaces evidence",
                    "it never needs testing"
                ],
                "answer": "it may simplify reality",
                "explain": "Models are useful but not perfect."
            }
        ],
        "social": [
            {
                "q": "11th grade social studies: What is separation of powers?",
                "choices": [
                    "dividing government power among branches",
                    "ending all laws",
                    "making one ruler supreme",
                    "removing courts"
                ],
                "answer": "dividing government power among branches",
                "explain": "Power is divided to limit abuse."
            },
            {
                "q": "11th grade social studies: What is judicial review?",
                "choices": [
                    "court power to review laws or actions for constitutionality",
                    "counting votes only",
                    "writing taxes",
                    "making maps"
                ],
                "answer": "court power to review laws or actions for constitutionality",
                "explain": "Courts can review constitutionality."
            },
            {
                "q": "11th grade social studies: What is opportunity cost?",
                "choices": [
                    "the next-best option given up",
                    "free money",
                    "a map symbol",
                    "a type of election"
                ],
                "answer": "the next-best option given up",
                "explain": "Choices have tradeoffs."
            },
            {
                "q": "11th grade social studies: What is inflation?",
                "choices": [
                    "a general rise in prices over time",
                    "a river flooding",
                    "a new amendment",
                    "a larger map"
                ],
                "answer": "a general rise in prices over time",
                "explain": "Inflation means prices rise."
            },
            {
                "q": "11th grade social studies: What is globalization?",
                "choices": [
                    "growing connections among countries",
                    "a local classroom rule",
                    "only one country trading",
                    "ending communication"
                ],
                "answer": "growing connections among countries",
                "explain": "Globalization connects economies and cultures."
            },
            {
                "q": "11th grade social studies: What is a landmark court case?",
                "choices": [
                    "a case with important lasting impact",
                    "a case about buildings only",
                    "a short court note",
                    "a club election"
                ],
                "answer": "a case with important lasting impact",
                "explain": "Landmark cases shape law."
            },
            {
                "q": "11th grade social studies: What is civil disobedience?",
                "choices": [
                    "peacefully breaking a law to protest injustice",
                    "ignoring all rules for fun",
                    "voting twice",
                    "avoiding community issues"
                ],
                "answer": "peacefully breaking a law to protest injustice",
                "explain": "Civil disobedience is protest against unjust laws."
            },
            {
                "q": "11th grade social studies: Why corroborate sources?",
                "choices": [
                    "to check whether sources support the same facts",
                    "to use only one source",
                    "to delete evidence",
                    "to pick the prettiest page"
                ],
                "answer": "to check whether sources support the same facts",
                "explain": "Corroboration checks agreement."
            },
            {
                "q": "11th grade social studies: What is sovereignty?",
                "choices": [
                    "a government's authority to govern itself",
                    "a weather pattern",
                    "a type of tax only",
                    "a court building"
                ],
                "answer": "a government's authority to govern itself",
                "explain": "Sovereignty is governing authority."
            },
            {
                "q": "11th grade social studies: What is human-environment interaction?",
                "choices": [
                    "how people and places affect each other",
                    "only mountain names",
                    "only city borders",
                    "a spelling rule"
                ],
                "answer": "how people and places affect each other",
                "explain": "People shape environments and environments shape people."
            }
        ],
        "vocab": [
            {
                "q": "11th grade vocabulary: Evaluate means...",
                "choices": [
                    "judge value or quality",
                    "copy without thinking",
                    "make louder",
                    "draw only"
                ],
                "answer": "judge value or quality",
                "explain": "Evaluate means judge quality."
            },
            {
                "q": "11th grade vocabulary: Coherent means...",
                "choices": [
                    "clear and connected",
                    "messy and random",
                    "very old",
                    "extremely loud"
                ],
                "answer": "clear and connected",
                "explain": "Coherent ideas connect."
            },
            {
                "q": "11th grade vocabulary: Root 'cred' means...",
                "choices": [
                    "believe",
                    "water",
                    "write",
                    "move"
                ],
                "answer": "believe",
                "explain": "Cred relates to trust or belief."
            },
            {
                "q": "11th grade vocabulary: Synthesize means...",
                "choices": [
                    "combine parts into a whole",
                    "isolate",
                    "erase",
                    "delay"
                ],
                "answer": "combine parts into a whole",
                "explain": "Synthesize means combine ideas."
            },
            {
                "q": "11th grade vocabulary: Implicit means...",
                "choices": [
                    "suggested but not directly stated",
                    "written word for word",
                    "impossible",
                    "unrelated"
                ],
                "answer": "suggested but not directly stated",
                "explain": "Implicit means implied."
            },
            {
                "q": "11th grade vocabulary: Justify means...",
                "choices": [
                    "give reasons for",
                    "make smaller",
                    "repeat quietly",
                    "hide evidence"
                ],
                "answer": "give reasons for",
                "explain": "Justify means support."
            },
            {
                "q": "11th grade vocabulary: Assumption means...",
                "choices": [
                    "something accepted as true without full proof",
                    "a final grade",
                    "a direct quote",
                    "a map"
                ],
                "answer": "something accepted as true without full proof",
                "explain": "Assumptions need checking."
            },
            {
                "q": "11th grade vocabulary: Ambiguous means...",
                "choices": [
                    "having more than one possible meaning",
                    "very simple",
                    "completely proven",
                    "made of metal"
                ],
                "answer": "having more than one possible meaning",
                "explain": "Ambiguous means unclear in more than one way."
            },
            {
                "q": "11th grade vocabulary: Derive means...",
                "choices": [
                    "get or develop from a source",
                    "throw away",
                    "decorate",
                    "guess blindly"
                ],
                "answer": "get or develop from a source",
                "explain": "Derive means obtain from something."
            },
            {
                "q": "11th grade vocabulary: Nuance means...",
                "choices": [
                    "a subtle difference or complexity",
                    "a spelling error",
                    "a simple yes/no",
                    "a title"
                ],
                "answer": "a subtle difference or complexity",
                "explain": "Nuance adds complexity."
            }
        ],
        "study": [
            {
                "q": "11th grade study skills: What is deliberate practice?",
                "choices": [
                    "focused practice on specific weaknesses with feedback",
                    "doing easy work only",
                    "studying randomly",
                    "reviewing once"
                ],
                "answer": "focused practice on specific weaknesses with feedback",
                "explain": "Deliberate practice targets improvement."
            },
            {
                "q": "11th grade study skills: What is transfer of learning?",
                "choices": [
                    "using a skill in a new situation",
                    "moving a notebook",
                    "copying answers",
                    "forgetting after a test"
                ],
                "answer": "using a skill in a new situation",
                "explain": "Transfer applies learning elsewhere."
            },
            {
                "q": "11th grade study skills: What is cognitive load?",
                "choices": [
                    "mental effort used by a task",
                    "backpack weight only",
                    "a grade",
                    "a graph type"
                ],
                "answer": "mental effort used by a task",
                "explain": "Cognitive load is mental demand."
            },
            {
                "q": "11th grade study skills: What is a rubric used for?",
                "choices": [
                    "understanding expectations and grading criteria",
                    "decorating work",
                    "hiding mistakes",
                    "replacing evidence"
                ],
                "answer": "understanding expectations and grading criteria",
                "explain": "Rubrics show criteria."
            },
            {
                "q": "11th grade study skills: Why create a study schedule?",
                "choices": [
                    "to plan time and reduce last-minute stress",
                    "to avoid work",
                    "to make tasks disappear",
                    "to memorize dates only"
                ],
                "answer": "to plan time and reduce last-minute stress",
                "explain": "Schedules manage time."
            },
            {
                "q": "11th grade study skills: What is spaced retrieval?",
                "choices": [
                    "reviewing by recalling information over time",
                    "rereading once only",
                    "copying notes nonstop",
                    "highlighting everything"
                ],
                "answer": "reviewing by recalling information over time",
                "explain": "Spacing plus retrieval improves memory."
            },
            {
                "q": "11th grade study skills: What is a feedback loop?",
                "choices": [
                    "practice, feedback, adjustment, more practice",
                    "guess, ignore, repeat",
                    "copy, submit, forget",
                    "read, close, stop"
                ],
                "answer": "practice, feedback, adjustment, more practice",
                "explain": "Feedback loops improve performance."
            },
            {
                "q": "11th grade study skills: What should you do with a weak essay draft?",
                "choices": [
                    "revise claim, evidence, and reasoning first",
                    "only change font",
                    "delete all paragraphs",
                    "avoid feedback"
                ],
                "answer": "revise claim, evidence, and reasoning first",
                "explain": "Big ideas matter before small edits."
            },
            {
                "q": "11th grade study skills: What is time blocking?",
                "choices": [
                    "assigning specific time blocks to tasks",
                    "doing everything at once",
                    "waiting for motivation",
                    "never taking breaks"
                ],
                "answer": "assigning specific time blocks to tasks",
                "explain": "Time blocking protects focus."
            },
            {
                "q": "11th grade study skills: What is reflection in learning?",
                "choices": [
                    "thinking about what worked and what to improve",
                    "complaining only",
                    "forgetting feedback",
                    "counting pages"
                ],
                "answer": "thinking about what worked and what to improve",
                "explain": "Reflection guides next steps."
            }
        ]
    },
    "12": {
        "math": [
            {
                "q": "12th grade math: What is the derivative of sin x?",
                "choices": [
                    "cos x",
                    "-cos x",
                    "sin x",
                    "-sin x"
                ],
                "answer": "cos x",
                "explain": "The derivative of sin x is cos x."
            },
            {
                "q": "12th grade math: What is ∫ 2x dx?",
                "choices": [
                    "x² + C",
                    "2 + C",
                    "2x² + C",
                    "x + C"
                ],
                "answer": "x² + C",
                "explain": "The antiderivative of 2x is x² + C."
            },
            {
                "q": "12th grade math: What is the limit of 1/x as x approaches infinity?",
                "choices": [
                    "0",
                    "1",
                    "infinity",
                    "undefined"
                ],
                "answer": "0",
                "explain": "1/x gets closer to 0."
            },
            {
                "q": "12th grade math: Which is a normal distribution property?",
                "choices": [
                    "symmetric about the mean",
                    "always left-skewed",
                    "no mean",
                    "only two values"
                ],
                "answer": "symmetric about the mean",
                "explain": "A normal curve is symmetric."
            },
            {
                "q": "12th grade math: What is z-score formula?",
                "choices": [
                    "(x-mean)/standard deviation",
                    "mean/x",
                    "x + mean",
                    "standard deviation/x"
                ],
                "answer": "(x-mean)/standard deviation",
                "explain": "A z-score measures distance from mean in standard deviations."
            },
            {
                "q": "12th grade math: What is e⁰?",
                "choices": [
                    "0",
                    "1",
                    "e",
                    "undefined"
                ],
                "answer": "1",
                "explain": "Any nonzero number to the zero power is 1."
            },
            {
                "q": "12th grade math: What does correlation measure?",
                "choices": [
                    "strength and direction of a relationship",
                    "exact cause",
                    "triangle area",
                    "probability only"
                ],
                "answer": "strength and direction of a relationship",
                "explain": "Correlation describes association, not necessarily causation."
            },
            {
                "q": "12th grade math: What is the product rule for derivatives?",
                "choices": [
                    "(fg)'=f'g+fg'",
                    "(fg)'=f'g'",
                    "(fg)'=f+g",
                    "(fg)'=f'/g'"
                ],
                "answer": "(fg)'=f'g+fg'",
                "explain": "The product rule differentiates products."
            },
            {
                "q": "12th grade math: What is the probability of A and B if independent?",
                "choices": [
                    "P(A)P(B)",
                    "P(A)+P(B)",
                    "P(A)-P(B)",
                    "P(A)/P(B)"
                ],
                "answer": "P(A)P(B)",
                "explain": "Independent events multiply."
            },
            {
                "q": "12th grade math: A residual is...",
                "choices": [
                    "actual value minus predicted value",
                    "the slope only",
                    "the mean only",
                    "a random sample size"
                ],
                "answer": "actual value minus predicted value",
                "explain": "Residuals show prediction error."
            }
        ],
        "reading": [
            {
                "q": "12th grade reading: What is rhetorical analysis?",
                "choices": [
                    "examining how a writer persuades an audience",
                    "counting pages only",
                    "summarizing without evidence",
                    "finding all nouns"
                ],
                "answer": "examining how a writer persuades an audience",
                "explain": "Rhetorical analysis studies persuasive choices."
            },
            {
                "q": "12th grade reading: Ethos appeals to...",
                "choices": [
                    "credibility",
                    "emotion only",
                    "logic only",
                    "font size"
                ],
                "answer": "credibility",
                "explain": "Ethos is about trust and authority."
            },
            {
                "q": "12th grade reading: Pathos appeals to...",
                "choices": [
                    "emotion",
                    "data only",
                    "grammar",
                    "chapter length"
                ],
                "answer": "emotion",
                "explain": "Pathos uses feelings."
            },
            {
                "q": "12th grade reading: Logos appeals to...",
                "choices": [
                    "logic and evidence",
                    "only feelings",
                    "speaker reputation only",
                    "cover design"
                ],
                "answer": "logic and evidence",
                "explain": "Logos uses reasoning."
            },
            {
                "q": "12th grade reading: What is synthesis?",
                "choices": [
                    "combining ideas from multiple sources",
                    "copying one source",
                    "ignoring sources",
                    "making a title"
                ],
                "answer": "combining ideas from multiple sources",
                "explain": "Synthesis connects multiple sources."
            },
            {
                "q": "12th grade reading: What is a nuanced claim?",
                "choices": [
                    "a claim that recognizes complexity",
                    "a simple yes/no only",
                    "a claim with no evidence",
                    "a copied sentence"
                ],
                "answer": "a claim that recognizes complexity",
                "explain": "Nuance shows complex thinking."
            },
            {
                "q": "12th grade reading: What should source evaluation consider?",
                "choices": [
                    "credibility, relevance, and bias",
                    "font color only",
                    "how short it is",
                    "whether you like it"
                ],
                "answer": "credibility, relevance, and bias",
                "explain": "Good source evaluation checks trust and fit."
            },
            {
                "q": "12th grade reading: What is subtext?",
                "choices": [
                    "meaning suggested beneath the literal words",
                    "the title page",
                    "a grammar error",
                    "the glossary"
                ],
                "answer": "meaning suggested beneath the literal words",
                "explain": "Subtext is implied meaning."
            },
            {
                "q": "12th grade reading: What is a motif?",
                "choices": [
                    "a repeated idea or image",
                    "a one-time typo",
                    "the author bio",
                    "a citation format"
                ],
                "answer": "a repeated idea or image",
                "explain": "Motifs repeat and support themes."
            },
            {
                "q": "12th grade reading: What does it mean to trace an argument?",
                "choices": [
                    "follow how claims and evidence develop",
                    "skip to the end",
                    "count letters",
                    "change the author's view"
                ],
                "answer": "follow how claims and evidence develop",
                "explain": "Tracing follows the structure of reasoning."
            }
        ],
        "writing": [
            {
                "q": "12th grade writing: What is a nuanced thesis?",
                "choices": [
                    "a claim that recognizes complexity",
                    "a claim with no evidence",
                    "a title only",
                    "a copied quote"
                ],
                "answer": "a claim that recognizes complexity",
                "explain": "Nuance shows complex thinking."
            },
            {
                "q": "12th grade writing: What is synthesis writing?",
                "choices": [
                    "combining ideas from multiple sources",
                    "copying one source only",
                    "ignoring sources",
                    "writing a list"
                ],
                "answer": "combining ideas from multiple sources",
                "explain": "Synthesis connects sources."
            },
            {
                "q": "12th grade writing: What does commentary do after evidence?",
                "choices": [
                    "explains why the evidence matters",
                    "adds random facts",
                    "repeats the quote only",
                    "changes the topic"
                ],
                "answer": "explains why the evidence matters",
                "explain": "Commentary connects evidence to the claim."
            },
            {
                "q": "12th grade writing: Which is the best academic tone?",
                "choices": [
                    "clear, precise, and respectful",
                    "angry and vague",
                    "slang-heavy only",
                    "all emojis"
                ],
                "answer": "clear, precise, and respectful",
                "explain": "Academic tone should be clear and respectful."
            },
            {
                "q": "12th grade writing: What is a line of reasoning?",
                "choices": [
                    "the logical path connecting claim, evidence, and explanation",
                    "a decorative line",
                    "a random opinion",
                    "a sentence fragment"
                ],
                "answer": "the logical path connecting claim, evidence, and explanation",
                "explain": "Line of reasoning shows how the argument works."
            },
            {
                "q": "12th grade writing: What is an effective concession?",
                "choices": [
                    "acknowledging a fair opposing point",
                    "giving up the whole argument",
                    "mocking the opponent",
                    "removing your thesis"
                ],
                "answer": "acknowledging a fair opposing point",
                "explain": "Concession shows fairness."
            },
            {
                "q": "12th grade writing: What does source integration mean?",
                "choices": [
                    "smoothly using evidence from sources",
                    "dropping quotes with no explanation",
                    "listing URLs only",
                    "avoiding evidence"
                ],
                "answer": "smoothly using evidence from sources",
                "explain": "Sources should be introduced and explained."
            },
            {
                "q": "12th grade writing: What is a revision priority?",
                "choices": [
                    "fixing weak reasoning before small wording issues",
                    "only changing font",
                    "ignoring structure",
                    "deleting the conclusion"
                ],
                "answer": "fixing weak reasoning before small wording issues",
                "explain": "Big ideas and organization matter first."
            },
            {
                "q": "12th grade writing: What is a rhetorical choice?",
                "choices": [
                    "a writing move used to affect the audience",
                    "a typo",
                    "a citation only",
                    "a grammar worksheet"
                ],
                "answer": "a writing move used to affect the audience",
                "explain": "Rhetorical choices shape meaning and persuasion."
            },
            {
                "q": "12th grade writing: What is concision?",
                "choices": [
                    "using the fewest words needed clearly",
                    "making sentences confusing",
                    "adding filler",
                    "writing without evidence"
                ],
                "answer": "using the fewest words needed clearly",
                "explain": "Concision removes unnecessary words."
            }
        ],
        "science": [
            {
                "q": "12th grade science: What does Newton's second law state?",
                "choices": [
                    "F = ma",
                    "E = mc only",
                    "density = volume/mass",
                    "pH = mass"
                ],
                "answer": "F = ma",
                "explain": "Force equals mass times acceleration."
            },
            {
                "q": "12th grade science: What is conservation of energy?",
                "choices": [
                    "energy changes form but total energy is conserved",
                    "energy always disappears",
                    "energy only exists in batteries",
                    "energy cannot move"
                ],
                "answer": "energy changes form but total energy is conserved",
                "explain": "Energy is conserved in closed systems."
            },
            {
                "q": "12th grade science: What is natural selection?",
                "choices": [
                    "helpful traits become more common through survival and reproduction",
                    "animals choose favorite traits",
                    "weather creates all traits instantly",
                    "rocks change animals"
                ],
                "answer": "helpful traits become more common through survival and reproduction",
                "explain": "Selection changes populations over time."
            },
            {
                "q": "12th grade science: What is homeostasis?",
                "choices": [
                    "maintaining stable internal conditions",
                    "changing species names",
                    "speeding up all reactions",
                    "erasing data"
                ],
                "answer": "maintaining stable internal conditions",
                "explain": "Organisms regulate internal conditions."
            },
            {
                "q": "12th grade science: What does pH measure?",
                "choices": [
                    "acidity or basicity",
                    "speed",
                    "mass",
                    "volume only"
                ],
                "answer": "acidity or basicity",
                "explain": "pH describes acid/base level."
            },
            {
                "q": "12th grade science: What is a covalent bond?",
                "choices": [
                    "atoms share electrons",
                    "atoms lose all protons",
                    "rocks stick together",
                    "cells divide"
                ],
                "answer": "atoms share electrons",
                "explain": "Covalent bonds share electrons."
            },
            {
                "q": "12th grade science: What is the role of DNA?",
                "choices": [
                    "stores genetic information",
                    "makes weather",
                    "measures force",
                    "forms all minerals"
                ],
                "answer": "stores genetic information",
                "explain": "DNA carries instructions."
            },
            {
                "q": "12th grade science: What is acceleration?",
                "choices": [
                    "change in velocity over time",
                    "mass divided by volume",
                    "stored energy only",
                    "distance only"
                ],
                "answer": "change in velocity over time",
                "explain": "Acceleration is velocity change per time."
            },
            {
                "q": "12th grade science: What is scientific peer review?",
                "choices": [
                    "experts evaluate research before publication",
                    "friends vote for favorite answer",
                    "students copy notes",
                    "data is hidden"
                ],
                "answer": "experts evaluate research before publication",
                "explain": "Peer review checks quality."
            },
            {
                "q": "12th grade science: What is a limitation of a model?",
                "choices": [
                    "it may simplify reality",
                    "it is always perfect",
                    "it replaces evidence",
                    "it never needs testing"
                ],
                "answer": "it may simplify reality",
                "explain": "Models are useful but not perfect."
            }
        ],
        "social": [
            {
                "q": "12th grade social studies: What is separation of powers?",
                "choices": [
                    "dividing government power among branches",
                    "ending all laws",
                    "making one ruler supreme",
                    "removing courts"
                ],
                "answer": "dividing government power among branches",
                "explain": "Power is divided to limit abuse."
            },
            {
                "q": "12th grade social studies: What is judicial review?",
                "choices": [
                    "court power to review laws or actions for constitutionality",
                    "counting votes only",
                    "writing taxes",
                    "making maps"
                ],
                "answer": "court power to review laws or actions for constitutionality",
                "explain": "Courts can review constitutionality."
            },
            {
                "q": "12th grade social studies: What is opportunity cost?",
                "choices": [
                    "the next-best option given up",
                    "free money",
                    "a map symbol",
                    "a type of election"
                ],
                "answer": "the next-best option given up",
                "explain": "Choices have tradeoffs."
            },
            {
                "q": "12th grade social studies: What is inflation?",
                "choices": [
                    "a general rise in prices over time",
                    "a river flooding",
                    "a new amendment",
                    "a larger map"
                ],
                "answer": "a general rise in prices over time",
                "explain": "Inflation means prices rise."
            },
            {
                "q": "12th grade social studies: What is globalization?",
                "choices": [
                    "growing connections among countries",
                    "a local classroom rule",
                    "only one country trading",
                    "ending communication"
                ],
                "answer": "growing connections among countries",
                "explain": "Globalization connects economies and cultures."
            },
            {
                "q": "12th grade social studies: What is a landmark court case?",
                "choices": [
                    "a case with important lasting impact",
                    "a case about buildings only",
                    "a short court note",
                    "a club election"
                ],
                "answer": "a case with important lasting impact",
                "explain": "Landmark cases shape law."
            },
            {
                "q": "12th grade social studies: What is civil disobedience?",
                "choices": [
                    "peacefully breaking a law to protest injustice",
                    "ignoring all rules for fun",
                    "voting twice",
                    "avoiding community issues"
                ],
                "answer": "peacefully breaking a law to protest injustice",
                "explain": "Civil disobedience is protest against unjust laws."
            },
            {
                "q": "12th grade social studies: Why corroborate sources?",
                "choices": [
                    "to check whether sources support the same facts",
                    "to use only one source",
                    "to delete evidence",
                    "to pick the prettiest page"
                ],
                "answer": "to check whether sources support the same facts",
                "explain": "Corroboration checks agreement."
            },
            {
                "q": "12th grade social studies: What is sovereignty?",
                "choices": [
                    "a government's authority to govern itself",
                    "a weather pattern",
                    "a type of tax only",
                    "a court building"
                ],
                "answer": "a government's authority to govern itself",
                "explain": "Sovereignty is governing authority."
            },
            {
                "q": "12th grade social studies: What is human-environment interaction?",
                "choices": [
                    "how people and places affect each other",
                    "only mountain names",
                    "only city borders",
                    "a spelling rule"
                ],
                "answer": "how people and places affect each other",
                "explain": "People shape environments and environments shape people."
            }
        ],
        "vocab": [
            {
                "q": "12th grade vocabulary: Evaluate means...",
                "choices": [
                    "judge value or quality",
                    "copy without thinking",
                    "make louder",
                    "draw only"
                ],
                "answer": "judge value or quality",
                "explain": "Evaluate means judge quality."
            },
            {
                "q": "12th grade vocabulary: Coherent means...",
                "choices": [
                    "clear and connected",
                    "messy and random",
                    "very old",
                    "extremely loud"
                ],
                "answer": "clear and connected",
                "explain": "Coherent ideas connect."
            },
            {
                "q": "12th grade vocabulary: Root 'cred' means...",
                "choices": [
                    "believe",
                    "water",
                    "write",
                    "move"
                ],
                "answer": "believe",
                "explain": "Cred relates to trust or belief."
            },
            {
                "q": "12th grade vocabulary: Synthesize means...",
                "choices": [
                    "combine parts into a whole",
                    "isolate",
                    "erase",
                    "delay"
                ],
                "answer": "combine parts into a whole",
                "explain": "Synthesize means combine ideas."
            },
            {
                "q": "12th grade vocabulary: Implicit means...",
                "choices": [
                    "suggested but not directly stated",
                    "written word for word",
                    "impossible",
                    "unrelated"
                ],
                "answer": "suggested but not directly stated",
                "explain": "Implicit means implied."
            },
            {
                "q": "12th grade vocabulary: Justify means...",
                "choices": [
                    "give reasons for",
                    "make smaller",
                    "repeat quietly",
                    "hide evidence"
                ],
                "answer": "give reasons for",
                "explain": "Justify means support."
            },
            {
                "q": "12th grade vocabulary: Assumption means...",
                "choices": [
                    "something accepted as true without full proof",
                    "a final grade",
                    "a direct quote",
                    "a map"
                ],
                "answer": "something accepted as true without full proof",
                "explain": "Assumptions need checking."
            },
            {
                "q": "12th grade vocabulary: Ambiguous means...",
                "choices": [
                    "having more than one possible meaning",
                    "very simple",
                    "completely proven",
                    "made of metal"
                ],
                "answer": "having more than one possible meaning",
                "explain": "Ambiguous means unclear in more than one way."
            },
            {
                "q": "12th grade vocabulary: Derive means...",
                "choices": [
                    "get or develop from a source",
                    "throw away",
                    "decorate",
                    "guess blindly"
                ],
                "answer": "get or develop from a source",
                "explain": "Derive means obtain from something."
            },
            {
                "q": "12th grade vocabulary: Nuance means...",
                "choices": [
                    "a subtle difference or complexity",
                    "a spelling error",
                    "a simple yes/no",
                    "a title"
                ],
                "answer": "a subtle difference or complexity",
                "explain": "Nuance adds complexity."
            }
        ],
        "study": [
            {
                "q": "12th grade study skills: What is deliberate practice?",
                "choices": [
                    "focused practice on specific weaknesses with feedback",
                    "doing easy work only",
                    "studying randomly",
                    "reviewing once"
                ],
                "answer": "focused practice on specific weaknesses with feedback",
                "explain": "Deliberate practice targets improvement."
            },
            {
                "q": "12th grade study skills: What is transfer of learning?",
                "choices": [
                    "using a skill in a new situation",
                    "moving a notebook",
                    "copying answers",
                    "forgetting after a test"
                ],
                "answer": "using a skill in a new situation",
                "explain": "Transfer applies learning elsewhere."
            },
            {
                "q": "12th grade study skills: What is cognitive load?",
                "choices": [
                    "mental effort used by a task",
                    "backpack weight only",
                    "a grade",
                    "a graph type"
                ],
                "answer": "mental effort used by a task",
                "explain": "Cognitive load is mental demand."
            },
            {
                "q": "12th grade study skills: What is a rubric used for?",
                "choices": [
                    "understanding expectations and grading criteria",
                    "decorating work",
                    "hiding mistakes",
                    "replacing evidence"
                ],
                "answer": "understanding expectations and grading criteria",
                "explain": "Rubrics show criteria."
            },
            {
                "q": "12th grade study skills: Why create a study schedule?",
                "choices": [
                    "to plan time and reduce last-minute stress",
                    "to avoid work",
                    "to make tasks disappear",
                    "to memorize dates only"
                ],
                "answer": "to plan time and reduce last-minute stress",
                "explain": "Schedules manage time."
            },
            {
                "q": "12th grade study skills: What is spaced retrieval?",
                "choices": [
                    "reviewing by recalling information over time",
                    "rereading once only",
                    "copying notes nonstop",
                    "highlighting everything"
                ],
                "answer": "reviewing by recalling information over time",
                "explain": "Spacing plus retrieval improves memory."
            },
            {
                "q": "12th grade study skills: What is a feedback loop?",
                "choices": [
                    "practice, feedback, adjustment, more practice",
                    "guess, ignore, repeat",
                    "copy, submit, forget",
                    "read, close, stop"
                ],
                "answer": "practice, feedback, adjustment, more practice",
                "explain": "Feedback loops improve performance."
            },
            {
                "q": "12th grade study skills: What should you do with a weak essay draft?",
                "choices": [
                    "revise claim, evidence, and reasoning first",
                    "only change font",
                    "delete all paragraphs",
                    "avoid feedback"
                ],
                "answer": "revise claim, evidence, and reasoning first",
                "explain": "Big ideas matter before small edits."
            },
            {
                "q": "12th grade study skills: What is time blocking?",
                "choices": [
                    "assigning specific time blocks to tasks",
                    "doing everything at once",
                    "waiting for motivation",
                    "never taking breaks"
                ],
                "answer": "assigning specific time blocks to tasks",
                "explain": "Time blocking protects focus."
            },
            {
                "q": "12th grade study skills: What is reflection in learning?",
                "choices": [
                    "thinking about what worked and what to improve",
                    "complaining only",
                    "forgetting feedback",
                    "counting pages"
                ],
                "answer": "thinking about what worked and what to improve",
                "explain": "Reflection guides next steps."
            }
        ]
    }
};

  const usedQueues = {};

  function questionsFor(subject, grade) {
    return (gradeQuestionBank[String(grade)] && gradeQuestionBank[String(grade)][subject])
      || questionBank[band(grade)][subject]
      || questionBank.middle[subject];
  }

  function shuffled(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function pickQuestion(subject, grade) {
    const key = `${grade}-${subject}`;
    if (!usedQueues[key] || usedQueues[key].length === 0) {
      usedQueues[key] = shuffled(questionsFor(subject, grade));
    }
    return usedQueues[key].pop();
  }

  function blankStats() {
    const blank = {};
    Object.keys(subjects).forEach((key) => {
      blank[key] = { correct: 0, total: 0 };
    });
    return blank;
  }

  function loadStats() {
    try {
      return JSON.parse(localStorage.getItem("sbgV7Stats")) || blankStats();
    } catch {
      return blankStats();
    }
  }

  let stats = loadStats();
  let xp = Number(localStorage.getItem("sbgV7XP") || 0);
  let tokens = Number(localStorage.getItem("sbgV7Tokens") || 0);
  let grade = Number(localStorage.getItem("sbgV7Grade") || 6);
  let subject = "";
  let current = null;
  let selected = "";
  let reps = 0;
  let repSubject = "";
  let timer = null;
  let gameScore = 0;
  let gameTime = 20;

  function save() {
    localStorage.setItem("sbgV7Stats", JSON.stringify(stats));
    localStorage.setItem("sbgV7XP", String(xp));
    localStorage.setItem("sbgV7Tokens", String(tokens));
    localStorage.setItem("sbgV7Grade", String(grade));
  }

  function accuracy(key) {
    return stats[key].total ? Math.round((stats[key].correct / stats[key].total) * 100) : null;
  }

  function strongWeak() {
    const attempted = Object.keys(stats).filter((key) => stats[key].total > 0);
    if (!attempted.length) return { strong: null, weak: null };
    attempted.sort((a, b) => accuracy(b) - accuracy(a));
    return { strong: attempted[0], weak: attempted[attempted.length - 1] };
  }

  function renderProgress() {
    const box = $("progress-list");
    box.innerHTML = "";

    Object.keys(subjects).forEach((key) => {
      const percent = accuracy(key) || 0;
      const row = document.createElement("div");
      row.className = "progress-row";
      row.innerHTML = `
        <div class="progress-name">${subjects[key]}</div>
        <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
        <div class="progress-score">${stats[key].correct}/${stats[key].total}</div>
      `;
      box.appendChild(row);
    });
  }

  function updateDashboard() {
    const sw = strongWeak();

    $("hero-grade").textContent = label(grade);
    $("grade-select").value = grade;
    $("grade-message").textContent = `Current training level: ${label(grade)} grade. Every grade from 1st to 12th has its own 10-question subject banks.`;
    $("xp-total").textContent = xp;
    $("token-count").textContent = tokens;
    $("strongest-subject").textContent = sw.strong ? subjects[sw.strong] : "None";
    $("weakest-subject").textContent = sw.weak ? subjects[sw.weak] : "None";
    $("today-title").textContent = subject ? `${subjects[subject]} Workout` : (sw.weak ? `Recommended: ${subjects[sw.weak]}` : "Choose a subject station");
    $("level-title").textContent = `Master ${label(grade)} grade`;

    renderProgress();
    makeCoachPrompt();

    $("game-status").textContent = tokens > 0
      ? `You have ${tokens} game token(s). One token unlocks one game.`
      : "Finish a workout to earn a game token.";
  }

  function updateMeter() {
    $("rep-count").textContent = `${reps}/${WORKOUT_REPS}`;
    $("rep-fill").style.width = `${(reps / WORKOUT_REPS) * 100}%`;
  }

  function renderQuestion() {
    if (!subject) {
      $("question-text").textContent = "Pick a subject station to start.";
      $("choices").innerHTML = "";
      return;
    }

    current = pickQuestion(subject, grade);
    selected = "";
    $("question-text").textContent = current.q;
    $("choices").innerHTML = "";
    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("explanation").textContent = "";

    current.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice";
      button.textContent = choice;
      button.addEventListener("click", () => {
        selected = choice;
        document.querySelectorAll(".choice").forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
      });
      $("choices").appendChild(button);
    });

    updateMeter();
  }

  function chooseSubject(subjectKey) {
    subject = subjectKey;

    if (repSubject !== subjectKey) {
      repSubject = subjectKey;
      reps = 0;
    }

    document.querySelectorAll(".station-card").forEach((card) => {
      card.classList.toggle("active", card.dataset.subject === subjectKey);
    });

    $("subject-title").textContent = `${subjects[subjectKey]} Station`;
    $("today-subtitle").textContent = `${desc[subjectKey]} Current difficulty: true ${label(grade)} grade questions.`;
    renderQuestion();
    updateDashboard();
    document.querySelector('[data-tab="workout"]').click();
  }

  function checkAnswer() {
    if (!current || !subject) {
      $("feedback").textContent = "Pick a subject station first.";
      $("feedback").className = "feedback wrong";
      return;
    }

    if (!selected) {
      $("feedback").textContent = "Pick an answer first.";
      $("feedback").className = "feedback wrong";
      return;
    }

    stats[subject].total += 1;
    reps += 1;

    if (selected === current.answer) {
      stats[subject].correct += 1;
      xp += 10;
      $("feedback").textContent = "Correct rep! +10 XP 💪";
      $("feedback").className = "feedback correct";
    } else {
      $("feedback").textContent = `Not yet. Correct answer: ${current.answer}`;
      $("feedback").className = "feedback wrong";
    }

    $("explanation").textContent = current.explain;

    if (reps >= WORKOUT_REPS) {
      tokens += 1;
      $("feedback").textContent += " Workout complete! You earned 1 game token 🎮";
      reps = 0;
    }

    save();
    updateDashboard();
    updateMeter();
  }

  function saveGrade() {
    const newGrade = Number($("grade-select").value);

    if (newGrade !== grade) {
      grade = newGrade;
      stats = blankStats();
      reps = 0;
      subject = "";
      repSubject = "";
      current = null;
      selected = "";
      Object.keys(usedQueues).forEach((key) => delete usedQueues[key]);

      $("subject-title").textContent = "No station selected";
      $("question-text").textContent = "Pick a subject station to start.";
      $("choices").innerHTML = "";
      $("feedback").textContent = "";
      $("explanation").textContent = "";
      document.querySelectorAll(".station-card").forEach((card) => card.classList.remove("active"));
      $("level-message").textContent = `Grade changed to ${label(grade)}. Progress reset for this level.`;
    }

    save();
    updateDashboard();
  }

  function canLevelUp() {
    return Object.keys(subjects).every((key) => stats[key].total >= WORKOUT_REPS && (accuracy(key) || 0) >= 80);
  }

  function levelUp() {
    if (canLevelUp()) {
      grade = Math.min(12, grade + 1);
      stats = blankStats();
      reps = 0;
      Object.keys(usedQueues).forEach((key) => delete usedQueues[key]);
      $("level-message").textContent = `Amazing! You unlocked ${label(grade)} grade training.`;
    } else {
      $("level-message").textContent = "Not yet. Complete 10 questions in every subject and reach 80% accuracy in each one.";
    }

    save();
    updateDashboard();
  }

  function resetData() {
    stats = blankStats();
    xp = 0;
    tokens = 0;
    grade = 6;
    subject = "";
    current = null;
    selected = "";
    reps = 0;
    repSubject = "";
    Object.keys(usedQueues).forEach((key) => delete usedQueues[key]);

    save();
    $("subject-title").textContent = "No station selected";
    $("question-text").textContent = "Pick a subject station to start.";
    $("choices").innerHTML = "";
    $("feedback").textContent = "";
    $("explanation").textContent = "";
    $("level-message").textContent = "Data reset.";
    document.querySelectorAll(".station-card").forEach((card) => card.classList.remove("active"));
    updateDashboard();
    updateMeter();
  }

  function makeCoachPrompt() {
    const sw = strongWeak();
    const target = subject || sw.weak || "math";
    const percent = accuracy(target);

    $("coach-prompt").value = `You are my friendly study coach.

I am training in Study Brain Gym.
Current grade level: ${label(grade)} grade
Question difficulty: true ${label(grade)} grade bank
Focus subject: ${subjects[target]}
Current score in this subject: ${percent === null ? "not enough practice yet" : percent + "%"}
Coach style: ${$("coach-style").value}

Please help me study this subject at my current grade level.

Use this format:
1. Explain one important idea in simple words.
2. Show one grade-appropriate example.
3. Give me 10 practice questions at this grade level.
4. Give hints before answers.
5. After I answer, check my work and explain mistakes kindly.
6. End with one tiny homework mission.

Make it feel like a workout with reps, sets, and encouragement.`;
  }

  function switchTab(tab) {
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === tab);
    });

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === tab);
    });
  }

  function moveStar() {
    const field = $("star-field");
    const star = $("star");
    star.style.left = `${Math.random() * Math.max(0, field.clientWidth - 80)}px`;
    star.style.top = `${Math.random() * Math.max(0, field.clientHeight - 80)}px`;
  }

  function startGame() {
    if (tokens <= 0) {
      $("game-status").textContent = "No token yet. Finish a 5-rep workout first.";
      return;
    }

    tokens -= 1;
    gameScore = 0;
    gameTime = 20;
    $("game-score").textContent = 0;
    $("game-time").textContent = 20;
    $("game-area").classList.remove("locked");
    save();
    updateDashboard();
    moveStar();

    clearInterval(timer);
    timer = setInterval(() => {
      gameTime -= 1;
      $("game-time").textContent = gameTime;

      if (gameTime <= 0) {
        clearInterval(timer);
        $("game-area").classList.add("locked");
        $("game-status").textContent = `Game over! Final score: ${gameScore}. Finish another workout to play again.`;
      }
    }, 1000);
  }

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });

  document.querySelectorAll(".station-card").forEach((card) => {
    card.addEventListener("click", () => chooseSubject(card.dataset.subject));
  });

  $("save-grade").addEventListener("click", saveGrade);
  $("check-answer").addEventListener("click", checkAnswer);
  $("next-question").addEventListener("click", renderQuestion);
  $("check-level-up").addEventListener("click", levelUp);
  $("reset-progress").addEventListener("click", resetData);
  $("make-coach-prompt").addEventListener("click", makeCoachPrompt);
  $("coach-style").addEventListener("change", makeCoachPrompt);
  $("start-game").addEventListener("click", startGame);
  $("star").addEventListener("click", () => {
    gameScore += 1;
    $("game-score").textContent = gameScore;
    moveStar();
  });

  updateDashboard();
  updateMeter();
});