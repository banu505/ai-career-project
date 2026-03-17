import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

# --- Replace this sample data with your actual dataset ---
data = {
    'interest': [5, 3, 4, 2, 1, 5, 4, 3, 5, 2],
    'skills': [4, 2, 5, 3, 2, 5, 4, 3, 5, 1],
    'personality': [3, 4, 5, 2, 1, 4, 5, 2, 4, 3],
    'career': ['Engineer', 'Artist', 'Data Scientist', 'Teacher',
               'Nurse', 'Engineer', 'Data Scientist', 'Teacher',
               'Software Developer', 'Artist']
}
df = pd.DataFrame(data)

X = df[['interest', 'skills', 'personality']]
y = df['career']

model = RandomForestClassifier()
model.fit(X, y)

# Save with HIGHEST_PROTOCOL (most compatible)
with open('career_model.pkl', 'wb') as f:
    pickle.dump(model, f, protocol=pickle.HIGHEST_PROTOCOL)

print("✅ Model trained and saved as 'career_model.pkl'")