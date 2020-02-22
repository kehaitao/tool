export default{
	data: {
		initData: [],
	},
	
	methods: {
		getTabBarList(isFirst, _index) {
			var that = this;
			// #ifdef H5
			var newsData = h5GetCacheTemp();
			// console.log('newsData=', newsData);
			if (newsData) {
				newsData = JSON.parse(newsData)
			}
			if (newsData && newsData != null) {
				// debugger
				// console.log("currentData1=", newsData);
				var currentData = JSON.stringify(newsData);
				h5SetCacheTemp(currentData);
			}
			// #endif
			uni.request({
				url: that.baseUrl + '/initData',
				// data:"",
				method: "POST",
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: (result) => {
					console.log('getTabBarList', 'initData');
					// console.log("result=", result);
					if (result.statusCode == 200) {
						let datas = result.data.data
						// #ifdef H5
						if (datas && datas != null) {
							var currentData = JSON.stringify(datas);
							// console.log("currentData2=", currentData);
							h5SetCacheTemp(currentData);
						}
						// #endif
					
					}
				},
				fail: (result) => {
					setTimeout(function() {
						uni.hideNavigationBarLoading(); //关闭加载动画
						uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
					}, 2000);
				},
			});
			// #ifdef MP-WEIXIN
			if (window && window.hasOwnProperty('sessionStorage')) {
				console.log(555);
				// debugger
				var newsData = window.sessionStorage.getItem('news_global_detail')
				if (newsData) {
					newsData = JSON.parse(newsData);
					// this.initData(isFirst, _index, newsData)
					return
				}
			} else {
				console.log(666);
				var tabData = uni.getStorageSync('news_global_detail_list')
				if (tabData) {
					// this.initData(isFirst, _index, tabData)
					return
				}
			}
			// #endif
		},
	}
	
}