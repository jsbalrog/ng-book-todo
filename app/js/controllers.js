angular.module('myApp.controllers', [])
  .controller('FrameCtrl', ['$scope', function($scope) {
    $scope.today = new Date();
    $scope.name = "Ted Jenkins";
  }])

  .controller('DashboardCtrl', ['$scope', '$parse', function($scope, $parse) {
    $scope.entryInput = undefined;

    $scope.users = {
      "ari": {
        "twitter": "@auser"
      },
      "nate": {
        "twitter": "@eigenjoy"
      } 
    };

    // Set up a watch expression to watch the entryInput
    $scope.$watch('entryInput', function(newVal, oldVal, scope) {
      if(newVal !== oldVal) {
        // Look for any part of the string that starts with @
        var strUsers = newVal.match(/[@]+[A-Za-z0-9_]+/g), 
            i;

        // If any part of the string starts with @, then we
        // will have a list of those tokens in strUsers
        if(strUsers) {
          // We'll loop through our users and parse the $scope looking for user
          for(i = 0; i < strUsers.length; i++) {
            // Found user in the form @[user]
            var user = strUsers[i];
            var cleanUser = user.slice(1);
            var parsedUser = $parse("users." + cleanUser)(scope);
            if(parsedUser) {
              // A user was found on our scope in the 'users' object
              console.log(parsedUser);
            } else {
              // No user was found
              console.log("no user found")
            }
          }
        }
      }
    });
  }]);