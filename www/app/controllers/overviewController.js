app.controller('overviewController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth) {
	var selectedInterests = store.get('selectedInterests');
	$scope.usersettings = store.get('userSettings');
	$scope.chart = {
		answeredQuestions : {
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        backgroundColor:'rgba(255, 255, 255, 0.1)'
		    },
		    title: {
		        text: '<b>'+$scope.usersettings.asked+'</b><br>Questions <br>answered',
		        align: 'center',
		        verticalAlign: 'middle',
		        y: -20
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    exporting: {
			         enabled: false
			},
		    plotOptions: {
		        pie: {
		            dataLabels: {
		                enabled: true,
		                distance: -30,
		                style: {
		                    fontWeight: 'bold',
		                    color: 'white'
		                }
		            },
		            startAngle: 0,
		            endAngle: 360,
		            center: ['50%', '50%'],
		            colors: ['#8CBD3F', '#aa1d1d']
		        },

		    },
		    series: [{
		        type: 'pie',
		        name: 'Answered questions',
		        innerSize: '60%',
		        data: [
		            ['Correct',  (($scope.usersettings.correctlyAnswered/$scope.usersettings.asked) * 100)],
		            ['Incorrect',  (100-(($scope.usersettings.correctlyAnswered/$scope.usersettings.asked) * 100))]
		        ]
		    }]
		}
	}

  $scope.goToLevels = function(){
    $location.url('/leveloverview');
  };
}]);
