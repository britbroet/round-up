(function() {
  angular.module('Roundup')
  .component('navBar', {
    templateUrl: 'js/app/components/navbar/navbar.html',
    controller: NavBar,
    controllerAs: 'navBar'
  });


  function NavBar($http, $state, $location, Auth, Alerts) {
    var navBar = this;
    navBar.Auth = Auth;

    // ACCESS USER DATA
    var payload = Auth.currentUser();

    if (payload) {
      navBar.userData = payload._doc;
    }

    navBar.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
    Alerts.add('success', 'Logged out!');
    $state.reload();
  	}
  }

  NavBar.$inject = ['$http','$state', '$location', 'Auth','Alerts'];
})()

