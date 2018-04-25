(function () {
'use strict';

angular.module('data')
.service('ReportDataService', ReportDataService );


ReportDataService.$inject = ['$http','$q']
function ReportDataService($http,$q) {
  let data;
  let categories;
  let service = this;
  let BASE_URL = "http://127.0.0.1:5000/";
  service.getAllApi = function(){
    let req = $http({
      method: "GET",
      url: BASE_URL
    });
    return req;

  }

  service.updateStatus = function(ticket,value,type){

    let ticket_no=ticket;
    let latest_value=value;
    let change_type = type
    let ENDPOINT = "update_status";
    let req = $http({
      method: 'GET',
      url: BASE_URL + ENDPOINT,
      params:{ticket_no:ticket_no,latest_value:latest_value,change_type:change_type}
    });
    return req
  }

  service.exportToExcel = function(value){
    let ENDPOINT = "export_to_excel";
    let req = $http({
        method: 'GET',
        url: BASE_URL + ENDPOINT,
        params:{value:value},
        headers: {
        "X-Download":"yes",
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
    });
    return req
  }

  service.updateData = function(value){
    data = value;
  }

  service.categories = function(value){
    categories = value;
  }

  service.getCategories = function(){
    return categories;
  }

  service.getData = function(){
    return data;
  }

  service.getFilteredRecords = function(value){
    console.log('Data Service',value);
    let options = {
      keys: ['policy_number', 'insured_name']
    };
    let fuse = new Fuse(data, options);
    let d = fuse.search(value);
    console.log('search',d);
    return d;
  }
}

})();