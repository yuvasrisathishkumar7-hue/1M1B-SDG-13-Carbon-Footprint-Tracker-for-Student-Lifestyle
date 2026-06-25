// ======================================
// CARBON FOOTPRINT TRACKER
// FINAL SCRIPT.JS
// ======================================

let pieChart = null;
let barChart = null;

// ======================================
// LOGIN SYSTEM
// ======================================

function login() {

    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const loginMsg = document.getElementById("loginMsg");
    const loginModal = document.getElementById("loginModal");

    if (!username || !password) return;

    if (
        username.value === "admin" &&
        password.value === "1234"
    ) {

        if (loginModal) {
            loginModal.style.display = "none";
        }

    } else {

        if (loginMsg) {
            loginMsg.innerHTML =
                "❌ Invalid Username or Password";
        }

    }
}

// ======================================
// PREDICTION FUNCTION
// ======================================

function predictCarbon() {

    const transport =
        Number(document.getElementById("transport")?.value || 0);

    const food =
        Number(document.getElementById("food")?.value || 0);

    const housing =
        Number(document.getElementById("housing")?.value || 0);

    const electricity =
        Number(document.getElementById("electricity")?.value || 0);

    const water =
        Number(document.getElementById("water")?.value || 0);

    const spending =
        Number(document.getElementById("spending")?.value || 0);

    const recycle =
        Number(document.getElementById("recycle")?.value || 0);

    const travel =
        Number(document.getElementById("travel")?.value || 0);

    const internet =
        Number(document.getElementById("internet")?.value || 0);

    // Carbon Calculation

    let carbon =
        (transport * 1.2) +
        (food * 1.5) +
        (housing * 1.1) +
        (electricity * 0.8) +
        (water * 0.02) +
        (spending * 0.001) +
        (recycle * 0.7) +
        (travel * 0.3) +
        (internet * 2);

    carbon = Number(carbon.toFixed(2));

    // ======================================
    // RESULT DISPLAY
    // ======================================

    const carbonScore =
        document.getElementById("carbonScore");

    if (carbonScore) {
        carbonScore.innerHTML =
            carbon + " kg CO₂";
    }

    // ======================================
    // STATUS
    // ======================================

    let status = "";

    if (carbon < 100) {
        status = "🟢 LOW IMPACT";
    }
    else if (carbon < 250) {
        status = "🟡 MODERATE IMPACT";
    }
    else {
        status = "🔴 HIGH IMPACT";
    }

    const impactStatus =
        document.getElementById("impactStatus");

    if (impactStatus) {
        impactStatus.innerHTML = status;
    }

    // ======================================
    // SUSTAINABILITY SCORE
    // ======================================

    const sustainability =
        Math.max(
            0,
            Math.round(100 - carbon / 5)
        );

    const sustainabilityBox =
        document.getElementById(
            "sustainabilityScore"
        );

    if (sustainabilityBox) {

        sustainabilityBox.innerHTML =
            "🌱 Sustainability Score : " +
            sustainability +
            "/100";
    }

    // ======================================
    // AI INSIGHTS
    // ======================================

    const insights =
        document.getElementById("insights");

    if (insights) {

        let transportImpact =
            Math.round((transport * 1.2 / carbon) * 100);

        let foodImpact =
            Math.round((food * 1.5 / carbon) * 100);

        let electricityImpact =
            Math.round((electricity * 0.8 / carbon) * 100);

        let waterImpact =
            Math.round((water * 0.02 / carbon) * 100);

        insights.innerHTML =
            "<li>🚍 Transportation Impact: " + transportImpact + "%</li>" +
            "<li>🍔 Food Impact: " + foodImpact + "%</li>" +
            "<li>⚡ Electricity Impact: " + electricityImpact + "%</li>" +
            "<li>💧 Water Impact: " + waterImpact + "%</li>" +
            "<li>📊 Total Carbon Footprint: " + carbon + " kg CO₂</li>";
    }

    // ======================================
    // CARBON METER
    // ======================================

    const meterFill =
        document.getElementById("meterFill");

    const meterValue =
        document.getElementById("meterValue");

    let meterPercent =
        Math.min(
            100,
            (carbon / 500) * 100
        );

    if (meterFill) {
        meterFill.style.width =
            meterPercent + "%";
    }

    if (meterValue) {
        meterValue.innerHTML =
            carbon + " kg CO₂";
    }

    // ======================================
    // GOAL TRACKER
    // ======================================

    const goalProgress =
        document.getElementById("goalProgress");

    let progress =
        Math.min(
            100,
            (200 / carbon) * 100
        );

    if (goalProgress) {
        goalProgress.style.width =
            progress + "%";
    }

    // ======================================
    // RECOMMENDATIONS
    // ======================================

    generateRecommendations(carbon);

    // ======================================
    // CHARTS
    // ======================================

    generateCharts(
        transport,
        food,
        electricity,
        water
    );

    alert(
        "✅ AI Prediction Generated Successfully!"
    );
}

// ======================================
// RECOMMENDATIONS
// ======================================

function generateRecommendations(carbon) {

    const cards =
        document.querySelectorAll(
            ".recommend-card"
        );

    let recommendations = [];

    if (carbon > 250) {

        recommendations = [
            "🚍 Use Public Transportation",
            "⚡ Reduce Electricity Usage",
            "💧 Save Water Resources",
            "♻ Improve Recycling Habits"
        ];

    } else {

        recommendations = [
            "🌱 Excellent Sustainability",
            "♻ Continue Recycling",
            "⚡ Maintain Energy Efficiency",
            "🚶 Prefer Walking & Cycling"
        ];
    }

    cards.forEach(function(card, index){

        if(recommendations[index]){

            card.innerHTML =
                recommendations[index];
        }

    });

}

// ======================================
// CHARTS
// ======================================

function generateCharts(
    transport,
    food,
    electricity,
    water
) {

    if(typeof Chart === "undefined"){
        return;
    }

    const pieCanvas =
        document.getElementById("pieChart");

    const barCanvas =
        document.getElementById("barChart");

    if(pieChart){
        pieChart.destroy();
    }

    if(barChart){
        barChart.destroy();
    }

    if(pieCanvas){

        pieChart = new Chart(
            pieCanvas,
            {
                type: "pie",
                data: {
                    labels: [
                        "Transport",
                        "Food",
                        "Electricity",
                        "Water"
                    ],
                    datasets: [{
                        data: [
                            transport,
                            food,
                            electricity,
                            water
                        ]
                    }]
                }
            }
        );
    }

    if(barCanvas){

        barChart = new Chart(
            barCanvas,
            {
                type: "bar",
                data: {
                    labels: [
                        "Transport",
                        "Food",
                        "Electricity",
                        "Water"
                    ],
                    datasets: [{
                        label: "Carbon Contributors",
                        data: [
                            transport,
                            food,
                            electricity,
                            water
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
        );
    }

}

// ======================================
// REPORT DOWNLOAD
// ======================================

function downloadReport() {

    const studentName =
        document.getElementById("name")?.value ||
        "Student";

    const carbon =
        document.getElementById("carbonScore")?.innerText ||
        "0 kg CO₂";

    const sustainability =
        document.getElementById("sustainabilityScore")?.innerText ||
        "";

    const report =
        "=====================================\n\n" +
        "CARBON FOOTPRINT REPORT\n\n" +
        "=====================================\n\n" +
        "Student Name: " + studentName + "\n\n" +
        "Carbon Emission: " + carbon + "\n\n" +
        sustainability + "\n\n" +
        "Project: Carbon Footprint Tracker for Student Lifestyle Using AI\n\n" +
        "Internship: 1M1B - IBM SkillsBuild\n\n";

    const blob =
        new Blob(
            [report],
            {type:"text/plain"}
        );

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "Carbon_Report.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}

// ======================================
// PAGE LOAD
// ======================================

window.onload = function() {

    console.log(
        "Carbon AI Dashboard Loaded Successfully"
    );

};