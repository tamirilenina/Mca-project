import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backendconfig.settings")
django.setup()

from quiz.models import Category, SubCategory, Question


questions_data = {
    "Logical Reasoning": {
        "Verbal Reasoning": [
            {
                "question": "Choose the odd word.",
                "options": ["Apple", "Banana", "Carrot", "Mango"],
                "answer": "Carrot",
                "explanation": "Carrot is a vegetable, others are fruits."
            },
            {
                "question": "Book is to Reading as Pen is to?",
                "options": ["Writing", "Drawing", "Paper", "Ink"],
                "answer": "Writing",
                "explanation": "A pen is mainly used for writing."
            },
            {
                "question": "Find the synonym of 'Happy'.",
                "options": ["Sad", "Joyful", "Angry", "Weak"],
                "answer": "Joyful",
                "explanation": "Joyful means happy."
            },
            {
                "question": "Find the antonym of 'Fast'.",
                "options": ["Quick", "Rapid", "Slow", "Swift"],
                "answer": "Slow",
                "explanation": "Slow is the opposite of fast."
            },
            {
                "question": "If all roses are flowers, then rose is a?",
                "options": ["Flower", "Tree", "Fruit", "Seed"],
                "answer": "Flower",
                "explanation": "Rose is a type of flower."
            },
        ],

        "Analytical Reasoning": [
            {
                "question": "If 2, 4, 8, 16, then next number is?",
                "options": ["18", "24", "32", "30"],
                "answer": "32",
                "explanation": "Each number is doubled."
            },
            {
                "question": "Which comes next: A, C, E, G, ?",
                "options": ["H", "I", "J", "K"],
                "answer": "I",
                "explanation": "Letters increase by 2 positions."
            },
            {
                "question": "If all cats are animals and all animals are living beings, then cats are?",
                "options": ["Machines", "Living beings", "Plants", "Birds"],
                "answer": "Living beings",
                "explanation": "Cats are animals, so they are living beings."
            },
            {
                "question": "Complete the pattern: 3, 6, 9, 12, ?",
                "options": ["14", "15", "16", "18"],
                "answer": "15",
                "explanation": "The pattern increases by 3."
            },
            {
                "question": "Which number does not belong: 2, 4, 6, 9, 10?",
                "options": ["2", "4", "6", "9"],
                "answer": "9",
                "explanation": "9 is odd; the others are even."
            },
        ],

        "Number Series": [
            {
                "question": "Find the next number: 1, 3, 5, 7, ?",
                "options": ["8", "9", "10", "11"],
                "answer": "9",
                "explanation": "The series increases by 2."
            },
            {
                "question": "Find the next number: 2, 4, 8, 16, ?",
                "options": ["24", "30", "32", "36"],
                "answer": "32",
                "explanation": "The series doubles each time."
            },
            {
                "question": "Find the missing number: 5, 10, 15, ?, 25",
                "options": ["18", "19", "20", "21"],
                "answer": "20",
                "explanation": "The series increases by 5."
            },
            {
                "question": "Find the next number: 10, 20, 30, 40, ?",
                "options": ["45", "50", "60", "55"],
                "answer": "50",
                "explanation": "The series increases by 10."
            },
            {
                "question": "Find the next number: 1, 4, 9, 16, ?",
                "options": ["20", "25", "30", "36"],
                "answer": "25",
                "explanation": "These are square numbers."
            },
        ],

        "Coding Decoding": [
            {
                "question": "If CAT = DBU, then DOG = ?",
                "options": ["EPH", "EOH", "EPG", "FPH"],
                "answer": "EPH",
                "explanation": "Each letter is shifted by 1."
            },
            {
                "question": "If BAT = 231, then TAB = ?",
                "options": ["132", "312", "213", "321"],
                "answer": "132",
                "explanation": "Reverse the same coding."
            },
            {
                "question": "If A = 1, B = 2, C = 3, then CAB = ?",
                "options": ["312", "321", "213", "231"],
                "answer": "312",
                "explanation": "C=3, A=1, B=2."
            },
            {
                "question": "If PEN = QFO, then BOOK = ?",
                "options": ["CPPL", "CPPM", "DQQM", "CPQK"],
                "answer": "CPPL",
                "explanation": "Each letter moves one step ahead."
            },
            {
                "question": "If MANGO is coded as NBOHP, then APPLE is coded as?",
                "options": ["BQQMF", "BQQMD", "CPQMF", "APPMF"],
                "answer": "BQQMF",
                "explanation": "Each letter is shifted by one."
            },
        ],

        "Blood Relations": [
            {
                "question": "My mother's son is my?",
                "options": ["Brother", "Uncle", "Father", "Grandfather"],
                "answer": "Brother",
                "explanation": "Mother's son is brother."
            },
            {
                "question": "My father's brother is my?",
                "options": ["Uncle", "Brother", "Cousin", "Nephew"],
                "answer": "Uncle",
                "explanation": "Father's brother is uncle."
            },
            {
                "question": "My sister's daughter is my?",
                "options": ["Niece", "Cousin", "Aunt", "Mother"],
                "answer": "Niece",
                "explanation": "Sister's daughter is niece."
            },
            {
                "question": "My brother's son is my?",
                "options": ["Nephew", "Uncle", "Cousin", "Grandson"],
                "answer": "Nephew",
                "explanation": "Brother's son is nephew."
            },
            {
                "question": "My father's father is my?",
                "options": ["Grandfather", "Uncle", "Brother", "Father"],
                "answer": "Grandfather",
                "explanation": "Father's father is grandfather."
            },
        ],
    },

    "English": {
        "Grammar": [
            {
                "question": "Choose correct sentence.",
                "options": [
                    "She go to school.",
                    "She goes to school.",
                    "She going to school.",
                    "She gone to school.",
                ],
                "answer": "She goes to school.",
                "explanation": "Subject-verb agreement is correct."
            },
            {
                "question": "Choose correct article: ___ apple",
                "options": ["a", "an", "the", "none"],
                "answer": "an",
                "explanation": "Use 'an' before vowel sound."
            },
            {
                "question": "Past tense of go?",
                "options": ["goed", "went", "gone", "goes"],
                "answer": "went",
                "explanation": "Past tense of go is went."
            },
            {
                "question": "Plural of child?",
                "options": ["childs", "children", "childrens", "childes"],
                "answer": "children",
                "explanation": "Children is the correct plural."
            },
            {
                "question": "Helping verb in 'They are playing' is?",
                "options": ["They", "are", "playing", "none"],
                "answer": "are",
                "explanation": "'Are' is the helping verb."
            },
        ],

        "Vocabulary": [
            {
                "question": "Synonym of Big",
                "options": ["Small", "Large", "Tiny", "Short"],
                "answer": "Large",
                "explanation": "Large means big."
            },
            {
                "question": "Antonym of Happy",
                "options": ["Sad", "Joyful", "Proud", "Excited"],
                "answer": "Sad",
                "explanation": "Sad is the opposite of happy."
            },
            {
                "question": "Synonym of Quick",
                "options": ["Slow", "Fast", "Late", "Weak"],
                "answer": "Fast",
                "explanation": "Fast means quick."
            },
            {
                "question": "Antonym of Strong",
                "options": ["Powerful", "Weak", "Big", "Fit"],
                "answer": "Weak",
                "explanation": "Weak is the opposite of strong."
            },
            {
                "question": "Meaning of Ancient",
                "options": ["Modern", "Old", "Fast", "Bright"],
                "answer": "Old",
                "explanation": "Ancient means very old."
            },
        ],

        "Sentence Correction": [
            {
                "question": "Choose correct sentence.",
                "options": [
                    "He don't like tea.",
                    "He doesn't likes tea.",
                    "He doesn't like tea.",
                    "He not like tea.",
                ],
                "answer": "He doesn't like tea.",
                "explanation": "This sentence is grammatically correct."
            },
            {
                "question": "Choose correct sentence.",
                "options": [
                    "I has a pen.",
                    "I have a pen.",
                    "I having a pen.",
                    "I hads a pen.",
                ],
                "answer": "I have a pen.",
                "explanation": "This sentence is correct."
            },
            {
                "question": "Choose correct sentence.",
                "options": [
                    "She are dancing.",
                    "She is dancing.",
                    "She am dancing.",
                    "She be dancing.",
                ],
                "answer": "She is dancing.",
                "explanation": "This is the correct sentence."
            },
            {
                "question": "Choose correct sentence.",
                "options": [
                    "They was late.",
                    "They were late.",
                    "They is late.",
                    "They be late.",
                ],
                "answer": "They were late.",
                "explanation": "Plural subject takes 'were'."
            },
            {
                "question": "Choose correct sentence.",
                "options": [
                    "We goes home.",
                    "We go home.",
                    "We going home.",
                    "We goed home.",
                ],
                "answer": "We go home.",
                "explanation": "This is grammatically correct."
            },
        ],

        "Reading Comprehension": [
            {
                "question": "Reading helps improve?",
                "options": ["Only writing", "Only math", "Knowledge and language", "Only sports"],
                "answer": "Knowledge and language",
                "explanation": "Reading improves knowledge and language."
            },
            {
                "question": "Main idea of a passage means?",
                "options": ["Small detail", "Central point", "First word", "Last line"],
                "answer": "Central point",
                "explanation": "Main idea means central point."
            },
            {
                "question": "Skimming means?",
                "options": ["Reading quickly for main idea", "Writing slowly", "Ignoring passage", "Only speaking"],
                "answer": "Reading quickly for main idea",
                "explanation": "Skimming is quick reading for gist."
            },
            {
                "question": "Scanning means?",
                "options": ["Looking for specific information", "Drawing", "Sleeping", "Summarizing only"],
                "answer": "Looking for specific information",
                "explanation": "Scanning is used to find specific information."
            },
            {
                "question": "Good reading habit improves?",
                "options": ["Vocabulary", "Understanding", "Thinking", "All of these"],
                "answer": "All of these",
                "explanation": "Reading improves all these skills."
            },
        ],

        "Synonyms and Antonyms": [
            {
                "question": "Synonym of Begin",
                "options": ["End", "Start", "Stop", "Close"],
                "answer": "Start",
                "explanation": "Start means begin."
            },
            {
                "question": "Antonym of Clean",
                "options": ["Fresh", "Dirty", "Pure", "Bright"],
                "answer": "Dirty",
                "explanation": "Dirty is the opposite of clean."
            },
            {
                "question": "Synonym of Smart",
                "options": ["Clever", "Dull", "Weak", "Slow"],
                "answer": "Clever",
                "explanation": "Clever means smart."
            },
            {
                "question": "Antonym of Early",
                "options": ["Late", "Fast", "Soon", "Near"],
                "answer": "Late",
                "explanation": "Late is the opposite of early."
            },
            {
                "question": "Synonym of Brave",
                "options": ["Fearful", "Courageous", "Lazy", "Angry"],
                "answer": "Courageous",
                "explanation": "Courageous means brave."
            },
        ],
    },

    "Physics": {
        "Heat and Thermodynamics": [
            {
                "question": "SI unit of temperature?",
                "options": ["Kelvin", "Watt", "Joule", "Pascal"],
                "answer": "Kelvin",
                "explanation": "Kelvin is the SI unit of temperature."
            },
            {
                "question": "Boiling point of water in Celsius?",
                "options": ["50", "75", "100", "120"],
                "answer": "100",
                "explanation": "Water boils at 100°C."
            },
            {
                "question": "Freezing point of water?",
                "options": ["0°C", "10°C", "25°C", "50°C"],
                "answer": "0°C",
                "explanation": "Water freezes at 0°C."
            },
            {
                "question": "Heat flows from?",
                "options": ["Cold to hot", "Hot to cold", "Up to down", "Down to up"],
                "answer": "Hot to cold",
                "explanation": "Heat naturally flows from hot to cold."
            },
            {
                "question": "Device used to measure temperature?",
                "options": ["Ammeter", "Thermometer", "Barometer", "Compass"],
                "answer": "Thermometer",
                "explanation": "Thermometer measures temperature."
            },
        ],

        "Light and Optics": [
            {
                "question": "Speed of light is highest in?",
                "options": ["Water", "Air", "Vacuum", "Glass"],
                "answer": "Vacuum",
                "explanation": "Light travels fastest in vacuum."
            },
            {
                "question": "Mirror forms image by?",
                "options": ["Refraction", "Reflection", "Diffusion", "Dispersion"],
                "answer": "Reflection",
                "explanation": "Mirrors form images by reflection."
            },
            {
                "question": "Rainbow forms due to?",
                "options": ["Reflection only", "Dispersion of light", "Gravity", "Magnetism"],
                "answer": "Dispersion of light",
                "explanation": "Rainbow is due to dispersion of light."
            },
            {
                "question": "Lens used to correct myopia?",
                "options": ["Convex", "Concave", "Plane", "None"],
                "answer": "Concave",
                "explanation": "Concave lens corrects myopia."
            },
            {
                "question": "White light has how many colors?",
                "options": ["5", "6", "7", "8"],
                "answer": "7",
                "explanation": "White light has 7 colors."
            },
        ],

        "Modern Physics": [
            {
                "question": "Father of modern physics?",
                "options": ["Newton", "Einstein", "Faraday", "Bohr"],
                "answer": "Einstein",
                "explanation": "Einstein is often called the father of modern physics."
            },
            {
                "question": "E = mc² was given by?",
                "options": ["Newton", "Einstein", "Tesla", "Galileo"],
                "answer": "Einstein",
                "explanation": "Einstein gave E = mc²."
            },
            {
                "question": "Electron was discovered by?",
                "options": ["Rutherford", "Thomson", "Bohr", "Einstein"],
                "answer": "Thomson",
                "explanation": "J. J. Thomson discovered the electron."
            },
            {
                "question": "Atom has nucleus discovered by?",
                "options": ["Bohr", "Thomson", "Rutherford", "Faraday"],
                "answer": "Rutherford",
                "explanation": "Rutherford discovered the nucleus."
            },
            {
                "question": "SI unit of radioactivity is?",
                "options": ["Tesla", "Becquerel", "Volt", "Newton"],
                "answer": "Becquerel",
                "explanation": "Becquerel is the SI unit of radioactivity."
            },
        ],
    },

    "Biology": {
        "Botany": [
            {
                "question": "Plants prepare food by?",
                "options": ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
                "answer": "Photosynthesis",
                "explanation": "Plants make food by photosynthesis."
            },
            {
                "question": "Green pigment in plants is?",
                "options": ["Haemoglobin", "Chlorophyll", "Plasma", "Enzyme"],
                "answer": "Chlorophyll",
                "explanation": "Chlorophyll gives green color to plants."
            },
            {
                "question": "Which part absorbs water?",
                "options": ["Leaf", "Stem", "Root", "Flower"],
                "answer": "Root",
                "explanation": "Roots absorb water."
            },
            {
                "question": "Seeds are found inside?",
                "options": ["Roots", "Leaves", "Fruits", "Stem"],
                "answer": "Fruits",
                "explanation": "Seeds are usually found inside fruits."
            },
            {
                "question": "Cactus grows in?",
                "options": ["Forest", "Desert", "River", "Snow"],
                "answer": "Desert",
                "explanation": "Cactus grows in desert."
            },
        ],

        "Human Biology": [
            {
                "question": "Heart has how many chambers?",
                "options": ["2", "3", "4", "5"],
                "answer": "4",
                "explanation": "Human heart has 4 chambers."
            },
            {
                "question": "Lungs help in?",
                "options": ["Digestion", "Breathing", "Thinking", "Walking"],
                "answer": "Breathing",
                "explanation": "Lungs help in breathing."
            },
            {
                "question": "Adult human body has how many bones?",
                "options": ["206", "201", "210", "250"],
                "answer": "206",
                "explanation": "Adult human body has 206 bones."
            },
            {
                "question": "Blood is pumped by?",
                "options": ["Brain", "Heart", "Liver", "Kidney"],
                "answer": "Heart",
                "explanation": "Heart pumps blood."
            },
            {
                "question": "Vitamin produced in sunlight?",
                "options": ["A", "B", "C", "D"],
                "answer": "D",
                "explanation": "Vitamin D is produced with sunlight exposure."
            },
        ],

        "Zoology": [
            {
                "question": "Study of animals is called?",
                "options": ["Botany", "Zoology", "Ecology", "Geology"],
                "answer": "Zoology",
                "explanation": "Zoology is the study of animals."
            },
            {
                "question": "Which is a mammal?",
                "options": ["Shark", "Frog", "Whale", "Lizard"],
                "answer": "Whale",
                "explanation": "Whale is a mammal."
            },
            {
                "question": "Birds lay?",
                "options": ["Eggs", "Seeds", "Leaves", "Milk"],
                "answer": "Eggs",
                "explanation": "Birds lay eggs."
            },
            {
                "question": "Frog belongs to?",
                "options": ["Amphibians", "Reptiles", "Mammals", "Birds"],
                "answer": "Amphibians",
                "explanation": "Frog is an amphibian."
            },
            {
                "question": "Animal known as king of jungle?",
                "options": ["Tiger", "Lion", "Elephant", "Leopard"],
                "answer": "Lion",
                "explanation": "Lion is called king of jungle."
            },
        ],

        "Genetics": [
            {
                "question": "Genetics is the study of?",
                "options": ["Heredity", "Motion", "Heat", "Plants only"],
                "answer": "Heredity",
                "explanation": "Genetics studies heredity."
            },
            {
                "question": "DNA stands for?",
                "options": [
                    "Deoxyribonucleic Acid",
                    "Dynamic Nuclear Atom",
                    "Digital Network Array",
                    "Double Nitrogen Acid",
                ],
                "answer": "Deoxyribonucleic Acid",
                "explanation": "DNA stands for Deoxyribonucleic Acid."
            },
            {
                "question": "Genes are found in?",
                "options": ["Chromosomes", "Leaves", "Stones", "Clouds"],
                "answer": "Chromosomes",
                "explanation": "Genes are found in chromosomes."
            },
            {
                "question": "Traits pass from parents through?",
                "options": ["Genes", "Shoes", "Food", "Water"],
                "answer": "Genes",
                "explanation": "Traits pass through genes."
            },
            {
                "question": "Eye color is an example of?",
                "options": ["Inherited trait", "Chemical change", "Force", "Energy"],
                "answer": "Inherited trait",
                "explanation": "Eye color is an inherited trait."
            },
        ],
    },
}


for category_name, subcategories in questions_data.items():
    category = Category.objects.filter(name=category_name).first()
    if not category:
        print(f"Category not found: {category_name}")
        continue

    for subcategory_name, questions in subcategories.items():
        subcategory = SubCategory.objects.filter(category=category, name=subcategory_name).first()
        if not subcategory:
            print(f"Subcategory not found: {category_name} -> {subcategory_name}")
            continue

        for q in questions:
            exists = Question.objects.filter(
                subcategory=subcategory,
                question_text=q["question"]
            ).exists()

            if not exists:
                Question.objects.create(
                    subcategory=subcategory,
                    question_text=q["question"],
                    option1=q["options"][0],
                    option2=q["options"][1],
                    option3=q["options"][2],
                    option4=q["options"][3],
                    correct_answer=q["answer"],
                    explanation=q["explanation"]
                )
                print(f"Added: {subcategory.name} -> {q['question']}")
            else:
                print(f"Already exists: {subcategory.name} -> {q['question']}")

print("Done! Remaining questions added successfully.")