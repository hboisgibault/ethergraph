const queryString = require('query-string');

var apiUrl = "https://api.ethplorer.io";
var apiKey = "freekey";

function buildTransactionsQuery(address, limit=100) {
	var params = {apiKey: apiKey, limit: limit};
	var query = apiUrl + "/getAddressTransactions/" + address + "?" + queryString.stringify(params);
	return query;
}

function buildOperationsQuery(address, limit=100) {
	var params = {apiKey: apiKey, limit: limit};
	var query = apiUrl + "/getAddressHistory/" + address + "?" + queryString.stringify(params);
	return query;
}

export function getQueries(address, limit=20) {
	var queries = [buildTransactionsQuery(address, limit), buildOperationsQuery(address, limit)];
	return queries;	
}