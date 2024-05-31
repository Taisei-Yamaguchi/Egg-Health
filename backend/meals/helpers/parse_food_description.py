import re

def parse_food_description(description):
    pattern = r'Per\s(\d+(\.\d+)?|\d+/\d+)\s?(\w+(?:\s\w+)?)(?=\s-\sCalories:)\s-\sCalories:\s(\d+)kcal\s\|\sFat:\s([0-9.]+)g\s\|\sCarbs:\s([0-9.]+)g\s\|\sProtein:\s([0-9.]+)g'
    
    match = re.match(pattern, description)
    if match:
        amount, _, unit, calories, fat, carbs, protein = match.groups()
        return {
            'amount': amount + ' ' + unit,
            'calories': float(calories),
            'fat': float(fat),
            'carbs': float(carbs),
            'protein': float(protein)
        }
    return None