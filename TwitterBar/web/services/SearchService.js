define(["services/ServiceBase"], function (ServiceBase) {
    function SearchService() {
        ServiceBase.call(this, "Home");
    }
    SearchService.prototype = new ServiceBase;
    SearchService.prototype.constructor = SearchService;

    SearchService.prototype.getSelectionData = function (productType, productUnitType) {
        return this.get.call(this, "GetProducts", "/" + productType + "/" + productUnitType);
    };

    SearchService.prototype.getTonnageData = function () {
        return this.get.call(this, "GetTonnages");
    };

    SearchService.prototype.getBrandData = function () {
        return this.get.call(this, "GetActiveBrands");
    };
    SearchService.prototype.getAvailableBrandsBySession = function () {
        return this.get.call(this, "GetAvailableBrandsBySession");
    };

    SearchService.prototype.deleteSavedSearch = function (searchCriteria) {
        return this.post.call(this, "DeleteSearchCriteria", searchCriteria);
    };

    SearchService.prototype.saveSavedSearch = function (searchCriteria) {
        return this.post.call(this, "SaveSearchCriteria", searchCriteria);
    };


    SearchService.prototype.getGetSearchCriteriasData = function () {
        return this.post.call(this, "GetSearchCriterias");
    };

    SearchService.prototype.searchOutdoorUnits = function (request) {
        return this.post.call(this, "SearchOutdoorUnits", request);
    };
    
    SearchService.prototype.searchIndoorUnits = function (searchIndoorRequest) {
        return this.post.call(this, "SearchIndoorUnits", searchIndoorRequest);
    };

    SearchService.prototype.searchCoils = function (searchIndoorRequest) {
        return this.post.call(this, "SearchCoils", searchIndoorRequest);
    };

    SearchService.prototype.getMatchingSystem = function (matchingRequest) {
        return this.post.call(this, "GetMatchingSystem", matchingRequest);
    };
    
    SearchService.prototype.getColumnDataMatching = function (searchCriteria) {
        return this.post.call(this, "GetColumnDataMatchingSystem", searchCriteria);
    };

    SearchService.prototype.getSavedSearchData = function() {
        return this.get.call(this, "GetSearchCriteriaDropDown");
    };

    SearchService.prototype.getSavedSearchReference = function (id) {
        return this.get.call(this, "GetSearchCriteriaReference","/" + id);
    };

    SearchService.prototype.getMatchingSystemById = function (id) {
        return this.get.call(this, "GetMatchingSystemById", "/" + id);
    };

    SearchService.prototype.getSEERData = function (region, brand) {
        return this.get.call(this, "GetSeerData", "/" + region + "/" + brand);
    };
    
    SearchService.prototype.getRegionData = function () {
        return this.get.call(this, "GetRegion");
    };

    SearchService.prototype.getCustomerInfo = function () {
        return this.get.call(this, "GetCustomerInfo");
    };

    return SearchService;
});