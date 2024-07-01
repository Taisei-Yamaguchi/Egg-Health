from django.db import models
from accounts.models import Account
from django.core.exceptions import ValidationError

MONSTER_TYPES = [
    ('Normal','Normal'),
    ('Premium','Premium'),
    ('Cat','Cat'),
    ('Flame','Flame'),
    ('Ghost','Ghost'),
    ('Dog','Dog'),
    ("Dinosaur",'Dinosaur'),
    ('Metal','Metal')
]

GROWTH_STAGES = {
    'Normal': [0, 100, 200, 300, 400, 500, 600, 700],  
    'Premium':[0, 100, 200, 300, 400, 500, 600, 700],  
    'Cat':[0, 100, 200, 300, 400, 500, 600, 700],  
    'Flame':[0, 100, 200, 300, 400, 500, 600, 700], 
    'Ghost':[0, 100, 200, 300, 400, 500, 600, 700], 
    'Dog':[0, 100, 200, 300, 400, 500, 600, 700], 
    'Dinosaur':[0, 100, 200, 300, 400, 500, 600, 700], 
    'Metal':[0, 100, 200, 300, 400, 500, 600, 700], 
}

STAGES = [
    (0, 'Egg'),
    (1, 'Baby'),
    (2, 'Young'),
    (3, 'Adolescent'),
    (4, 'Adult'),
    (5, 'Final'),
]


class Monster(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    grow_points = models.IntegerField(default=0)
    monster_type = models.CharField(max_length=50, choices=MONSTER_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def add_grow_points(self, points):
        self.grow_points += points
        self.save()

    def get_current_stage(self):
        stages = GROWTH_STAGES[self.monster_type]
        for i, threshold in enumerate(stages):
            if self.grow_points < threshold:
                return i - 1
        return len(stages) - 2  # 最後の閾値700は特別扱い

    def can_select_any_stage(self):
        stages = GROWTH_STAGES[self.monster_type]
        return self.grow_points >= stages[-1]
    
    def clean(self):
        if Monster.objects.filter(account=self.account, monster_type=self.monster_type).exclude(id=self.id).exists():
            raise ValidationError(f'You already have a monster of type {self.monster_type}.')

    def __str__(self):
        return f"{self.get_monster_type_display()} ({self.account.username})"
    
    
    
class MonsterSelected(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    selected_monster = models.CharField(max_length=50, choices=MONSTER_TYPES)
    selected_stage = models.IntegerField(choices=STAGES, default=0)  # 0: egg, 1: baby, etc.

    def __str__(self):
        return f"{self.account.username} - {self.get_selected_monster_display()} (Stage: {self.selected_stage})"
