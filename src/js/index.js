import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");

import "../scss/index.scss";

let array=[];

let mySort=()=>{
	array[0]=[
		[1],
		[5],
		[9],
		[13],
		[4],
		[16],
		[7],
		[15],
		[2],
		[6],
		[10],
		[14],
		[8],
		[3],
		[11],
		[12]
	];

	array[1]=[
		[1,2],
		[5,6],
		[9,10],
		[13,14],
		[4,8],
		[16,3],
		[7,11],
		[15,12]
	];

	array[2]=[
		[1,2,3],
		[5,6,7],
		[9,10,11],
		[13,14,15],
		[4,8,12],
		[16]
	];

	array[3]=[
		[1,2,3,4],
		[5,6,7,8],
		[9,10,11,12],
		[13,14,15,16]
	];

	array[4]=[
		[1,2,3,4,14],
		[5,6,7,8,15],
		[9,10,11,12,16],
		[13]
	];

	array[5]=[
		[1,2,3,4,14,16],
		[5,6,7,8,15,13],
		[9,10,11,12]
	];

	array[6]=[
		[1,2,3,4,14,16,11],
		[5,6,7,8,15,13,12],
		[9,10]
	];

	array[7]=[
		[1,2,3,4,14,16,11,9],
		[5,6,7,8,15,13,12,10]
	];

	array[8]=[
		[1,2,3,4,14,16,11,9,10],
		[5,6,7,8,15,13,12]
	];

	array[9]=[
		[1,2,3,4,14,16,11,9,10,12],
		[5,6,7,8,15,13]
	];

	array[10]=[
		[1,2,3,4,14,16,11,9,10,12,13],
		[5,6,7,8,15]
	];

	array[11]=[
		[1,2,3,4,14,16,11,9,10,12,13,15],
		[5,6,7,8]
	];

	array[12]=[
		[1,2,3,4,14,16,11,9,10,12,13,15,8],
		[5,6,7]
	];

	array[13]=[
		[1,2,3,4,14,16,11,9,10,12,13,15,8,7],
		[5,6]
	];

	array[14]=[
		[1,2,3,4,14,16,11,9,10,12,13,15,8,7,6],
		[5]
	];

	array[15]=[
		[1,2,3,4,14,16,11,9,10,12,13,15,8,7,6,5]
	];
};

let reflow=()=>{
	array[0]=[
		[1],
		[2],
		[3],
		[4],
		[5],
		[6],
		[7],
		[8],
		[9],
		[10],
		[11],
		[12],
		[13],
		[14],
		[15],
		[16]
	];

	array[1]=[
		[1,2],
		[3,4],
		[5,6],
		[7,8],
		[9,10],
		[11,12],
		[13,14],
		[15,16]
	];

	array[2]=[
		[1,2,3],
		[4,5,6],
		[7,8,9],
		[10,11,12],
		[13,14,15],
		[16]
	];

	array[3]=[
		[1,2,3,4],
		[5,6,7,8],
		[9,10,11,12],
		[13,14,15,16]
	];

	array[4]=[
		[1,2,3,4,5],
		[6,7,8,9,10],
		[11,12,13,14,15],
		[16]
	];

	array[5]=[
		[1,2,3,4,5,6],
		[7,8,9,10,11,12],
		[13,14,15,16]
	];

	array[6]=[
		[1,2,3,4,5,6,7],
		[8,9,10,11,12,13,14],
		[15,16]
	];

	array[7]=[
		[1,2,3,4,5,6,7,8],
		[9,10,11,12,13,14,15,16]
	];

	array[8]=[
		[1,2,3,4,5,6,7,8,9],
		[10,11,12,13,14,15,16]
	];

	array[9]=[
		[1,2,3,4,5,6,7,8,9,10],
		[11,12,13,14,15,16]
	];

	array[10]=[
		[1,2,3,4,5,6,7,8,9,10,11],
		[12,13,14,15,16]
	];

	array[11]=[
		[1,2,3,4,5,6,7,8,9,10,11,12],
		[13,14,15,16]
	];

	array[12]=[
		[1,2,3,4,5,6,7,8,9,10,11,12,13],
		[14,15,16]
	];

	array[13]=[
		[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
		[15,16]
	];

	array[14]=[
		[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		[16]
	];

	array[15]=[
		[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
	];

};

let prevArrayIndex;//以前の状態のアイコン配置を記憶するため

//読み込まれた時（最初）
$(()=>{
	mySort();//自作ソート
	initIcons();

	//card1はmySortボタン
	$("#card1").click(function(){
		mySort();
		$(this).addClass("pushAnimation");
	});

	//card2はreflowボタン
	$("#card2").click(function(){
		reflow();
		$(this).addClass("pushAnimation");
	});

	//アニメーションが終了したらクラスを削除する
	$("#card1").on("webkitAnimationEnd",function(){
		$(this).removeClass("pushAnimation");
	});

	$("#card2").on("webkitAnimationEnd",function(){
		$(this).removeClass("pushAnimation");
	});
});

//ウィンドウがリサイズされた時
$(window).on('resize', function(){
	let arrayIndex=Math.floor(window.innerWidth/200-1);

	//横に並ぶアイコンの数が変化しなかった時は無視する
	if(prevArrayIndex===arrayIndex){
		return;
	}

	sortIcons(prevArrayIndex,arrayIndex);

	prevArrayIndex=arrayIndex;
});

//初期化
let initIcons=()=>{
	let index=Math.floor(window.innerWidth/200-1);
	for(let y=0; y<array[index].length; y++){
		for(let x=0; x<array[index][y].length; x++){
			$("#card"+array[index][y][x]).animate({"top":(y*200+20)+"px","left":(x*200+20)+"px"},500);
		}
	}
};

//ウィンドウサイズがリサイズされた時にアイコンを並べなおす
let sortIcons=(startIndex,endIndex)=>{
	//広がる時
	for(let i=startIndex+1; i<=endIndex; i++){
		for(let y=0; y<array[i].length; y++){
			for(let x=0; x<array[i][y].length; x++){
				$("#card"+array[i][y][x]).animate({"top":(y*200+20)+"px","left":(x*200+20)+"px"},500);
			}
		}
	}
	//狭まる時
	for(let i=startIndex-1; i>=endIndex; i--){
		for(let y=0; y<array[i].length; y++){
			for(let x=0; x<array[i][y].length; x++){
				$("#card"+array[i][y][x]).animate({"top":(y*200+20)+"px","left":(x*200+20)+"px"},500);
			}
		}
	}
};