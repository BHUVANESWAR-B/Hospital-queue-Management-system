import matplotlib.pyplot as plt

def plot_waiting_time(df):
    plt.hist(df['Waiting_Time'], bins=20)
    plt.xlabel("Waiting Time (days)")
    plt.ylabel("Number of Patients")
    plt.title("Waiting Time Distribution")
    plt.show()