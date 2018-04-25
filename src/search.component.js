(function () {
"use strict";

angular.module('TicketingTool')
.component('search', {
  templateUrl: 'src/templates/search.template.html',
  controller: SearchItemController,
});

SearchItemController.$inject = ['ReportDataService'];
function SearchItemController(ReportDataService) {
  let $ctrl = this;
  $ctrl.data = ReportDataService.getData();

  $ctrl.filterData = function(){
  }
}
})();