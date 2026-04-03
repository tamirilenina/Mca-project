import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backendconfig.settings")
django.setup()

from quiz.models import SubCategory, Question

questions_data = {
    "World Geography": [
        {
            "question_text": "What is the capital of India?",
            "options": ["Delhi", "Mumbai", "Chennai", "Hyderabad"],
            "answer": "Delhi"
        },
        {
            "question_text": "Which is the largest continent?",
            "options": ["Africa", "Asia", "Europe", "Australia"],
            "answer": "Asia"
        },
        {
            "question_text": "Which ocean is the largest?",
            "options": ["Atlantic", "Indian", "Pacific", "Arctic"],
            "answer": "Pacific"
        },
        {
            "question_text": "Mount Everest is in which mountain range?",
            "options": ["Andes", "Alps", "Himalayas", "Rockies"],
            "answer": "Himalayas"
        },
        {
            "question_text": "Which country is called Land of the Rising Sun?",
            "options": ["China", "Japan", "Thailand", "Korea"],
            "answer": "Japan"
        },
    ],

    "History": [
        {
            "question_text": "Who built the Taj Mahal?",
            "options": ["Akbar", "Shah Jahan", "Babur", "Humayun"],
            "answer": "Shah Jahan"
        },
        {
            "question_text": "India got independence in?",
            "options": ["1945", "1946", "1947", "1950"],
            "answer": "1947"
        },
        {
            "question_text": "Who was the first Prime Minister of India?",
            "options": ["Nehru", "Patel", "Gandhi", "Rajendra Prasad"],
            "answer": "Nehru"
        },
        {
            "question_text": "Who discovered sea route to India?",
            "options": ["Columbus", "Vasco da Gama", "Cook", "Magellan"],
            "answer": "Vasco da Gama"
        },
        {
            "question_text": "Who is known as Iron Man of India?",
            "options": ["Patel", "Nehru", "Bose", "Tilak"],
            "answer": "Patel"
        },
    ],

    "Science and Technology": [
        {
            "question_text": "Who invented the telephone?",
            "options": ["Bell", "Newton", "Tesla", "Edison"],
            "answer": "Bell"
        },
        {
            "question_text": "Which planet is called Red Planet?",
            "options": ["Earth", "Mars", "Jupiter", "Venus"],
            "answer": "Mars"
        },
        {
            "question_text": "Which gas is essential for breathing?",
            "options": ["Hydrogen", "Nitrogen", "Oxygen", "Helium"],
            "answer": "Oxygen"
        },
        {
            "question_text": "CPU stands for?",
            "options": [
                "Central Process Unit",
                "Central Processing Unit",
                "Computer Processing Unit",
                "Control Power Unit"
            ],
            "answer": "Central Processing Unit"
        },
        {
            "question_text": "AI stands for?",
            "options": [
                "Automatic Intelligence",
                "Artificial Intelligence",
                "Advanced Internet",
                "Artificial Internet"
            ],
            "answer": "Artificial Intelligence"
        },
    ],

    "Politics and Economics": [
        {
            "question_text": "Who is the head of the Indian government?",
            "options": ["President", "Prime Minister", "Chief Justice", "Governor"],
            "answer": "Prime Minister"
        },
        {
            "question_text": "Indian currency is?",
            "options": ["Dollar", "Rupee", "Euro", "Yen"],
            "answer": "Rupee"
        },
        {
            "question_text": "RBI stands for?",
            "options": [
                "Reserve Bank of India",
                "Rural Bank of India",
                "Regional Bank of India",
                "Revenue Bank of India"
            ],
            "answer": "Reserve Bank of India"
        },
        {
            "question_text": "Lok Sabha members are?",
            "options": ["Nominated", "Elected", "Appointed", "Selected"],
            "answer": "Elected"
        },
        {
            "question_text": "GDP stands for?",
            "options": [
                "Gross Domestic Product",
                "General Domestic Product",
                "Gross Development Plan",
                "General Development Product"
            ],
            "answer": "Gross Domestic Product"
        },
    ],

    "Sports and Games": [
        {
            "question_text": "How many players are there in a cricket team?",
            "options": ["9", "10", "11", "12"],
            "answer": "11"
        },
        {
            "question_text": "National sport of India?",
            "options": ["Cricket", "Football", "Hockey", "Kabaddi"],
            "answer": "Hockey"
        },
        {
            "question_text": "Olympics are held every?",
            "options": ["2 years", "3 years", "4 years", "5 years"],
            "answer": "4 years"
        },
        {
            "question_text": "Which game uses a shuttlecock?",
            "options": ["Tennis", "Badminton", "Football", "Basketball"],
            "answer": "Badminton"
        },
        {
            "question_text": "How many rings are in Olympic symbol?",
            "options": ["4", "5", "6", "7"],
            "answer": "5"
        },
    ],
}

for subcategory_name, questions in questions_data.items():
    try:
        subcategory = SubCategory.objects.get(name=subcategory_name)

        for q in questions:
            question_obj, created = Question.objects.get_or_create(
                subcategory=subcategory,
                question_text=q["question_text"],
                option1=q["options"][0],
                option2=q["options"][1],
                option3=q["options"][2],
                option4=q["options"][3],
                correct_answer=q["answer"],
                defaults={
                    "explanation": ""
                }
            )

            if created:
                print(f"Added: {q['question_text']}")
            else:
                print(f"Already exists: {q['question_text']}")

        print(f"Questions processed for {subcategory_name}")

    except SubCategory.DoesNotExist:
        print(f"SubCategory not found: {subcategory_name}")

print("All questions loaded successfully!")