class All extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userName:''
		};
		this.userdataChange=this.userdataChange.bind(this);		
	}
	userdataChange(userName){
		this.setState({
			userName:userName
		});
	}			
	render(){
		return <div style={this.props.style.all}>
				<div style={this.props.style.header}><p style={this.props.style.headerP}>Parking</p></div>
				<UserLogin style={this.props.style} userdataChange={this.userdataChange}/>
				<div style={this.props.style.body}><SearchBox style={this.props.style} userdata={this.state.userName}/></div>
				</div>;
	}
}
class UserLogin extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loginType:'logout',
			userName:''		
		};
		this.login=this.login.bind(this);
		this.logout=this.logout.bind(this);
		this.register=this.register.bind(this);
	}
	register(){
		window.location='main.html';
	}
	login(){
		var b=this;
		var userName=document.querySelector("#userName").value;
		var userPassword=document.querySelector("#userPassword").value;
		var request=new XMLHttpRequest();
		request.responseType='json';
		request.open('POST',"userLogin.php");
		request.onreadystatechange=function(){
			if(this.readyState===4&this.status===200){
				if(this.response.loginType==='correct'){
					b.setState({
						loginType:'login',
						userName:this.response.userName
					});
					b.props.userdataChange(this.response.userName);
				}else if(this.response.loginType==='incorrect'){
					b.setState({
						loginType:'logout'
					});
					alert('用户名或密码错误');
				}
			}	
		};
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		request.send("userName="+userName+'&userPassword='+userPassword);
	}
	logout(){
		this.setState({
			loginType:'logout',
			userName:''
		});
		this.props.userdataChange('');
	}
	render(){
		   return this.state.loginType==='logout' ? <div style={this.props.style.loginDiv}>
	               <label htmlFor="userName" style={this.props.style.loginLabel}>用户名</label>
	               <input type="text" id="userName" style={this.props.style.loginInput}/>
	               <label htmlFor="userPassword" style={this.props.style.loginLabel}>密码</label>
	               <input type="password"  id="userPassword" style={this.props.style.loginInput} />
	               <button onClick={this.login} style={this.props.style.loginButton}>登录</button>
	               <button style={this.props.style.loginButton} onClick={this.register}>注册</button>
				   </div> : <div style={this.props.style.loginDiv}>
				   				<label htmlFor="" style={this.props.style.loginLabel}>用户:</label>
				   				<a style={this.props.style.loginA} href={'manage.php?userName='+this.state.userName}>{this.state.userName}</a>
				   				<button style={this.props.style.loginButton} onClick={this.logout}>注销</button>
				   			</div>;
	}
}
class SearchBox extends React.Component{
	constructor(props){
		super(props);
		this.state={
			timeStart:'',
			timeEnd:'',
			payment:'',
			orderType:false,
			orderTypeText:'ASC',
			location:'',
			localPoint:'',
			pointTo:'',
			pointStr:'',
			searchRadius:1000,
			sortType:'noRestrict',
			searchParking:'',
			localSearchData:''
		}
		this.orderTypeChange=this.orderTypeChange.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.onLocationChange=this.onLocationChange.bind(this);
		this.go=this.go.bind(this);
		this.marker=this.marker.bind(this);
		this.search=this.search.bind(this);
		this.searchPointChange=this.searchPointChange.bind(this);
	}
	search(){
		console.log(document.querySelector('#searchParking').value);
		this.setState((prevState) => {
			return {
					localSearchData:document.querySelector('#searchParking').value
				};
		});
	}
	go(point){
		this.setState({
			pointTo:point
		});
	}
	marker(str){
		this.setState(function(prevState) {
			if(prevState.pointStr!==str){
				return {
					pointStr:str
				};
			}
		});
	}
	onLocationChange(result,localPoint){
		var arr=[];
		for(let i in result){
			if(result.hasOwnProperty(i)){
				arr.push(result[i]);
			}
		}
		var location=arr.join('');
		this.setState({
			location:location,
			localPoint:localPoint
		});
	}
	handleChange(){
		switch(event.target.id){
			case 'timeStart':
			this.setState({
				timeStart:event.target.value
			});
			break;
			case 'timeEnd':
			this.setState({
				timeEnd:event.target.value
			});
			break;
			case 'payment':
			this.setState({
				payment:event.target.value
			});
			break;
			case 'select':
			this.setState({
				searchRadius:event.target.value
			});
			break;
			case 'moreSelect':
			this.setState({
				sortType:event.target.value
			});
			break;
			default:
			break;
		}
	}
	orderTypeChange(event){
		this.setState(function(prevState){
			return {
				orderType:!prevState.orderType,
				orderTypeText:prevState.orderType?'ASC':'DESC'
			};
		});
	}
	searchPointChange(point){
		this.setState({
			localPoint:point
		});
	}
	componentDidMount(){
		var autoComplete=new BMap.Autocomplete({
			input:'searchParking',
			location:'中国'
		});
		autoComplete.show();
	}
	render(){
		return <div style={this.props.style.searchDiv}>
					<div >
						<label htmlFor="searchParking" style={this.props.style.inputLabel}>停车位搜索</label>
						<input type="text" id={'searchParking'} style={this.props.style.searchParking} placeholder={'请输入地址'} onChange={this.handleChange}/>
						<button style={this.props.style.button} onClick={this.search}>位置搜索</button>
					</div>
					<div>
						<label htmlFor="timeStart" style={this.props.style.inputLabel}>开始时间</label>
						<input type="time" style={this.props.style.input} id={'timeStart'}  name={'timeStart'} onChange={this.handleChange}/>
						<label htmlFor="timeEnd" style={this.props.style.inputLabel}>结束时间</label>
						<input type="time" style={this.props.style.input} id={'timeEnd'}  name={'timeEnd'}  onChange={this.handleChange}/>
						<label htmlFor="payment" style={this.props.style.inputLabel}>酬劳</label>
						<input type="text" style={this.props.style.input} id={'payment'}  name={'payment'}   onChange={this.handleChange}/>
						<label htmlFor="select" style={this.props.style.inputLabel}>搜索范围</label>
						<select style={this.props.style.select} onChange={this.handleChange} id={'select'}>
							<option value={1000}>1000m</option>
							<option value={5000}>5000m</option>
							<option value="noRestrict">不限</option>
						</select>
						<label htmlFor="moreSelect" style={this.props.style.inputLabel}>结果显示</label>
						<select style={this.props.style.moreSelect} id={'moreSelect'} onChange={this.handleChange}>
							<option value="noRestrict">不限</option>
							<option value="distanceSort">按距离排序</option>
							<option value="timeSort">按时间排序</option>
							<option value="paymentSort">按报价排序</option>
							<option value="comprehensiveSort">综合排序</option>
						</select>
						<button style={this.props.style.button} onClick={this.orderTypeChange}>{this.state.orderTypeText}</button>
						<div style={this.props.style.locationDiv}>{this.state.location}</div>
					</div>
					<ContentBox style={this.props.style} data={this.state} go={this.go} marker={this.marker} userdata={this.props.userdata}/>
					<Map style={this.props.style} onLocationChange={this.onLocationChange} pointFrom={this.state.localPoint} pointTo={this.state.pointTo} pointStr={this.state.pointStr} localSearchData={this.state.localSearchData} searchPointChange={this.searchPointChange}/>				
			    </div>;
	}
}
class ContentBox extends React.Component{
	constructor(props){
		super(props);
		this.state={
			sortArr:''
		};
		this.moreContent=this.moreContent.bind(this);
		this.order=this.order.bind(this);
		this.go=this.go.bind(this);
		this.validate=this.validate.bind(this);
	}
	go(event){
		this.props.go(event.target.dataset.point);
	}
	moreContent(){
		var id=event.target.dataset.id;
		var hideDiv=document.querySelector('#'+id);
		var newDiv=document.querySelector('#'+id+'order');
		if(hideDiv.style.top==='0px'){
			hideDiv.style.top='40px';
			newDiv.style.display='block';
		}else{
			hideDiv.style.top='0px';
			var timer=setTimeout(function(){
				newDiv.style.display='none';
				clearTimeout(timer);
			},500);
			
		}
	}
	order(){
		var timeStart=this.props.data.timeStart ? this.props.data.timeStart : event.target.dataset.timestart;
		var timeEnd=this.props.data.timeEnd ? this.props.data.timeEnd : event.target.dataset.timeend;
		console.log(timeStart,timeEnd);
		var data='customer='+this.props.userdata+'&username='+event.target.dataset.id+'&timeStart='+timeStart+'&timeEnd='+timeEnd+'&payment='+event.target.dataset.payment;
		function callback(){
			alert('提交成功');
		}
		if(this.props.userdata===''){
			alert('你还未登录');
		}else{
			var request=new ajaxRequest('parkingOrder.php',data,callback);
			request.request();
		} 
	}
	validate(pointFrom,pointTo,searchRadius){
		var map=new BMap.Map('container');
	    pointFrom=pointFrom.split(',');
	    pointFrom=new BMap.Point(pointFrom[0],pointFrom[1]);
	    pointTo=pointTo.split(',');
	    pointTo=new BMap.Point(pointTo[0],pointTo[1]);
	    var distance=((map.getDistance(pointFrom,pointTo))/1000).toFixed(2);
	    if(searchRadius==='noRestrict'){
			    return {
			    			type:true,
			    			distance:distance
			    		};
	    }else{
				if(map.getDistance(pointFrom,pointTo)<searchRadius){
						return {
							type:true,
							distance:distance,
						};
				}else  {
						return {
							type:false,
							distance:distance,
					    };
				}
		}	   
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.data.localPoint){
			var localPoint=nextProps.data.localPoint;
		}
		if(this.props.data.timeStart!==nextProps.data.timeStart||this.props.data.timeEnd!==nextProps.data.timeEnd||this.props.data.payment!==nextProps.data.payment||this.props.data.orderTypeText!==nextProps.data.orderTypeText||this.props.data.searchRadius!==nextProps.data.searchRadius||this.props.data.sortType!==nextProps.data.sortType||this.props.data.localPoint!==nextProps.data.localPoint){
			var request=new XMLHttpRequest();
			var b=this;
			var pointArray={};
			request.responseType='document';
			var url='search.php?timeStart='+nextProps.data.timeStart+'&timeEnd='+nextProps.data.timeEnd+'&payment='+nextProps.data.payment+'&orderTypeText='+nextProps.data.orderTypeText;
			request.open('GET',url);
			request.onreadystatechange=function(){
				if(this.readyState===4&&this.status===200){
					var name=this.response.querySelectorAll('name');
					var payment=this.response.querySelectorAll('payment');
					var timeStart=this.response.querySelectorAll('timeStart');
					var timeEnd=this.response.querySelectorAll('timeEnd');
					var telephone=this.response.querySelectorAll('telephone');
					var type=this.response.querySelectorAll('type');
					var address=this.response.querySelectorAll('address');
					var locationDetail=this.response.querySelectorAll('locationDetail');
					var rate=this.response.querySelectorAll('rate');
					var isVisible=[];
					var distance=[];
					var routeDistance=[];
					var timeSort=[];
					var sortArr=[];
					var map=new BMap.Map('container');
					for(let i=0;i<locationDetail.length;i++){
						let point=locationDetail[i].innerHTML;
						let local=localPoint;
						let results=b.validate(point,localPoint,nextProps.data.searchRadius);
						isVisible.push(results.type);
						distance.push(results.distance);
						let timestart=timeStart[i].innerHTML;
						let timeend=timeEnd[i].innerHTML;
						let timeLast=(Date.parse('1970.01.01 '+timeend)-Date.parse('1970.01.01 '+timestart))/1000;
						timeSort.push(timeLast);
					}
					for(let i=0;i<name.length;i++){
						if(isVisible[i]===true){
							let arr={
										name:name[i].innerHTML,
										payment:payment[i].innerHTML,
										timeStart:timeStart[i].innerHTML,
										timeEnd:timeEnd[i].innerHTML,
										telephone:telephone[i].innerHTML,
										type:type[i].innerHTML,
										address:address[i].innerHTML,
										locationDetail:locationDetail[i].innerHTML,
										rate:rate[i].innerHTML,
										isVisible:isVisible[i],
										distance:distance[i],
										timeSort:timeSort[i],
										comprehensiveSort:0
									};
							sortArr[i]=arr;
						}
					}
					for(let i in sortArr){
						let distanceRate;
						let paymentRate;
						if(sortArr[i].distance<100){
							distanceRate=5;
						}else if(sortArr[i]>=100&&sortArr[i]<200){
							distanceRate=4;
						}else if(sortArr[i]>=200&&sortArr[i]<500){
							distanceRate=3;
						}else if(sortArr[i]>=500&&sortArr[i]<1000){
							distanceRate=2;
						}else{
							distanceRate=1;
						}
						paymentRate=((Number(nextProps.data.payment)-Number(sortArr[i].payment))/Number(nextProps.data.payment)*5).toFixed(2);
						sortArr[i].comprehensiveSort=distanceRate+paymentRate;
						console.log(distanceRate,paymentRate);
					}
					var f=new resultSort();
					switch(nextProps.data.orderTypeText){
						case 'ASC':
						switch(nextProps.data.sortType){
							case 'distanceSort':
							sortArr.sort(f.asc_distanceSort);
							break;
							case 'timeSort':
							sortArr.sort(f.asc_timeSort);
							break;
							case 'paymentSort':
							sortArr.sort(f.asc_paymentSort);
							break;
							case 'comprehensiveSort':
							sortArr.sort(f.asc_comprehensiveSort);
							break;
							default:
							break;
						}
						break;
						case 'DESC':
						switch(nextProps.data.sortType){
							case 'distanceSort':
							sortArr.sort(f.desc_distanceSort);
							break;
							case 'timeSort':
							sortArr.sort(f.desc_timeSort);
							break;
							case 'paymentSort':
							sortArr.sort(f.desc_paymentSort);
							break;
							case 'comprehensiveSort':
							sortArr.sort(f.desc_comprehensiveSort);
							break;
							default:
							break;
						}
						break;
						default:
						break;
					}
					for(let i in sortArr){
						let point=sortArr[i].locationDetail;
						let local=localPoint;
						let drivingRoute=new BMap.DrivingRoute(map);
						drivingRoute.setSearchCompleteCallback(function(a){
							routeDistance[i]=a.getPlan(0).getDistance(false);
							sortArr[i].routeDistance=routeDistance[i];
							b.setState({
								routeDistance:routeDistance,
								sortArr:sortArr
							});
						});
						point=point.split(',');
						local=local.split(',');
						point=new BMap.Point(point[0],point[1]);
						local=new BMap.Point(local[0],local[1]);
						drivingRoute.search(point,local);
					}
					b.setState({
						sortArr:sortArr	
					});
					var str='';
					for(let i=0;i<name.length;i++){
						if(isVisible[i]){
							let key=name[i].innerHTML;
							let value=locationDetail[i].innerHTML;
							str=str+key+':'+value+'-';
						}
					}
					b.props.marker(str);							
				}
			};
			request.setRequestHeader("Content-Type","text/html");
			request.send();
		}
	}
	render(){
		var arr=[];
		var timeStart=Date.parse('1970-01-01 '+this.props.data.timeStart);
		timeStart=timeStart/1000;
		var timeEnd=Date.parse('1970-01-01 '+this.props.data.timeEnd);
		timeEnd=timeEnd/1000;
		for(let i in this.state.sortArr){
			let node=   <div style={this.props.style.allDiv}>
			                <div style={this.props.style.detailDiv} className={'detailDiv'} data-id={this['state']['sortArr'][i]['name']}>
									{this['state']['sortArr'][i]['name']}  ￥{this['state']['sortArr'][i]['payment']}/小时  从 {this['state']['sortArr'][i]['timeStart']} 至 {this['state']['sortArr'][i]['timeEnd']} 距此地:{this['state']['sortArr'][i]['routeDistance'] >1000 ? (this['state']['sortArr'][i]['routeDistance']/1000).toFixed(2)+'公里' : this['state']['sortArr'][i]['routeDistance']+'米' }  {this.props.data.timeStart&&this.props.data.timeEnd ? '支付:￥'+((timeEnd-timeStart)*this['state']['sortArr'][i]['payment']/3600).toFixed(2) : ''} 评分：{this['state']['sortArr'][i]['rate']}
									<button onClick={this.moreContent} data-id={this['state']['sortArr'][i]['name']} style={this.props.style.moreButton}>More</button>	
						    </div>
			    		    <div style={this.props.style.hideDiv} id={this['state']['sortArr'][i]['name']}>
			    					<div style={this.props.style.hideDivLeft}>
										 <p>联系方式:{this['state']['sortArr'][i]['telephone']}</p>
									     <p>地址:<adress>{this['state']['sortArr'][i]['address']}</adress></p>
									</div>
									<div style={this.props.style.hideDivRight}>
										<button onClick={this.order} style={this.props.style.orderButton} data-id={this['state']['sortArr'][i]['name']} data-type={this['state']['sortArr'][i]['type']} data-payment={this['state']['sortArr'][i]['payment']} data-timestart={this['state']['sortArr'][i]['timeStart']} data-timeend={this['state']['sortArr'][i]['timeEnd']}>Order</button>
									    <button style={this.props.style.orderButton} onClick={this.go} data-point={this['state']['sortArr'][i]['locationDetail']}>Go</button>
									</div>     
						    </div>
						    <div style={this.props.style.newDiv} id={this['state']['sortArr'][i]['name']+'order'}></div>
						</div>;
		 	arr.push(node);
		}
		return <div style={this.props.style.left}><div id={'container'}></div>{arr}</div>;
	}
}
class Map extends React.Component{
	constructor(props){
		super(props);
		this.state={
			locationDetail:''
		};
	}
	componentWillReceiveProps(nextProps){
		var b=this;
		if(nextProps.pointFrom&&this.props.pointTo!==nextProps.pointTo){
			var arr1=nextProps.pointFrom.split(',');
			var arr2=nextProps.pointTo.split(',');
			var point1=new BMap.Point(arr1[0],arr1[1]);
			var point2=new BMap.Point(arr2[0],arr2[1]);
			this.drivingRoute.search(point1,point2);
		}
		if(nextProps.pointStr!==this.props.pointStr&&nextProps.pointFrom){
			for(let i=0;i<this.markerArray.length;i++){
				this.map.removeOverlay(this.markerArray[i]);
			}
			var str=nextProps.pointStr;
			str=str.split('-');
			var arr=[];
			var brr=[];
			for(let i=0;i<str.length;i++){
				let lstr=str[i].split(':');
				arr.push(lstr[0]);
				brr.push(lstr[1]);
			}
			var icon=new BMap.Icon('http://api.map.baidu.com/img/markers.png',new BMap.Size(23,25),{
				imageOffset:new BMap.Size(0,0-10*25)
			});
			for(let i=0;i<brr.length-1;i++){
				let point=brr[i].split(',');
				let marker=new BMap.Marker(new BMap.Point(point[0],point[1]),{
					icon:icon
				});
				let label=new BMap.Label(arr[i],{
					offset:new BMap.Size(10,-17)
				});
				marker.setTitle(arr[i]);
				marker.setLabel(label);
				this.map.addOverlay(marker);
				this.markerArray.push(marker);
			}
		}
		if(this.props.localSearchData!==nextProps.localSearchData){
			this.map.clearOverlays();
			let localSearch=new BMap.LocalSearch(nextProps.localSearchData,{
				renderOptions:{
					map:this.map
				},
				onInfoHtmlSet:function(e){
					b.props.searchPointChange(e.point.lng+','+e.point.lat);
				}
			});
			localSearch.search(nextProps.localSearchData);
		}		
	}
	componentDidMount(){
		var b=this;
		this.markerArray=[];
		this.map=new BMap.Map('right');
		var point=new BMap.Point(116.404,39.915);
		this.map.centerAndZoom(point,11);
		var Geolocation=new BMap.GeolocationControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		Geolocation.location();
		Geolocation.addEventListener('locationSuccess',function(e){
			var result=this.getAddressComponent();
			var locationDetail=e.point.lng+','+e.point.lat;
			b.props.onLocationChange(result,locationDetail);
		});
		this.map.addControl(new BMap.NavigationControl({type:BMAP_NAVIGATION_CONTROL_ZOOM}));
		this.drivingRoute=new BMap.DrivingRoute(this.map,{
			renderOptions:{
				map:b.map
			}
		});
	}	
	render(){
		return <div id={'right'} style={this.props.style.right}></div>;
	}
}
class resultSort{
	asc_timeSort(a,b){
		return Number(a.timeSort)-Number(b.timeSort);
	}
	desc_timeSort(a,b){
		return Number(b.timeSort)-Number(a.timeSort);
	}
	asc_distanceSort(a,b){
		return Number(a.distance)-Number(b.distance);
	}
	desc_distanceSort(a,b){
		return Number(b.distance)-Number(a.distance);
	}
	asc_paymentSort(a,b){
		return Number(a.payment)-Number(b.payment);
	}
	desc_paymentSort(a,b){
		return Number(b.payment)-Number(a.payment);
	}
	asc_comprehensiveSort(a,b){
		return Number(a.comprehensiveSort)-Number(b.comprehensiveSort);
	}
	desc_comprehensiveSort(a,b){
		return Number(b.comprehensiveSort)-Number(a.comprehensiveSort);
	}
}
class ajaxRequest{
	constructor(url,data,callback){
		this.url=url;
		this.data=data;
		this.callback=callback;
		this.request=this.request.bind(this);
	}
	request(){
		var b=this;
		var request=new XMLHttpRequest();
		request.responseType='json';
		request.open('POST',this.url);
		request.onreadystatechange=function(){
			if(this.readyState===4&this.status===200){
				b.callback(this.response);
			}
		};
		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		request.send(this.data);
	}
}
const sty={
	"all":{
		"width":"100VW",
		"minWidth":"1000px"
	},
	"header":{
		"width":"100%",
		"height":"80px",
		"backgroundColor":"RGB(0,179,138)"
	},
	"headerP":{
		"fontSize":"40px",
		"color":"white",
		"fontStyle":"italic",
		"position":"relative",
		"top":"10px",
		"left":"20px"
	},
	"body":{
		"width":"95%",
		"backgroundColor":"RGB(248,248,248)",
		"margin":"auto",
		"marginTop":"40px",
		"paddingTop":"20px"
	},
	"input":{
		"outline":"none",
		"border":"1px solid RGB(0,179,138)",
		"borderRadius":"6px",
		"width":"70px",
		"height":"20px",
		"marginRight":"30px",
		"textAlign":"center",
		"verticalAlign":"top"
	},
	"select":{
		"outline":"none",
		"border":"1px solid RGB(0,179,138)",
		"borderRadius":"6px",
		"width":"70px",
		"height":"20px",
		"verticalAlign":"top"
	},
	"moreSelect":{
		"outline":"none",
		"border":"1px solid RGB(0,179,138)",
		"borderRadius":"6px",
		"width":"90px",
		"height":"20px",
		"marginRight":"30px",
		"textAlign":"center",
		"verticalAlign":"top"
	},
	"searchDiv":{
		"width":"100%",
		"position":"relative",
		"zIndex":0
	},
	"button":{
		"width":"70px",
		"height":"22px",
		"border":"1px solid RGB(0,179,138)",
		"borderRadius":"6px",
		"backgroundColor":"RGB(0,179,138)",
		"color":"RGB(255,255,255)",
		"verticalAlign":"top"
	},
	"allDiv":{
		"position":"relative",
		"marginTop":"15px"
	},
	"detailDiv":{
		"width":"98%",
		"height":"40px",
		"marginLeft":"10px",
		"fontSize":"15px",
		"backgroundColor":"RGB(0,179,138)",
		"color":"white",
		"position":"relative",
		"zIndex":"1",
		"lineHeight":"2.5"
	},
	'hideDiv':{
		"width":"98%",
		"marginLeft":"10px",
		"height":"40px",
		"backgroundColor":"RGB(220,220,220)",
		"color":"black",
		"fontSize":"15px",
		"position":"absolute",
		"top":"0px",
		"transition":"top 0.5s",
		"zIndex":"0"	
	},
	"moreButton":{
		"backgroundColor":"white",
		"color":"RGB(101,182,255)",
		"border":"1px solid RGB(220,220,220)",
		"float":"right",
		"width":"60px",
		"height":"20px",
		"borderRadius":"3px",
		"marginTop":"10px",
		"outline":"none"
	},
	"hideDivLeft":{
		"width":"60%",
		"display":"inline-block",
		"verticalAlign":"top"
	},
	"hideDivRight":{
		"width":"40%",
		"display":"inline-block",
		"verticalAlign":"top"
	},
	"newDiv":{
		"width":"98%",
		"height":"40px",
		"marginLeft":"10px",
		"display":"none",
		"zIndex":-1
	},
	"orderButton":{
		"backgroundColor":"RGB(255,68,1)",
		"color":"white",
		"border":"1px solid RGB(255,68,1)",
		"float":"right",
		"width":"60px",
		"height":"20px",
		"borderRadius":"3px",
		"marginTop":"10px",
		"marginLeft":"5px"
	},
	"inputLabel":{
		"color":"RGB(0,179,138)",
		"fontSize":"15px",
		"marginLeft":"10px",
		"verticalAlign":"top",
		"marginRight":"5px"
	},
	"left":{
		"width":"52%",
		"display":"inline-block",
		"verticalAlign":"top",
		"minHeight":"500px",
		"marginRight":"100px"
	},
	"right":{
		"width":"40%",
		"height":"500px",
		"display":"inline-block",
		"verticalAlign":"top",
		"marginTop":"20px"
	},
	"locationDiv":{
		"display":"inline-block",
		"border":"1px solid RGB(0,179,138)",
		"borderRadius":"6px",
		"backgroundColor":"RGB(0,179,138)",
		"color":"white",
		"height":"20px",
		"lineHeight":1.4,
		"fontSize":"15px",
		"marginLeft":"30px"
	},
	"searchParking":{
		"outline":"none",
		"borderRadius":"6px",
		"height":"20px",
		"border":"1px solid RGB(0,179,138)",
		"marginBottom":"10px",
		"verticalAlign":"top",
		"marginRight":"20px"
	},
	"loginDiv":{
		"width":"100%",
		"height":"30px"
	},
	"loginLabel":{
		"marginLeft":"45px",
		"fontSize":"15px",
		"color":"RGB(0,179,138)"
	},
	"loginInput":{
		"outline":"none",
		"border":"1px solid RGB(0,179,138)",
		"height":"20px",
		"borderRadius":"6px",
		"backgroundColor":"white",
		"width":"120px"
	},
	"loginButton":{
		"outline":"none",
		"width":"50px",
		"height":"22px",
		"border":"1px solid RGB(0,179,138)",
		"borderRadius":"6px",
		"backgroundColor":"RGB(0,179,138)",
		"color":"RGB(255,255,255)",
		"marginLeft":"15px"
	},
	"loginA":{
		"marginLeft":"3px",
		"color":"black"
	}
};
ReactDOM.render(<All style={sty}/>,document.querySelector("#example"));