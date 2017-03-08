var app = angular.module('game', []);

app.controller('mainController', ['$scope',
    function($scope) {
        //required for dependency
        $scope.obj = {};
        $scope.number = 4;
        $scope.gametype = 1;
        $scope.Math = window.Math;
        $scope.imageurl = [
            "icons/icon01.png", "icons/icon02.png", "icons/icon03.png", "icons/icon04.png", "icons/icon05.png", "icons/icon06.png", "icons/icon07.png", "icons/icon08.png",
             "icons/icon09.png", "icons/icon10.png", "icons/icon11.png", "icons/icon12.png", "icons/icon13.png", "icons/icon14.png", "icons/icon15.png", "icons/icon16.png",
            "icons/icon17.png", "icons/icon18.png",// "icons/icon19.png", "icons/icon20.png", "icons/icon21.png", "icons/icon22.png", "icons/icon23.png", "icons/icon24.png",
            //"icons/icon25.png", "icons/icon26.png", "icons/icon27.png", "icons/icon28.png", "icons/icon29.png", "icons/icon30.png", "icons/icon31.png", "icons/icon32.png"
        ];
        $scope.obj.completed = false;
        //Number is defined by availlable icons
        $scope.number = $scope.imageurl.length;

    }
]);


app.directive('gierka',
    function() {
        var arr = [];
        var negarr = [];
        return {
            link: function($scope, elem, attrs) {
                console.log($scope.number)

                function create(k) {
                    arr = [];
                    negarr = [];
                    $scope.obj = {};
                    while (arr.length < 2 * k) {
                        var randomnumber = Math.floor(Math.random() * 2 * k) + 1
                        var found = false;
                        for (var i = 0; i < arr.length + 1; i++) {
                            if (arr[i] == randomnumber) {
                                found = true;
                                break
                            }
                        }
                        if (!found) {
                            arr[arr.length] = randomnumber;
                            negarr[randomnumber] = arr.length - 1;
                        }
                    }
                    var temp1, temp2, temp3;
                    var backtemp;
                    for (i = 1; i < k + 1; i++) {
                        $scope.obj[i * 2] = {
                            "id": 2 * i,
                            "position": arr[2 * i - 1],
                            "imagesrc": temp1 + "% " + temp2 + "%",
                            "src": $scope.imageurl[i - 1],
                            "immage": "icons/landscape.png"
                        }
                        $scope.obj[2 * i - 1] = {
                            "id": 2 * i - 1,
                            "position": arr[2 * i - 2],
                            "imagesrc": temp1 + "% " + temp2 + "%",
                            "src": $scope.imageurl[i - 1],
                            "immage": "icons/landscape.png"
                        }
                        $scope.obj[2 * i].img = new Image();
                        $scope.obj[2 * i - 1].img = new Image();

                    }


                }
                create($scope.number);
                $scope.channge = function() {
                    create($scope.number);
                    console.log("change");
                }
            },
            scope: true,
            templateUrl: 'onetitle2.html',
            controller: function($scope, $element) {
                $scope.obj.tochange = false;
                $scope.change = function() {
                        
                    }
                    //var pointerTypes = ['touch'];
                $scope.moveclick = function(id) {
                    if (!$scope.obj[id].done) {
                        if (!$scope.obj.tochange) {
                            $scope.obj[id].isChosen = true;
                            $scope.obj.tochange = id;
                            $scope.obj[id].immage = $scope.obj[id].src;
                        } else {
                            if (!$scope.obj[id].isChosen) {
                                $scope.moveto(id);
                            } else {
                                $scope.obj.tochange = false;
                                $scope.obj[id].isChosen = false;
                                $scope.obj[id].immage = "icons/landscape.png";
                            }
                        }
                    }
                }
                $scope.moveto = function(id) {
                    var num = $scope.number;
                    var num2 = Math.sqrt(num);
                    var pos1 = $scope.obj[id].position;
                    var pos2 = $scope.obj[$scope.obj.tochange].position;
                    function iswin() {
                        for (i = 1; i < (num * 2 - 1); i++) {
                            console.log(i)
                            if (!$scope.obj[i].done) {
                                console.log($scope.obj[i])
                                return false;
                            }
                        }
                        //$scope.obj.completed = true;
                        alert("win!");
                        return true;
                    } //End of iswin

                    if (!$scope.obj.completed && !$scope.obj[id].done && !$scope.obj[$scope.obj.tochange].done) {
                        $scope.obj[id].isChosen = true;
                        $scope.obj[id].immage = $scope.obj[id].src;
                        setTimeout(function() {
                            if ($scope.obj.tochange) {
                                if ($scope.obj[id].src == $scope.obj[$scope.obj.tochange].src) {
                                    $scope.obj[id].done = true;
                                    $scope.obj[$scope.obj.tochange].done = true;
                                    console.log($scope.obj[$scope.obj.tochange].done)
                                } else {
                                    $scope.obj[id].immage = "icons/landscape.png";
                                    $scope.obj[$scope.obj.tochange].immage = "icons/landscape.png";
                                }
                            }
                            $scope.obj[$scope.obj.tochange].isChosen = false;
                            $scope.obj.tochange = false;
                            $scope.obj[id].isChosen = false;


                        }, 0);
                    }
                    setTimeout(function() {
                        iswin()
                    }, 2);


                }

                // $scope.dotykaniola = function() {
                //     alert('move');
                // }
            }
        }
    }
); //End of directive