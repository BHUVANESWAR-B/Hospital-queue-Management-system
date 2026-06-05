function Analytics() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">📊 Analytics Dashboard</h1>

            <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="text-gray-500">Total Patients</h2>
                    <p className="text-2xl font-bold">120</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="text-gray-500">Avg Wait Time</h2>
                    <p className="text-2xl font-bold">45 mins</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="text-gray-500">Doctors Active</h2>
                    <p className="text-2xl font-bold">8</p>
                </div>
            </div>
        </div>
    );
}

export default Analytics;