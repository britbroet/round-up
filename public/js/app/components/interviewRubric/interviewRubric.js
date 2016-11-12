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
    interviewRubric.responses = [];
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

    //responses: [{ userId: String, interviewId: String, score: String, notes: String }]

    interviewRubric.newResponse = {
    	userId: '',
    	interviewId: '',
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
    var roundId = $stateParams.id;
    var interviewId = $stateParams.interviewId;
    //var userId = '';

	  RoundService.getRound(roundId, function(res) {
	    interviewRubric.round = res.data;
	    console.log('round data? ', res.data);
	    interviewRubric.questions = res.data.questions;
	    console.log('questions? ', interviewRubric.questions);
	    interviewRubric.responses = res.data.responses;
	    console.log('responses: ', interviewRubric.responses);
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

	  		// pull question IDs out of key:value in form data
	  		var idsArray = Object.keys(interviewRubric.answers);
	  		console.log('idsArray: ', idsArray);

	  		var newObjs = [];


	  		var existingResponses = interviewRubric.responses;
	  		console.log('interviewRubric.existingResponses: ', existingResponses);
	  		//var updatedResponseArray = existingResponses.concat()
	  		var updatedResponseArray = existingResponses;
	  		console.log('first updatedResponseArray: ', updatedResponseArray);

	  		idsArray.forEach(function(thisId) {
	  			var newResponse = {
	  				userName: interviewId,
	  			 	questionId: thisId,
	  			 	interviewId: interviewRubric.userData._id,
	  			 	score: 2,
	  			 	notes: interviewRubric.answers[thisId]
	  			};
	  			console.log('1: ', interviewRubric.answers[thisId]);
	  			 //newObjs.push(newObj);
	  			 //newObj = {};
	  			updatedResponseArray.push(newResponse);
	  			console.log('updatedResponseArray ', updatedResponseArray);
	  		});

	  		RoundService.addResponsesToRound(updatedResponseArray, roundId, function(res) {
	  			console.log('roundservice firing, res: ', res);
	  		});

	  		
	  	} 

  


  }


  

  InterviewRubric.$inject = ['$state', '$stateParams', 'RoundService', 'Auth'];
})()





