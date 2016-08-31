//Flawless

angular.module('myControllers').controller('PdfController', function($routeParams, eventService) {

  var vm  = this;

  eventService.getById($routeParams.id, function(response) {
    vm.event = response.data.data;
    vm.partecipants = angular.copy(vm.event.partecipants);
  }, function(response)  {
    console.log(response);
  });

  vm.remove = function(partecipant, partecipants) {
    angular.forEach(partecipants, function(entry, index) {
      if(entry.id == partecipant.id) {
        partecipants.splice(index, 1);
      }
    });
  };

  vm.openPdf = function(partecipants, event) {
    var body = [[
      { text: 'Partecipante', style: 'tableHeader' }
    ]];
    var totalPartecipants = 0;

    angular.forEach(partecipants, function(partecipant) {
      body.push([
        { text: partecipant.name, style: 'tableText' }
      ]);

      totalPartecipants++;
    });

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
      }, {
        style: 'text',
        text: 'Partecipanti: ' + totalPartecipants
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
        },
        text: {
          alignment: 'center',
          fontSize: 12,
          margin: [0, 15, 0, 15]
        }
      }
    };

    pdfMake.createPdf(pdf).open();
  };

});
