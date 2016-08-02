//  Backup Of app.js

$scope.applyProjectStatusFilter = function(obj) {
        $localStorage.projectStatus = obj;
        console.log(obj);
    };

    $scope.applyConfigurationFilter = function(obj) {
        console.log(obj);
        $localStorage.configuration = obj;
    };

    $scope.applyCostFilter = function(obj) {
        console.log($scope.filters);
        $localStorage.cost = obj;
    };

    $scope.applyOthersFilter = function(obj) {
        console.log($scope.filters);
        $localStorage.others = obj;
    };
    
    $scope.applyNearbyFilter = function(obj) {
        console.log($scope.filters);
        $localStorage.nearby = obj;
    };

    $scope.applyRatingFilter = function(obj) {
        $localStorage.rating = obj;
    };

    $scope.applyTopFilter = function(obj) {
        $localStorage.top = obj;
    };

    $scope.applyLocationFilter = function(obj) {
        $localStorage.loc = obj;
    };

    $scope.applySecurityFilter = function(obj) {
        $localStorage.security = obj;
    };

    $scope.applyClubHouseFilter = function(obj) {
        $localStorage.clubHouse = obj;
    };

    $scope.applySportActivitiesFilter = function(obj) {
        $localStorage.sportActivities = obj;
    };
    $scope.applySpecificationsFilter = function(obj) {
        $localStorage.specifications = obj;
    };

    $scope.applyProjectDetailsFilter = function(obj) {
        console.log(obj);
        $localStorage.projectDetails = obj;
    }