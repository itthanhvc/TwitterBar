define(["common/FunctionHelper", "common/Constants"], function (FunctionHelper, Constants) {
    function ServiceBase(controllerName) {
        this.controllerName = controllerName;

        //this function is binding to ajax event to show up loading icon when getting data from server
        $(document).bind("ajaxSend", function () {
            var path = FunctionHelper.GetUrl("Content/Images/ajax-loader.gif");
            $.blockUI({ message: "<div id='spinner' class='spinner'><img id='img-spinner' src='" + path + "' alt='Loading' /></div>" });
        }).bind("ajaxStop", function (event, xhr, settings) {
            $.unblockUI();
        }).bind("ajaxError", function (event, jqXHR, ajaxSettings, errorThrown) {
            $.unblockUI();
            ServiceBase.showFriendlyError();
        });
    }

    ServiceBase.prototype.get = function (methodName, query, isGlobal) {
        var url = "api/" + this.controllerName + "/" + methodName;
        if (query != undefined && query != null)
            url += query;
        var path = FunctionHelper.GetUrl(url);
        if (isGlobal != false)
            isGlobal = true;
        
        return $.ajax({
            url: path,
            global: isGlobal
        });
    };

    ServiceBase.prototype.post = function (methodName, data, isGlobal) {
        var url = "api/" + this.controllerName + "/" + methodName;
        var path = FunctionHelper.GetUrl(url);
        if (isGlobal != false)
            isGlobal = true;

        return $.ajax({
            url: path,
            data: ko.toJSON(data),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            global: isGlobal
        });
    };

    ServiceBase.prototype.download = function (methodName, query) {
        var url = "api/" + this.controllerName + "/" + methodName;
        if (query != undefined && query != null)
            url += query;
        var path = FunctionHelper.GetUrl(url);
        $.fileDownload(path, {
            preparingMessageHtml: "We are preparing your report, please wait...",
            failMessageHtml: "There was a problem generating your report, please try again."
        });
    };

    ServiceBase.prototype.submit = function (methodName, data, jqXHRData) {
        var url = "api/" + this.controllerName + "/" + methodName;
        var path = FunctionHelper.GetUrl(url);
        var jsonObject = [{ name: "Model", value: ko.mapping.toJSON(data) }];
        jqXHRData.formData = jsonObject;
        jqXHRData.url = path;
        return jqXHRData.submit().then(function (responseMessage) {
            if (responseMessage == undefined) {
                $.unblockUI();
                ServiceBase.showFriendlyError();
            }
            return responseMessage;
        });
    };

    ServiceBase.showFriendlyError = function () {
        var errorMessage = "An error occurred while running application. \nPlease see logs for details";
        FunctionHelper.showMessageBox({
            title: "Error",
            message: errorMessage,
            messageType: Constants.messageType.Error,
            buttons: [{ text: "Close" }]
        });
    };

    return ServiceBase;
});
