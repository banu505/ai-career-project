import pickle
import sys
import json

# Load trained model
model = pickle.load(open("career_model.pkl", "rb"))

# Get input from Node
data = json.loads(sys.argv[1])

# Example features from assessment
features = [data["interest"], data["skills"], data["personality"]]

prediction = model.predict([features])

result = {
    "careers": [
        {"name": prediction[0], "match": 90},
        {"name": "Software Developer", "match": 85},
        {"name": "Data Scientist", "match": 80}
    ]
}

print(json.dumps(result))