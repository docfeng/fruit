window.addEventListener("load",async function(){
	//UI.show(4)
	Panel1.initTime();
	Panel2.initTime();
	var order=DataBase.getOrder()||JSON.parse(await http.get("order.json"));
	var option=DataBase.getOption()||JSON.parse(await http.get("setting.json"));
	var goods=DataBase.getGoods()||JSON.parse(await http.get("goods.json"));
	DataBase.order=order;
	DataBase.options=option;
	DataBase.goods=goods;
	Panel1.showTable1()
	Panel2.showTable1()
	Panel5.insertRules();
});
DataBase={
	saveGoods:function(){
		localStorage.setItem("goods",JSON.stringify(DataBase.goods));
	},
	saveOrder:function(){
		localStorage.setItem("order",JSON.stringify(DataBase.order));
	},
	getGoods:function(){
		var re=localStorage.getItem("goods",JSON.stringify(DataBase.goods));
		if(re){
			return JSON.parse(re)
		}
		return false
	},
	getOrder:function(){
		var re=localStorage.getItem("order",JSON.stringify(DataBase.order));
		if(re){
			return JSON.parse(re)
		}
		return false
	},
	saveOption:function(){
		localStorage.setItem("option",JSON.stringify(DataBase.options));
	},
	getOption:function(){
		var re=localStorage.getItem("option",JSON.stringify(DataBase.options));
		if(re){
			return JSON.parse(re)
		}
		return false
	},
}


UI={
	show:function(index){
		if(!this.obj){
			this.obj=panel1;
		}
		switch (index){
			case 1:
				toggle(this.obj);
				this.obj=panel1;
				toggle(this.obj);
				break;
			case 2:
				toggle(this.obj);
				this.obj=panel2;
				toggle(this.obj);
				break;
			case 3:
				toggle(this.obj);
				this.obj=panel3;
				toggle(this.obj);
				break;
			case 4:
				toggle(this.obj);
				this.obj=panel4;
				toggle(this.obj);
				Panel4.showTable1()
				break;
			
			case 5:
				toggle(this.obj);
				this.obj=panel5;
				toggle(this.obj);
				Panel5.showTable1()
				break;
			default:
				break;
		}
	},
	showMenuItem:function(){
		toggle(MenuItem1);
	}
}
toggle=function(obj){
	obj.classList.toggle("hide");
}
show=function(obj){
	obj.classList.remove("hide");
}
hide=function(obj){
	obj.classList.add("hide");
}
var formatDate = function(d) {
	var date = d || new Date()
	var yyyy = date.getFullYear();
	var mm = date.getMonth() + 1;
	var dd = date.getDate();
	mm = mm < 10 ? "0" + mm : mm;
	dd = dd < 10 ? "0" + dd : dd;
	/* var hours = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	hours = hours < 10 ? "0" + hours : hours;
	minute = minute < 10 ? "0" + minute : minute;
	second = second < 10 ? "0" + second : second; */
	//date = yyyy + "-" + mm + "-" + dd + " " + hours + ":" + minute + ":" + second;
	date = yyyy + "-" + mm + "-" + dd  ;
	return date;
}