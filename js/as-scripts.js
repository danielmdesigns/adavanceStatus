$(document).ready(function(){
"use strict";
	
var prop = 1;
	
var selectProperty = $(".selectProperty");
var emptyState = $(".emptyState");
var accountInfo = $(".accountInfo");
var fundingAmount = $(".fundingAmount");
var advanceStatus = $(".advanceStatus");
	
if(prop <= 1){
	//if single property
	$(selectProperty).addClass("is-hidden");
	$(emptyState).css("display","none").addClass("is-hidden");	
}else{
	//if multiple property
	$(accountInfo).addClass("is-hidden");
	$(fundingAmount).addClass("is-hidden");
	$(advanceStatus).addClass("is-hidden");
}
	
});