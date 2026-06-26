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

  const usedQueues = {};

  function questionsFor(subject, grade) {
    return questionBank[band(grade)][subject] || questionBank.middle[subject];
  }

  function shuffled(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function pickQuestion(subject, grade) {
    const key = `${band(grade)}-${subject}`;
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
      return JSON.parse(localStorage.getItem("sbgV5Stats")) || blankStats();
    } catch {
      return blankStats();
    }
  }

  let stats = loadStats();
  let xp = Number(localStorage.getItem("sbgV5XP") || 0);
  let tokens = Number(localStorage.getItem("sbgV5Tokens") || 0);
  let grade = Number(localStorage.getItem("sbgV5Grade") || 6);
  let subject = "";
  let current = null;
  let selected = "";
  let reps = 0;
  let repSubject = "";
  let timer = null;
  let gameScore = 0;
  let gameTime = 20;

  function save() {
    localStorage.setItem("sbgV5Stats", JSON.stringify(stats));
    localStorage.setItem("sbgV5XP", String(xp));
    localStorage.setItem("sbgV5Tokens", String(tokens));
    localStorage.setItem("sbgV5Grade", String(grade));
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
    $("grade-message").textContent = `Current training level: ${label(grade)} grade. Question difficulty: ${band(grade)}.`;
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
    $("rep-count").textContent = `${reps}/5`;
    $("rep-fill").style.width = `${(reps / 5) * 100}%`;
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
    $("today-subtitle").textContent = `${desc[subjectKey]} Current difficulty: ${label(grade)} grade.`;
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

    if (reps >= 5) {
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
    return Object.keys(subjects).every((key) => stats[key].total >= 5 && (accuracy(key) || 0) >= 80);
  }

  function levelUp() {
    if (canLevelUp()) {
      grade = Math.min(12, grade + 1);
      stats = blankStats();
      reps = 0;
      Object.keys(usedQueues).forEach((key) => delete usedQueues[key]);
      $("level-message").textContent = `Amazing! You unlocked ${label(grade)} grade training.`;
    } else {
      $("level-message").textContent = "Not yet. Complete 5 reps in every subject and reach 80% accuracy in each one.";
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
Question difficulty: ${band(grade)}
Focus subject: ${subjects[target]}
Current score in this subject: ${percent === null ? "not enough practice yet" : percent + "%"}
Coach style: ${$("coach-style").value}

Please help me study this subject at my current grade level.

Use this format:
1. Explain one important idea in simple words.
2. Show one grade-appropriate example.
3. Give me 5 practice questions at this grade level.
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