import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

# Load the dataset
df = pd.read_csv('career_data.csv')

# Define feature columns (all 10)
feature_cols = [
    'O_score', 'C_score', 'E_score', 'A_score', 'N_score',
    'Numerical Aptitude', 'Spatial Aptitude', 'Perceptual Aptitude',
    'Abstract Reasoning', 'Verbal Reasoning'
]

X = df[feature_cols]
y = df['Career']

# Train a Random Forest (you can adjust parameters)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save the model
with open('career_model.pkl', 'wb') as f:
    pickle.dump(model, f, protocol=pickle.HIGHEST_PROTOCOL)

print("✅ Model trained with 10 features.")
print("Classes:", model.classes_)