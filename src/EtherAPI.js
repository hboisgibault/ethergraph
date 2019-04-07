const queryString = require('query-string');

var apiUrl = "https://api.ethplorer.io";
var apiKey = "freekey";

function buildQuery(input, action, limit=30) {
	var params = {apiKey: apiKey, limit: limit};
	var query = apiUrl + action + input + "?" + queryString.stringify(params);
	return query;
}

export function getQueries(input, limit=30) {
	var queries = [];
	if(isAddress(input)){
		queries.push(buildQuery(input, "/getAddressTransactions/", limit))
		queries.push(buildQuery(input, "/getAddressHistory/", limit));
	}
	else if(isTxHash(input)) {
		queries.push(buildQuery(input, "/getTxInfo/", limit));
	}
	else {
		return {error: "Please enter a valid input"};
	}
	return queries;	
}

export function isAddress(input) {
	return input.length === 42;
}

export function isTxHash(input) {
	return input.length === 66;
}