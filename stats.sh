#!/bin/bash

EXTRACT=tracker.log
OUT=result.txt

function init() {
	rm -f $EXTRACT
	rm -f $OUT
	touch $OUT
	grep "tracker.gif" iis.log > $EXTRACT
}

function createTitle() {
	echo " " >> $OUT
	echo "==============================" >> $OUT
	echo "$1" >> $OUT
	echo "==============================" >> $OUT
	echo " " >> $OUT
}

#apiKey $apiKey $gameName
function apiKey() {
	rm -rf $2
	mkdir $2
	grep -i "&k=$1" $EXTRACT > $2/$2.log
}

#globalStats $gameName
function globalStats() {
	echo " " >> $OUT
	echo "global" >> $OUT

	grep -i "Call" $1/$1.log > $1/Call.log
	grep -i "a=CampaignAvailable" $1/$1.log > $1/CampaignAvailable.log
	grep -i "a=NoCampaignAvailable" $1/$1.log > $1/NoCampaignAvailable.log
	grep -i "Timeout" $1/$1.log > $1/Timeout.log

	cat $1/Call.log | wc -l >> $OUT
	cat $1/CampaignAvailable.log | wc -l >> $OUT
	cat $1/NoCampaignAvailable.log | wc -l >> $OUT
	cat $1/Timeout.log | wc -l >> $OUT
}

#statsPerprovider $providerName $gameName
function statsPerprovider() {
	echo " " >> $OUT
	echo "$1" >> $OUT

	mkdir $2/$1
	grep -i "&p=$1&" $2/$2.log > $2/$1/$1.log

	grep -i "request" $2/$1/$1.log > $2/$1/request.log
	grep -i "onAdAvailable" $2/$1/$1.log > $2/$1/onAdAvailable.log
	grep -i "onAdUnavailable" $2/$1/$1.log > $2/$1/onAdUnavailable.log
	#grep -i "onVideoComplete" $2/$1/$1.log > $2/$1/onVideoComplete.log
	grep -i "onAdComplete" $2/$1/$1.log > $2/$1/onAdComplete.log
	grep -i "onInternalError" $2/$1/$1.log > $2/$1/onInternalError.log
	grep -i "onVideoClosed" $2/$1/$1.log > $2/$1/onVideoClosed.log
	grep -i "onAdClosed" $2/$1/$1.log > $2/$1/onAdClosed.log

	cat $2/$1/request.log | wc -l >> $OUT
	cat $2/$1/onAdAvailable.log | wc -l >> $OUT
	cat $2/$1/onAdUnavailable.log | wc -l >> $OUT
	#cat $2/$1/onVideoComplete.log | wc -l >> $OUT
	#echo "onAdComplete" >> $OUT
	cat $2/$1/onAdComplete.log | wc -l >> $OUT	
	echo "onVideoClosed" >> $OUT
	cat $2/$1/onVideoClosed.log | wc -l >> $OUT
	cat $2/$1/onAdClosed.log | wc -l >> $OUT
	echo "onInternalError" >> $OUT
	cat $2/$1/onInternalError.log | wc -l >> $OUT
}

init

#game "ludokadoRewarded" "4a2b-8438v" "${providersInstreamAll[@]}"
function game() {
	gameName=$1
	shift
	apiKey=$1
	shift
	providers=("$@")

	createTitle $gameName

	apiKey $apiKey $gameName

	globalStats $gameName

	for providerName in "${providers[@]}"; do
		statsPerprovider $providerName $gameName
	done
}

providersInstreamAll=("affiz" "SpotxInstream" "Actiplay")
providersInstreamIscool=("SpotxInstream" "Actiplay")

providersOutstreamAll=("SpotxOutstream" "Smartad" "Smart")

game "ludokadoRewarded" "4a2b-8438v" "${providersInstreamAll[@]}"
game "beloteRewarded" "4da9-acb2b" "${providersInstreamIscool[@]}"
game "iscoolRewarded" "452c-8a80i" "${providersInstreamIscool[@]}"
game "urbanRivalsRewarded" "494f-8f1bv" "${providersInstreamAll[@]}"

game "jotuOutstream" "1c27-4684v" "${providersOutstreamAll[@]}"
game "ludokadoOutstream" "9a19-43fav" "${providersOutstreamAll[@]}"
game "mediastayOutstream" "e048-4cdev" "${providersOutstreamAll[@]}"
game "actiplayNoRewardOutstream" "4f63-b20df" "${providersOutstreamAll[@]}"
game "ladyPopularOutstream" "92c6-497ff" "${providersOutstreamAll[@]}"