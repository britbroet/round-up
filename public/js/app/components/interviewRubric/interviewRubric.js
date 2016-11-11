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
    interviewRubric.userData = {};

    console.log('params: ', $stateParams);
    console.log('state: ', $state);

    // ACCESS USER DATA
    var payload = Auth.currentUser();
    interviewRubric.userData = payload._doc;
    console.log('interviewRubric.userData.firstName ', interviewRubric.userData.firstName);

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
  }


  

  InterviewRubric.$inject = ['$state', '$stateParams', 'RoundService', 'Auth'];
})()





