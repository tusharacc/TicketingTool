(function () {
'use strict';

angular.module('TicketingTool')
.controller('SearchController', SearchController);


SearchController.$inject = ['ticketData','ReportDataService','$q'];
function SearchController(ticketData,ReportDataService,$q) {
  let srch = this;
  let ticketList;
  ticketList = ticketData;
  console.log('Search Controller',ticketList)
  srch.ticketList = ticketList;
  srch.categories = ReportDataService.getCategories();
  srch.changeStatus = function(id,status,type){
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
      srch.ticketList = ticketList;
      //ReportDataService.updateDataForID(response.data.data[0]);
      console.log(srch.ticketList);
    },function(response, status) {
       console.log("The request failed with response " + response + " and status code " + status);
    });
  }

  srch.changeRca = function(id,rca,type){
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
      srch.ticketList = ticketList;
      //ReportDataService.updateDataForID(response.data.data[0]);
      console.log(srch.ticketList);
    },function(response, status) {
       console.log("The request failed with response " + response + " and status code " + status);
    });
  }


}
})();