from .parse_food_description import parse_food_description
from .parse_fraction import parse_fraction

# foods.search
# def modify_fatsecret_food_data(data):
#     print(data)
#     try:
#         parsed_data = parse_food_description(data['food_description'])
#         if parsed_data:
#             food_id = data['food_id']
#             name = data['food_name']
#             type = data['food_type']
#             brand_name = data.get('brand_name')
#             url = data['food_url']
#             description = data['food_description']
#             amount = parsed_data['amount']
#             calories = parsed_data['calories']
#             fat = parsed_data['fat']
#             carbs = parsed_data['carbs']
#             protein = parsed_data['protein']

#             # 単位の分離
#             value_str, _, unit = amount.partition(' ')
#             value = parse_fraction(value_str)  # 分数を処理
#             if unit == "g":
#                 multiplier = 100 / value
#                 unit = '100g'
#             elif unit == "oz":
#                 multiplier = 1 / value
#                 unit = 'oz'
#             else:
#                 # 次にハイフンが出てくるまでの直前のスペースを除去
#                 unit = unit.strip().rsplit(' ', 1)[0] if '-' in unit else unit
#                 multiplier = 1 / value

#             calories_per_unit = calories * multiplier
#             fat_per_unit = fat * multiplier
#             carbs_per_unit = carbs * multiplier
#             protein_per_unit = protein * multiplier
            
#             data = {
#                 'food_id': food_id,
#                 'name': name,
#                 'type': type,
#                 'brand_name': brand_name,
#                 'url': url,
#                 'description': description,
#                 'calories_per_unit': calories_per_unit,
#                 'fat_per_unit': fat_per_unit,
#                 'carbs_per_unit': carbs_per_unit,
#                 'protein_per_unit': protein_per_unit,
#                 'unit': unit
#             }
#             return data
#     except Exception as e:
#         print(f"An error occurred: {str(e)}")
#     return None

# foods.search.v3
def modify_fatsecret_food_data(data):
    try:
        food_id = data['food_id']
        name = data['food_name']
        type = data['food_type']
        brand_name = data.get('brand_name')
        url = data['food_url']
        food_description = data['servings']['serving'][0]['serving_description']

        calories = float(data['servings']['serving'][0].get('calories', 0))
        fat = float(data['servings']['serving'][0].get('fat', 0))
        carbs = float(data['servings']['serving'][0].get('carbohydrate', 0))
        protein = float(data['servings']['serving'][0].get('protein', 0))
        
        sugars = float(data['servings']['serving'][0].get('sugar', 0))
        dietary_fiber = float(data['servings']['serving'][0].get('fiber', 0))
        salt = float(data['servings']['serving'][0].get('salt', 0))
        sodium = float(data['servings']['serving'][0].get('sodium', 0))
        potassium = float(data['servings']['serving'][0].get('potassium', 0))
        calcium = float(data['servings']['serving'][0].get('calcium', 0))
        magnesium = float(data['servings']['serving'][0].get('magnesium', 0))
        iron = float(data['servings']['serving'][0].get('iron', 0))
        zinc = float(data['servings']['serving'][0].get('zinc', 0))
        vitamin_a = float(data['servings']['serving'][0].get('vitamin_a', 0))
        vitamin_d = float(data['servings']['serving'][0].get('vitamin_d', 0))
        vitamin_e = float(data['servings']['serving'][0].get('vitamin_e', 0))
        vitamin_b1 = float(data['servings']['serving'][0].get('vitamin_b1', 0))
        vitamin_b2 = float(data['servings']['serving'][0].get('vitamin_b2', 0))
        vitamin_b12 = float(data['servings']['serving'][0].get('vitamin_b12', 0))
        vitamin_b6 = float(data['servings']['serving'][0].get('vitamin_b6', 0))
        vitamin_c = float(data['servings']['serving'][0].get('vitamin_c', 0))
        niacin = float(data['servings']['serving'][0].get('niacin', 0))
        cholesterol = float(data['servings']['serving'][0].get('cholesterol', 0))
        saturated_fat = float(data['servings']['serving'][0].get('saturated_fat', 0))
        polyunsaturated_fat = float(data['servings']['serving'][0].get('polyunsaturated_fat', 0))
        monounsaturated_fat = float(data['servings']['serving'][0].get('monounsaturated_fat', 0))

        # 単位と量の分離
        parts = food_description.split(' ', 1)
        amount = parse_fraction(parts[0])
        unit = parts[1] if len(parts) > 1 else 'serving'
        if '(' in unit:
            unit = unit.split('(')[0].strip()

        # 変換係数の計算
        if unit == "g":
            multiplier = 100 / amount
            unit = '100g'
        else:
            unit = unit.strip().rsplit(' ', 1)[0] if '-' in unit else unit
            multiplier = 1 / amount
            
        calories_per_unit = calories * multiplier
        fat_per_unit = fat * multiplier
        carbs_per_unit = carbs * multiplier
        protein_per_unit = protein * multiplier
        sugars_per_unit = sugars * multiplier
        dietary_fiber_per_unit = dietary_fiber * multiplier
        salt_per_unit = salt * multiplier
        sodium_per_unit = sodium * multiplier
        potassium_per_unit = potassium * multiplier
        calcium_per_unit = calcium * multiplier
        magnesium_per_unit = magnesium * multiplier
        iron_per_unit = iron * multiplier
        zinc_per_unit = zinc * multiplier
        vitamin_a_per_unit = vitamin_a * multiplier
        vitamin_d_per_unit = vitamin_d * multiplier
        vitamin_e_per_unit = vitamin_e * multiplier
        vitamin_b1_per_unit = vitamin_b1 * multiplier
        vitamin_b2_per_unit = vitamin_b2 * multiplier
        vitamin_b12_per_unit = vitamin_b12 * multiplier
        vitamin_b6_per_unit = vitamin_b6 * multiplier
        vitamin_c_per_unit = vitamin_c * multiplier
        niacin_per_unit = niacin * multiplier
        cholesterol_per_unit = cholesterol * multiplier
        saturated_fat_per_unit = saturated_fat * multiplier
        polyunsaturated_fat_per_unit = polyunsaturated_fat * multiplier
        monounsaturated_fat_per_unit = monounsaturated_fat * multiplier
            
        data = {
            'food_id': food_id,
            'name': name,
            'type': type,
            'brand_name': brand_name,
            'url': url,
            'description': food_description,
            'cal': calories_per_unit,
            'fat': fat_per_unit,
            'carb': carbs_per_unit,
            'protein': protein_per_unit,
            'sugars': sugars_per_unit,
            'dietary_fiber': dietary_fiber_per_unit,
            'salt': salt_per_unit,
            'sodium': sodium_per_unit,
            'potassium': potassium_per_unit,
            'calcium': calcium_per_unit,
            'magnesium': magnesium_per_unit,
            'iron': iron_per_unit,
            'zinc': zinc_per_unit,
            'vitamin_a': vitamin_a_per_unit,
            'vitamin_d': vitamin_d_per_unit,
            'vitamin_e': vitamin_e_per_unit,
            'vitamin_b1': vitamin_b1_per_unit,
            'vitamin_b2': vitamin_b2_per_unit,
            'vitamin_b12': vitamin_b12_per_unit,
            'vitamin_b6': vitamin_b6_per_unit,
            'vitamin_c': vitamin_c_per_unit,
            'niacin': niacin_per_unit,
            'cholesterol': cholesterol_per_unit,
            'saturated_fat': saturated_fat_per_unit,
            'polyunsaturated_fat': polyunsaturated_fat_per_unit,
            'monounsaturated_fat': monounsaturated_fat_per_unit,
            'unit': unit
        }

        return data
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    return None
