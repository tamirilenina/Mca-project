import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backendconfig.settings")
django.setup()

from quiz.models import Category, SubCategory, Question


questions_data = {
    "General Knowledge": {
        "World Geography": [
            {
                "question": "What is the capital of India?",
                "options": ["Delhi", "Mumbai", "Chennai", "Kolkata"],
                "answer": "Delhi",
                "explanation": "Delhi is the capital of India."
            },
            {
                "question": "Which is the largest continent?",
                "options": ["Asia", "Africa", "Europe", "Australia"],
                "answer": "Asia",
                "explanation": "Asia is the largest continent in the world."
            },
            {
                "question": "Which ocean is the largest?",
                "options": ["Pacific", "Atlantic", "Indian", "Arctic"],
                "answer": "Pacific",
                "explanation": "The Pacific Ocean is the largest ocean on Earth."
            },
            {
                "question": "Mount Everest is located in which mountain range?",
                "options": ["Andes", "Alps", "Himalayas", "Rockies"],
                "answer": "Himalayas",
                "explanation": "Mount Everest is part of the Himalayas."
            },
            {
                "question": "Which country is called the Land of the Rising Sun?",
                "options": ["China", "Japan", "Thailand", "Korea"],
                "answer": "Japan",
                "explanation": "Japan is known as the Land of the Rising Sun."
            },
        ],

        "History": [
            {
                "question": "Who built the Taj Mahal?",
                "options": ["Akbar", "Shah Jahan", "Babur", "Humayun"],
                "answer": "Shah Jahan",
                "explanation": "The Taj Mahal was built by Shah Jahan."
            },
            {
                "question": "India got independence in which year?",
                "options": ["1945", "1946", "1947", "1950"],
                "answer": "1947",
                "explanation": "India became independent in 1947."
            },
            {
                "question": "Who was the first Prime Minister of India?",
                "options": ["Nehru", "Gandhi", "Patel", "Bose"],
                "answer": "Nehru",
                "explanation": "Jawaharlal Nehru was the first Prime Minister of India."
            },
            {
                "question": "Who discovered the sea route to India?",
                "options": ["Columbus", "Vasco da Gama", "Magellan", "Cook"],
                "answer": "Vasco da Gama",
                "explanation": "Vasco da Gama discovered the sea route to India."
            },
            {
                "question": "Who is known as Iron Man of India?",
                "options": ["Patel", "Tilak", "Nehru", "Bose"],
                "answer": "Patel",
                "explanation": "Sardar Vallabhbhai Patel is known as the Iron Man of India."
            },
        ],

        "Science and Technology": [
            {
                "question": "Who invented the telephone?",
                "options": ["Bell", "Newton", "Tesla", "Edison"],
                "answer": "Bell",
                "explanation": "Alexander Graham Bell invented the telephone."
            },
            {
                "question": "Which planet is called Red Planet?",
                "options": ["Mars", "Earth", "Venus", "Jupiter"],
                "answer": "Mars",
                "explanation": "Mars is known as the Red Planet."
            },
            {
                "question": "Which gas is essential for breathing?",
                "options": ["Oxygen", "Hydrogen", "Nitrogen", "Helium"],
                "answer": "Oxygen",
                "explanation": "Oxygen is essential for human breathing."
            },
            {
                "question": "CPU stands for?",
                "options": [
                    "Central Processing Unit",
                    "Central Power Unit",
                    "Computer Processing Unit",
                    "Central Program Unit",
                ],
                "answer": "Central Processing Unit",
                "explanation": "CPU stands for Central Processing Unit."
            },
            {
                "question": "AI stands for?",
                "options": [
                    "Artificial Intelligence",
                    "Automatic Intelligence",
                    "Artificial Internet",
                    "Advanced Internet",
                ],
                "answer": "Artificial Intelligence",
                "explanation": "AI stands for Artificial Intelligence."
            },
        ],

        "Politics and Economics": [
            {
                "question": "Who is the head of the Indian government?",
                "options": ["Prime Minister", "President", "Governor", "Chief Justice"],
                "answer": "Prime Minister",
                "explanation": "The Prime Minister is the head of the Indian government."
            },
            {
                "question": "Indian currency is?",
                "options": ["Rupee", "Dollar", "Yen", "Euro"],
                "answer": "Rupee",
                "explanation": "The currency of India is the Indian Rupee."
            },
            {
                "question": "RBI stands for?",
                "options": [
                    "Reserve Bank of India",
                    "Rural Bank of India",
                    "Regional Bank of India",
                    "Revenue Bank of India",
                ],
                "answer": "Reserve Bank of India",
                "explanation": "RBI stands for Reserve Bank of India."
            },
            {
                "question": "Lok Sabha members are?",
                "options": ["Elected", "Nominated", "Selected", "Appointed"],
                "answer": "Elected",
                "explanation": "Lok Sabha members are elected by the people."
            },
            {
                "question": "GDP stands for?",
                "options": [
                    "Gross Domestic Product",
                    "General Domestic Product",
                    "Gross Development Plan",
                    "General Development Product",
                ],
                "answer": "Gross Domestic Product",
                "explanation": "GDP stands for Gross Domestic Product."
            },
        ],

        "Sports and Games": [
            {
                "question": "How many players are there in a cricket team?",
                "options": ["11", "10", "9", "12"],
                "answer": "11",
                "explanation": "A cricket team has 11 players."
            },
            {
                "question": "National sport of India?",
                "options": ["Hockey", "Cricket", "Football", "Kabaddi"],
                "answer": "Hockey",
                "explanation": "Hockey is commonly regarded as India's national sport in quiz contexts."
            },
            {
                "question": "Olympics are held every?",
                "options": ["4 years", "2 years", "3 years", "5 years"],
                "answer": "4 years",
                "explanation": "The Olympic Games are held every 4 years."
            },
            {
                "question": "Which game uses a shuttlecock?",
                "options": ["Badminton", "Tennis", "Basketball", "Football"],
                "answer": "Badminton",
                "explanation": "A shuttlecock is used in badminton."
            },
            {
                "question": "How many rings are in Olympic symbol?",
                "options": ["5", "4", "6", "7"],
                "answer": "5",
                "explanation": "The Olympic symbol has 5 rings."
            },
        ],
    },

    "Technology": {
        "Computer Basics": [
            {
                "question": "Who is known as the Father of Computer?",
                "options": ["Charles Babbage", "Newton", "Einstein", "Edison"],
                "answer": "Charles Babbage",
                "explanation": "Charles Babbage is known as the Father of Computer."
            },
            {
                "question": "What is the full form of CPU?",
                "options": [
                    "Central Processing Unit",
                    "Central Power Unit",
                    "Computer Processing Unit",
                    "Control Processing Unit",
                ],
                "answer": "Central Processing Unit",
                "explanation": "CPU stands for Central Processing Unit."
            },
            {
                "question": "What is the full form of RAM?",
                "options": [
                    "Random Access Memory",
                    "Read Access Memory",
                    "Run Access Memory",
                    "Random Active Memory",
                ],
                "answer": "Random Access Memory",
                "explanation": "RAM stands for Random Access Memory."
            },
            {
                "question": "Which of these is an input device?",
                "options": ["Keyboard", "Monitor", "Printer", "Speaker"],
                "answer": "Keyboard",
                "explanation": "Keyboard is an input device."
            },
            {
                "question": "Which part of the computer is called the brain?",
                "options": ["CPU", "RAM", "Monitor", "Hard Disk"],
                "answer": "CPU",
                "explanation": "CPU is called the brain of the computer."
            },
        ],

        "Artificial Intelligence": [
            {
                "question": "AI stands for?",
                "options": [
                    "Artificial Intelligence",
                    "Automatic Intelligence",
                    "Artificial Internet",
                    "Advanced Interface",
                ],
                "answer": "Artificial Intelligence",
                "explanation": "AI stands for Artificial Intelligence."
            },
            {
                "question": "Which company developed ChatGPT?",
                "options": ["OpenAI", "Google", "Microsoft", "Meta"],
                "answer": "OpenAI",
                "explanation": "ChatGPT was developed by OpenAI."
            },
            {
                "question": "AI is mainly used for?",
                "options": [
                    "Learning from data",
                    "Only playing games",
                    "Only web browsing",
                    "Only typing",
                ],
                "answer": "Learning from data",
                "explanation": "AI systems often learn from data."
            },
            {
                "question": "Which is an AI assistant?",
                "options": ["ChatGPT", "MS Paint", "Notepad", "Calculator"],
                "answer": "ChatGPT",
                "explanation": "ChatGPT is an AI assistant."
            },
            {
                "question": "Machine learning is a part of?",
                "options": ["Artificial Intelligence", "Networking", "Hardware", "Database"],
                "answer": "Artificial Intelligence",
                "explanation": "Machine learning is a part of AI."
            },
        ],

        "Programming": [
            {
                "question": "Which language is used for web pages?",
                "options": ["HTML", "Python", "C", "Java"],
                "answer": "HTML",
                "explanation": "HTML is used to structure web pages."
            },
            {
                "question": "Python is a?",
                "options": ["Programming language", "Browser", "Database", "OS"],
                "answer": "Programming language",
                "explanation": "Python is a programming language."
            },
            {
                "question": "Which symbol is used for comments in Python?",
                "options": ["#", "//", "/*", "<!--"],
                "answer": "#",
                "explanation": "In Python, comments begin with #."
            },
            {
                "question": "JavaScript is mainly used for?",
                "options": [
                    "Web interactivity",
                    "Only database",
                    "Only operating system",
                    "Only photo editing",
                ],
                "answer": "Web interactivity",
                "explanation": "JavaScript is mainly used to add interactivity to web pages."
            },
            {
                "question": "Which of these is a loop?",
                "options": ["for", "print", "input", "type"],
                "answer": "for",
                "explanation": "for is a loop statement."
            },
        ],

        "Cyber Security": [
            {
                "question": "Strong password should contain?",
                "options": [
                    "Letters, numbers, symbols",
                    "Only numbers",
                    "Only lowercase letters",
                    "Only name",
                ],
                "answer": "Letters, numbers, symbols",
                "explanation": "A strong password should include letters, numbers, and symbols."
            },
            {
                "question": "Phishing is?",
                "options": [
                    "Fake attempt to steal data",
                    "Fishing in river",
                    "Hardware repair",
                    "Software update",
                ],
                "answer": "Fake attempt to steal data",
                "explanation": "Phishing is a fake attempt to steal sensitive data."
            },
            {
                "question": "Antivirus is used for?",
                "options": [
                    "Protecting system",
                    "Playing music",
                    "Drawing images",
                    "Typing documents",
                ],
                "answer": "Protecting system",
                "explanation": "Antivirus software protects the system from threats."
            },
            {
                "question": "OTP means?",
                "options": [
                    "One Time Password",
                    "Only Test Password",
                    "Open Time Password",
                    "One True Password",
                ],
                "answer": "One Time Password",
                "explanation": "OTP stands for One Time Password."
            },
            {
                "question": "Which one is safer?",
                "options": [
                    "Two-factor authentication",
                    "Common password",
                    "Sharing password",
                    "Writing password publicly",
                ],
                "answer": "Two-factor authentication",
                "explanation": "Two-factor authentication provides better security."
            },
        ],

        "Internet and Networking": [
            {
                "question": "WWW stands for?",
                "options": [
                    "World Wide Web",
                    "World Web Wide",
                    "Wide World Web",
                    "Web World Wide",
                ],
                "answer": "World Wide Web",
                "explanation": "WWW stands for World Wide Web."
            },
            {
                "question": "Which device connects a computer to the internet?",
                "options": ["Modem", "Keyboard", "Mouse", "Scanner"],
                "answer": "Modem",
                "explanation": "A modem helps connect a computer to the internet."
            },
            {
                "question": "Wi-Fi is used for?",
                "options": [
                    "Wireless internet connection",
                    "Printing",
                    "Charging battery",
                    "Photo editing",
                ],
                "answer": "Wireless internet connection",
                "explanation": "Wi-Fi is used for wireless internet connectivity."
            },
            {
                "question": "Email is used for?",
                "options": [
                    "Sending messages online",
                    "Cooking",
                    "Drawing",
                    "Gaming only",
                ],
                "answer": "Sending messages online",
                "explanation": "Email is used to send messages online."
            },
            {
                "question": "Which of these is a browser?",
                "options": ["Chrome", "Windows", "Excel", "CPU"],
                "answer": "Chrome",
                "explanation": "Google Chrome is a web browser."
            },
        ],
    },

    "Science": {
        "Physics Basics": [
            {
                "question": "Unit of force is?",
                "options": ["Newton", "Joule", "Watt", "Volt"],
                "answer": "Newton",
                "explanation": "The SI unit of force is Newton."
            },
            {
                "question": "Speed = ?",
                "options": [
                    "Distance / Time",
                    "Time / Distance",
                    "Mass / Volume",
                    "Force / Area",
                ],
                "answer": "Distance / Time",
                "explanation": "Speed is calculated as distance divided by time."
            },
            {
                "question": "SI unit of mass is?",
                "options": ["Kilogram", "Gram", "Meter", "Second"],
                "answer": "Kilogram",
                "explanation": "The SI unit of mass is kilogram."
            },
            {
                "question": "Gravity pulls objects?",
                "options": ["Downward", "Upward", "Sideways", "Outward"],
                "answer": "Downward",
                "explanation": "Gravity pulls objects downward."
            },
            {
                "question": "Sound travels in?",
                "options": ["Waves", "Squares", "Angles", "Circles"],
                "answer": "Waves",
                "explanation": "Sound travels in the form of waves."
            },
        ],

        "Chemistry Basics": [
            {
                "question": "H2O is?",
                "options": ["Water", "Oxygen", "Hydrogen", "Salt"],
                "answer": "Water",
                "explanation": "H2O is the chemical formula for water."
            },
            {
                "question": "pH value less than 7 means?",
                "options": ["Acidic", "Basic", "Neutral", "Salty"],
                "answer": "Acidic",
                "explanation": "A pH value below 7 is acidic."
            },
            {
                "question": "NaCl is common?",
                "options": ["Salt", "Sugar", "Acid", "Base"],
                "answer": "Salt",
                "explanation": "NaCl is common salt."
            },
            {
                "question": "Atom is made of?",
                "options": [
                    "Protons, neutrons, electrons",
                    "Only neutrons",
                    "Only electrons",
                    "Only protons",
                ],
                "answer": "Protons, neutrons, electrons",
                "explanation": "Atoms are made of protons, neutrons, and electrons."
            },
            {
                "question": "Chemical symbol of Oxygen?",
                "options": ["O", "Ox", "Om", "Og"],
                "answer": "O",
                "explanation": "The chemical symbol of Oxygen is O."
            },
        ],

        "Biology Basics": [
            {
                "question": "Basic unit of life is?",
                "options": ["Cell", "Tissue", "Organ", "Bone"],
                "answer": "Cell",
                "explanation": "The cell is the basic unit of life."
            },
            {
                "question": "Humans breathe through?",
                "options": ["Lungs", "Heart", "Kidney", "Liver"],
                "answer": "Lungs",
                "explanation": "Humans breathe through lungs."
            },
            {
                "question": "Plants make food by?",
                "options": ["Photosynthesis", "Respiration", "Digestion", "Absorption"],
                "answer": "Photosynthesis",
                "explanation": "Plants make food through photosynthesis."
            },
            {
                "question": "Blood is pumped by?",
                "options": ["Heart", "Brain", "Lungs", "Stomach"],
                "answer": "Heart",
                "explanation": "The heart pumps blood."
            },
            {
                "question": "Which part of plant absorbs water?",
                "options": ["Roots", "Leaves", "Stem", "Flower"],
                "answer": "Roots",
                "explanation": "Roots absorb water from the soil."
            },
        ],

        "Space Science": [
            {
                "question": "Earth is a?",
                "options": ["Planet", "Star", "Galaxy", "Satellite"],
                "answer": "Planet",
                "explanation": "Earth is a planet."
            },
            {
                "question": "Sun is a?",
                "options": ["Star", "Planet", "Asteroid", "Comet"],
                "answer": "Star",
                "explanation": "The Sun is a star."
            },
            {
                "question": "Moon is Earth's?",
                "options": ["Natural satellite", "Star", "Planet", "Galaxy"],
                "answer": "Natural satellite",
                "explanation": "The Moon is Earth's natural satellite."
            },
            {
                "question": "Which planet has rings?",
                "options": ["Saturn", "Mars", "Venus", "Mercury"],
                "answer": "Saturn",
                "explanation": "Saturn is known for its rings."
            },
            {
                "question": "First man on the Moon?",
                "options": ["Neil Armstrong", "Kalpana Chawla", "Einstein", "Newton"],
                "answer": "Neil Armstrong",
                "explanation": "Neil Armstrong was the first man on the Moon."
            },
        ],

        "Environmental Science": [
            {
                "question": "Plants absorb?",
                "options": ["Carbon dioxide", "Oxygen", "Nitrogen", "Helium"],
                "answer": "Carbon dioxide",
                "explanation": "Plants absorb carbon dioxide for photosynthesis."
            },
            {
                "question": "Deforestation means?",
                "options": [
                    "Cutting trees",
                    "Planting trees",
                    "Cleaning rivers",
                    "Saving animals",
                ],
                "answer": "Cutting trees",
                "explanation": "Deforestation means cutting down trees."
            },
            {
                "question": "Ozone layer protects from?",
                "options": ["UV rays", "Rain", "Wind", "Cold"],
                "answer": "UV rays",
                "explanation": "The ozone layer protects Earth from harmful UV rays."
            },
            {
                "question": "Reduce, Reuse, Recycle is related to?",
                "options": ["Waste management", "Sports", "Cooking", "Farming"],
                "answer": "Waste management",
                "explanation": "Reduce, reuse, recycle are key ideas in waste management."
            },
            {
                "question": "Global warming is caused by?",
                "options": [
                    "Greenhouse gases",
                    "Too much rain",
                    "More stars",
                    "Cold winds",
                ],
                "answer": "Greenhouse gases",
                "explanation": "Greenhouse gases contribute to global warming."
            },
        ],
    },

    "Mathematics": {
        "Arithmetic": [
            {
                "question": "5 + 7 = ?",
                "options": ["12", "10", "13", "11"],
                "answer": "12",
                "explanation": "5 + 7 = 12."
            },
            {
                "question": "15 - 9 = ?",
                "options": ["6", "5", "7", "8"],
                "answer": "6",
                "explanation": "15 - 9 = 6."
            },
            {
                "question": "6 × 4 = ?",
                "options": ["24", "20", "18", "26"],
                "answer": "24",
                "explanation": "6 multiplied by 4 equals 24."
            },
            {
                "question": "20 ÷ 5 = ?",
                "options": ["4", "5", "6", "3"],
                "answer": "4",
                "explanation": "20 divided by 5 equals 4."
            },
            {
                "question": "What is 25% of 100?",
                "options": ["25", "20", "10", "15"],
                "answer": "25",
                "explanation": "25% of 100 is 25."
            },
        ],

        "Algebra": [
            {
                "question": "If x + 5 = 10, x = ?",
                "options": ["5", "10", "15", "0"],
                "answer": "5",
                "explanation": "x = 10 - 5 = 5."
            },
            {
                "question": "If 2x = 8, x = ?",
                "options": ["4", "2", "6", "8"],
                "answer": "4",
                "explanation": "x = 8 ÷ 2 = 4."
            },
            {
                "question": "x² means?",
                "options": ["x times x", "x + x", "2x", "x - x"],
                "answer": "x times x",
                "explanation": "x² means x multiplied by x."
            },
            {
                "question": "If y - 3 = 7, y = ?",
                "options": ["10", "9", "8", "7"],
                "answer": "10",
                "explanation": "y = 7 + 3 = 10."
            },
            {
                "question": "Value of x in x/2 = 6?",
                "options": ["12", "6", "3", "10"],
                "answer": "12",
                "explanation": "x = 6 × 2 = 12."
            },
        ],

        "Geometry": [
            {
                "question": "A triangle has how many sides?",
                "options": ["3", "4", "5", "6"],
                "answer": "3",
                "explanation": "A triangle has 3 sides."
            },
            {
                "question": "A square has how many equal sides?",
                "options": ["4", "3", "2", "1"],
                "answer": "4",
                "explanation": "A square has 4 equal sides."
            },
            {
                "question": "Angle in a straight line is?",
                "options": ["180°", "90°", "360°", "45°"],
                "answer": "180°",
                "explanation": "A straight angle measures 180 degrees."
            },
            {
                "question": "A circle has how many sides?",
                "options": ["0", "1", "2", "4"],
                "answer": "0",
                "explanation": "A circle has no straight sides."
            },
            {
                "question": "A rectangle has opposite sides?",
                "options": ["Equal", "Unequal", "Round", "Curved"],
                "answer": "Equal",
                "explanation": "Opposite sides of a rectangle are equal."
            },
        ],

        "Trigonometry": [
            {
                "question": "Trigonometry mainly deals with?",
                "options": ["Angles and sides", "Only circles", "Only squares", "Only algebra"],
                "answer": "Angles and sides",
                "explanation": "Trigonometry deals with angles and sides of triangles."
            },
            {
                "question": "sin 90° = ?",
                "options": ["1", "0", "2", "-1"],
                "answer": "1",
                "explanation": "sin 90° = 1."
            },
            {
                "question": "cos 0° = ?",
                "options": ["1", "0", "2", "-1"],
                "answer": "1",
                "explanation": "cos 0° = 1."
            },
            {
                "question": "tan 45° = ?",
                "options": ["1", "0", "2", "3"],
                "answer": "1",
                "explanation": "tan 45° = 1."
            },
            {
                "question": "Trigonometry is used in?",
                "options": ["Height and distance", "Cooking", "Painting", "Typing"],
                "answer": "Height and distance",
                "explanation": "Trigonometry is used in height and distance problems."
            },
        ],

        "Statistics": [
            {
                "question": "Mean of 2, 4, 6 is?",
                "options": ["4", "3", "5", "6"],
                "answer": "4",
                "explanation": "Mean = (2 + 4 + 6) / 3 = 4."
            },
            {
                "question": "Median of 1, 3, 5 is?",
                "options": ["3", "1", "5", "4"],
                "answer": "3",
                "explanation": "The middle value is 3."
            },
            {
                "question": "Mode means?",
                "options": [
                    "Most repeated value",
                    "Middle value",
                    "Average value",
                    "Lowest value",
                ],
                "answer": "Most repeated value",
                "explanation": "Mode is the most frequently repeated value."
            },
            {
                "question": "Statistics deals with?",
                "options": ["Data", "Only shapes", "Only equations", "Only numbers table"],
                "answer": "Data",
                "explanation": "Statistics deals with data collection and analysis."
            },
            {
                "question": "Average is also called?",
                "options": ["Mean", "Mode", "Median", "Range"],
                "answer": "Mean",
                "explanation": "Average is also called mean."
            },
        ],
    }
}


def create_category_and_subcategory(category_name, subcategory_name):
    category, _ = Category.objects.get_or_create(name=category_name)
    subcategory, _ = SubCategory.objects.get_or_create(
        category=category,
        name=subcategory_name
    )
    return subcategory


def create_question_if_not_exists(subcategory, q):
    question_text = q["question"]

    if Question.objects.filter(subcategory=subcategory, question_text=question_text).exists():
        print(f"Already exists: {subcategory.name} -> {question_text}")
        return

    Question.objects.create(
        subcategory=subcategory,
        question_text=question_text,
        option1=q["options"][0],
        option2=q["options"][1],
        option3=q["options"][2],
        option4=q["options"][3],
        correct_answer=q["answer"],
        explanation=q.get("explanation", "")
    )
    print(f"Added: {subcategory.name} -> {question_text}")


for category_name, subcategories in questions_data.items():
    for subcategory_name, questions in subcategories.items():
        subcategory = create_category_and_subcategory(category_name, subcategory_name)
        for q in questions:
            create_question_if_not_exists(subcategory, q)

print("All questions loaded successfully!")