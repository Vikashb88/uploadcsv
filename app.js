var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.importer', 'ui.grid.rowEdit', 'ui.grid.edit']);

app.controller('MainCtrl', ['$scope', '$http', '$interval', '$q', function ($scope, $http, $interval, $q) {
  $scope.title = 'Upload CSV'
  $scope.data = [];
  $scope.gridOptions = {
    rowHeight: 45,
    enableGridMenu: true,
    importerDataAddCallback: function( grid, newObjects ) {
      $scope.data = $scope.data.concat( newObjects );
    },
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
      gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    },
    data: 'data'
  };

  $scope.gridOptions.columnDefs = [{
    name: 'First_Name'
  }, {
    name: 'Last_Name'
  },{
    name: 'Email'
  },{
    name: 'Client_ID'
  },{
    name: 'Health_plan'
  },{
    name: 'Role'
  }, {
    name: 'Delete',
    cellTemplate: '<button class="btn btn-danger" ng-click="grid.appScope.deleteRow(row)">Delete</button>'
  }];

  $scope.saveRow = function( rowEntity ) {
    var promise = $q.defer();
    $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
    promise.resolve();
  };

  $scope.deleteRow = function(row) {
    var index = $scope.data.indexOf(row.entity);
    $scope.data.splice(index, 1);
  };

  var handleFileSelect = function( event ){
    var target = event.srcElement || event.target;
    if (target && target.files && target.files.length === 1) {
      var fileObject = target.files[0];
      $scope.gridApi.importer.importFile( fileObject );
      target.form.reset();
    }
  };
  var fileChooser = document.querySelectorAll('.file-chooser');

  if ( fileChooser.length !== 1 ){
    console.log('error');
  } else {
    fileChooser[0].addEventListener('change', handleFileSelect, false);
  }
}]);
