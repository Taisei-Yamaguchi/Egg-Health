from django.core.management.base import BaseCommand
from ...models import Workout
import json

class Command(BaseCommand):
    help = 'Loads workout data into the database'

    def handle(self, *args, **kwargs):
        json_file_path = 'exercises/seeds/workouts.json'

        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            for item in data:
                mets = item.get('mets')
                name = item.get('name')
                ja_name = item.get('ja_name')
                exercise_type = item.get('type')

                if Workout.objects.filter(name=name).exists():
                    self.stdout.write(self.style.WARNING(f'Workout with name {name} already exists. Skipping insertion.'))
                    continue

                Workout.objects.create(
                    mets=mets,
                    name=name,
                    ja_name=ja_name,
                    type=exercise_type,
                    custom=False,
                    account=None
                )
        
        self.stdout.write(self.style.SUCCESS('Workout data has been loaded successfully.'))
