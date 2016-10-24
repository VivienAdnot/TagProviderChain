#!/bin/bash

OUT=result.txt

function init() {
	touch $OUT
	grep "tracker.gif" iis.log > tracker.log
}

function createTitle() {
	echo " " >> $OUT
	echo "==============================" >> $OUT
	echo "$1" >> $OUT
	echo "==============================" >> $OUT
	echo " " >> $OUT
}

function apiKey() {
	mkdir $2
	grep -i "&k=$1" tracker.log > $2/$2.log
}

function provider() {
	echo " " >> $OUT
	echo "$1" >> $OUT

	mkdir $2/$1
	grep -i "$1" $2/$2.log > $2/$1/$1.log
	grep -i "request" $2/$1/$1.log > $2/$1/request.log
	grep -i "onAdAvailable" $2/$1/$1.log > $2/$1/onAdAvailable.log
	grep -i "onAdUnavailable" $2/$1/$1.log > $2/$1/onAdUnavailable.log
	grep -i "onVideoComplete" $2/$1/$1.log > $2/$1/onVideoComplete.log
	grep -i "onAdComplete" $2/$1/$1.log > $2/$1/onAdComplete.log
	grep -i "onVideoClosed" $2/$1/$1.log > $2/$1/onVideoClosed.log

	cat $2/$1/request.log | wc -l >> $OUT
	cat $2/$1/onAdAvailable.log | wc -l >> $OUT
	cat $2/$1/onAdUnavailable.log | wc -l >> $OUT
	#cat $2/$1/onVideoComplete.log | wc -l >> $OUT
	#echo "onAdComplete" >> $OUT
	cat $2/$1/onAdComplete.log | wc -l >> $OUT	
	echo "onVideoClosed" >> $OUT
	cat $2/$1/onVideoClosed.log | wc -l >> $OUT
}

init

function game() {
	gameName=$1
	shift
	apiKey=$1
	shift
	providers=("$@")

	createTitle $gameName

	apiKey $apiKey $gameName

	for x in "${providers[@]}"; do
		provider $x $gameName
	done
}

providersInstreamAll=("affiz" "SpotxInstream" "Actiplay")
providersInstreamIscool=("SpotxInstream" "Actiplay")
providersOutstreamAll=("SpotxOutstream" "smartad")

game "ludokadoRewarded" "4a2b-8438v" "${providersInstreamAll[@]}"
game "beloteRewarded" "4da9-acb2b" "${providersInstreamIscool[@]}"
game "iscoolRewarded" "452c-8a80i" "${providersInstreamIscool[@]}"
game "urbanRivalsRewarded" "494f-8f1bv" "${providersInstreamAll[@]}"

game "jotuOutstream" "1c27-4684v" "${providersOutstreamAll[@]}"
game "ludokadoOutstream" "9a19-43fav" "${providersOutstreamAll[@]}"
game "mediastayOutstream" "e048-4cdev" "${providersOutstreamAll[@]}"
game "actiplayNoRewardOutstream" "4f63-b20df" "${providersOutstreamAll[@]}"
game "ladyPopularOutstream" "92c6-497ff" "${providersOutstreamAll[@]}"