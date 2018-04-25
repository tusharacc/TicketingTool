(function () {
'use strict';

angular.module('TicketingTool')
.controller('ReportController', ReportController);


ReportController.$inject = ['ticketData','ReportDataService','$q'];
function ReportController(ticketData,ReportDataService,$q) {
  let rpt = this;
  let ticketList;
  ticketList = ticketData.data.data;
  rpt.categories = ticketData.data.categories;
  ReportDataService.updateData(ticketList);
  ReportDataService.categories(rpt.categories);
  console.log(ticketList);
  let showAll = false;
  let openTickets = false;
  rpt.ticketList = ticketList;
  rpt.getArray = ticketList;

  rpt.changeStatus = function(id,status,type){
    let promise = ReportDataService.updateStatus(id,status,type);
    promise.then(function(response){
      let id = response.data.data[0].id;
      let comment = response.data.data[0].comment;
      let status = response.data.data[0].ticket_status;
      let closure_date = response.data.data[0].closure_date;
      for (let i = 0; i < ticketList.length; i++){
        if (ticketList[i].id === id){
            ticketList[i].ticket_status = status;
            ticketList[i].comment = comment;
            ticketList[i].closure_date = closure_date;
        }
      }
      rpt.ticketList = ticketList;
      ReportDataService.updateData(rpt.ticketList);
      console.log(rpt.ticketList);
    },function(response, status) {
       console.log("The request failed with response " + response + " and status code " + status);
    });
  }

  rpt.changeRca = function(id,rca,type){
    let promise = ReportDataService.updateStatus(id,rca,type);
    promise.then(function(response){
      let id = response.data.data[0].id;
      let comment = response.data.data[0].comment;
      let failure_category = response.data.data[0].failure_category;

      for (let i = 0; i < ticketList.length; i++){
        if (ticketList[i].id === id){
            ticketList[i].failure_category = failure_category;
            ticketList[i].comment = comment;

        }
      }
      rpt.ticketList = ticketList;
      ReportDataService.updateData(rpt.ticketList);
      console.log(rpt.ticketList);
    },function(response, status) {
       console.log("The request failed with response " + response + " and status code " + status);
    });
  }

  rpt.showOpenTickets = function(){
    openTickets = true;
    showAll = false;
    rpt.ticketList = ticketList.filter(v => v.ticket_status != 'CLOSED');
  }

  rpt.showAllTickets = function(){
    openTickets = false;
    showAll = true;
    rpt.ticketList = ticketList;
  }

  rpt.exportToExcel = function(){
    alasql('SELECT * INTO XLSX("tickets.xlsx",{headers:true}) FROM ?',[rpt.ticketList]);
/*    let criteria = openTickets ? "Open":"All"

    let promise = ReportDataService.exportToExcel(criteria);
    promise.then(function(response){
        console.log("Downloaded");
    },function(response, status) {
       console.log("The request failed with response " + response + " and status code " + status);
    });*/
  }

}
})();