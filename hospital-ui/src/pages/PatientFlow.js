function PatientFlow() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">👥 Patient Flow</h1>

            <div className="bg-white p-6 rounded-xl shadow mt-6">
                <p>🟢 Registration → 🟡 Waiting → 🔵 Consultation → ✅ Discharge</p>
            </div>
        </div>
    );
}

export default PatientFlow;