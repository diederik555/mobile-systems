app.controller('askQuestionController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup', '$ionicHistory', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup, $ionicHistory) {
	$scope.usersettings = store.get('userSettings');

  $scope.totalLevel = store.get('totalLevel');

	$scope.text = null;


	$scope.parseText = function(text) {
		//parse the text
		var r = window.nlp(text)

		//grab the person names mentioned in this text
		var people = r.people()
		var places = r.places()
		var verbs = r.match('#Verb')
		var nouns = r.nouns()
		var adjectives = r.adjectives()
		var adverb = r.adverbs()

		//sort them alphabetically
		places.sort('alpha')

		//normalize punctuation, case, whitespace
		people.normalize()

		//sort them by frequency
		people.sort('frequency').unique()

		//output as an array

		var people = people.out('array');
		var places = places.out('array');
		var verbs = verbs.out('array');
		var nouns = nouns.out('array');
		var adjectives = adjectives.out('array');
		var adverb = adverb.out('array');

		$scope.tags = [];
		for(var i = 0; i < people.length; i++) {
			var data = people[i];
			console.log(data);
			$scope.tags.push({kind: "people", word: data});
		}
		for(var i = 0; i < places.length; i++) {
			var data = places[i];
			console.log(data);
			$scope.tags.push({kind: "places", word: data});
		}
		for(var i = 0; i < verbs.length; i++) {
			var data = verbs[i];
			$scope.tags.push({kind: "verbs", word: data});
		}
		for(var i = 0; i < nouns.length; i++) {
			var data = nouns[i];
			$scope.tags.push({kind: "nouns", word: data});
		}
		for(var i = 0; i < adjectives.length; i++) {
			var data = adjectives[i];
			$scope.tags.push({kind: "adjectives", word: data});
		}
		for(var i = 0; i < adverb.length; i++) {
			var data = adverb[i];
			$scope.tags.push({kind: "adverb", word: data});
		}
		console.log($scope.tags);
	};

	$scope.askQuestion = function() {
		var alertPopup = $ionicPopup.alert({
		     title: 'Your question has been sent to five experts in that area!',
		     template: 'You will get your answer quickly'
		});

    var data = {call: "newquestion", question: "new question here?", tags: "tag1,tag2"};

    $.ajax({
      type: "POST",
      url: "http://www.bekerdesign.nl/fourtytwo/api.php",
      data: data,
      success: function (data) {
        console.log(data);
      }
    });

		$scope.text = null;
	   	$scope.tags = "";
	   alertPopup.then(function(res) {
	     $location.path('/tab/ask');
	   });
	}
	$scope.myGoBack = function() {
	    $ionicHistory.goBack();
	  };
}]);
