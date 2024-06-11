from .parse_food_description import parse_food_description
from .parse_fraction import parse_fraction

def modify_fatsecret_food_data(data):
    try:
        parsed_data = parse_food_description(data['food_description'])
        if parsed_data:
            food_id = data['food_id']
            name = data['food_name']
            type = data['food_type']
            brand_name = data.get('brand_name')
            url = data['food_url']
            description = data['food_description']
            amount = parsed_data['amount']
            calories = parsed_data['calories']
            fat = parsed_data['fat']
            carbs = parsed_data['carbs']
            protein = parsed_data['protein']

            # 単位の分離
            value_str, _, unit = amount.partition(' ')
            value = parse_fraction(value_str)  # 分数を処理
            if unit == "g":
                multiplier = 100 / value
                unit = '100g'
            elif unit == "oz":
                multiplier = 1 / value
                unit = 'oz'
            else:
                # 次にハイフンが出てくるまでの直前のスペースを除去
                unit = unit.strip().rsplit(' ', 1)[0] if '-' in unit else unit
                multiplier = 1 / value

            calories_per_unit = calories * multiplier
            fat_per_unit = fat * multiplier
            carbs_per_unit = carbs * multiplier
            protein_per_unit = protein * multiplier
            
            data = {
                'food_id': food_id,
                'name': name,
                'type': type,
                'brand_name': brand_name,
                'url': url,
                'description': description,
                'calories_per_unit': calories_per_unit,
                'fat_per_unit': fat_per_unit,
                'carbs_per_unit': carbs_per_unit,
                'protein_per_unit': protein_per_unit,
                'unit': unit
            }
            return data
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    return None
