window.addEventListener("load",function(){
	//UI.show(4)
	http.get("order.json").then(function(json){
		if(json){
			var json=JSON.parse(json);
			http.get("setting.json").then(function(options){
				var options=JSON.parse(options);
				var html="";
				var head="";
				for(var i=0;i<json.length;i++){
					for (var i2 = 0; i2 < options.length; i2++) {
						if(options[i2].permission){
							if(i==0){
								head+="<th>"+options[i2].name+"</th>";
							}
							html+="<td>"+json[i][options[i2].id]+"</td>";
						}
					}
					html+="<td>"+"编辑 删除"+"</td>";
					html="<tr>"+html+"</tr>";
				}
				head+="<th>"+"操作"+"</th>";
				head="<tr>"+head+"</tr>";
				html=head+html;
				panel1_t1.innerHTML=html;
				//添加空白行
				var row=panel1_t1.insertRow(panel1_t1.rows.length);
				row.innerHTML="<tr>"+
				"<td><input type=\"text\" /></td>"+
				"<td><input type=\"text\" /></td>"+
				"<td><input type=\"text\" /></td>"+
				"<td><input type=\"text\"  onclick=\"Panel1.showSelectTable()\" oninput=\"Panel1.onSelectInput(this.value)\" /></td>"+
				"<td><input type=\"text\" /></td>"+
				"<td><input type=\"text\" /></td>"+
				"<td><input type=\"text\" /></td>"+
				"<td><input type=\"text\" /></td>"+
				"<td><input type=\"text\" /></td>"+
				"<td><button type=\"button\" onclick=\"Panel1.addSelect()\">添加</button>";
			});
		}
	});
});

Panel1={
	showSelectTable:function(){
		show(panel1_t0.parentNode);
		panel1_t0.parentNode.style.top=(event.clientY+60)+"px"
		var head="<tr><th>商品编码</th><th>商品名称</th><th>商品规格</th><th>商品单价</th></tr>";
		var html="";
		http.get("goods.json").then(function(options){
			var options=JSON.parse(options);
			for (var i = 0; i < options.length; i++) {
				html+="<tr>"+
				"<td>"+options[i].goods_code+"</td>"+
				"<td>"+options[i].goods_name+"</td>"+
				"<td>"+options[i].goods_specification+"</td>"+
				"<td>"+options[i].goods_price+"</td>"+
				"</tr>";
			}
			html=head+html;
			panel1_t0.innerHTML=html;
		});
	},
	inserBlank:function(){
		//添加空白行
		var row=panel1_t1.insertRow(panel1_t1.rows.length);
		row.innerHTML="<tr>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\"  onclick=\"Panel1.showSelectTable()\" oninput=\"Panel1.onSelectInput(this.value)\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><input type=\"text\" /></td>"+
		"<td><button type=\"button\" onclick=\"Panel1.addSelect()\">添加</button>";
	},
	onSelect:function(obj){
		//alert(obj.parentNode.rowIndex)
		var cells=obj.parentNode.cells;
		var _row=panel1_t1.rows[panel1_t1.rows.length-1];
		var input=_row.querySelectorAll("input");
		var order_index=panel1_t1.rows[panel1_t1.rows.length-2].cells[0].innerHTML;
		var order_code=parseInt(panel1_t1.rows[panel1_t1.rows.length-2].cells[1].innerHTML)+1;
		order_code=order_code.toString(); 
		while(order_code.length<3){
			order_code="0"+order_code;
		} 
		input[0].value=order_index;
		input[1].value=order_code;
		input[2].value=cells[0].innerHTML;
		input[3].value=cells[1].innerHTML;
		input[4].value=cells[2].innerHTML;
		input[5].value=cells[3].innerHTML;
		input[6].value=1;
		input[7].value=parseFloat(input[5].value)*parseFloat(input[6].value);
		input[8].value=formatDate(new Date());
		hide(panel1_t0.parentNode)
	},
	onSelectInput:function(text){
		if(text==""){
			this.showSelectTable();
		}else{
			/* for (var i = 0; i < Things.length; i++) {
				Things[i]
			} */
		}
		
		document.title=a
	},
	addSelect:function(){
		hide(panel1_t0.parentNode);
		var _row=panel1_t1.rows[panel1_t1.rows.length-1];
		var input=_row.querySelectorAll("input");
		var json={
			"goods_code":input[0].value,
			"goods_name":input[1].value,
			"goods_specification":input[2].value,
			"goods_price":input[3].value
		}
		//
		
		var row=panel1_t1.rows[panel1_t1.rows.length-1];
		var cells=row.cells;
		for (var i = 0; i < cells.length-1; i++) {
			var td=cells[i];
			var input=td.querySelector("input");
			td.innerHTML=input.value
		}
		this.inserBlank();
		
	},
	alter:function(){
		var obj=event.srcElement;
		if(obj.tagName.toLowerCase()=="td"){
			obj.innerHTML="<input type=\"text\" onblur=\"Panel1.onchange(this)\" onchange=\"Panel1.onchange(this)\" value=\""+obj.innerHTML +"\"/>"
		}else{
			alert(obj.tagName.oLowerCase())
		}
		obj.querySelector("input").focus();
	},
	onchange:function(a){
		var obj=event.srcElement;
		var p=obj.parentNode;
		if(p)p.innerHTML=obj.value
	}
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
				if(!this.goods){
					http.get("goods.json").then(function(options){
						var options=JSON.parse(options);
						UI.goods=options;
					});
				}
				break;
			
			case 5:
				toggle(this.obj);
				this.obj=panel5;
				toggle(this.obj);
				break;
			default:
				break;
		}
	},
	showMenuItem:function(){
		toggle(MenuItem1);
	},
	showGoodsClass:function(){
		var head="<tr><th>商品编码</th><th>商品名称</th><th>商品规格</th><th>商品单价</th><th>操作</th></tr>";
		var html1="";
		var html2="";
		http.get("goods.json").then(function(options){
			var options=JSON.parse(options);
			for (var i = 0; i < options.length; i++) {
				html2+="<tr>"+
				"<td>"+options[i].goods_code+"</td>"+
				"<td>"+options[i].goods_name+"</td>"+
				"<td>"+options[i].goods_specification+"</td>"+
				"<td>"+options[i].goods_price+"</td>"+
				"<td>"+"<button type=\"button\" onclick=\"UI.showGoodsClass()\">修改</button><button type=\"button\" onclick=\"UI.showGoodsClass()\">删除</button>"+"</td>"+
				"</tr>";
			}
			
			html1=head+html1;
			html2=head+html2;
			panel4_t1.innerHTML=html1;
			panel4_t2.innerHTML=html2;
			var row=panel4_t1.insertRow(panel4_t1.rows.length);
			row.innerHTML="<tr>"+
			"<td><input type=\"text\" /></td>"+
			"<td><input type=\"text\"  onfocus=\"UI.showSelect()\" oninput=\"UI.onSelectInput(this.value)\" /></td>"+
			"<td><input type=\"text\" /></td>"+
			"<td><input type=\"text\" /></td>"+
			"<td><button type=\"button\" onclick=\"UI.addSelect()\">添加</button>";
		});
	},
	showSelect:function(){
		show(panel4_t0.parentNode);
		var head="<tr><th>商品编码</th><th>商品名称</th><th>商品规格</th><th>商品单价</th></tr>";
		var html="";
		http.get("goods.json").then(function(options){
			var options=JSON.parse(options);
			for (var i = 0; i < options.length; i++) {
				html+="<tr>"+
				"<td>"+options[i].goods_code+"</td>"+
				"<td>"+options[i].goods_name+"</td>"+
				"<td>"+options[i].goods_specification+"</td>"+
				"<td>"+options[i].goods_price+"</td>"+
				"</tr>";
			}
			html=head+html;
			
			panel4_t0.innerHTML=html;
		});
	},
	onSelect:function(obj){
		//alert(obj.parentNode.rowIndex)
		var cells=obj.parentNode.cells;
		var _row=panel4_t1.rows[panel4_t1.rows.length-1];
		var input=_row.querySelectorAll("input")
		input[0].value=cells[0].innerHTML;
		input[1].value=cells[1].innerHTML;
		input[2].value=cells[2].innerHTML;
		input[3].value=cells[3].innerHTML;
	},
	onSelectInput:function(text){
		if(text==""){
			this.showSelect();
		}else{
			/* for (var i = 0; i < Things.length; i++) {
				Things[i]
			} */
		}
		
		document.title=a
	},
	addSelect:function(){
		hide(panel4_t0.parentNode);
		var _row=panel4_t1.rows[panel4_t1.rows.length-1];
		var input=_row.querySelectorAll("input");
		var json={
			"goods_code":input[0].value,
			"goods_name":input[1].value,
			"goods_specification":input[2].value,
			"goods_price":input[3].value
		}
		//判断商品编码或名称是否重复
		var index=-1;
		for (var i = 0; i < panel4_t2.rows.length; i++) {
			if(panel4_t2.rows[i].cells[0].innerHTML==input[0].value||panel4_t2.rows[i].cells[1].innerHTML==input[1].value){
				index=i;
			}
		}
		if(index==-1){
			var row=panel4_t2.insertRow();
			row.innerHTML="<td></td><td></td><td></td><td></td><td></td>"
			var cells=row.cells;
			cells[0].innerHTML=input[0].value;
			cells[1].innerHTML=input[1].value;
			cells[2].innerHTML=input[2].value;
			cells[3].innerHTML=input[3].value;
			cells[4].innerHTML="";
		}else{
			var re=confirm("重复，是否修改");
			if(re){
				var row=panel4_t2.rows[index];
				var cells=row.cells;
				cells[0].innerHTML=input[0].value;
				cells[1].innerHTML=input[1].value;
				cells[2].innerHTML=input[2].value;
				cells[3].innerHTML=input[3].value;
				cells[4].innerHTML="";
			}
		}
		
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