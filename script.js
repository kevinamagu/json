async function fetchData() {
    const response = await fetch('https://raw.githubusercontent.com/kevinamagu/json/refs/heads/main/index.json');
    const data = await response.json();
    return data.admissionData.pages.flatMap(page => page.students);
}

function createDistrictChart(students) {
    const districtCounts = {};
    students.forEach(student => {
        const district = student.districtName;
        districtCounts[district] = (districtCounts[district] || 0) + 1;
    });

    const labels = Object.keys(districtCounts);
    const counts = Object.values(districtCounts);

    const ctx = document.getElementById('districtChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Students',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
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
    });
}

function createGenderChart(students) {
    const genderCounts = { 'Male': 0, 'Female': 0 };
    students.forEach(student => {
        genderCounts[student.gender === 'M' ? 'Male' : 'Female']++;
    });

    const ctx = document.getElementById('genderChart').getContext('2d');
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: Object.keys(genderCounts),
            datasets: [{
                label: 'Number of Students',
                data: Object.values(genderCounts),
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
        }
    });
}

async function init() {
    const students = await fetchData();
    createDistrictChart(students);
    createGenderChart(students);
    console.log(students)
}

init();