export class ResponseModel {
	characterSet: string;
	contentEncoding: string;
	contentLength: number;
	contentType: string;
	cookies: any;
	headers: any;
	isMutuallyAuthenticated: boolean;
	method: string;
	protocolVersion: any;
	responseUri: string;
	server: string;
	statusCode: number;
	statusDescription: string;
	supportHeaders: boolean;
	loaded = false;
	class: string;
	name: string;
}
