define(function (require) {
    var ko = require('knockout');
    require('wams');

    var appUrl = 'https://easymanagermsrv.azure-mobile.net/';
    var appKey = 'NbSocpgVcJYWeNmncoCVJQJCaqoxSE17';

    var masterKey = 'CffIzKpFOadhHFaEhuUSRzbXrqoLbJ15';
    var client = new WindowsAzure.MobileServiceClient(appUrl, appKey)
        .withFilter(function(request, next, callback){
            request.headers['X-ZUMO-MASTER'] = masterKey;
            next(request, callback);
        });

    var model = {
        title: ko.observable(''),

        create: function() {
            var table = client.getTable('category');

            var entity = {
                title: model.title()
            };

            table.insert(entity).done(
                function(result) {
                    alert('inserted');
                },
                function(error) {
                    alert(error);
                }
            );
        }
    };

    return model;
});