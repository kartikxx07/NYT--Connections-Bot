import pandas as pd
from typing import List, Dict, Any
import os

def process_game_data(game_data: List[Dict[str, Any]]) -> str:
    """
    Process the game data and convert it to CSV format
    """
    # Create a list to store all rows
    rows = []
    
    # Process each game set
    for game_set_idx, game_set in enumerate(game_data, 1):
        # Process each category in the game set
        for category in game_set:
            # Process each word in the category
            for word_idx, word in enumerate(category['words'], 1):
                row = {
                    'word': word,
                    'category': category['category'],
                    'difficulty': category['difficulty'],
                    'game_set': game_set_idx,
                    'word_index': word_idx
                }
                rows.append(row)
    
    # Create DataFrame
    df = pd.DataFrame(rows)
    
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    # Save to CSV
    csv_path = 'data/game_data.csv'
    df.to_csv(csv_path, index=False)
    
    return csv_path 