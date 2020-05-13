Panel4={
	deleteButtonHtml:"<button type=\"button\" onclick=\"Panel4.deleteOption()\">删除</button>",
	inserBlank:function(){
		//添加空白行
		var row=panel4_t1.insertRow(panel4_t1.rows.length);
		row.innerHTML="<tr>"+
		"<td></td>"+
		"<td></td>"+
		"<td></td>"+
		"<td></td>"+
		"<td><button type=\"button\" onclick=\"Panel4.addSelect()\">添加</button>";
	},
	onchange:function(a){
		var obj=event.srcElement;
		var p=obj.parentNode;
		if(p){
			p.innerHTML=obj.value
			var row=p.parentNode;
			var cells=row.cells;
			if(row.rowIndex!=(panel4_t1.rows.length-1)){
				cells[4].innerHTML="<button type=\"button\" onclick=\"Panel4.updataOption()\">更新</button>";
			}
		}
	},
	
	alter:function(){
		var obj=event.srcElement;
		if(obj.tagName.toLowerCase()=="td"){
			if(obj.cellIndex==1){
				obj.innerHTML="<input type=\"text\" onblur=\"Panel4.onchange(this)\" onchange=\"Panel4.onchange(this)\" onfocus=\"Panel4.showSelectTable()\" onclick=\"Panel4.showSelectTable()\" oninput=\"Panel4.onSelectInput(this.value)\" value=\""+obj.innerHTML +"\"/>"
				obj.querySelector("input").focus();
			}else if(obj.cellIndex==8){
				
			}
			else{
				obj.innerHTML="<input type=\"text\" onblur=\"Panel4.onchange(this)\" onchange=\"Panel4.onchange(this)\" value=\""+obj.innerHTML +"\"/>"
				obj.querySelector("input").focus();
			}
		}else{
			//alert(obj.tagName.toLowerCase())
		}
	},
	deleteOption:function(){
		if(!confirm("确定删除"))return;
		var row=event.srcElement.parentNode.parentNode;
		var index=row.rowIndex
		panel4_t1.deleteRow(index);
		var code=parseInt(row.cells[2].innerHTML);
		DataBase.goods.splice(code-1,1);
		DataBase.saveGoods();
	},
	updataOption:function(){
		var row=event.srcElement.parentNode.parentNode;
		var _cells=row.cells;
		_cells[4].innerHTML=Panel4.deleteButtonHtml;
		var json={
			"goods_code":_cells[0].innerHTML,
			"goods_name":_cells[1].innerHTML,
			"goods_specification":_cells[2].innerHTML,
			"goods_price":_cells[3].innerHTML
		}
		var code=row.rowIndex;
		DataBase.goods[code-1]=json;
		DataBase.saveGoods();
	},
	
	showTable1:function(){
		var head="<tr><th>商品编码</th><th>商品名称</th><th>商品规格</th><th>商品单价</th><th>操作</th></tr>";
		var html1="";
		var html2="";
		var options=DataBase.goods
		for (var i = 0; i < options.length; i++) {
			html2+="<tr>"+
			"<td>"+options[i].goods_code+"</td>"+
			"<td>"+options[i].goods_name+"</td>"+
			"<td>"+options[i].goods_specification+"</td>"+
			"<td>"+options[i].goods_price+"</td>"+
			"<td>"+"<button type=\"button\" onclick=\"Panel4.deleteOption()\">删除</button>"+"</td>"+
			"</tr>";
		}
		
		html1=head+html1;
		html2=head+html2;
		panel4_t1.innerHTML=html2;
		Panel4.inserBlank()
	},
	showSelectTable:function(){
		show(panel4_t0.parentNode);
		Panel4.rowIndex=event.srcElement.parentNode.parentNode.rowIndex;
		console.log(Panel4.rowIndex)
		var head="<tr><th>商品编码</th><th>商品名称</th><th>商品规格</th><th>商品单价</th></tr>";
		var html="";
		var options=DataBase.goods
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
	},
	onSelect:function(obj){
		//alert(obj.parentNode.rowIndex)
		var cells=obj.parentNode.cells;
		var _row=panel4_t1.rows[Panel4.rowIndex];
		console.log(Panel4.rowIndex)
		console.log(_row)
		var _cells=_row.cells;
		_cells[0].innerHTML=cells[0].innerHTML;
		_cells[1].innerHTML=cells[1].innerHTML;
		_cells[2].innerHTML=cells[2].innerHTML;
		_cells[3].innerHTML=cells[3].innerHTML;
		hide(panel4_t0.parentNode)
	},
	onSelectInput:function(text){
		if(text==""){
			this.showSelect();
		}else{
			/* for (var i = 0; i < Things.length; i++) {
				Things[i]
			} */
		}
	},
	addSelect:function(){
		hide(panel4_t0.parentNode);
		var _row=panel4_t1.rows[panel4_t1.rows.length-1];
		var _cells=_row.cells;
		var input=_row.querySelectorAll("input");
		var goods=DataBase.goods;
		var json={
			"goods_code":_cells[0].innerHTML,
			"goods_name":_cells[1].innerHTML,
			"goods_specification":_cells[2].innerHTML,
			"goods_price":_cells[3].innerHTML
		}
		//判断商品编码或名称是否重复
		var index=-1;
		for (var i = 0; i < DataBase.goods.length; i++) {
			if(DataBase.goods[i].goods_code==json.goods_code||DataBase.goods[i].goods_name==json.goods_name){
				index=i;
			}
		}
		
		if(index==-1){
			goods.push(json);
			DataBase.saveGoods();
			_cells[4].innerHTML=Panel4.deleteButtonHtml;
			this.inserBlank();
		}else{
			var re=confirm("重复，是否修改");
			if(re){
				var row=panel4_t1.rows[index+1];
				var cells=row.cells;
				cells[0].innerHTML=_cells[0].innerHTML;
				cells[1].innerHTML=_cells[1].innerHTML;
				cells[2].innerHTML=_cells[2].innerHTML;
				cells[3].innerHTML=_cells[3].innerHTML;
				cells[4].innerHTML="<button type=\"button\" onclick=\"Panel4.updataOption()\">更新</button>";
				
				goods[index]=json;
				DataBase.saveGoods();
				//this.inserBlank();
			}
		}
		
	}
}
