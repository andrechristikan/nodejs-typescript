export default {
    movedPermanently: 'All future requests should be directed to other URL',
    badRequest:
        'Server could not understand the request due to invalid syntax.',
    unauthorized: 'The credentials in invalid.',
    forbidden: 'Client does not have access rights to the content.',
    notFound: 'Server can not find the requested resource.',
    methodNotFound: 'Request method has been disabled and cannot be used.',
    notAcceptable:
        'Requested resource not acceptable according to the Accept headers sent in the request.',
    requestTimeout: 'Server timed out waiting for the request.',
    unsupportedMediaType:
        'Media format of the requested data is not supported by server.',
    tooManyRequests:
        'The user has sent too many requests in a given amount of time.',
    internalServerError:
        "The server has encountered a situation it doesn't know how to handle.",
    notImplemented:
        'Request method is not supported by the server and cannot be handled.',
    badGateway:
        'Server was received an invalid response from the upstream server.',
    serviceUnavailable:
        'Server cannot handle the request. (because it is overloaded or down for maintenance)',
};
