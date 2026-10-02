export interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  rating: number;
  prepTimeMinutes: number;
  cookTimeMinutes?: number;
  servings: number;
  caloriesPerServing: number;
  ingredients?: string[];
  instructions?: string[];
  tags?: string[];
  proteinPerServing?: number | string;
  carbs?: number | string;
  fat?: number | string;
}
