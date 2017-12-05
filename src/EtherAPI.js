const queryString = require('query-string');
const web3 = require('web3-utils');

var apiUrl = "https://api.ethplorer.io";
var apiKey = "freekey";

function buildQuery(input, action, limit=100) {
	var params = {apiKey: apiKey, limit: limit};
	var query = apiUrl + action + input + "?" + queryString.stringify(params);
	return query;
}

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

export function getQueries(input, limit=20) {
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

function isAddress(input) {
	return input.length == 42;
}

function isTxHash(input) {
	return input.length == 66;
}