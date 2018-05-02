var app = angular.module("voteApp", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when("/home", {
      templateUrl : "../html/home.html",
      controller: "homeCtrl"
  })
  .when("/mypoll", {
      templateUrl : "../html/home.html",
      controller: "mypollCtrl"
  })
  .when("/inputs", {
      templateUrl : "../html/input.html",
      controller: "inputCtrl"
  })
  .when("/show", {
      templateUrl : "../html/showUp.html",
      controller: "showCtrl"
  })
  .when("/", {
      templateUrl : "../html/sign.html",
      controller: "logInCtrl"
  })
  .when("/signup", {
      templateUrl : "../html/sign.html",
      controller: "signUpCtrl"
  })
  .when("/show/:id", {
    templateUrl : "../html/show.html",
    controller: "showCtrl"
  });
  // when.oterwise({redirectTo: "/home"});
});

app.controller("signUpCtrl", function($scope, $http, $routeParams, $location){
  $scope.title= "Sign up";
  $scope.btnName = "Submit";
  $scope.url = "/user";
});

app.controller("logInCtrl", function($scope, $http, $rootScope){
  $rootScope.logInFlg = true;
  $rootScope.user = "";
  $scope.title = "Log in";
  $scope.btnName = "Login";
  $scope.url = "/user/login";
});

app.controller("homeCtrl", function($scope, $rootScope, $http){
  $scope.name = [];
  console.log($rootScope);
  if(!$rootScope.user)$rootScope.logInFlg = true;
  console.log($rootScope);

  $http.get('/poll/alldata').then(function(d)
    {
      // console.log(d.data);
      $scope.names = d.data;
    },function(err)
    {
      alert("NO databse or documents!");
      console.log(err);
    });

  $http.get('/user/getuser').then(function(d)
    {
      $rootScope.user = d.data["user"];
      if(d.data["user"])$rootScope.logInFlg = false;
    },function(err)
    {
        console.log(err);
    });
});

app.controller("mypollCtrl", function($scope, $http, $rootScope){
  $scope.name = [];

  $http.get('/poll/mydata/'+$rootScope.user).then(function(d)
    {
      $scope.names = d.data;
    },function(err)
    {
        console.log(err);
    });
});

app.controller("showCtrl", function($scope, $routeParams, $http, $rootScope, $location, $window){

  <!-- Google chart part-->
  // Load google charts
  google.charts.load('current', {'packages':['corechart']});
  // Draw the chart and set the chart values
  function drawChart() {

    var tableData = [['Effort', 'Amount given'],];
    // console.log($scope.option.length);
    for(var i = 0; i < $scope.option.length; i++){
      var tmp = [$scope.option[i], parseInt($scope.count[i])];
      tableData.push(tmp);
    }
    // var dddd = [
    //   ['Effort', 'Amount given'],
    //   ['Work', 5],
    //   ['Eat', 0],
    //   ['TV', 0],
    //   ['Gym', 0],
    //   ['Sleep', 0]
    // ];
    var data = google.visualization.arrayToDataTable(tableData);

      // Optional; add a title and set the width and height of the chart
      // var options = {'title':'My Average Day', 'width':550, 'height':400, 'background-color':'black'};
    var options = {
      title: $scope.title,
      pieHole: 0.5,
      pieSliceTextStyle: {
        color: 'black',
      },
      backgroundColor: "#F8F8F8",
      is3D: 'true'
    };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('showChart'));
    chart.draw(data, options);
  }

  $http.get("/poll/show/"+$routeParams.id).then(function(d){
    // console.log(d.data);
    // $scope.option = [];
    $scope.title = d.data["title"];
    // $scope.count = [];

    $scope.option = d.data["option"].split("$");
    $scope.count = d.data["count"].split("$");
    // console.log($scope.option+":"+$scope.title);
    google.charts.setOnLoadCallback(drawChart);
  }, function(err){console.log("No matched data!")});

  $scope.submit = function(){
    var ary = $scope.option;
    var pattern  = $scope.selOption;
    var index = ary.indexOf(pattern);
    $scope.count[index] = parseInt($scope.count[index])+1;
    google.charts.setOnLoadCallback(drawChart);

    //save the database!

    var params = $.param({
      count : $scope.count.join("$"),
      id : $routeParams.id
    });

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $http({
        url: '/poll/update',
        method: "POST",
        data: params
    })
    .then(function(response) {
       console.log("success");
    },
    function(response) { // optional
       console.log("error");
    });
  }

  $scope.share = function(){
    alert("This poll shared as '"+$location.path()+"'");
  }

  $scope.remove = function(){
    $http.get("/poll/delete/" + $routeParams.id).then(function(d){
      console.log("Delete successfully");
    }, function(err){});
    // $http.redirectTo("#!home");
  }
});

app.controller("inputCtrl", function($scope, $http, $rootScope){
  $scope.title= "Sign up";
  $scope.btnName = "Submit";
  $scope.url = "/user";
});

// app.controller
