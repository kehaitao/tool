const dTime = getTime();
console.log("dTime"+dTime);
function getTime () {
	var date = new Date();
	var year = date.getFullYear(); //获取年 
	var month = date.getMonth()+1;//获取月  
	var day = date.getDate(); //获取当日
	var time = month + "/" + day;	
	console.log("time"+time);
	return time;
}
export default {
	dTime
}