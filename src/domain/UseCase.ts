//* Creates an interface for use cases

type CustomRequestId = { requestId: string };

/**
** UseCase interface to implement use case login in the execute method
*@param RequestType Parameter for the request, extends CustomRequestId to add a requestId
and it is used as parameter type for execute method 
*@param ResponseType Parameter for the response, used in return statement
*/ 
export interface UseCase<RequestType extends CustomRequestId, ResponseType> {
  execute(request: RequestType): Promise<ResponseType> | ResponseType;
}
