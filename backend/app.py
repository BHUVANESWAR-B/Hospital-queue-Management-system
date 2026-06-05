from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_csv("../data/no shows.csv")

# Convert dates
df['ScheduledDay'] = pd.to_datetime(df['ScheduledDay'])
df['AppointmentDay'] = pd.to_datetime(df['AppointmentDay'])

# ✅ Step 1: Create Severity Level (IMPORTANT FIRST)
df['Severity_Level'] = df[['Hipertension', 'Diabetes']].sum(axis=1) + 1

# ✅ Step 2: Create Doctor Availability
df['Doctor_Available'] = np.random.randint(1, 10, size=len(df))

# ✅ Step 3: Create REALISTIC Waiting Time (in minutes)
df['Waiting_Time'] = (
    df['Severity_Level'] * 10 +
    (6 - df['Doctor_Available']) * 15 +
    np.random.randint(5, 20, size=len(df))
)

# Features & target
X = df[['Severity_Level', 'Doctor_Available']]
y = df['Waiting_Time']

# Train model
model = LinearRegression()
model.fit(X, y)

# API Route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    severity = int(data['severity'])
    doctors = int(data['doctors'])

    prediction = model.predict([[severity, doctors]])[0]

    return jsonify({"waiting_time": float(prediction)})

# Optional test route
@app.route('/')
def home():
    return "Backend Running 🚀"

# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)