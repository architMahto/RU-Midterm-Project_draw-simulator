;(function() {
  'use strict';

  angular.module('drawController', [])
    .controller('drawController', drawController)

  // Controller Callback
  function drawController($stateParams, $firebaseObject, $firebaseArray) {
    var drawCtrl = this;

    drawCtrl.tournament = {};
    drawCtrl.potSize = null;
    drawCtrl.teams = [];

    // variables for pots
    drawCtrl.pot1 = [];
    drawCtrl.pot2 = [];
    drawCtrl.pot3 = [];
    drawCtrl.pot4 = [];

    // variables for groups
    drawCtrl.groupA = [];
    drawCtrl.groupB = [];
    drawCtrl.groupC = [];
    drawCtrl.groupD = [];
    drawCtrl.groupE = [];
    drawCtrl.groupF = [];

    // calls to Firebase databases
    var ref = new Firebase('https://draw-simulator.firebaseio.com/tournaments/' + $stateParams.id);
    var teamsRef = new Firebase('https://draw-simulator.firebaseio.com/teams');

    // variable to store tournament object
    // drawCtrl.tournament = $firebaseObject(ref);
    $firebaseObject(ref).$loaded().then(getTournament);

    function getTournament(data) {
      // set data of tournament object to drawCtrl.tournament
      drawCtrl.tournament = data;
      // variable to store pot size
      drawCtrl.potSize = drawCtrl.tournament.maxTeams/4;
    }

    // variable to store 4 pots of teams
    // set teams from firebase array to drawCtrl.teams
    $firebaseArray(teamsRef).$loaded().then(getTeams);

    function getTeams(data) {
      drawCtrl.teams = _.sortBy(data, 'nationalCoefficient').reverse();

      // Add host(s) to pot 1
      for (var i = 0; i < drawCtrl.teams.length; i++) {
        // console.log(drawCtrl.teams[i]);
        if (drawCtrl.teams[i].host) {
          // console.log(drawCtrl.teams[i]);
          drawCtrl.pot1.push(drawCtrl.teams[i]);
        }
      }

      // index to keep track of previous pot's exit index
      var k = 0;

      // Add teams to pot 1
      for (var i = 0; i < drawCtrl.teams.length; i++) {
        if (!drawCtrl.teams[i].host) {
          drawCtrl.pot1.push(drawCtrl.teams[i]);
        }
        if (drawCtrl.pot1.length === drawCtrl.potSize) {
          k = i;
          break;
        }
      }

      // Add teams to pot 2
      for (var i = (k+1); i < drawCtrl.teams.length; i++) {
        if (!drawCtrl.teams[i].host) {
          drawCtrl.pot2.push(drawCtrl.teams[i]);
        }
        if (drawCtrl.pot2.length === drawCtrl.potSize) {
          k = i;
          break;
        }
      }

      // Add teams to pot 3
      for (var i = (k+1); i < drawCtrl.teams.length; i++) {
        if (!drawCtrl.teams[i].host) {
          drawCtrl.pot3.push(drawCtrl.teams[i]);
        }
        if (drawCtrl.pot3.length === drawCtrl.potSize) {
          k = i;
          break;
        }
      }

      // Add teams to pot 4
      for (var i = (k+1); i < drawCtrl.teams.length; i++) {
        if (!drawCtrl.teams[i].host) {
          drawCtrl.pot4.push(drawCtrl.teams[i]);
        }
        if (drawCtrl.pot4.length === drawCtrl.potSize) {
          k = i;
          break;
        }
      }

      // console.log(drawCtrl.pot1);
      // console.log(drawCtrl.pot2);
      // console.log(drawCtrl.pot3);
      // console.log(drawCtrl.pot4);
    }


    // Helper function to assign group
    function assignGroup(team, group) {
      if (group == 'A') {
        drawCtrl.groupA.push(team);
      } else if (group == 'B') {
        drawCtrl.groupB.push(team);
      } else if (group == 'C') {
        drawCtrl.groupC.push(team);
      } else if (group == 'D') {
        drawCtrl.groupD.push(team);
      } else if (group == 'E') {
        drawCtrl.groupE.push(team);
      } else if (group == 'F') {
        drawCtrl.groupF.push(team);
      }
    }

    drawCtrl.draw = function() {
      // console.log(drawCtrl.teams);
      var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
      // var nums = [0,1,2,3,4,5];

      var pot1Copy = drawCtrl.pot1.slice();
      var pot2Copy = drawCtrl.pot2.slice();
      var pot3Copy = drawCtrl.pot3.slice();
      var pot4Copy = drawCtrl.pot4.slice();

      // reset groups for repeated draws
      drawCtrl.groupA = [];
      drawCtrl.groupB = [];
      drawCtrl.groupC = [];
      drawCtrl.groupD = [];
      drawCtrl.groupE = [];
      drawCtrl.groupF = [];

      var i = 0;

      while (pot1Copy.length > 0) {

        if (pot1Copy[i].host) {
          letters.splice(letters.indexOf('A'),1);
          drawCtrl.groupA.push(pot1Copy[0]);
          pot1Copy.splice(0,1);
        } else {
          var pickGroup = Math.floor(Math.random()*letters.length);
          var selectedGroup = letters[pickGroup];
          var pickTeam = Math.floor(Math.random()*pot1Copy.length);

          assignGroup(pot1Copy[pickTeam], selectedGroup);

          pot1Copy.splice(pickTeam,1);
          letters.splice(pickGroup,1);
        }
      }

      var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

      while (pot2Copy.length > 0) {
        var pickGroup = Math.floor(Math.random()*letters.length);
        var selectedGroup = letters[pickGroup];
        var pickTeam = Math.floor(Math.random()*pot2Copy.length);

        assignGroup(pot2Copy[pickTeam], selectedGroup);

        pot2Copy.splice(pickTeam,1);
        letters.splice(pickGroup,1);
      }

      var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

      while (pot3Copy.length > 0) {
        var pickGroup = Math.floor(Math.random()*letters.length);
        var selectedGroup = letters[pickGroup];
        var pickTeam = Math.floor(Math.random()*pot3Copy.length);

        assignGroup(pot3Copy[pickTeam], selectedGroup);

        pot3Copy.splice(pickTeam,1);
        letters.splice(pickGroup,1);
      }

      var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

      while (pot4Copy.length > 0) {
        var pickGroup = Math.floor(Math.random()*letters.length);
        var selectedGroup = letters[pickGroup];
        var pickTeam = Math.floor(Math.random()*pot4Copy.length);

        assignGroup(pot4Copy[pickTeam], selectedGroup);

        pot4Copy.splice(pickTeam,1);
        letters.splice(pickGroup,1);
      }
    }
  }
})();
