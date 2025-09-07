$(function () {
	initCharts();
});

function bsEvents(){
	$('.onboarding-modal').modal('show');
}

function initCharts() {
	Chart.defaults.global.legend.labels.usePointStyle = true;

	var ctx = $('#bookings-chart');
	var ctx2 = $('#diseases-chart');
	var ctx3 = $('#recent-activity-chart');

	var recentActivitesChart = new Chart(ctx3, {
		type: 'line',
		data: {
			labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
			datasets: [{
				label: 'Sesiones Terapéuticas',
				data: [45, 52, 38, 61, 47, 55, 49, 58],
				backgroundColor: 'rgba(168, 0, 31, 0.1)',
				borderColor: 'rgba(168, 0, 31, 1)',
				borderWidth: 2,
				fill: true
			}],
		},
		options: {
			legend: {
				display: true,
				position: 'bottom',
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		},
	});

	var bookingsChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: ['Terapia Ocupacional', 'Fonoaudiología', 'Fisioterapia', 'Psicología'],
			datasets: [{
				label: 'Citas por Especialidad',
				data: [28, 22, 18, 32],
				backgroundColor: [
					'rgba(168, 0, 31, 0.8)',
					'rgba(46, 125, 50, 0.8)',
					'rgba(33, 150, 243, 0.8)',
					'rgba(255, 152, 0, 0.8)',
				],
				borderWidth: 2,
				borderColor: '#ffffff'
			}],
		},
		options: {
			legend: {
				display: true,
				position: 'bottom',
			},
			tooltips: {
				callbacks: {
					label: function(tooltipItem, data) {
						var label = data.labels[tooltipItem.index];
						var value = data.datasets[0].data[tooltipItem.index];
						return label + ': ' + value + ' citas';
					}
				}
			}
		},
	});

	var diseasesChart = new Chart(ctx2, {
		type: 'doughnut',
		data: {
			labels: ['Trastorno del Espectro Autista', 'Síndrome de Down', 'TDAH', 'Discapacidad Intelectual', 'Trastorno del Lenguaje'],
			datasets: [{
				label: 'Pacientes por Condición',
				data: [18, 12, 15, 8, 10],
				backgroundColor: [
					'rgba(168, 0, 31, 0.8)',
					'rgba(46, 125, 50, 0.8)',
					'rgba(33, 150, 243, 0.8)',
					'rgba(255, 152, 0, 0.8)',
					'rgba(156, 39, 176, 0.8)',
				],
				borderWidth: 2,
				borderColor: '#ffffff'
			}],
		},
		options: {
			legend: {
				display: true,
				position: 'bottom',
			},
			tooltips: {
				callbacks: {
					label: function(tooltipItem, data) {
						var label = data.labels[tooltipItem.index];
						var value = data.datasets[0].data[tooltipItem.index];
						var total = data.datasets[0].data.reduce((a, b) => a + b, 0);
						var percentage = Math.round((value / total) * 100);
						return label + ': ' + value + ' pacientes (' + percentage + '%)';
					}
				}
			}
		},
	});
}
