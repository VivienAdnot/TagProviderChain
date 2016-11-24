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

	grep -i "a=Call&" $1/$1.log > $1/Call.log
	grep -i "a=CampaignAvailable&" $1/$1.log > $1/CampaignAvailable.log
	grep -i "a=NoCampaignAvailable&" $1/$1.log > $1/NoCampaignAvailable.log
	grep -i "a=Timeout&" $1/$1.log > $1/Timeout.log
	grep -i "a=AdBlocker&" $1/$1.log > $1/AdBlocker.log

	cat $1/Call.log | wc -l >> $OUT
	cat $1/CampaignAvailable.log | wc -l >> $OUT
	cat $1/NoCampaignAvailable.log | wc -l >> $OUT
	cat $1/Timeout.log | wc -l >> $OUT
	cat $1/AdBlocker.log | wc -l >> $OUT
}

# $providerName
function vastStats() {
	echo " " >> $OUT
	echo "vastStats $1" >> $OUT

	mkdir vast/$1
	grep -i "t=$1&a=error" $EXTRACT > vast/$1/no.log
	grep -i "t=$1&a=impression" $EXTRACT > vast/$1/impression.log
	grep -i "t=$1&a=start" $EXTRACT > vast/$1/start.log
	grep -i "t=$1&a=complete" $EXTRACT > vast/$1/complete.log

	cat vast/$1/no.log | wc -l >> $OUT
	cat vast/$1/impression.log | wc -l >> $OUT
	cat vast/$1/start.log | wc -l >> $OUT
	cat vast/$1/complete.log | wc -l >> $OUT
}

#statsPerprovider $providerName $gameName
function statsPerprovider() {
	echo " " >> $OUT
	echo "$1" >> $OUT

	mkdir $2/$1
	grep -i "&p=$1&" $2/$2.log > $2/$1/$1.log

	#grep -i "request&" $2/$1/$1.log > $2/$1/request.log
	grep -i "onAdAvailable" $2/$1/$1.log > $2/$1/onAdAvailable.log
	grep -i "onAdUnavailable" $2/$1/$1.log > $2/$1/onAdUnavailable.log
	#grep -i "onVideoComplete" $2/$1/$1.log > $2/$1/onVideoComplete.log
	grep -i "onAdComplete" $2/$1/$1.log > $2/$1/onAdComplete.log

	grep -i "requestSuccess" $2/$1/$1.log > $2/$1/requestSuccess.log
	#grep -i "initSuccess" $2/$1/$1.log > $2/$1/initSuccess.log

	#grep -i "onScriptLoadingError" $2/$1/$1.log > $2/$1/onScriptLoadingError.log
	#grep -i "onAdError" $2/$1/$1.log > $2/$1/onAdError.log
	#grep -i "onVideoClosed" $2/$1/$1.log > $2/$1/onVideoClosed.log
	#grep -i "onAdClosed" $2/$1/$1.log > $2/$1/onAdClosed.log

	#cat $2/$1/request.log | wc -l >> $OUT
	cat $2/$1/requestSuccess.log | wc -l >> $OUT
	cat $2/$1/onAdAvailable.log | wc -l >> $OUT
	cat $2/$1/onAdUnavailable.log | wc -l >> $OUT
	cat $2/$1/onAdComplete.log | wc -l >> $OUT
	#cat $2/$1/onAdError.log | wc -l >> $OUT

	#echo "initSuccess" >> $OUT
	#cat $2/$1/initSuccess.log | wc -l >> $OUT

	#echo "onScriptLoadingError" >> $OUT
	#cat $2/$1/onScriptLoadingError.log | wc -l >> $OUT
	
	#echo "onVideoClosed" >> $OUT
	#cat $2/$1/onVideoClosed.log | wc -l >> $OUT
	#cat $2/$1/onAdClosed.log | wc -l >> $OUT
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

#providersInstreamAll=("affiz" "SpotxInstream" "PlaytemVastActiplay")
#providersOutstreamAll=("Smartad" "SpotxOutstream" "revContent")

#rewarded
#game "ludokadoRewarded" "4a2b-8438v" "${providersInstreamAll[@]}"
#game "beloteRewarded" "4da9-acb2b" "${providersInstreamAll[@]}"
#game "iscoolRewarded" "452c-8a80i" "${providersInstreamAll[@]}"
#game "urbanRivalsRewarded" "494f-8f1bv" "${providersInstreamAll[@]}"

#outstream
#game "jotuOutstream" "1c27-4684v" "${providersOutstreamAll[@]}"
#game "mediastayOutstream" "e048-4cdev" "${providersOutstreamAll[@]}"
#game "actiplayNoRewardOutstream" "4f63-b20df" "${providersOutstreamAll[@]}"
#game "ladyPopularOutstream" "92c6-497ff" "${providersOutstreamAll[@]}"

#game "mabimbo" "1206-4ce9f" "${providersOutstreamAll[@]}"
#game "VoyageToFantasy" "9a56-4422f" "${providersOutstreamAll[@]}"
#game "Equideow" "ff3d-4b8cf" "${providersOutstreamAll[@]}"
#game "Prizee" "Fj68VbKzEe" "${providersOutstreamAll[@]}"
#game "FairyMix" "Hn78Uf8iRy" "${providersOutstreamAll[@]}"

#game "ludokadoOutstream" "9a19-43fav" "${providersOutstreamAll[@]}"

rm -rf vast
mkdir vast
vastStats "VastYume"
vastStats "VastVexigoOutstream"
vastStats "VastSmartad"
vastStats "VastActiplay"