(function() {
  angular.module('Roundup')
  .component('interviewRubric', {
    templateUrl: 'js/app/components/interviewRubric/interviewRubric.html',
    controller: InterviewRubric,
    controllerAs: 'interviewRubric',
  });

  function InterviewRubric($state, $stateParams, RoundService, Auth) {
    var interviewRubric = this;

    interviewRubric.round = {};
    interviewRubric.questions = {};
    interviewRubric.answers = {};
    interviewRubric.userData = {};
    // interviewRubric.newResponse = {
    // 	questionNote: '',
    // 	questionScore: ''
    // }
    // interviewRubric.formInput = {};

    // interviewRubric.newScore = {
    // 	roundId: '',
    // 	interviewId: '',
    // 	userId: '',
    // 	answers: {
    // 		questionId: '',
    // 		textInput: '',
    // 		score: ''
    // 	}
    // }

    interviewRubric.newResponse = {
    	questionId: '',
    	userId: '',
    	score: '',
    	notes: ''
    }

    console.log('params: ', $stateParams);
    console.log('state: ', $state);

    // ACCESS USER DATA
    var payload = Auth.currentUser();
    interviewRubric.userData = payload._doc;
    console.log('interviewRubric.userData.firstName ', interviewRubric.userData);

    // ACCESS ROUND DATA
    var routeId = $stateParams.id;
    var interviewId = $stateParams.interviewId;
    //var userId = '';

	  RoundService.getRound(routeId, function(res) {
	    interviewRubric.round = res.data;
	    console.log('round data? ', res.data);
	    interviewRubric.questions = res.data.questions;
	    console.log('questions? ', interviewRubric.questions);
	  });

	  // GET FORM DATA
	  // interviewRubric.formData = {};
	  // interviewRubric.submitScores = function() {
	  // 	console.log('submitted scores');
	  // 	//console.log('req? ', req.body);
	  // 	//interviewRubric.formInput = interviewRubric.
	  // 	interviewRubric.formData = interviewRubric.formInput;
	  // 	console.log('form input? ', interviewRubric.formData);
	  // }

	  	interviewRubric.submitScores = function() {
	  		console.log('submitting scores');
	  		console.log('interview round form data answers: ', interviewRubric.answers);


	  		var idsArray = Object.keys(interviewRubric.answers);
	  		console.log('idsArray: ', idsArray);

	  		var newObjs = [];

	  		idsArray.forEach(function(thisId) {
	  			var newObj = {
	  			 	questionId: thisId,
	  			 	userId: interviewRubric.userData._id,
	  			 	score: 2,
	  			 	note: interviewRubric.answers[thisId]
	  			 };
	  			 console.log('1: ', interviewRubric.answers[thisId]);
	  			 newObjs.push(newObj);
	  			 newObj = {};
	  		});

	  		console.log('new objs: ', newObjs);
	  	} 

  }


  

  InterviewRubric.$inject = ['$state', '$stateParams', 'RoundService', 'Auth'];
})()





