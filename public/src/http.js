function createHttpMethod(name) {
            return function (url, data, config) {
                config = config || {};
                if(data){
                    data = _.isString(data) ? data : $.param(data);
                    if(data){
                        url += (/\?/.test(url) ? '&' : '?') + data;
                    }
                }
                return $http(_.extend(config, {
                    method: name,
                    url: url
                })).then(prepareResponse, prepareErrorResponse);
            };
        }


        
