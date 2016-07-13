//主程式app.js
//初始化頁面 把資料從localStorage取出
//繪製畫面

$(function(){
	
	var stickiesArray = getStickiesArray();
	for(var index in stickiesArray){
		var key = stickiesArray[index];
		var sticky = JSON.parse(localStorage[key]);
		addStickyToList(key,sticky);
	}
	$('#add_button').on('click',createSticky);
	$('#clear_button').on('click',clearStickies);
						
});

//Todo1:
//從local storage 取得記事編號
//getStickiesArray():
function getStickiesArray(){
	var stickiesArray= localStorage["stickiesArray"];
	if(!stickiesArray){
		stickiesArray = [];
		localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
	
	}else{
		stickiesArray = JSON.parse(stickiesArray);
	}
	return stickiesArray;
}

//Todo2:
//addStickyToList():
//將一則記事新增到畫面裡的清單中
function addStickyToList(key,sticky){
	//console.log("addStickyToList");
	var $li = $("<li></li>");
		$li.attr("id",key).css("background-color",sticky.color).text(sticky.text).on("click",deleteSticky);
	$("#stickies").append($li);
}
//Todo3:
//建立記事
//createSticky():
function createSticky(){
	//console.log("createSticky");
	//建立一則記事的時候 要取得所有已經存在編號表
	var stickiesArray = getStickiesArray();
	
	//產生一個新的key
	var key = "sticky_"+((new Date()).getTime());
	//console.log(key);
	//取得記事的內容
	var text = $("#note_text").val();
	
	//取得記事的顏色
	var color = $("#note_color").val();
	
	//建立記事的物件
	var sticky = {
		"text":text,
		"color":color
	};
	
	//把這則記事新增到localStorage
	localStorage.setItem(key,JSON.stringify(sticky));
	
	//編號表也需要更新
	//把key加到編號表, 重新寫回去localStorage
	stickiesArray.push(key);
	localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
	
	//新增到畫面中
	addStickyToList(key,sticky);
}
//Todo4:
//刪除記事
//deleteSticky():
function deleteSticky(event){
	var key = event.target.id;
	var stickiesArray = getStickiesArray();
	console.info(stickiesArray);
	//更改編號表
	var index = 0;
	for(var i in stickiesArray){
		if(stickiesArray[i] == key);
		stickiesArray.splice(i, 1);
		break;
	}
	
	console.error(stickiesArray);
	//更新localstorage 裡面的編號表
	localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
	
	//刪除localstorage 的這則記事
	localStorage.removeItem(key);
	
	//更新畫面
	$("#stickies").find("#"+key).remove();	
}

//Todo5:
//清空所有
//clearStickies():
function clearStickies(){
	localStorage.clear();
	$("#stickies").empty();
}