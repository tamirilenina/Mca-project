import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backendconfig.settings")
django.setup()

from quiz.models import Category, SubCategory

data = {
    "Technology": [
        "Computer Basics",
        "Artificial Intelligence",
        "Programming",
        "Cyber Security",
        "Internet and Networking",
    ],
    "Science": [
        "Physics Basics",
        "Chemistry Basics",
        "Biology Basics",
        "Space Science",
        "Environmental Science",
    ],
    "Mathematics": [
        "Arithmetic",
        "Algebra",
        "Geometry",
        "Trigonometry",
        "Statistics",
    ],
    "Logical Reasoning": [
        "Verbal Reasoning",
        "Analytical Reasoning",
        "Number Series",
        "Coding Decoding",
        "Blood Relations",
    ],
    "English": [
        "Grammar",
        "Vocabulary",
        "Sentence Correction",
        "Reading Comprehension",
        "Synonyms and Antonyms",
    ],
    "Physics": [
        "Mechanics",
        "Electromagnetism",
        "Heat and Thermodynamics",
        "Light and Optics",
        "Modern Physics",
    ],
    "Biology": [
        "Botany",
        "Human Biology",
        "Zoology",
        "Genetics",
    ],
}

for category_name, subcategories in data.items():
    category_obj, _ = Category.objects.get_or_create(name=category_name)

    for sub_name in subcategories:
        SubCategory.objects.get_or_create(
            category=category_obj,
            name=sub_name
        )

print("Remaining categories and subcategories added successfully!")