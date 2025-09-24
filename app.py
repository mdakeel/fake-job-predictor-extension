from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load("models/xgboost_smote/model.pkl")
vectorizer = joblib.load("models/vectorizer.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    job_text = data.get("text", "")
    vector = vectorizer.transform([job_text]).toarray()
    proba = model.predict_proba(vector)[0][1]
    label = "🚨 Fake Job" if proba > 0.6 else "✅ Genuine Job"
    return jsonify({"prediction": label})

if __name__ == "__main__":
    app.run(debug=False)
