import pandas as pd
import numpy as np

def load_data(path):
    df = pd.read_csv(path)
    return df

def preprocess_data(df):
    # Convert to datetime
    df['ScheduledDay'] = pd.to_datetime(df['ScheduledDay'])
    df['AppointmentDay'] = pd.to_datetime(df['AppointmentDay'])

    # Create Waiting Time (days)
    df['Waiting_Time'] = (df['AppointmentDay'] - df['ScheduledDay']).dt.days

    # Remove invalid rows
    df = df[df['Waiting_Time'] >= 0]

    # Create Severity Level (based on diseases)
    df['Severity_Level'] = df[['Hipertension', 'Diabetes']].sum(axis=1) + 1

    # Simulate doctor availability
    df['Doctor_Available'] = np.random.randint(1, 5, size=len(df))

    # Keep only needed columns
    df = df[['Severity_Level', 'Doctor_Available', 'Waiting_Time']]

    return df