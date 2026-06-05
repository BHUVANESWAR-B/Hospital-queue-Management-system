from sklearn.linear_model import LinearRegression

def train_model(df):
    X = df[['Severity_Level', 'Doctor_Available']]
    y = df['Waiting_Time']

    model = LinearRegression()
    model.fit(X, y)

    return model

def predict_waiting_time(model, severity, doctors):
    prediction = model.predict([[severity, doctors]])
    return prediction[0]