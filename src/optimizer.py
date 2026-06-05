def optimize_queue(df):
    # Priority logic
    df['Priority'] = df['Severity_Level'] * 2 + df['Waiting_Time']

    # Sort patients
    df_sorted = df.sort_values(by='Priority', ascending=False)

    return df_sorted