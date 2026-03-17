import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model
try:
    with open("career_model.pkl", "rb") as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully!")
except Exception as e:
    print("❌ Error loading model:", e)
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.get_json()
        # Expect a list of 10 numbers under the key "features"
        features = data['features']   # e.g., [5, 4, 3, 2, 5, 4, 3, 4, 5, 4]

        # Convert to 2D array for prediction
        features_2d = [features]
        prediction = model.predict(features_2d)[0]

        # Get top 3 careers with confidence scores
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(features_2d)[0]
            top_indices = proba.argsort()[-3:][::-1]
            careers = [
                {"name": model.classes_[i], "match": round(proba[i] * 100, 1)}
                for i in top_indices
            ]
        else:
            careers = [{"name": prediction, "match": 90}]

        return jsonify({"careers": careers})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)