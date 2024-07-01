export interface Monster {
    account: number; // Account ID
    grow_points: number;
    monster_type: 'Normal' | 'Premium' | 'Cat' | "Flame" | "Ghost" | "Dog" |"Metal" |"Dinosaur";
    created_at: string; // ISO8601形式の日付文字列
    updated_at: string; // ISO8601形式の日付文字列
}

export interface MonsterSelected {
    account: number; // Account ID
    selected_monster: 'Normal' | 'Premium' | 'Cat' | "Flame" | "Ghost" | "Dog" |"Metal" |"Dinosaur";
    selected_stage: 0 | 1 | 2 | 3 | 4 | 5; // 0: Egg, 1: Baby, etc.
}
