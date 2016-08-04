angular.module("myControllers").controller("EventsController", function ($location, $routeParams, categoryService, paginationService, partecipantService, userService) {

  var vm  = this;

  userService.me(function(response) {
    vm.user = response.data.data;
  }, function(response) {
    console.log(response);
  });

  categoryService.getById($routeParams.id, function(response) {
    vm.category = response.data.data;

    paginationService.paginate(vm.category, 1);

    vm.pagination = paginationService.getPagination($routeParams.page);
  }, function(response)  {
    console.log(response);
  });

  vm.addPartecipant = function(name, event, pr) {

    partecipantService.create({
      name: name,
      event_id: event.id,
      pr_id: pr.id
    }, function(response) {
      categoryService.getById($routeParams.id, function(response) {
        vm.category = response.data.data;

        paginationService.paginate(vm.category, 1);

        vm.pagination = paginationService.getPagination($routeParams.page);

        vm.name = null;
      }, function(response)  {
        console.log(response);
      });

    }, function(response) {
      console.log(response);
    });

  };

  vm.redirectToPage = function(page) {
    if(page > 0 && page <= vm.pagination.totalPages) {
      $location.path('categoria/' + $routeParams.id + '/pagina/' + page)
    }
  };

  vm.redirect = function(path) {
    $location.path(path);
  };

  vm.openPartecipantsPrsPdf = function(event) {

    var prs = [];

    var partecipants = [[
      { text: 'Partecipante', style: 'tableHeader' },
      { text: 'Pr', style: 'tableHeader' }
    ]];

    angular.forEach(event.partecipants, function(partecipant) {

      partecipants.push([
        { text: partecipant.name, style: 'tableText' },
        { text: partecipant.pr.firstName + ' ' + partecipant.pr.lastName, style: 'tableText' }
      ])

      var found = false;
      angular.forEach(prs, function(pr, index) {
        if(pr.id == partecipant.pr.id) {
          found = true;
          prs[index].partecipants++;
        }
      });

      if(!found) {
        prs.push({
          id: partecipant.pr.id,
          name: partecipant.pr.firstName + ' ' + partecipant.pr.lastName,
          partecipants: 1
        });
      }

    });

    var partecipantsPerPr = [[
      { text: 'Pr', style: 'tableHeader' },
      { text: 'Partecipanti', style: 'tableHeader' }
    ]];

    angular.forEach(prs, function(pr) {
      partecipantsPerPr.push([
        { text: pr.name, style: 'tableText' },
        { text: pr.partecipants.toString(), style: 'tableText' }
      ])

    });

    var pdf = {
      content: [{
        text: event.name,
        style: 'header'
      }, {
        style: 'table',
        table: {
          widths: ['*', '*'],
          headerRows: 1,
          body: partecipants
        }
      }, {
        style: 'table',
        table: {
          widths: ['*', '*'],
          headerRows: 1,
          body: partecipantsPerPr
        }
      }],
      styles: {
        header: {
          alignment: 'center',
          bold: true,
          fontSize: 18,
          margin: [0, 0, 0, 10]
        },
        table: {
          margin: [0, 15, 0, 15]
        },
        tableHeader: {
          alignment: 'center',
          bold: true,
          fontSize: 12,
          margin: [0, 2, 0, 2]
        },
        tableText: {
          alignment: 'center',
          fontSize: 10,
          margin: [0, 2, 0, 2]
        }
      }
    };

    pdfMake.createPdf(pdf).open();

  };

  vm.openPartecipantsPdf = function(event) {

    var body = [[
      { text: 'Partecipante', style: 'tableHeader' }
    ]];

    angular.forEach(event.partecipants, function(partecipant) {
      body.push([
        { text: partecipant.name, style: 'tableText' }
      ])
    })

    var pdf = {
      content: [{
        text: event.name,
        style: 'header'
      }, {
        style: 'table',
        table: {
          widths: ['*'],
          headerRows: 1,
          body: body
        }
      }],
      styles: {
        header: {
          alignment: 'center',
          bold: true,
          fontSize: 18,
          margin: [0, 0, 0, 10]
        },
        table: {
          margin: [0, 15, 0, 15]
        },
        tableHeader: {
          alignment: 'center',
          bold: true,
          fontSize: 12,
          margin: [0, 2, 0, 2]
        },
        tableText: {
          alignment: 'center',
          fontSize: 10,
          margin: [0, 2, 0, 2]
        }
      }
    };

    pdfMake.createPdf(pdf).open();

  };

});
