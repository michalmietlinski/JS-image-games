var app = angular.module('game', []);

app.controller('mainController', ['$scope',
    function($scope) {
        //Dependecie needed variables
        $scope.obj = {};
        $scope.number = 9;
        $scope.gametype = 1;
        $scope.Math = window.Math;
        $scope.imageurl = "arnold.jpg";
        $scope.obj.completed = false;

        //Proper start position
        $scope.obj.img2 = new Image();
        $scope.obj.img2.src = $scope.imageurl;
        angular.element(document).ready(function() {
            var temp = ($scope.obj.img2.height / $scope.obj.img2.width) * 100;
            $(".tileWrapper").css("padding-bottom", temp + "%");

        });
    }
]);


app.directive('gierka', ['swipe',
    function(swipe) {
        var arr = [];
        var negarr = [];
        return {
            link: function($scope, elem, attrs) {
                function create(k) {
                    arr = [];
                    negarr = [];
                    $scope.obj = {};
                    $scope.obj.img = new Image();
                    $scope.obj.img.src = $scope.imageurl;

                    //Random position

                    while (arr.length < k) {
                        var randomnumber = Math.floor(Math.random() * k) + 1
                        var found = false;
                        for (var i = 0; i < arr.length; i++) {
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
                    console.log(negarr)
                        //Background for all block
                    var temp1, temp2, temp3;
                    var backtemp;

                    for (i = 0; i < k; i++) {
                        temp3 = Math.floor(i / Math.sqrt(k)) + 1;
                        if (i % Math.sqrt(k) == 0 || i == 0) {
                            temp1 = 0;
                        } else if (i % Math.sqrt(k) == Math.sqrt(k) - 1) {
                            temp1 = 100;
                        } else {
                            temp1 = (i % Math.sqrt(k)) * (100 / (Math.sqrt(k) - 1));
                        }
                        if (temp3 == 1) {
                            temp2 = 0;
                        } else if (temp3 == Math.sqrt(k)) {
                            temp2 = 100;
                        } else {
                            temp2 = (temp3 - 1) * (100 / (Math.sqrt(k) - 1));
                        }
                        //Save of block
                        $scope.obj[i] = {
                            "id": i,
                            "position": arr[i],
                            "backgroundpos": temp1 + "% " + temp2 + "%"
                        }

                    }
                    if ($scope.gametype == 2) {
                        $scope.obj[0].backgroundpos2 = $scope.obj[0];
                        $scope.obj[0].backgroundpos = "200% 200%;";
                        $scope.obj[0].empty = true;
                    }
                }

                //Call function for number of blocks (square of single digit number) 
                create($scope.number);
                $scope.channge = function() {
                    create($scope.number);
                    console.log("change");
                }
            },
            scope: true,
            templateUrl: 'onetitle2.html',
            //Directive controller
            controller: function($scope, $element) {
                $scope.obj.tochange = false;
                $scope.change = function() {
                    console.log(change);
                }

                console.log($('.tile'));

                $scope.swipe = function(zmien, klucz) {
                    var temp1, temp2, temp3, temp4;
                    var result;

                    if (!$scope.obj.tochange) {
                        $scope.obj[klucz].isChosen = true;
                        $scope.obj.tochange = klucz;

                    } else {
                        $scope.obj[$scope.obj.tochange].isChosen = false;
                        $scope.obj.tochange = false;
                        $scope.obj[klucz].isChosen = true;
                        $scope.obj.tochange = klucz;
                    };
                    temp1 = $scope.obj[klucz].position;
                    temp2 = Math.sqrt($scope.number)
                    switch (zmien) {
                        case 'up':
                            temp4 = temp1 - temp2;
                            temp3 = negarr[temp4];
                            if (temp4 > 0) {
                                $scope.moveto(temp3);
                                console.log(temp1 + " " + temp2 + " " + temp3 + " " + temp4)
                            };

                            break;
                        case 'down':
                            temp4 = temp1 + temp2;
                            temp3 = negarr[temp4];
                            if (temp4 < $scope.number) {
                                $scope.moveto(temp3);
                                console.log(temp1 + " " + temp2 + " " + temp3 + " " + temp4)
                            };
                            break;
                        case 'left':
                            temp4 = temp1 - 1;
                            temp3 = negarr[temp4];
                            console.log(temp4 % temp2)
                            if (temp4 % temp2 != 0) {
                                $scope.moveto(temp3);
                                console.log(temp1 + " " + temp2 + " " + temp3 + " " + temp4)
                            };
                            break;
                        case 'right':
                            temp4 = temp1 + 1;
                            temp3 = negarr[temp4];
                            console.log(temp4 % temp2)
                            if (temp4 % temp2 != 1) {
                                $scope.moveto(temp3);
                                console.log(temp1 + " " + temp2 + " " + temp3 + " " + temp4)
                            };
                            break;

                    }
                };
                $scope.moveclick = function(id) {
                    if (!$scope.obj.tochange) {
                        $scope.obj[id].isChosen = true;
                        $scope.obj.tochange = id;

                    } else {
                        $scope.moveto(id);
                    }

                }
                $scope.moveto = function(id) {

                        var num = $scope.number;
                        var num2 = Math.sqrt(num);
                        var pos1 = $scope.obj[id].position;
                        var pos2 = $scope.obj[$scope.obj.tochange].position;

                        function pasuje() {
                            if ($scope.gametype == 2) {
                                if ($scope.obj.tochange != 0 && id != 0) {
                                    return false;
                                }
                            }

                            if (pos1 > num || pos2 > num || pos1 < 0 || pos2 < 0) {
                                return false;
                            }

                            if (pos1 == (pos2 + num2) || pos1 == (pos2 - num2)) {
                                return true;
                            }

                            var up = Math.ceil(pos1 / num2);
                            var up2 = Math.ceil(pos2 / num2);

                            if ((up == up2 && pos1 == (pos2 + 1)) || (up == up2 && pos1 == (pos2 - 1))) {
                                return true;
                            }

                        } //End of Pasuje;

                        function iswin() {
                            for (i = 0; i < num - 1; i++) {
                                if ($scope.obj[i].position >= $scope.obj[i + 1].position) {
                                    $scope.obj.completed = false;
                                    return false;
                                }
                            }

                            $scope.obj.completed = true;
                            $scope.obj[0].backgroundpos = "0% 0%;";
                            return true;

                        } //End of iswin

                        //change position
                        if (pasuje() && !$scope.obj.completed) {
                            $scope.obj[id].position = pos2;
                            $scope.obj[$scope.obj.tochange].position = pos1;
                            negarr[pos2] = id;
                            negarr[pos1] = $scope.obj.tochange;
                        }

                        $scope.obj[$scope.obj.tochange].isChosen = false;
                        $scope.obj.tochange = false;


                        if (iswin()) {
                            alert("win!");
                            console.log($scope.obj.completed)
                        };

                    } //End of moveto

                $scope.dotykaniola = function() {
                    alert('move');
                }
            }
        }
    }
]); //End of directive


app.factory('swipe', function() {
    var MOVE_BUFFER_RADIUS = 40;
    var MAX_RATIO = 0.3;

    var POINTER_EVENTS = {
        'mouse': {
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup'
        },
        'touch': {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend',
            cancel: 'touchcancel'
        }
    };

    function getCoordinates(event) {
        var originalEvent = event.originalEvent || event;
        var touches = originalEvent.touches && originalEvent.touches.length ? originalEvent.touches : [originalEvent];
        var e = originalEvent.changedTouches && originalEvent.changedTouches[0] || touches[0];

        return {
            x: e.clientX,
            y: e.clientY
        };
    }

    function getEvents(pointerTypes, eventType) {
        var res = [];
        angular.forEach(pointerTypes, function(pointerType) {
            var eventName = POINTER_EVENTS[pointerType][eventType];
            if (eventName) {
                res.push(eventName);
            }
        });
        return res.join(' ');
    }

    return {

        bind: function bind(element, eventHandlers, pointerTypes) {

            // Absolute total movement
            var totalX, totalY;
            // Coordinates of the start position.
            var startCoords;
            var lastPos;
            // Whether a swipe is active.
            var active = false;
            // Decide where we are going
            var isDecided = false;
            var isVertical = true;

            pointerTypes = pointerTypes || ['mouse', 'touch'];

            element.on(getEvents(pointerTypes, 'start'), function(event) {
                startCoords = getCoordinates(event);
                active = true;
                totalX = 0;
                totalY = 0;
                isDecided = false;
                isVertical = true;
                lastPos = startCoords;
                eventHandlers['start'] && eventHandlers['start'](startCoords, event);
            });

            element.on(getEvents(pointerTypes, 'cancel'), function(event) {
                active = false;
                eventHandlers['cancel'] && eventHandlers['cancel'](event);
            });

            element.on(getEvents(pointerTypes, 'move'), function(event) {

                if (!active) {
                    return;
                }

                if (!startCoords) {
                    return;
                }

                var coords = getCoordinates(event);

                totalX += Math.abs(coords.x - lastPos.x);
                totalY += Math.abs(coords.y - lastPos.y);

                lastPos = coords;

                if (totalX < MOVE_BUFFER_RADIUS && totalY < MOVE_BUFFER_RADIUS) {
                    return;
                } else {
                    if (!isDecided) {

                        var deltaX, deltaY, ratio;

                        deltaX = Math.abs(coords.x - startCoords.x);
                        deltaY = Math.abs(coords.y - startCoords.y);

                        ratio = deltaY / deltaX;

                        if (ratio < MAX_RATIO) {
                            event.preventDefault();
                            isVertical = false;
                        } else {
                            isVertical = true;
                        }

                        isDecided = true;
                    }
                }

                event.isVertical = isVertical;
                eventHandlers['move'] && eventHandlers['move'](coords, event);
            });

            element.on(getEvents(pointerTypes, 'end'), function(event) {
                if (!active) {
                    return;
                }
                event.isVertical = isVertical;
                active = false;
                eventHandlers['end'] && eventHandlers['end'](getCoordinates(event), event);
            });
        }
    };
}).directive('ngSwipeLeft', makeSwipeDirective('ngSwipeLeft', -1, false, 'swipeleft')).directive('ngSwipeRight', makeSwipeDirective('ngSwipeRight', 1, false, 'swiperight')).directive('ngSwipeUp', makeSwipeDirective('ngSwipeUp', -1, true, 'swipeup')).directive('ngSwipeDown', makeSwipeDirective('ngSwipeDown', 1, true, 'swipedown'));

function makeSwipeDirective(directiveName, direction, axis, eventName) {
    return ['$parse', 'swipe',
        function($parse, swipe) {
            var MAX_OTHER_AXIS_DISTANCE = 75,
                MAX_RATIO = 0.3,
                MIN_DISTANCE = 30;

            return function(scope, element, attr) {
                var swipeHandler = $parse(attr[directiveName]);
                var startCoords = undefined,
                    valid = undefined;

                function validSwipe(coords) {
                    if (!startCoords || !valid) {
                        return false;
                    }

                    var deltaY = (coords.y - startCoords.y) * direction;
                    var deltaX = (coords.x - startCoords.x) * direction;

                    if (!axis) {
                        // horizontal swipe
                        return Math.abs(deltaY) < MAX_OTHER_AXIS_DISTANCE && deltaX > 0 && deltaX > MIN_DISTANCE && Math.abs(deltaY) / deltaX < MAX_RATIO;
                    } else {
                        // vertical swipe
                        return Math.abs(deltaX) < MAX_OTHER_AXIS_DISTANCE && deltaY > 0 && deltaY > MIN_DISTANCE && Math.abs(deltaX) / deltaY < MAX_RATIO;
                    }
                }

                var pointerTypes = ['touch'];

                if (!angular.isDefined(attr['ngSwipeDisableMouse'])) {
                    pointerTypes.push('mouse');
                }

                swipe.bind(element, {
                    'start': function start(coords, event) {
                        var className = event.target.getAttribute('class');
                        if (axis && (!className || className && className.match('noPreventDefault') === null)) {
                            event.preventDefault();
                        }
                        startCoords = coords;
                        valid = true;
                    },
                    'cancel': function cancel() {
                        valid = false;
                    },
                    'end': function end(coords, event) {
                        if (validSwipe(coords)) {
                            scope.$apply(function() {
                                element.triggerHandler(eventName);
                                swipeHandler(scope, {
                                    $event: event
                                });
                            });
                        }
                    }
                }, pointerTypes);
            };
        }
    ];
}