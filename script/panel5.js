Panel5={
	showTable1:function(){
		var html="";
		var options=DataBase.options.order;
		for (var i = 0; i < options.length; i++) {
			html+="<tr>"+
			"<td>"+"<label>"+options[i].name+"<input type=\"Checkbox\" name=\""+options[i].id+"\" "+(options[i].permission?"checked":"")+" onchange=\"Panel5.onchange()\" /></label>" +"</td>"+
			"</tr>";
		}
		panel5_t1.innerHTML=html;
	},
	onchange:function(){
		var checked=event.srcElement.checked;
		var name=event.srcElement.name;

		var stylesheet=document.getElementById("order_rule").styleSheet||document.getElementById("order_rule").sheet
		
		var rules=stylesheet.cssRules;
		var index=-1;
		for (var i = 0; i < rules.length; i++) {
			if(rules[i].selectorText==("."+name)){
				index=i
			}
		}
		if(index>-1){
			rules[index].style.display=checked?"":"none";
			console.log(rules[index])
		}else{
			//stylesheet.insertRule("."+name+"{"+checked?"display:block":"display:none"+"}")
			stylesheet.insertRule("."+name+"{"+(checked?"display:initial":"display:none")+"}")
		}
		var options=DataBase.options.order;
		for (var i = 0; i < options.length; i++) {
			if(options[i].id==name){
				options[i].permission=checked
			}
		}
		DataBase.saveOption()
	},
	insertRules:function(){
		var style=document.createElement("style");
		style.type="text/css";
		style.id="order_rule"
		
		var html=""
		var options=DataBase.options.order;
		for (var i = 0; i < options.length; i++) {
			html+="."+options[i].id+"{"+(options[i].permission?"":"display:none")+"}\n"
		}
		style.innerHTML=html;
		document.head.appendChild(style)
	}
}